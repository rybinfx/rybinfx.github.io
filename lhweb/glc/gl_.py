
from importlib import reload
import time
import copy




def type_cast(args):
	types = ["b", "i", "f", "f1", "f2", "f3", "f4"]
	if len(args) == 0:
		raise ValueError("Nothing to cast")
	if len(args) == 1:
		return args[0]
	try:
		argsidx = [types.index(a) for a in args]
	except Exception as err:
		raise ValueError(f"Unable to cast: {args}")
	argmax = max(argsidx)
	return types[argmax]


"""
BuildNode:
	Types:
		Constant {
			value: str
			type: str
		}
		Variable {
			method: set
		}
		Function {
			func_name: str
			type: str
			// input_types: str
			// num_inputs: int
		}
		Operator {
			op_sign: str
			type: cast
		}
		Lambda {
			op: function
			type: str, cast

		}
		SwizzleSet {

		}

		CodeBlock
			Output
		Condition
			Output
		Switch
			Output
		ForLoop
			Input
			Output

	Fields:
		children = []
		referenced = False
		never_proxy = False
		need_proxy = False
		proxy_input = False
		refs = 0
		parents = {}
		tp = None
		type = None
		value = None
		opname = "node"
		varname = ""
		forloop = None
		forloop_checked = False

	Methods:
		get_name
		swizzle
		swset
		clear_value
		compile_type
		check_refs
		compile_children
		make_proxy
		eval
		copy
		static: make



"""



class Node(object):
	_is_gl_node_ = True
	children = []
	referenced = False
	never_proxy = False
	need_proxy = False
	proxy_input = False
	refs = 0
	parents = {}
	tp = None
	type = None
	value = None
	opname = "node"
	varname = ""
	forloop = None
	forloop_checked = False

	def get_name(self): return self.opname+self.varname


	def __add__(self, a):
		return gl.add(self, a)
	def __radd__(self, a):
		return gl.add(a, self)
	def __sub__(self, a):
		return gl.sub(self, a)
	def __rsub__(self, a):
		return gl.sub(a, self)
	def __mul__(self, a):
		return gl.mul(self, a)
	def __rmul__(self, a):
		return gl.mul(a, self)
	def __truediv__(self, a):
		return gl.div(self, a)
	def __rtruediv__(self, a):
		return gl.div(a, self)
	def __neg__(self):
		return gl.mul(self, -1)

	def __lt__(self, a):
		return gl.lt(self, a)
	def __gt__(self, a):
		return gl.gt(self, a)
	def __le__(self, a):
		return gl.le(self, a)
	def __ge__(self, a):
		return gl.ge(self, a)
	def __eq__(self, a):
		return gl.eq(self, a)
	def __ne__(self, a):
		return gl.ne(self, a)

	def swizzle(self, axes):
		assert type(axes) == str, "Axes must be string: "+str(axes)
		assert len(axes) <= 4, "Max 4 axes: "+axes
		for a in axes:
			assert a in ["x", "y", "z", "w", "r", "g", "b", "a"], "Unknown axis: <"+a+"> in "+axes
		tp = ["f", "f2", "f3", "f4"][len(axes)-1]
		return Lambda(lambda x: f"{x}.{axes}", self, tp=tp, varname="swizzle")

	def __getattr__(self, attr):

		if len(attr) <= 4:
			_keep = True
			for a in attr:
				if a not in ["x", "y", "z", "w", "r", "g", "b", "a"]:
					_keep = False
					break
			if _keep:
				return self.swizzle(attr)
		return super().__getattribute__(attr)

	def swset(self, axes, value):
		return SwizzleSet(self, axes, value)

	def clear_value(self):
		if self.value is not None:
			self.value = None
			for ch in self.children:
				ch.clear_value()

	# def __setattr__(self, name, value):
	# 	if len(name) < 5:
	# 		allowed = "xyzwrgba"
	# 		if all([ax in allowed for ax in name]):
	# 			return self.swizzle_set(name, value)
	# 	return super().__setattr__(name, value)

	def compile_type(self):
		if callable(self.tp):
			try:
				self.type = self.tp([ch.type for ch in self.children])
			except Exception as err:
				raise ValueError(f"{err}\nself: {self} / {self.get_name()}\nchildren:{', '.join([f'{c} / {c.get_name()}' for c in self.children])}")
		else:
			assert type(self.tp) == str, f"Type error in {self.get_name()}: "+str(self.tp)
			self.type = self.tp

	def check_refs(self, parent_list = [], argn=0):

		for p in parent_list:
			if p is self:
				error = f"\n\nFeedback loop error in {self.get_name()} : {self}\n\nParent list:\n"
				for node in parent_list:
					error += ("-->" if (self is node) else "") + node.get_name() +" : "+ str(node) + "\n" 
				raise ValueError(error)


		if not self.referenced:
			self.referenced = True
			for i in range(len(self.children)):
				self.children[i].check_refs(parent_list + [self], i)
		else:
			self.need_proxy = True

	def compile_children(self, ctx):
		for ch in self.children:
			ch.compile(ctx, self.proxy_input)

	def compile(self, ctx, require_proxy=False):
		if self.value is None:
			if require_proxy and self.never_proxy:
				self.proxy_input = True
			self.compile_children(ctx)
			self.compile_type()
			if (self.need_proxy or require_proxy) and (not self.never_proxy):
				self.value = self.make_proxy(ctx)
			else:
				self.value = self.eval()

	def make_proxy(self, ctx):
		expression = self.eval()
		return ctx.proxy_expression(expression, self.type, self.get_name())

	def eval(self):
		raise ValueError("Empty node evaluation")

	def copy(self):
		node = copy.copy(self)
		node.children = [copy.copy(ch) for ch in self.children]
		return node

	@staticmethod
	def make(val, tp=None):
		if hasattr(val, "_is_gl_node_"):
			return val
		else:
			if type(val) in [str, float, int, bool]:
				return Const(val, tp)
		
			try: val = list(val)
			except Exception as err:
				raise ValueError(f"Unable to process value '{val}': \n\t{err}")

			if len(val) == 1:
				return Node.make(val[0])
			elif len(val) == 2:
				return gl.vec2([Node.make(v) for v in val])
			elif len(val) == 3:
				return gl.vec3([Node.make(v) for v in val])
			elif len(val) == 4:
				return gl.vec4([Node.make(v) for v in val])
			else:
				raise ValueError(f"Unknown list size for const: {len(val)}")


