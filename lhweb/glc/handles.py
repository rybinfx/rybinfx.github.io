from importlib import reload
from sys import path
from . import nodes

import inspect

class Handle:
	def __init__(self, node=None):
		self._node = node
		self._frame = inspect.currentframe()
		# calframe = inspect.getouterframes(curframe, 3)
		# self._name = calframe[2][3]
		self._name = 'none'

	# def set(self, value):
	# 	if isinstance(value, Handle):
	# 		self._node = value._node
	# 	else:
	# 		self._node = convert(value)._node

	# def copy(self):
	# 	return Handle(self._node)

	def __getattr__(self, name):
		if name in ('_node', '_handle'):
			raise AttributeError(self, name)
		return swizzle(self, name)

	def __hash__(self):
		return id(self)

	def swset(self, comp, value):
		return swizzle_set(self, comp, value)

	def swizzle(self, comp):
		return swizzle(self, comp)

	def __add__(self, a): return add(self, a)
	def __radd__(self, a): return add(a, self)
	def __sub__(self, a): return sub(self, a)
	def __rsub__(self, a): return sub(a, self)
	def __mul__(self, a): return mul(self, a)
	def __rmul__(self, a): return mul(a, self)
	def __truediv__(self, a): return div(self, a)
	def __rtruediv__(self, a): return div(a, self)
	def __neg__(self): return mul(self, -1)
	def __lt__(self, a): return lt(self, a)
	def __gt__(self, a): return gt(self, a)
	def __le__(self, a): return le(self, a)
	def __ge__(self, a): return ge(self, a)
	def __eq__(self, a): return eq(self, a)
	def __ne__(self, a): return ne(self, a)


class Pointer(Handle):
	def __init__(self, handle=None):
		self.set(handle)
	def set(self, handle):
		if handle is None:
			self._handle = None
		else:
			self._handle = convert(handle)

	def __setattr__(self, __name: str, __value) -> None:
		assert __name != '_node'
		return super().__setattr__(__name, __value)
		

def pointer(handle=None):
	return Pointer(handle)


def convert(value):
	if isinstance(value, (Handle, Pointer)):
		return value
	else:			
		# if isinstance(value, bool):
		# 	return Handle(nodes.const(str(value).lower(), 'bool'))
		# if isinstance(value, int):
		# 	return Handle(nodes.const(str(value), 'int'))
		# if isinstance(value, float):
		# 	return Handle(nodes.const(str(value), 'float'))

		if isinstance(value, bool):
			return Handle(nodes.const_bool(value))
		if isinstance(value, int):
			return Handle(nodes.const_int(value))
		if isinstance(value, float):
			return Handle(nodes.const_float(value))
		raise TypeError(f'Cannot convert {value} to Handle')

		raise TypeError(f'Cannot convert {value} to Handle')

def null(node=None):
	h_null = Handle()
	if node is not None: h_null.set(node)
	return h_null

def const(value: str, dtype = 'float'):
	assert isinstance(dtype, str)
	assert isinstance(value, str)
	return Handle(nodes.const(value, dtype))

def func(value: str, dtype: str, signature: list[str], *args):
	assert isinstance(dtype, str)
	assert isinstance(value, str)
	assert isinstance(signature, list)
	assert all(isinstance(arg, str) for arg in signature)
	args = [convert(arg) for arg in args]
	return Handle(nodes.func(value, dtype, signature, *args))

def op(value: str, *args):
	args = [convert(arg) for arg in args]
	if value in ['+', '-', '*', '/']:
		return Handle(nodes.op(value, *args))
	if value in ['==', '!=', '<', '>', '<=', '>=', '&&', '||']:
		return Handle(nodes.bool_op(value, *args))
	raise ValueError(f'Invalid operator {value}')
	
def not_(arg):
	arg = convert(arg)
	return Handle(nodes.bool_not(arg))

def swizzle(arg, comp):
	assert isinstance(comp, str)
	arg = convert(arg)
	return Handle(nodes.swizzle(arg, comp))

def set(arg, value):
	arg = convert(arg)
	value = convert(value)
	return Handle(nodes.set(arg, value))

def swizzle_set(arg, comp, value):
	assert isinstance(comp, str)
	arg = convert(arg)
	value = convert(value)
	return Handle(nodes.swizzle_set(arg, comp, value))



def switch(conditions, *outputs, closed=False):

	# Convert all arguments to lists
	if not isinstance(conditions, list):
		conditions = [conditions]
	_outputs = []
	for output in outputs:
		if not isinstance(output, list):
			output = [output]
		_outputs.append(output)
	outputs = _outputs
	
	# Convert all arguments to handles
	conditions = [convert(condition) for condition in conditions]
	outputs = [[convert(out) for out in output] for output in outputs]

	num_conds = len(conditions)
	has_else = len(outputs[0]) == num_conds + 1
	if (has_else):
		if len(conditions) == 1:
			h_else = not_(*conditions)
		else:
			h_or = op('||', *conditions)
			h_else = not_(h_or)
		conditions.append(h_else)

	for output in outputs:
		assert len(output) == num_conds + has_else

	has_else = has_else or closed

	h_switch = Handle(nodes.switch(conditions, *outputs, has_else=has_else))
	h_outputs = [Handle(nodes.output(h_switch, i)) for i in range(len(outputs))]
	return h_outputs[0] if len(h_outputs) == 1 else h_outputs

def loop(func):
	def wrapper(size, *args):
		args = [convert(arg) for arg in args]
		size = convert(size)
		count = Handle(nodes.loop_count())
		inputs = [Handle(nodes.loop_arg(a)) for a in args]
		outputs = func(count, *inputs)
		outputs = [outputs] if not isinstance(outputs, tuple) else list(outputs)
		h_loop = Handle(nodes.loop(size, count, inputs, outputs))
		outs = [Handle(nodes.output(h_loop, i)) for i in range(len(args))]
		return outs[0] if len(outs) == 1 else outs
	return wrapper


# Base Operations

def add(a, b): return op('+', a, b)
def sub(a, b): return op('-', a, b)
def mul(a, b): return op('*', a, b)
def div(a, b): return op('/', a, b)
def lt(a, b): return op('<', a, b)
def gt(a, b): return op('>', a, b)
def le(a, b): return op('<=', a, b)
def ge(a, b): return op('>=', a, b)
def eq(a, b): return op('==', a, b)
def ne(a, b): return op('!=', a, b)
def and_(a, b): return op('&&', a, b)
def or_(a, b): return op('||', a, b)



# TODO: Remove

def ifop(arg, true, false):
	return switch([arg], [true, false], closed=True)
