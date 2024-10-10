from importlib import reload

import glc
from celestial import build
from celestial import noise as celnoise

import random
import math

def generate(uniforms, kwargs):

	reload(glc)
	reload(build)
	reload(celnoise)
	gl = glc
	ns = celnoise
	Block = build.Block
	Context = build.Context

	RF = lambda a=1, b=None: random.random()*a if b is None else a+random.random()*(b-a)
	RI = random.randint
	RS = lambda: math.floor(RF()*2)*2-1
	RB = lambda x=0.5: RF() < x
	RC = lambda *x: random.choice(x)


	def generate_uniforms(*args):
		class U_:
			def __getattr__(self, name):
				print(f"No unform bound for: {name}")
				setattr(self, name, gl.const("0.0", "float"))
				return getattr(self, name)

		U = U_()
		code = ""
		for a in args:
			setattr(U, a, gl.const("u_"+a, "float"))
			code += "uniform float u_"+a+";\n"
		U.code = code
		return U

	U = generate_uniforms(*uniforms)


	ctx = Context()
	t = U.off*0.1


	class UStream(Block):
		def param(self):
			# Params
			self.SIZE = 1
			# Inputs
			self.vs = None
			# Outputs
			self.off = gl.pointer()
			self.id = gl.pointer()
			self.pt = gl.pointer()
			self.ptfull = gl.pointer()
			self.ptpos = gl.pointer()
			self.eltp = gl.pointer(0)
		
		def graph(self, ctx, me):

			with ctx.Stream() as us:
				us.SIZE = self.SIZE
				us.DIST = "pow"
				us.powp = 3.0

				us.scale(x=gl.parabola(me.pt, 2))
				# me.off = t*(0.3+ns.rand(U.seed)*0.7)
				me.off = t*8
				# me.iscale = 1.0+ns.rand(U.seed)
				# # me.hue += comb.idx*0.21
				# me.alpha *= 0.2
				# me.sat = 0.8

			self.id.set(us.id)
			self.pt.set(us.pt)
			self.ptpos.set(us.ptpos)
			self.off.set(us.off)


	class UElement(Block):
		def param(self):
			# Params
			# Inputs
			self.uspt = 0.5
			self.usid = 0.5
			self.vsid = 0.5
			self.vssid = 0
			self.vsscale = 0
			self.vs = None
			self.us = None

			# Outputs
			pass
		1
		def graph(self, ctx, me):
			# with ctx.Rotate() as rot:

			with ctx.Mirror() as mirr:
				# mirr.PASS=True
				with Line(ctx) as nl:
					# nl.rotate(y=t)
					nl.vs = self.vs
					nl.us = self.us
					nl.odd = gl.mod(self.us.id, 2.0)
					pass


	
	class Line(Block):
		def param(self):
			self.vs = None
			self.us = None
			self.leafpt = 0.0
			self.nscale = 1.0
			self.sizey = 16
			self.SIZE = 64*2    *self.sizey
			self.odd = 0.0
			self.xopenscale = 1
			self.exp = 1
			pass
		
		def graph(self, ctx, me):
			with ctx.Line() as ln2:
				me.SIZE = 32*2
				# me.rotate(y=gl.pow(tex1.r, 2.0))
				me.off = t*ns.rand(U.seed)
				# me.off = t
				with ctx.Line() as ln:
					me.off = -U.offset
					# me.off += t*0.1
					me.SIZE = 64*2*2*2*2

					ln2pt = gl.pow(ln2.pt, gl.mix(0.5, 4.0, gl.pow(ns.rand(U.seed), 1.0)))

					tex1 = gl.texf(ln.pt*0.9+0.05).xyz
					tex2 = gl.texf(ln.pt*0.9+0.05,1).xyz
					# tex1 = tex1*gl.vec3(0.0, 0.0, 0.0)
					# tex2 = tex2*gl.vec3(0.0, 0.0, 0.0)

					me.pos += gl.vec3(gl.n11(ln2.pt)*0.0*ns.rand(U.seed), gl.n11(ln.pt), 0.0)*(1-ln2pt)
					me.pos += tex1
					me.pos += gl.vec3(tex1.z, 0.0, 0.0)*ns.rand(U.seed)
					me.pos += gl.vec3(gl.n11(ln2.pt)*0.0*ns.rand(U.seed), gl.n11(ln.pt), 0.0)*(1-ln2pt)


					me.rotate(z=gl.pow(tex1.r, 2.0)*gl.pow(ns.rand(U.seed), 8.0))
					me.rotate(y=gl.pow(tex1.r, 2.0)*gl.pow(ns.rand(U.seed), 8.0))
					me.rotate(z=gl.pow(tex1.r, 2.0)*gl.pow(ns.rand(U.seed), 8.0))
					
					me.scale(y=0.7+1.0*ns.rand(U.seed)*gl.pow(ln2.pt, 1.0))
					me.pos += tex1
					ln.fade = 0.0
					ln.weight = 2.0
					ln.alpha = 1.0
					ln.val = 1.0
					ln.sat = 1.0-gl.pow(ln2.pt, 4.0+ns.rand(U.seed)*4)
					ln.sat = 1.0
					# ln.alpha *= (ln2pt)
					path = tex2.x
					ln.hue = U.var
					# ln.hue += ns.simplex(x=tex1.x, y=tex2.x)*0.2
					# ln.hue += ns.perlin(x=tex1.x, y=tex2.x)*0.3
					ln.hue -= (ln.pt)*0.3333

					ln.val *= gl.pow(1.0-path, 1.0)
					ln.val = gl.ifop(U.invert>0.5, ln.val*ln2pt, ln.val)
					ln.alpha *= gl.pow(1.0-path,2.0)
					# ln.sat *= gl.parabola(gl.pow((1.0-path),2.0), 2.0)
					ln.sat *= gl.pcurve(ln2pt, 3.0*ns.rand(U.seed+10.0), 3.0*ns.rand(U.seed))
					# ln.val *= gl.pcurve(ln2pt, 1.0*ns.rand(U.seed+20.0), 0.0*ns.rand(U.seed+30))
					# ln.val = gl.pow(ln2.pt, 0.5)
					# me.weight *= 10*gl.mod()
					def every(id, n):
						return gl.ifop(gl.mod(id, n) == 0, 1.0, 0.0)
			

					scale_mask = gl.parabola(ln2pt, 2.0)
					# me.scale(scale_mask)



					# me.sat = gl.mix(me.sat, 1-me.sat, U.invert)
					# me.val = gl.mix(me.val, 1-me.val, U.invert)
					# me.weight *= gl.fract(ln2.pt*8)*2
					# me.val = U.invert

					me.weight *= 1+16*every(ln2.id, gl.mix(8*4, 8*16, ns.rand(U.seed+21)))*path
					me.hue += 1/3

					# me.pos *= gl.vec3(1.0-ln2pt, 1.0, 1.0)
					# me.pos = gl.mix(me.pos, gl.vec3(0.0, gl.n11(ln.pt), 0.0), gl.parabola(ln.pt, 2))



	class Main(Block):
		def graph(self, ctx, me):

			me.scale(x=0.6)
			with UStream(ctx) as us:
				with UElement(ctx) as ue:
					ue.us = us
				upt = us.pt
					

	compiled = ctx.compile(Main, U.code)
	# compiled = ctx.compile(Main)

	return compiled