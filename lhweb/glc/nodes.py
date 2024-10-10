
# Base nodes

def null():
	return {
		'type': 'null',
		'conn': {},
	}

def reference(arg=None):
	return {
		'type': 'reference',
		'conn': {
			'args': [arg],
		},
	}

def const(value: str, dtype: str):
	return {
		'type': 'const',
		'value': value,
		'dtype': dtype,
		'conn': {},
	}

def const_int(value: int):
	return {
		'type': 'const_int',
		'value': int(value),
		'dtype': 'int',
		'conn': {},
	}

def const_float(value: float):
	return {
		'type': 'const_float',
		'value': float(value),
		'dtype': 'float',
		'conn': {},
	}

def const_bool(value: bool):
	return {
		'type': 'const_bool',
		'value': bool(value),
		'dtype': 'bool',
		'conn': {},
	}


def func(value: str, dtype: str, signature: list[str], *args):
	return {
		'type': 'func',
		'value': value,
		'signature': signature,
		'dtype': dtype,
		'conn': {
			'args': list(args),
		},
	}

def op(value: str, *args):
	return {
		'type': 'op',
		'value': value,
		'conn': {
			'args': list(args),
		},
	}

def bool_op(value: str, *args):
	return {
		'type': 'bool_op',
		'value': value,
		'conn': {
			'args': list(args),
		},
	}

def bool_not(node):
	return {
		'type': 'bool_not',
		'conn': {
			'args': [node]
		},
	}

def swizzle(node, comp):
	return {
		'type': 'swizzle',
		'value': comp,
		'conn': {
			'args': [node]
		},
	}

def set(node, value):
	return {
		'type': 'set',
		'conn': {
			'args': [node, value]
		},
	}

def swizzle_set(node, comp, value):
	return {
		'type': 'swizzle_set',
		'value': comp,
		'conn': {
			'args': [node, value]
		},
	}


# Control flow

def output(node, index: int):
	return {
		'type': 'output',
		'index': index,
		'conn': {
			'input': [node]
		},
	}

def switch(conds, *outs, has_else=False):
	return {
		'type': 'switch',
		'else': has_else,
		'conn': {**{
			'conds': conds,
			},
			**{'out_' + str(i): o for i, o in enumerate(outs)}
		},
	}


def loop_count():
	return {
		'type': 'loop_count',
		'loop': None,
		'conn': {
		},
	}

def loop_arg(arg):
	return {
		'type': 'loop_arg',
		'loop': None,
		'conn': {
			"arg": [arg]
		},
	}

def loop(size, count, inputs, outputs):
	return {
		'type': 'loop',
		'index': None,
		'conn': {
			'size': [size],
			'count': [count],
			'outs': outputs,
			'inputs': inputs
		},
	}