class Const(Node):
	opname = "const"
	never_proxy = True
	def __init__(self, val, tp=None):

		if type(val) == str:
			assert tp is not None, f"Set type for '{val}'"
			self.tp = tp
			self.val = val
		
		elif type(val) == float:
			self.tp = "f"
			if val < 0.0:
				self.val = f"({str(val)})"
			else:
				self.val = str(val)

		elif type(val) == int:
			self.tp = "i"
			if val < 0:
				self.val = f"({str(val)})"
			else:
				self.val = str(val)
		elif type(val) == bool:
			self.tp = "b"
			self.val = "true" if val else "false"

		else:
			raise ValueError(f"Unknown type of '{val}': {type(val)}")
		
	def eval(self):
		return self.val

class Variable(Node):
	opname = "variable"
	never_proxy = True

	def __init__(self, val=None, varname=""):
		self.varname = varname.capitalize()
		self.tp = type_cast
		if val is not None:
			self.set(val)

	def set(self, val):
		self.children = [Node.make(val)]

	def eval(self):
		assert len(self.children) == 1, f"Empty Variable: {self}"
		return self.children[0].value
	

class Function(Node):
	opname = "fn"
	def __init__(self, name, *args, tp=type_cast):
		assert type(name) == str
		self.tp = tp
		self.name = name
		self.varname = name.capitalize()
		self.children = [Node.make(a) for a in args]

	def eval(self):
		return f"{self.name}({', '.join([ch.value for ch in self.children])})"


class Operator(Node):
	opname = "op"
	def __init__(self, op, *args, tp=type_cast, varname=""):
		self.varname = varname.capitalize()
		self.tp = tp
		self.op = op
		self.children = [Node.make(a) for a in args]
	
	def eval(self):
		return f"({self.op.join([a.value for a in self.children])})"


