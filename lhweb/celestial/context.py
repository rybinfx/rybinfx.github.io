
class BlockRef:
	_ref = None
	_ref_stack = []
	def __setattr__(self, name, value):
		if name == "_ref":
			return super().__setattr__(name, value)
		return self._ref.__setattr__(name, value)
	def __getattr__(self, name):
		return self._ref.__getattribute__(name)
	def __enter__(self):
		return self
	def __exit__(self, *args):
		pass
	def _push(self, block):
		self._ref_stack.append(self._ref)
		self._ref = block
	def _pop(self):
		self._ref = self._ref_stack.pop()

class Context:
	def __init__(self):
		self.namecount = {}
		self.libpath = "celestial/"
		self.ref = BlockRef()
		self.blocks = {}
		self.extras = []

		self.register(Null)
		self.register(Clone)
		self.register(Block)
		self.register(Mirror)
		self.register(Rotate)
		self.register(Line)
		self.register(NoiseLine)
		self.register(Stream)
		# self.register(Circle)
		# self.register(Grid)

	def enter(self, block, add = True):
		if add:	self.ref._ref.add_child(block)
		self.ref._push(block)
	def exit(self):
		self.ref._pop()

	def __getattr__(self, name):
		return self.blocks[name]

	def newname(self, name="noname"):
		if not name in self.namecount:
			self.namecount[name] = 0
		n = self.namecount[name]
		self.namecount[name] = n+1
		return name + "_" + str(n)

	def register(self, *blocks):
		for b in blocks:
			def make(**kwargs):
				block = b(self)
				for key in kwargs:
					getattr(block, key)
					setattr(block, key, kwargs[key])
				return block
			self.blocks[b.__name__] = make

	def compile(self, Main, uniforms=""):

		main = Main(self)
		mesh = main.compile()
		primitives, npoints, meshcode = mesh.build()

		attributes = [
			"pos",
			"alpha",
			"weight",
			"hue",
			"sat",
			"val"
		]
		get_nodes = [getattr(main, a) for a in attributes] + self.extras
		maincode_defs, maincode_names = celgl.Context().compile(get_nodes)
		maincode_sets = "\n".join([
			f"{a} = {name};" for a, name in zip(attributes, maincode_names[:len(maincode_names)-len(self.extras)])
		])
		extra_sets = "\n".join([
			f"extra_{i} = {name};" for i, name in enumerate(maincode_names[len(maincode_names)-len(self.extras):])
		])

		template = coder.load(self.libpath+"template.glsl")
		functions = coder.load(self.libpath+"functions.glsl")

		maincode_defs = coder.shift(coder.add("// Main Code Defs", maincode_defs))
		maincode_sets = coder.shift(coder.add("// Main Code Sets", maincode_sets))
		extra_sets = coder.shift(coder.add("// Extra Sets", extra_sets))
		meshcode = coder.shift(coder.add("// Mesh Code", meshcode))

		code = coder.replace(template, {
			"[UNIFORMS]": uniforms,
			"[FUNCTIONS]": functions,
			"[DRAW]": coder.add(meshcode, "", maincode_defs, "", maincode_sets, "", extra_sets)
		})
		coder.save(code, self.libpath+"generated/generated.glsl")

		result = {
			'glsl': code,
			'points': npoints,
			'primitives': primitives
		}

		return result

	def Group(self, SIZE = 1):
		with Null(self) as g:
			for i in range(SIZE):
				with Null(self) as gi:
					gi.GID = i
					yield gi

	def var(self, code, tp="float", inline=False):
		return self.ref.defvar(code, inline, tp)

	def write_extra(self, val):
		self.extras.append(val)
