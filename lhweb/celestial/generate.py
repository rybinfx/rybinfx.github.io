from importlib import reload

import glc
from celestial import build
from celestial import noise as celnoise


import random
import math
import types


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
	t = U.off*0.4

	HUE = ns.rand(U.seed)

	def every(id, n):
		return gl.ifop(gl.mod(gl.float(id), gl.float(n)) == 0, 1.0, 0.0)
	gl.every = every

	def ifract(a, b):
		return gl.fract(gl.float(a) / gl.float(b)) * gl.float(b)
	gl.ifract = ifract
	


	############################################################
	# MAIN #####################################################
	############################################################


	def mapping(ch_idx, v_pt):
		i = types.SimpleNamespace()
		
		i.g_size = 8.0
		i.g_a_size = 9.0
		i.g_b_size = 7.0

		# Channel id normalized
		i.ch_id = gl.float(ch_idx) + 4.0
		# Centered channel id
		i.chc_id = i.ch_id - 16.0 - 4.0
		# Absolute centered channel id
		i.chca_id = gl.abs(i.ch_id)
		# Channel side id
		i.chs_id = gl.ifop(i.chc_id < 0.0, 0.0, 1.0)

		# Group id
		i.g_base = gl.switch(
			[
				i.ch_id < i.g_a_size,
				i.ch_id < i.g_a_size+i.g_b_size,
				i.ch_id < i.g_a_size+i.g_b_size+i.g_a_size,
				i.ch_id < i.g_a_size+i.g_b_size+i.g_a_size+i.g_b_size,
				i.ch_id < i.g_a_size+i.g_b_size+i.g_a_size+i.g_b_size+i.g_a_size,
			],
			[0.0,i.g_a_size,i.g_a_size+i.g_b_size,i.g_a_size+i.g_b_size+i.g_a_size,i.g_a_size+i.g_b_size+i.g_a_size+i.g_b_size],
		)
		i.g_s = gl.switch(
			[
				i.ch_id < i.g_a_size,
				i.ch_id < i.g_a_size+i.g_b_size,
				i.ch_id < i.g_a_size+i.g_b_size+i.g_a_size,
				i.ch_id < i.g_a_size+i.g_b_size+i.g_a_size+i.g_b_size,
				i.ch_id < i.g_a_size+i.g_b_size+i.g_a_size+i.g_b_size+i.g_a_size,
			],
			[i.g_a_size,i.g_b_size,i.g_a_size,i.g_b_size,i.g_a_size],
		)
		i.g_id = gl.switch(
			[
				i.ch_id < i.g_a_size,
				i.ch_id < i.g_a_size+i.g_b_size,
				i.ch_id < i.g_a_size+i.g_b_size+i.g_a_size,
				i.ch_id < i.g_a_size+i.g_b_size+i.g_a_size+i.g_b_size,
				i.ch_id < i.g_a_size+i.g_b_size+i.g_a_size+i.g_b_size+i.g_a_size,
			],
			[0.0,1.0,2.0,3.0,4.0],
		)

		i.hex = gl.mod(i.g_id, 2.0)
		i.el_id = i.ch_id-i.g_base
		i.el_pt = i.el_id / (i.g_s-1.0)

		return i


	U.reflect = 0.0
	U.diff_u = 0.0
	U.diff_v = 0.0

	class Main(Block):
		def graph(self, ctx, me):


			with ctx.Clone() as group:
				# Channels
				me.SIZE = 1

				with ctx.Clone() as channel:
					me.SIZE = 9

					with ctx.Line() as ln1:
						me.SIZE = 4
						

						with ctx.Line() as drop:
							# Drops
							drop.SIZE = 32*4

							def get_tpos(ch_idx, v_pt):
								x = 0.5+gl.float((ch_idx)/9.0)*gl.mix(0.2, 0.8, gl.n01(gl.cosn(v_pt+0.5)))
								y = v_pt
								return gl.vec4(x, y, 0.0, 0.0)

							def get_sinmap(ch_idx, v_pt):
								return v_pt

							
							def sample_pos(ch_idx, v_pt):
								ch_idx = gl.float(ch_idx)
								i = types.SimpleNamespace()
								tu = (ch_idx+0.5)/37.0
								eps = 1.0/1024.0
								# tpos = gl.texf(tu, v_pt, 2)
								# tpos_ = gl.texf(tu, v_pt+eps, 2)
								tpos = get_tpos(ch_idx, v_pt)
								tpos_ = get_tpos(ch_idx, v_pt+eps)
								uvpos = gl.vec2(tpos.x, 1.0-tpos.y)
								uvpos_ = gl.vec2(tpos_.x, 1.0-tpos_.y)
								uvpos = gl.vec2(tpos.x, tpos.y)
								uvpos_ = gl.vec2(tpos_.x, tpos_.y)
								acpos = gl.vec3(gl.n11(uvpos.x), gl.n11(uvpos.y)*10.7, 0.0)
								acpos_ = gl.vec3(gl.n11(uvpos_.x), gl.n11(uvpos_.y)*10.7, 0.0)
								acpos = gl.vec3(gl.n11(uvpos.x), gl.n11(uvpos.y), 0.0)
								acpos_ = gl.vec3(gl.n11(uvpos_.x), gl.n11(uvpos_.y), 0.0)
								dir = gl.normalize(acpos_-acpos)
								tan = gl.vec3(dir.y, -dir.x, dir.z)

								i.uvpos = uvpos
								i.pos = acpos
								i.dir = dir
								i.tan = tan

								return i

							def sample_sinmap(ch_idx, v_pt):
								ch_idx = gl.float(ch_idx)
								i = types.SimpleNamespace()
								# sinmap = gl.texf((ch_idx+0.5)/37.0, v_pt, 2).z
								sinmap = get_sinmap(ch_idx, v_pt)
								i.ptall = sinmap
								sinmap *= 7.0
								i.idx = gl.floor(sinmap)
								sinmap = gl.fract(sinmap)
								i.pt = sinmap
								return i

							def get_chidx(group_idx, channel_idx, sinmap=False):
								group_idx = gl.float(group_idx)
								channel_idx = gl.float(channel_idx)
								if sinmap:
									return gl.float(group_idx*gl.float(channel.SIZE)-4.0+channel_idx)
								else:
									return gl.float(group_idx*gl.float(channel.SIZE)-group_idx-4+channel_idx)

							def get_pinfo(group_idx, channel_idx, vpt):
								sinmap = sample_sinmap(get_chidx(group_idx, channel_idx, True), vpt)
								pinfo = sample_pos(get_chidx(group_idx, channel_idx), vpt)
								return pinfo


							

							chidx_=get_chidx(group.idx, channel.idx)
							bounds = gl.ifop(gl.or_(chidx_ < 0, chidx_ > 32), 0.0, 1.0)
							bounds = gl.min(bounds, gl.ifop(gl.abs(gl.float(channel.idx)-4)==4, gl.mod(gl.float(group.idx+1), 2.0), 1.0))





							# Fields
							VS = 1.0
							US = 5.0
							dpt = drop.pt
							dptf = dpt*VS
							clvid = gl.floor(dptf)
							clvpt = gl.fract(dptf)


							# clvmorph = clvpt*1.5+clvpt*(chidx_/32.0)*0.75
							# clvmorph = gl.pow(clvmorph, 1.5)
							# clvmorph = gl.clamp(clvmorph, 0.0, 1.0)
							# clvpt = gl.mix(clvpt, clvmorph, gl.float(clvid==6.0))


							ch_parab = gl.parabola(channel.ido, 1.0)

							ch_parab__ = gl.parabola(chidx_/32.0, 1.0)*6.0
							ch_parab = gl.ifop(U.reflect > 0.5, ch_parab__, ch_parab)

							ln1pt = gl.n11(ln1.pt)*gl.n11(channel.ido)
							special = gl.every(drop.id, 32)
							# special = gl.fract(drop.id/32.0)
							toff = clvid*0.0


							nval1 = U.val1
							nval2 = U.val2

							# Noise parameters
							nseed = U.seed*100.0
							nseed += (clvid-gl.mod(gl.float(group.idx), 2.0)*.5)*U.diff_v
							nseed += gl.abs(gl.n11(group.ido))*U.diff_u


							# nseed += t*0.1



							# nseed += group.ido*0.2-t*0.1
							# nseed += gl.mod(group.idx, 2.0)*20.0
		
							# nseed += ln1.pt*0.1*gl.n11(channel.ido)


							################################################
							# Position remapping
							pt = clvpt
							pt = gl.pow(pt, gl.pow(2.0, ns.simplex(ch_parab-nval1+toff, nseed)*1.0))
							pt = gl.gain(pt, gl.pow(2.0, ns.simplex(ch_parab-nval1+toff, nseed)*1.0))
							pt += ns.simplex(clvpt*8.0-nval1+toff, ch_parab*2.0+clvpt, nseed, octaves=2)*0.08*gl.parabola(clvpt, 1.0)
							pt += ns.simplex(clvpt*8.0-nval1+toff, ln1pt*1.0+10.0, nseed)*0.02*gl.parabola(clvpt, 2.0)


							# start_mask = gl.ifop(clvid==0.0, pt, 1.0)
							# clvmorph = pt*2.0+pt*(chidx_/32.0)*0.0
							# clvmorph = gl.pow(clvmorph, 2.0)
							# clvmorph = gl.clamp(clvmorph, 0.0, 1.0)
							# pt = gl.mix(pt, clvmorph, gl.float(clvid==6.0))
							# clvmorph2 = gl.pow(pt, 0.5)
							# clvmorph2 = gl.mix(-6.0, 1.0, clvmorph2)
							# # clvmorph2 = gl.clamp(clvmorph2, 0.0, 1.0)
							# pt = gl.mix(pt, clvmorph2, gl.float(clvid==0.0))
							pt___ = pt
							# pt___ = drop.pt


							pt_out = (clvid + pt) / VS
							pt_out = (clvid + pt) / VS
							################################################









							# Position
							pinfo = get_pinfo(group.idx, channel.idx, pt_out)
							me.translate(pinfo.pos)

							open = 0.02*3
							open *= ns.simplex(clvpt*5.0-nval2*4.0+toff, ch_parab-clvpt, 5.00+nseed, norm=True, gain=4.0)
							open *= gl.clamp(gl.parabola(pt___, 1.0), 0.0, 1.0)*0.75+0.25
							# open *= gl.pow(start_mask, 1.0)
							me.translate(pinfo.tan*open*gl.n11(ln1.pt))

							# me.translate((pinfo.tan)*0.01*gl.n11(channel.ido)*gl.n11(gl.sinn(pt_out*8+t*4))*gl.parabola(clvpt, 1.0))

							# Movement
							drop.off = t*0.05*2
							# ln1.off = -t*4




							# Color

							
							me.val = 1.0
							
							me.val *= gl.parabola(clvpt, 0.5)
							me.val *= ns.simplex(clvpt*5.0-nval2*4.0+toff, ch_parab-clvpt, nseed, norm=True, gain=4.0)
							me.val *= gl.pow(ns.simplex(clvpt*2.0-t*4.0+toff, ln1pt*3.0, nseed, norm=True, gain=2.0), 0.5)
							me.val = gl.pow(me.val, 0.5+(1.0-dpt)*1.5)

							me.sat = 0.0
							me.sat += ns.simplex(clvpt*5.0-nval2*4.0+toff, ch_parab-clvpt, nseed+10.0, norm=True, gain=1.0)
							me.sat = gl.pow(me.sat, 1.0)
							me.sat = gl.pow(me.sat, 1.0-special*0.2)
							
							me.hue += U.seed+nval2*0.2
							me.hue += ns.simplex(nseed-nval2+toff)*0.2+nval2*0.01
							me.hue += ns.simplex(clvpt*2.0-nval2*2.0+toff, ch_parab-clvpt, nseed+30.0, norm=True, gain=2.0)*0.33
							me.hue += ns.simplex(clvpt*2.0-nval2*4.0+toff, ln1pt*2.0, nseed, norm=True, gain=2.0)*0.2
							me.hue += 0.5*special*ns.simplex(clvpt*5.0-nval2*4.0+toff, 20+ch_parab-clvpt, 5.00+nseed, norm=True)

							me.weight *= 1.0
							me.weight += ns.simplex(clvpt*5.0-nval2*4.0+toff, ch_parab-clvpt, nseed+20.0, norm=True, gain=1.0)*14.0
							me.weight += special*8.0
							# me.weight *= gl.pow(start_mask, 1.0)
							me.weight *= gl.clamp(gl.parabola(pt___, 1.0), 0.0, 1.0)*0.75+0.25

							me.val *= gl.clamp(gl.parabola(pt___, 0.25), 0.0, 1.0)
							# me.val *= gl.pow(start_mask, 1.0)

							# me.weight *= gl.mix(U.weight_low, U.weight_high, gl.pow(dpt, 3.0))



							me.weight *= gl.mix(1.0, gl.pow(gl.clamp(-pt___+1.0, 0.0, 1.0), 0.6), gl.float(clvid==6.0))

							# me.val *= gl.ifop(gl.or_(clvid==0.0, clvid==6.0), 0.0, 1.0)
							# me.weight = gl.clamp(me.weight, 0.0, U.weight_high*8)


							# me.val *= bounds

							me.weight *= 0.5








							




	############################################################
	# END MAIN #################################################
	############################################################

	compiled = ctx.compile(Main, U.code)
	# compiled = ctx.compile(Main)

	return compiled