class Lambda(Node):
	opname = "lambda"
	def __init__(self, func, *args, tp=type_cast, varname=""):
		self.varname = varname.capitalize()
		self.tp = tp
		self.func = func
		self.children = [Node.make(a) for a in args]
	
	def eval(self):
		code = self.func(*[a.value for a in self.children])
		assert type(code) == str
		return code

class SwizzleSet(Node):
	need_proxy = True

	def __init__(self, node, axes, value):
		self.children = [node, value]
		self.children = [Node.make(a) for a in self.children]
		self.children[0].never_proxy = False
		self.children[0].need_proxy = True
		self.axes = axes

	def compile_type(self):
		self.type = self.children[0].type

	def make_proxy(self, ctx):
		value = ctx.proxy_swizzle_set(self)
		return value


class CodeBlockBody(Node):
	opname = "code"
	need_proxy = True
	proxy_input = True

	def __init__(self, func, outputs, args, varname = ""):
		self.outputs = outputs
		self.func = func
		self.children = [Node.make(a) for a in args]
		self.varname = varname.capitalize()

	def compile_type(self): pass

	def make_proxy(self, ctx):
		code = self.eval()
		out_names = ctx.proxy_code(code, self.outputs, self.opname+self.varname)
		return [(name, tp) for name, tp in zip(out_names, [o[1] for o in self.outputs])]

	def eval(self):
		code = self.func(*[a.value for a in self.children])
		assert type(code) == str
		return code

class CodeBlockOutput(Node):
	need_proxy = True

	def __init__(self, codeblock, idx):
		assert type(codeblock) == CodeBlockBody
		self.children = [codeblock]
		self.idx = idx

	def make_proxy(self, ctx):
		return self.children[0].value[self.idx][0]

	def compile_type(self):
		self.type = self.children[0].value[self.idx][1]
		
def CodeBlock(func, outputs, args, varname=""):
	cb = CodeBlockBody(func, outputs, args, varname)
	outs = [CodeBlockOutput(cb, i) for i in range(len(outputs))]
	if len(outs) == 1:
		return outs[0]
	return tuple(outs)


class ConditionBody(Node):
	opname = "condition"
	need_proxy = True

	def __init__(self, condition, true, false):
		self.children = [Node.make(condition)]
		if type(true) not in [list, tuple]: true = [true]
		if type(false) not in [list, tuple]: false = [false]
		assert len(true) == len(false), "True ans False lists must be same size, got: " + str([true, false])
		true = [Node.make(t) for t in true]
		false = [Node.make(t) for t in false]
		self.true = true
		self.false = false

	def compile_type(self): pass

	def make_proxy(self, ctx):
		return ctx.proxy_condition(self.children[0], self.true, self.false, self.opname+self.varname)

class ConditionOutput(Node):
	need_proxy = True

	def __init__(self, conditionnode, idx):
		assert type(conditionnode) == ConditionBody
		self.children = [conditionnode]
		self.idx = idx

	def make_proxy(self, ctx):
		return self.children[0].value[self.idx]

	def compile_type(self):
		self.type = self.children[0].true[self.idx].type
		
def Condition(condition, true, false, varname=""):
	cond = ConditionBody(condition, true, false, varname)
	outs = [ConditionOutput(cond, i) for i in range(len(cond.true))]
	if len(outs) == 1:
		return outs[0]
	return tuple(outs)



class SwitchBody(Node):
	opname = "switch"
	need_proxy = True

	def __init__(self, cond_out_pairs):
		cond_out_pairs = list(cond_out_pairs)
		conditions = [p[0] for p in cond_out_pairs]
		outputs = [p[1] for p in cond_out_pairs]
		self.children = [Node.make(condition) for condition in conditions]
		out_size = None
		for i in range(len(outputs)):
			if type(outputs[i]) not in [list, tuple]: outputs[i] = [outputs[i]]
			if i == 0: out_size = len(outputs[i])
			else: assert len(outputs[i]) == out_size, "Output size must be same, got: " + str(outputs[:i+1])
			outputs[i] = [Node.make(o) for o in outputs[i]]


		self.outputs = outputs

	def compile_type(self): pass

	def make_proxy(self, ctx):
		val = ctx.proxy_switch(self, self.children, self.outputs, self.opname+self.varname)
		return val


