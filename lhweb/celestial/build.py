from celestial import tools
from celestial import coder
import glc

from importlib import reload
reload(coder)
reload(tools)
reload(glc)
gl = glc


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
		self.register(Merge)
		self.register(Combine)
		self.register(VClone)
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
		a_types = [
			"vec3",
			"float",
			"float",
			"float",
			"float",
			"float"
		]
		get_nodes = [getattr(main, a) for a in attributes]
		set_nodes = [
			gl.set(gl.const(attributes[i], a_types[i]), get_nodes[i]) for i in range(len(get_nodes))
		]
		

		code = gl.compile(set_nodes)
		# print(code)
		# maincode_sets = "\n".join([
		# 	f"{a} = {name};" for a, name in zip(attributes, maincode_names[:len(maincode_names)-len(self.extras)])
		# ])
		# extra_sets = "\n".join([
		# 	f"extra_{i} = {name};" for i, name in enumerate(maincode_names[len(maincode_names)-len(self.extras):])
		# ])

		template = coder.load(self.libpath+"template.glsl")
		functions = coder.load(self.libpath+"functions.glsl")

		code = coder.shift(coder.add("// Main Code Defs", code))
		# maincode_sets = coder.shift(coder.add("// Main Code Sets", maincode_sets))
		# extra_sets = coder.shift(coder.add("// Extra Sets", extra_sets))
		meshcode = coder.shift(coder.add("// Mesh Code", meshcode))

		code = coder.replace(template, {
			"[UNIFORMS]": uniforms,
			"[FUNCTIONS]": functions,
			"[DRAW]": coder.add(meshcode, "", code)
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

class Node:
	def __init__(self, ctx):
		self.ctx = ctx
		self.classname = self.__class__.__name__
		self.children = []
		self._bypass = False
	def bypass(self):
		self._bypass = True
	def __enter__(self):
		self.ctx.enter(self)
		return self
	def __exit__(self, *args):
		self.ctx.exit()
	def add_child(self, child):
		self.children.append(child)
	def endpoints(self):
		if len(self.children) == 0:
			return [self]
		endpoints = []
		for ch in self.children:
			endpoints.extend(ch.endpoints())
		return endpoints

class Null(Node):
	def __init__(self, ctx):
		super().__init__(ctx)
		self._force_group = False

		self._pos = gl.pointer(gl.vec3(0.0, 0.0, 0.0))
		self.pos = gl.pointer(self._pos)
		self._alpha = gl.pointer(1.0)
		self.alpha = gl.pointer(self._alpha)
		self._weight = gl.pointer(4.0)
		self.weight = gl.pointer(self._weight)
		self._hue = gl.pointer(0.0)
		self.hue = gl.pointer(self._hue)
		self._sat = gl.pointer(0.0)
		self.sat = gl.pointer(self._sat)
		self._val = gl.pointer(1.0)
		self.val = gl.pointer(self._val)

		self.child_id = gl.pointer()
		self.gid = gl.pointer(0)
		self.GID = 0
		# self.idx = gl.Lambda(lambda name: f"{name}.idx", self.gl_name)
		# self.n = gl.Lambda(lambda name: f"{name}.size", self.gl_name)
		# self.ido = gl.Lambda(lambda idx, n: f"float({idx})/({n}-1)", self.idx, self.n)
		# self.idc = gl.Lambda(lambda idx, n: f"float({idx})/({n})", self.idx, self.n)

	def compile_children(self):
		child_mesh = [ch.compile() for ch in self.children]
		child_mesh = [chmesh for chmesh in child_mesh if chmesh is not None]
		if len(child_mesh) == 0:
			mesh = None
		elif len(child_mesh) == 1:
			mesh = child_mesh[0]
		else:
			group = tools.Group(self.groupname)
			mesh = group(child_mesh)
			for ch in self.children:
				ch.gid.set(self.child_id)
		
		if len(self.children) > 0:
			attributes = [
				"pos",
				"alpha",
				"weight",
				"sat",
				"hue",
				"val"
			]
			_attributes = [getattr(self, "_"+a) for a in attributes]
			switch_attributes = [
				[getattr(child, name) for child in self.children] for name in attributes
			]

			if len(self.children) > 1:
				switch_conditions = [self.child_id == i for i in range(len(self.children))]
				switch_attributes = gl.switch(switch_conditions, *switch_attributes)
			else:
				switch_attributes = [sa[0] for sa in switch_attributes]
			for a, sa, aname in zip(_attributes, switch_attributes, attributes):
				a.set(sa)

		return mesh


		if len(children) == 1:
			return children[0]
		return None

	def compile(self):
		self.name = self.ctx.newname(self.classname)
		self.groupname = self.name+"_children"
		self.child_id.set(gl.const(self.groupname+".idx", "int"))
		mesh = self.compile_children()
		return mesh

	def translate(self, xyz=None, x=None, y=None, z=None):
		if xyz is not None:
			self.pos += xyz
		if x is not None:
			self.pos += gl.vec3(x, 0, 0)
		if y is not None:
			self.pos += gl.vec3(0, y, 0)
		if z is not None:
			self.pos += gl.vec3(0, 0, z)

	def rotate(self, x=None, y=None, z=None):
		if x is not None:
			rot = gl.rot2(self.pos.yz, x)
			self.pos = gl.vec3(self.pos.x, rot.x, rot.y)
		if y is not None:
			rot = gl.rot2(self.pos.xz, y)
			self.pos = gl.vec3(rot.x, self.pos.y, rot.y)
		if z is not None:
			rot = gl.rot2(self.pos.xy, z)
			self.pos = gl.vec3(rot.x, rot.y, self.pos.z)

	def scale(self, xyz=None, x=None, y=None, z=None):
		if xyz is not None:
			self.pos *= xyz
		if x is not None:
			self.pos *= gl.vec3(x, 1, 1)
		if y is not None:
			self.pos *= gl.vec3(1, y, 1)
		if z is not None:
			self.pos *= gl.vec3(1, 1, z)


class Clone(Null):
	def __init__(self, ctx=None, SIZE=1, CLOSE=False, CONNECT=False):
		super().__init__(ctx)
		self.SIZE = SIZE
		self.CLOSE = CLOSE
		self.CONNECT = CONNECT

		self.idx = gl.pointer()
		self.n = gl.pointer()
		self.ido = gl.switch([self.n > 1], [gl.float(self.idx)/(self.n-1), 0.5])
		self.idc = gl.float(self.idx)/(self.n)

	def compile(self):

		self.name = self.ctx.newname(self.classname)
		self.groupname = self.name+"_children"
		self.child_id.set(gl.const(self.groupname+".idx", "int"))
		self.idx.set(gl.const(self.name+".idx", "int"))
		self.n.set(gl.const(self.name+".size", "int"))

		meshch = self.compile_children()
		mesh = tools.Seg(self.SIZE, self.CONNECT, self.CLOSE, self.name)
		if meshch is not None:
			mesh(meshch)

		return mesh



class Merge(Null):
	def __init__(self, ctx=None):
		super().__init__(ctx)
		self.weights = []

	def compile_children(self):
		child_mesh = [child.compile() for child in self.children]
		child_mesh = [mesh for mesh in child_mesh if mesh is not None]
		if len(child_mesh) == 0:
			return None
		if len(child_mesh) == 1:
			return child_mesh[0]
		
		merge = tools.Merge(self.name)
		mesh = merge(child_mesh)
		for ch in self.children:
			ch.gid.set(self.child_id)

		if len(self.children) > 0:
			attributes = [
				"pos",
				"alpha",
				"weight",
				"sat",
				"hue",
				"val"
			]
			attrs = {
				"pos": gl.vec3(0.0, 0.0, 0.0),
				"alpha": gl.float(0.0),
				"weight": gl.float(0.0),
				"sat": gl.float(0.0),
				"hue": gl.float(0.0),
				"val": gl.float(0.0)
			}
			_attributes = [getattr(self, "_"+a) for a in attributes]
			switch_attributes = [
				[getattr(child, name) for child in self.children] for name in attributes
			]

			for i, ch in enumerate(self.children):
				if i < len(self.weights):
					weight = self.weights[i]
				else:
					weight = 0.0
				weight_attributes = [getattr(ch, name) * weight for name in attributes]
				
				for a, sa, aname in zip(_attributes, weight_attributes, attributes):
					a = attrs[aname]
					# attrs[aname] = gl.ifop(weight > 0.0, a + sa, a)
					attrs[aname] = gl.ifop(weight > 0.0, a + sa, a)

			for a, sa, aname in zip(_attributes, weight_attributes, attributes):
				a.set(attrs[aname])

		return mesh



class Block(Null):
	def __init__(self, ctx):
		super().__init__(ctx)
		self.param()

	def compile(self):	
		children = self.children
		self.children = []
		self.ctx.enter(self, False)
		self.graph(self.ctx, self.ctx.ref)
		self.ctx.exit()
		


		endpoint = self.endpoints()[0]
		endpoint.children = children
		result = super().compile()
		return result

	def param(self):
		pass
	def graph(self, ctx, me):
		pass


class VClone(Block):
	def param(self):
		self.idx = gl.pointer()
		self.n = gl.pointer()
		self.ido = gl.switch([self.n > 1], [gl.float(self.idx)/(self.n-1), 0.5])
		self.idc = gl.float(self.idx)/(self.n)



class Combine(Block):
	def param(self):
		self.SIZE = 8
		self.pattern = [gl.int(1), gl.int(2)]
		self.idx = gl.pointer()
		self.n = gl.pointer()
		self.main_idx = gl.pointer()
		self.main_n = gl.pointer()
		self.sub_idx = gl.pointer()
		self.sub_n = gl.pointer()
		self.main = [self.main_idx, self.main_n]
		self.sub = [self.sub_idx, self.sub_n]
		self.main_off = 0.0
		self.VCLONE = None

	def get_sub_size(self, main_idx):
		plen = len(self.pattern)
		pidx = gl.int(gl.mod(main_idx, plen))
		conds = [pidx == i for i in range(plen)]
		return gl.switch(conds, self.pattern, closed=True)


	def graph(self, ctx, me):
		if self.VCLONE is not None:
			CLONE = ctx.VClone()
			CLONE.idx.set(self.VCLONE[0])
			CLONE.n.set(self.VCLONE[1])
		else:
			CLONE = ctx.Clone()

		with CLONE as cl:
			if self.VCLONE is None:
				cl.SIZE = self.SIZE
			else:
				self.SIZE = None

			self.idx.set(cl.idx)
			self.n.set(cl.n)

			ends = []
			for i, s in enumerate(self.pattern):
				if i == 0:
					ends.append(s)
				else:
					ends.append(ends[-1] + s)

			starts = [a-s for a, s in zip(ends, self.pattern)]
			
			plen = len(self.pattern)
			total = gl.int(0)
			for p in self.pattern:
				total += p
			
			def get_bin(i, off=None):
				fi = gl.int(i / total)
				mi = i-(fi*total)
				conds = [mi < ind for ind in ends]
				bins = [i for i in range(plen)]
				bin, start, size = gl.switch(conds, bins, starts, self.pattern, closed=True)
				bin_index = mi - start
				bin += fi*plen
				return bin, bin_index, size

			max_bin, max_bin_index, max_size = get_bin(me.n)
			bin, bin_index, size = get_bin(me.idx)

			self.main_idx.set(gl.int(gl.mod(bin+self.main_off*max_bin, max_bin)))
			self.main_n.set(max_bin)
			self.sub_idx.set(bin_index)
			self.sub_n.set(size)




class Mirror(Block):
	def param(self):
		self.AXIS = "x"
		self.SCALE = False
		self.PASS = False
		self.flip = False

		self.side = gl.pointer()

	def graph(self, ctx, me):
		if not self.PASS:
			with ctx.Clone() as cl:
				me.SIZE = 2
				self.side.set(me.ido*2.0-1.0)
				me.pos = me.pos.swset(self.AXIS, me.pos.swizzle(self.AXIS) * self.side * gl.switch(self.flip, [-1.0, 1.0]))
				if self.SCALE:
					me.scale(**{self.AXIS: 0.5})
					me.translate(**{self.AXIS: 0.5*self.side})


class Rotate(Block):
	def param(self):
		self.SIZE = 8
		self.CONNECT = False
		self.CLOSED = False
		self.AXIS = "y"

		self.rad = 0
		self.off = 0
		self.arc = 1

		self.pt = gl.pointer()
		self.id = gl.pointer()

	def graph(self, ctx, me):
		with ctx.Clone() as rot:
			me.SIZE = self.SIZE
			me.CONNECT = self.CONNECT
			me.CLOSED = self.CLOSED

			offset_axis = {"x":"z","y":"z","z":"y"}[self.AXIS]
			me.translate(**{offset_axis: self.rad})
			pt = (me.ido-0.5) * (((me.SIZE-1)/(me.SIZE)) if me.SIZE > 1 else 0.5)
			angle = pt
			angle = angle*self.arc
			angle += self.off
			me.rotate(**{self.AXIS: angle})
			self.pt.set(me.idc)
			self.id.set(me.idx)



class Line(Block):
	def param(self):
		self.SIZE = 16
		self.CONNECT = False

		self.off = None
		self.fade = None
		
		self.pt = gl.pointer()
		self.ptoff = gl.pointer()
		self.id = gl.pointer()

		self.VCLONE = None

	def graph(self, ctx, me):
		if self.VCLONE is not None:
			CLONE = ctx.VClone()
			CLONE.idx.set(self.VCLONE[0])
			CLONE.n.set(self.VCLONE[1])
		else:
			CLONE = ctx.Clone()

		with CLONE as cl:
			if self.VCLONE is None:
				cl.SIZE = self.SIZE
			else:
				self.SIZE = None

			if self.fade is None:
				self.fade = 0.1 if self.off is not None else 0.0

			def roll(idx, size, off):
				if off is None:
					newpt = gl.ifop(size>1, gl.float(idx)/(size-1), 0.5)
					return idx, newpt, newpt
				else:
					off = gl.float(off)*(size)
					idoff = idx + gl.fract(off)
					newid = idx - gl.floor(off)
					newpt = gl.ifop(size>1, gl.float(idoff) / size, gl.fract(gl.float(idoff)+0.5))
					ptoff = gl.ifop(size>1, gl.float(newid) / size, gl.fract(gl.float(newid)+0.5))
					return newid, newpt, ptoff

			idnew, pt, ptoff = roll(me.idx, me.n, self.off)

			alpha = fade(pt, self.fade) if self.off is not None else 1.0
			me.alpha *= alpha
			
			self.pt.set(pt)
			self.ptoff.set(ptoff)
			self.id.set(idnew)


class NoiseLine(Block):
	def param(self):
		self.SIZE = 64
		self.sizey = 4
		self.CONNECTX = False
		self.CONNECTY = False
		self.off = 0.0
		self.follow_off = 0.0
		self.offrand = 0.0
		self.namp = 1.0
		self.nxscale = 1.0
		self.nyscale = 1.0
		self.nxoff = 0.0
		self.nyoff = 0.0
		self.nzoff = 0.0
		self.lx_remap_f = None
		self.ly_remap_f = None
		self.noise = ns.simplex
		self.nargs = {}
		self.pin = True
		self.pin_tp = "mix"
		self.pin_one = False
		self.pin_p0 = gl.vec3(0.0, -1.0, 0.0)
		self.pin_p1 = gl.vec3(0.0, 1.0, 0.0)
		self.seed = 123
		self.fade = 0.1

		self.lxpt = gl.pointer()
		self.lxptoff = gl.pointer()
		self.lxid = gl.pointer()
		self.lypt = gl.pointer()
		self.lyid = gl.pointer()
		self.nval = gl.pointer()

		self.VCLONE = None

	def graph(self, ctx, me):
		with ctx.Combine() as comb:
			comb.VCLONE = self.VCLONE
			comb.SIZE = self.SIZE
			comb.pattern = [gl.int(self.SIZE/self.sizey)]
		
			with ctx.Line() as ly:
				me.VCLONE = comb.main
				with ctx.Line() as lx:
					me.VCLONE = comb.sub

					me.fade = self.fade
					self.off
					off = gl.ifop(self.offrand > 0.0, self.off * (1.0-ns.rand(ly.id + ns.rand(self.seed)*1000)*self.offrand), self.off)
					lx.off = off

					lxpt = lx.pt
					if self.lx_remap_f is not None: lxpt = self.lx_remap_f(lxpt)
					lypt = ly.pt
					if self.ly_remap_f is not None: lypt = self.ly_remap_f(lypt)
					lxpt = lxpt = gl.mix(lxpt, lxpt-self.off, self.follow_off)

					nxpos = (lxpt-0.5)*self.nxscale+self.nxoff
					nypos = (lypt-0.5)*self.nyscale+self.nyoff  +  ns.rand(self.seed)*1000
					nzpos = self.nzoff
					nval = self.noise(nxpos, nypos, nzpos, ch=3, **self.nargs) * self.namp
					pos = pin(lx.pt, nval, tp=self.pin_tp, one=self.pin_one, p0=self.pin_p0, p1=self.pin_p1) if self.pin else nval
					me.pos += pos

					self.lxpt.set(lxpt)
					self.lxptoff.set(lx.ptoff)
					self.lypt.set(lypt)
					self.lxid.set(lx.id)
					self.lyid.set(ly.id)
					self.nval.set(nval)


from celestial import noise as celnoise
reload(celnoise)
ns = celnoise

def roll(id, size, off=0.0, clamp=True, norm=False):
	size = gl.float(size)
	off = off*size
	id_off = id + gl.fract(off)
	id_new = gl.int(id - gl.floor(off))
	if norm:
		pt = gl.ifop(size < 1.0, id_off, id_off / (size-1))
	else:
		pt = id_off / size
	pt = gl.ifop(clamp, gl.clamp(pt, 0, 1), pt)
	return id_new, pt, id_off


def df_sinroll(pt, side=1.0):

	def integralSine(x, t):
		before = gl.sinn_it(x/t/2, t, t)
		after = x - t+gl.sinn_it(0.5, t, t)
		val = gl.switch(x>t, [after, before])
		return val

	length = integralSine(0.5, side/2)
	pt0 = integralSine(pt, side/2)/length/2
	pt1 = 1-integralSine((1.0-pt), side/2)/length/2
	pt = gl.switch(pt < 0.5, [pt0, pt1])

	return pt


def t_sin(t, amp=1):
	_a = amp/2.0
	return gl.sinn_it(t, _a, 0.5)


def fade(pt, side):
	val = gl.min(gl.smoothstep(0.0, side/2.0, pt), gl.smoothstep(1.0, 1.0-side/2.0, pt))
	return gl.ifop(side <= 0.0, 1.0, val)


def fade_make(op, pt, side):
	side = side / 2.0
	f0 = gl.clamp(pt/side, 0.0, 1.0)
	f1 = gl.clamp((1.0-pt)/side, 0.0, 1.0)
	fade0 = op(f0)
	fade1 = op(f1)
	val = gl.ifop(
		pt < side, fade0,
		gl.ifop((1.0-pt) < side, fade1, 1.0)
	)
	return gl.ifop(side > 0.0, val, gl.ifop(gl.and_((pt>0.0), (pt < 1.0)), 1.0, 0.0))

def fade_sin(pt, side=1.0):
	return fade_make(lambda x: gl.sinn(x/4.0), pt, side)

def fade_smoothstep(pt, side):
	return fade_make(lambda x: gl.smoothstep(0.0, 1.0, x), pt, side)


def pin(pt, pos, tp="mix", one=False, p0=None, p1=None):
	if p0 is None: p0 = gl.vec3(0.0, -1.0, 0.0)
	if p1 is None: p1 = gl.vec3(0.0, 1.0, 0.0)
	line = gl.mix(p0, p1, pt)

	if tp == "mix":
		if not one:
			newpos = gl.mix(line, pos, gl.parabola(pt, 1))
		else:
			newpos = gl.mix(p0, pos, pt)
	elif tp == "add":
		if not one:
			newpos = line + pos * gl.parabola(pt, 1)
		else:
			newpos = p0 + pos * pt
	elif tp == "flat":
		newpos = line + pos
	else:
		assert False, tp		

	return newpos


def pow11(x, p): return gl.pow(x, gl.pow(2, p))


class Stream(Block):
	def bind_wmap(self, stream):
		self.wmap_ps = [stream.ptpos, stream.pt]
	def param(self):
		self.SIZE = 8
		self.off = None
		self.remap = lambda x: x
		self.wmap = None
		self.fade = None
		self.clamp = True

		self.TRANSFORM = True
		self.AXIS = "y"
		self.DIST = "seq" # seq pow powst
		self.scale_all = False
		self.iscale = 1.0
		self.bend  = 0.01
		self.fade_op = fade_smoothstep
		self.ifade = None
		self.afade = None
		self.wfade = None
		self.powp = 2.0

		self.wmap_ps = None

		self.pt0 = gl.pointer()
		self.pt1 = gl.pointer()
		self.pt0_ = gl.pointer()
		self.pt1_ = gl.pointer()
		self.pt = gl.pointer()
		self.ptw = gl.pointer()
		self.ptwn = gl.pointer()
		self.id = gl.pointer()
		self.idx = gl.pointer()
		self.n = gl.pointer()
		self.ptpos = gl.pointer()

		self.spread = 0.0

		self.VCLONE = None


	def get_pts(self, idx, n, wmap_ps = -1):
		if wmap_ps == -1: wmap_ps = self.wmap_ps
	
		def df_sinroll(pt, side=1.0):

			def integralSine(x, t):
				before = gl.sinn_it(x/t/2, t, t)
				after = x - t+gl.sinn_it(0.5, t, t)
				val = gl.switch(x>t, [after, before])
				return val

			length = integralSine(0.5, side/2)
			pt0 = integralSine(pt, side/2)/length/2
			pt1 = 1-integralSine((1.0-pt), side/2)/length/2
			pt = gl.switch(pt < 0.5, [pt0, pt1])

			return pt
		
			
		def roll_sides(pt):
			return df_sinroll(pt, 1.0/6.999*4.0)
	
		id_set = gl.pointer()

		if self.wmap is None:

			if self.off is None:
				id0, pt0, _ = roll(idx, n, 0.0, self.clamp, False)
				id1, pt1, _ = roll(idx+1, n, 0.0, self.clamp, False)
			else:
				id0, pt0, _ = roll(idx-1, n, self.off, self.clamp, True)
				id1, pt1, _ = roll(idx, n, self.off, self.clamp, True)
				if self.clamp:
					pt0, pt1 = roll_sides(pt0), roll_sides(pt1)
			pt0, pt1 = self.remap(pt0), self.remap(pt1)
			id_set.set(id1)
			pt02 = pt0
			pt12 = pt1

		else:
			if self.off is None:
				norm = False
				off = 0.0
			else:
				norm = True
				off = self.off
			def make_loop(wmap):
				def rsplit_loop(i, accum, x0, x1):
					i_0 = i if self.off is None else i-1
					i_1 = i+1 if self.off is None else i
					id0, pt0, _ = roll(i_0, n, off, True, norm)
					id1, pt1, _ = roll(i_1, n, off, True, norm)

					if self.off is not None:
						pt0, pt1 = roll_sides(pt0), roll_sides(pt1)
					pt0, pt1 = self.remap(pt0), self.remap(pt1)

					weight = pt1-pt0
					weight *= wmap(id1, (pt0+pt1)/2.0)

					x0 = gl.ifop(i==idx, accum, x0)
					accum = accum + weight
					# accum = accum + 33.108
					x1 = gl.ifop(i==idx, accum, x1)
					return accum, x0, x1
				return rsplit_loop

			if wmap_ps is None:
				wmap = lambda id, pt: self.wmap(id, pt, 0.5)
				accum, pt0, pt1 = gl.loop(make_loop(wmap))(n, 0.0, 0.0, 0.0)
				if self.off is None:
					pt0 = pt0 / accum
					pt1 = pt1 / accum
				else:
					pt0 = pt0
					pt1 = pt1
				pt02 = pt0
				pt12 = pt1
			else:
				wmap = lambda id, pt: self.wmap(id, pt, wmap_ps[0])
				wmap2 = lambda id, pt: self.wmap(id, pt, wmap_ps[1])
				accum, pt0, pt1 = gl.loop(make_loop(wmap))(n, 0.0, 0.0, 0.0)
				accum2, pt02, pt12 = gl.loop(make_loop(wmap2))(n, 0.0, 0.0, 0.0)

				pt0 = pt0 / accum
				pt1 = pt1 / accum
				pt02 = pt02 / accum2
				pt12 = pt12 / accum2

			id, _, _ = roll(idx, n, off, True, True)
			id_set.set(id)


		# pt0 = 0
		# pt1 = 1
		# self.id.set(me.idx)
		# pt02 = pt0
		# pt12 = pt1

		pt0, pt1, pt02, pt12 = gl.switch(
			[n > 1],
			[pt0, 0.0],
			[pt1, 1.0],
			[pt02, 0.0],
			[pt12, 1.0]
			)
		id_out = gl.ifop(n < 2, idx, id_set)
		
		return id_out, pt0, pt1, pt02, pt12

	

	def graph(self, ctx, me):

		if self.VCLONE is not None:
			CLONE = ctx.VClone()
			CLONE.idx.set(self.VCLONE[0])
			CLONE.n.set(self.VCLONE[1])
		else:
			CLONE = ctx.Clone()

		with CLONE as cl:
			if self.VCLONE is None:
				cl.SIZE = self.SIZE
			else:
				self.SIZE = None

			self.idx.set(me.idx)
			self.n.set(me.n)


			# idx = cl.idx + self.spread
			id_set, pt0, pt1, pt02, pt12 = self.get_pts(me.idx, me.n)
			self.id.set(id_set)



			self.pt0.set(pt0)
			self.pt1.set(pt1)
			self.pt0_.set(pt02)
			self.pt1_.set(pt12)
			self.pt.set((pt0+pt1)/2.0)
			# self.ptw.set((pt1-pt0)*me.SIZE)
			self.ptw.set((pt12-pt02)*cl.n)
			self.ptwn.set((pt1-pt0))
			# Experimental:
			# self.ptpos.set(gl.mix(pt0, pt1, me.pos.swizzle(self.AXIS)*0.5+0.5))

			# TRANSFORM

			# Sequential Trim
			# Sequential Trim Bend
			# Sequential Scale Axis
			# Sequential Scale All
			# Power Shift
			# Power Warp
			# Rsplit Warp
			# Item Scale (Fade-In)

			if self.TRANSFORM:

				pos = me.pos
				posax = pos.swizzle(self.AXIS)
				other_axes = ["x", "y", "z"]
				other_axes.remove(self.AXIS)
				other_axes = "".join(other_axes)
				posaxes = pos.swizzle(other_axes)
				# -> posax, other_axes

				if self.DIST == "seq":
					# Sequential
					pt0, pt1 = self.pt-self.ptwn/2.0*self.iscale, self.pt+self.ptwn/2.0*self.iscale
					posax = gl.n11(gl.mix(pt0, pt1, gl.n01(posax)))


				elif self.DIST == "pow":
					powp = self.powp
					pt = gl.mix(self.pt1, self.pt0, self.pt)
					pt0, pt1 = pow11(pt, -powp), pow11(pt, powp)
					posax = gl.n11(gl.mix(pt0, pt1, gl.n01(posax)))

				elif self.DIST == "powst":
					powp = 2.0
					pt = gl.mix(self.pt1, self.pt0, self.pt)
					posax = gl.n11(pow11(gl.n01(posax), gl.n11(pt)*powp))

				else: raise AttributeError(self.DIST)


				# Scale All
				posaxes = gl.ifop(self.scale_all, posaxes*(pt1-pt0), posaxes)

				# Fade
				if self.ifade is None:
					self.ifade = 1.0/me.n*2.0
				fd = self.fade_op(gl.mix(self.pt1, self.pt0, self.pt), self.ifade)
				fd = gl.ifop(me.n < 2, 1.0, fd)
				me.alpha *= fd
				if self.afade is not None: 
					me.alpha *= self.fade_op(gl.n01(posax), self.afade)
				if self.wfade is not None: 
					me.weight *= self.fade_op(gl.n01(posax), self.wfade)

				# Bend
				posax = gl.ifop(self.bend > 0.0,
					gl.n11(df_sinroll(gl.n01(posax), gl.float(self.bend))),
					posax)


				self.ptpos.set(gl.n01(posax))


				# Set Pos
				pos = pos.swset(self.AXIS, posax)
				pos = pos.swset(other_axes, posaxes)
				me.pos = pos


				# MORE: Fade Elements, Pow11 2 types, Element Scale Smoothness, Remap PT