class SwitchOutput(Node):
	need_proxy = True

	def __init__(self, conditionnode, idx):
		assert type(conditionnode) == SwitchBody
		self.children = [conditionnode]
		self.idx = idx

	def make_proxy(self, ctx):
		return self.children[0].value[self.idx]

	def compile_type(self):
		self.type = self.children[0].outputs[0][self.idx].type

def Switch(cond_out_pairs, varname="switch"):
	cond = SwitchBody(cond_out_pairs)
	outs = [SwitchOutput(cond, i) for i in range(len(cond.outputs[0]))]
	if len(outs) == 1:
		return outs[0]
	return tuple(outs)




class ForLoopBody(Node):
	opname = "forloop"
	need_proxy = True
	proxy_input = True

	def __init__(self, func, size, *args, varname=""):
		self.varname = varname
		self.size = gl.int(size)
		self.args = [Node.make(a) for a in args]
		self.loop_in = [gl.Variable() for a in args]
		self.i = gl.Variable()
		self.loop_out = func(self.i, *self.loop_in)
		if type(self.loop_out) in [tuple, list]: self.loop_out = list(self.loop_out)
		else: self.loop_out = [self.loop_out]
		self.children_check = [self.i, self.size] + self.loop_in
		self.endpoints = []
		self.checked_nodes = []
		for node in self.loop_out:
			self.find_endpoints(node)
		for node in self.checked_nodes:
			node.forloop = None
		self.children = self.args + [node for node in self.endpoints] + [self.size]


	def find_endpoints(self, node):
		if node.forloop is not None: return node.forloop
		self.checked_nodes.append(node)
		for check in self.children_check:
			if node is check:
				node.forloop = True
				return True
		children_inloop = [self.find_endpoints(ch) for ch in node.children]
		if not any(children_inloop):
			node.forloop = False
			return False
		for i, ch, chl in zip(range(len(node.children)), node.children, children_inloop):
			if not chl:
				contains = False
				for ep in self.endpoints:
					if ep is ch: contains = True
				if not contains:
					self.endpoints.append(ch)
					endp_inp = ForLoopInput(ch)
					node.children[i] = endp_inp
		node.forloop = True
		return True

	def compile_type(self): pass

	def make_proxy(self, ctx):
		return ctx.proxy_forloop(self, self.opname+self.varname)

	def clear_value(self):
		self.value = None
		for ch in self.children:
			ch.clear_value()
		for ch in self.loop_out:
			ch.clear_value()

class ForLoopInput(Node):
	need_proxy = True

	def __init__(self, reference):
		self.children = [reference]

	def make_proxy(self, ctx):
		return self.children[0].value

	def compile_type(self):
		self.type = self.children[0].type
		

class ForLoopOutput(Node):
	need_proxy = True

	def __init__(self, forloop, idx):
		assert type(forloop) == ForLoopBody
		self.children = [forloop]
		self.idx = idx

	def make_proxy(self, ctx):
		return self.children[0].value[self.idx]

	def compile_type(self):
		self.type = self.children[0].children[self.idx].type
		
def ForLoop(func, n, *args, varname=""):
	body = ForLoopBody(func, n, *args, varname=varname)
	outs = [ForLoopOutput(body, i) for i in range(len(args))]
	if len(outs) == 1:
		return outs[0]
	return tuple(outs)





class Context:
	types = {
		"f": "float",
		"f2": "vec2",
		"f3": "vec3",
		"f4": "vec4",
		"i": "int",
		"b": "bool"
	}

	def __init__(self, namecount={}, name="Context"):
		self.namecount = namecount
		self.proxy_defs = []
		self.name = name

	def compile(self, node_list):


		for node in node_list:
			node.check_refs()
		for node in node_list:
			node.compile(self, True)
		values = [node.value for node in node_list]

		
		return "\n".join(self.proxy_defs), values
		
	def make_name(self, name="var"):
		if not name in self.namecount:
			self.namecount[name] = 0
		new_name = name+str(self.namecount[name])
		self.namecount[name] += 1
		return new_name

	def proxy_expression(self, expression, tp, name="var"):
		proxy_name = self.make_name(name)
		proxy_def = f"{self.types[tp]} {proxy_name} = {expression};"
		self.proxy_defs.append(proxy_def)
		return proxy_name

	def proxy_swizzle_set(self, op):
		node = op.children[0]
		val = op.children[1]
		proxy_def = f"{node.value}.{op.axes} = {val.value};"
		self.proxy_defs.append(proxy_def)
		return node.value

	def proxy_code(self, code, outputs, name="var"):
		proxy_name = self.make_name(name)
		out_names = [proxy_name+n.capitalize() for n, tp in outputs]
		code = "\n".join(["\t"+l for l in code.split("\n")])
		defs_pre = "\n".join([f"{self.types[outp[1]]} {outname};" for outname, outp in zip(out_names, outputs)])
		defs_post = "\n".join([f"\t{outname} = {outp[0]};" for outname, outp in zip(out_names, outputs)])
		proxy_def = "\n".join([defs_pre, "{", code, defs_post, "}"])
		self.proxy_defs.append(proxy_def)
		return out_names

	def proxy_condition(self, condition, true_nodes, false_nodes, name="var"):
		assert condition.type == "b", "Condition must be of bool type, got: "+condition.type
		proxy_name = self.make_name(name)

		true_defs, true_names = Context(self.namecount).compile(true_nodes)
		false_defs, false_names = Context(self.namecount).compile(false_nodes)

		true_defs = "\n".join(["\t"+l for l in true_defs.split("\n")])
		false_defs = "\n".join(["\t"+l for l in false_defs.split("\n")])

		for t, f in zip(true_nodes, false_nodes):
			assert t.type == f.type, f"True and False output types must be same, got: {[(t.type, f.type) for t, f in zip(true_nodes, false_nodes)], [(t, f) for t, f in zip(true_nodes, false_nodes)]}"

		types = [t.type for t in true_nodes]
		out_names = [proxy_name+"Out"+str(i) for i in range(len(true_nodes))]
		defs_pre = "\n".join([f"{self.types[tp]} {outname};" for tp, outname in zip(types, out_names)])
		defs_post_true = "\n".join([f"\t{outname} = {nodename};" for outname, nodename in zip(out_names, true_names)])
		defs_post_false = "\n".join([f"\t{outname} = {nodename};" for outname, nodename in zip(out_names, false_names)])

		proxy_def = f"""
{defs_pre}
if ({condition.value}) {{
{true_defs}
{defs_post_true}
}} else {{
{false_defs}
{defs_post_false}
}}
"""
		self.proxy_defs.append(proxy_def)
		return out_names

	def proxy_switch(self, switchop, conditions, outputs, name="var"):

		# outputs = [self.copy_multi(o) for o in outputs]
		# switchop.outputs = outputs

		for c in conditions:
			assert c.type == "b", "Condition must be of bool type, got: "+condition.type
		proxy_name = self.make_name(name)

		out_defs_names = []
		for i, o in enumerate(outputs):
			comp = Context(self.namecount).compile(o)
			out_defs_names.append(comp)
			for node in o:
				node.clear_value()

		out_defs_names = [
			["\n".join(["\t"+l for l in defs.split("\n")]), names] for defs, names in out_defs_names
		]

		# Check types
		types = None
		for outs in outputs:
			if types is None:
				types = [o.type for o in outs]
			else:
				for t, o in zip(types, outs):
					if t != o.type:
						raise ValueError("Output types must me the same, got "+t+" and "+o.type)

		out_names = [proxy_name+"Out"+str(i) for i in range(len(outputs[0]))]
		defs_pre = "\n".join([f"{self.types[tp]} {outname};" for tp, outname in zip(types, out_names)])
		defs_post = ["\n".join([f"\t{outname} = {nodename};" for outname, nodename in zip(out_names, defsnames[1])]) for defsnames in out_defs_names]

		def_blocks = [f"""
if ({condition.value}) {{
{defsnames[0]}
{def_post}
}}
""" for condition, defsnames, def_post in zip(conditions, out_defs_names, defs_post)]
		proxy_def = defs_pre+"\n".join(def_blocks)
		self.proxy_defs.append(proxy_def)
		return out_names

	def proxy_forloop(self, forloop, varname="forloop"):

		loop_in_names = [self.make_name(varname+"Inp") for i in range(len(forloop.args))]
		loop_in_types = [self.types[node.type] for node in forloop.args]
		loop_in_vals = [node.value for node in forloop.args]
		loop_in_defs = [f"{type} {name} = {val};" for type, name, val in zip(loop_in_types, loop_in_names, loop_in_vals)]
		loop_in_defs = "\n".join(loop_in_defs)
		i_name = self.make_name(varname+"I")

		loop_in_nodes = forloop.loop_in
		for node, name, type in zip(loop_in_nodes, loop_in_names, [a.type for a in forloop.args]):
			node.set(Const(name, tp=type))
		i_node = forloop.i
		i_node.set(Const(i_name, tp="i"))


		loop_out_nodes = forloop.loop_out

		# loop_out_nodes = self.copy_multi(loop_out_nodes)

		graph_def, graph_names = Context(self.namecount).compile(loop_out_nodes)
		post_defs = [f"\t{name} = {value};" for name, value in zip(loop_in_names, graph_names)]
		post_defs = "\n".join(post_defs)
		graph_def = "\n".join(["\t"+l for l in graph_def.split("\n")])

		proxy_def = f"""
{loop_in_defs}
for (int {i_name} = 0; {i_name} < {str(forloop.size.value)}; {i_name}++) {{
{graph_def}

{post_defs}
}}
		"""

		self.proxy_defs.append(proxy_def)
		return loop_in_names


	def copy_multi(self, nodes):
		copied = []

		def node_in(n, l):
			for n_ in l:
				if n_ is n:
					return True
			return False

		def loop(node):
			if node_in(node, copied): return node
			new_node = copy.copy(node)
			new_node.children = [loop(ch) for ch in new_node.children]
			if type(new_node) == ForLoopBody:
				new_node.args = new_node.children[:len(new_node.args)]
			copied.append(new_node)
			return new_node

		new_nodes = [loop(n) for n in nodes]
		return new_nodes












class gl:

	DEBUG = True
	debug = lambda text: print(text) if gl.DEBUG else None
	debug_time_list = {}
	def debugts(id, th=None):
		if gl.DEBUG:
			gl.debug_time_list[id] = time.time()
	def debugte(id, th=None):
		if gl.DEBUG:
			diff = time.time() - gl.debug_time_list[id]
			if ((th is not None) and (diff > th)) or th is None:
				print(f"Time '{id}': {time.time() - gl.debug_time_list[id]}")
				
					

	Node = Node
	Const = Const
	Variable = Variable
	Function = Function
	Operator = Operator
	Lambda = Lambda
	CodeBlock = CodeBlock
	Condition = Condition
	Switch = Switch
	ForLoop = ForLoop

	PI = Const("PI", "f")
	pos = Const("pos", "f3")
	time = Const("time", "f")

	add = lambda *args: Operator("+", *args, varname="add")
	sub = lambda *args: Operator("-", *args, varname="sub")
	div = lambda *args: Operator("/", *args, varname="div")
	mul = lambda *args: Operator("*", *args, varname="mul")

	lt = lambda a, b: Operator("<", a, b, tp="b", varname="lt")
	gt = lambda a, b: Operator(">", a, b, tp="b", varname="gt")
	le = lambda a, b: Operator("<=", a, b, tp="b", varname="le")
	ge = lambda a, b: Operator(">=", a, b, tp="b", varname="ge")
	eq = lambda a, b: Operator("==", a, b, tp="b", varname="eq")
	ne = lambda a, b: Operator("!=", a, b, tp="b", varname="ne")
	_and = lambda a, b: Operator("&&", a, b, tp="b", varname="ne")
	_or = lambda a, b: Operator("||", a, b, tp="b", varname="ne")

	ifop = lambda condition, true, false: Lambda(lambda x, a, b: f"(bool({x})?{a}:{b})", condition, true, false)

	int = lambda x: Function("int", x, tp="i")
	float = lambda x: Function("float", x, tp="f")
	vec2 = lambda *x: Function("vec2", *x, tp="f2")
	vec3 = lambda *x: Function("vec3", *x, tp="f3")
	vec4 = lambda *x: Function("vec4", *x, tp="f4")

	floor = lambda x: Function("floor", x)
	fract = lambda x: Function("fract", x)
	abs = lambda x: Function("abs", x)
	mod = lambda a, b: Function("mod", a, b)
	min = lambda a, b: Function("min", a, b)
	max = lambda a, b: Function("max", a, b)
	pow = lambda a, b: Function("pow", a, b)
	sign = lambda a: Function("sign", a)




	def sinn_it(x, amp=0.5, off=0.5):
		return off*x - (amp*gl.cos((x-0.25)*gl.PI*2))/(gl.PI*2)



	clamp = lambda x, min, max: Function("clamp", x, min, max)
	smoothstep = lambda min, max, x: Function("smoothstep", min, max, x)
	mix = lambda a, b, c: Function("mix", a, b, c)
	integralSmoothstep = lambda a, b: Function("integralSmoothstep", a, b, tp="f")
	
	length = lambda x: Function("length", x, tp="f")

	sin = lambda x: Function("sin", x)
	cos = lambda x: Function("cos", x)
	sinn = lambda x: gl.sin(x*gl.PI*2)
	cosn = lambda x: gl.cos(x*gl.PI*2)

	n01 = 			lambda x: Function("n01", x)
	n11 = 			lambda x: Function("n11", x)
	parabola = 		lambda a, b: Function("parabola", a, b)
	pcurve = 		lambda *x: Function("pcurve", *x)
	gain = 			lambda x, y: Function("gain", x, y)
	rand = 			lambda x: Function("rand", x, tp="f")
	rnoise = 		lambda x: Function("rnoise", x, tp="f")
	vnoise = 		lambda x: Function("vnoise", x, tp="f")
	cnoise = 		lambda *xyz: Function("cnoise", *xyz, tp="f")
	sinnoise = 		lambda *xyz: Function("sinnoise", *xyz, tp="f")
	rot2 = 			lambda pos, a: Function("rot2", pos, a, tp="f2")



	distortsin = lambda pos, strenght=.1, freq=1, time=0, speed=1, loop=1000, time_off=0, detail=1, seed=0: Function(
		"distortsin", pos, strenght, freq, time, speed, loop, time_off, detail, seed
	)



	_ch = "rgba"
	tex = lambda id, ch=0, tex=0: Lambda(lambda id: f"texture(sTD2DInputs[{tex}], vec2(fract(({id}+0.5)/tex{tex}_res.x),0)).{gl._ch[ch]}", id, tp="f")
	
	texf = lambda pt, tex=0: Lambda(lambda pt: f"texture(sTD2DInputs[{tex}], vec2({pt},0))", pt, tp="f4")
	# texf = lambda pt, ch=0, tex=0: Lambda(lambda ptf: f"texture(sTD2DInputs[{tex}], vec2({ptf},0)).{gl._ch[ch]}", pt, tp="f")
	# inp = lambda i, idx: Lambda(lambda i, idx: f"texture(sTD2DInputs[int({i}-1)], vec2(fract(({idx}+0.5)/i{i}_res.x),0)).x", i, idx)


	normsplit = lambda: CodeBlock(lambda func: f"""

	float 
	float sum = 0.0;
	float accum = 0.0;
	for (int i = 0; i < {size}; i++) {{





		float val = {weight};
		sum += val;
		if (i < {index}) accum += val;
		if (i == {index}) {name} = val;
	}}
	if (bool({accum})) {name} = accum;
	{name} /= sum;

	""")
