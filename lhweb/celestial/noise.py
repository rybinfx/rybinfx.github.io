from importlib import reload

import glc
reload(glc)
gl = glc

import random








def rand1(x):
	return gl.func("ns_rand1", "float", ["float"], x)

def rand2(x, y):
	return gl.func("ns_rand2", "float", ["vec2"], gl.vec2(x, y))

def rand(x, y=None, seed=None):
	if seed is None:
		seed = 0
	return rand1(x + seed)
	if seed:
		state = random.getstate()
		random.seed(seed)
	rseed = random.random()*1024
	if seed:
		random.setstate(state)
	if y is None:
		return rand1(x + rseed)




def value1(x):
	# x = x*2.0
	x = gl.floor(x) + gl.smoothstep(0.0, 1.0, gl.fract(x))
	return gl.func("ns_value1", "float", ["float"], x)

def value2(x, y):
	# x, y = x*2.0, y*2.0
	x = gl.floor(x) + gl.smoothstep(0.0, 1.0, gl.fract(x))
	y = gl.floor(y) + gl.smoothstep(0.0, 1.0, gl.fract(y))
	return gl.func("ns_value2", "float", ["vec2"], gl.vec2(x, y))

def value3(x, y, z):
	# x, y, z = x*2.0, y*2.0, z*2.0
	x = gl.floor(x) + gl.smoothstep(0.0, 1.0, gl.fract(x))
	y = gl.floor(y) + gl.smoothstep(0.0, 1.0, gl.fract(y))
	z = gl.floor(z) + gl.smoothstep(0.0, 1.0, gl.fract(z))
	return gl.func("ns_value3", "float", ["vec3"], gl.vec3(x, y, z))

def perlin2(x, y):
	return gl.gain(gl.func("ns_perlin2", "float", ['vec2'], gl.vec2(x,y))*0.5+0.5, 2)*2.0-1.0

def perlin3(x, y, z):
	return gl.gain(gl.func("ns_perlin3", 'float', ['vec3'], gl.vec3(x, y, z))*0.5+0.5, 2)*2.0-1.0

def simplex2(x, y):
	return gl.func("ns_simplex2", 'float', ['vec2'], gl.vec2(x, y)/1.5)

def simplex3(x, y, z):
	return gl.func("ns_simplex3", 'float', ['vec2'], gl.vec3(x, y, z)/1.5)

# def rdapp4(x, y, z, t, amp=1.0, freq=1.0, astep=0.5, fstep=0.5, seed=123):
# 	return gl.func("ns_rdapp", gl.vec3(x, y, z), t, amp, freq, astep, fstep, seed, tp="f3")




def make_noise(f1=None, f2=None, f3=None):

	def noise_function(x=None, y=None, z=None, ch=1, choff=100.0/3.0, norm=False, octaves=1, fstep=2.0, astep=0.5, warp=1, wamp=0.1, wrand=0.0, gain=None):
	
		def noise_fn(x=None, y=None, z=None, ch=1, norm=False):
			channels = []

			freq = 1.0
			amp = 1.0
			ampcum = 0.0

			if x is None: x = 0.0
			if z is not None:
				if y is None: y = 0.0

			for o in range(octaves):

				def process_val(val):
					if gain is not None:
						val = gl.gain(val*0.5+0.5, gain)*2.0-1.0
					val *= amp
					if o == 0:	channels.append(val)
					else: channels[i] = channels[i] + val

				
				if z is None:
					if y is None:
						for i in range(ch):
							val = f1((x)*freq+choff*i)
							process_val(val)
					else:
						for i in range(ch):
							val = f2(x*freq, (y)*freq+choff*i)
							process_val(val)
				else:
					for i in range(ch):
						val = f3(x*freq, y*freq, (z)*freq+choff*i)
						process_val(val)

				ampcum += amp
				freq *= fstep
				amp *= astep

			for i in range(ch):
				channels[i] = channels[i] / ampcum
				if norm:
					channels[i] = channels[i]*0.5+0.5
			if ch == 1:
				return channels[0]
			if ch == 2:
				return gl.vec2(*channels)
			if ch == 3:
				return gl.vec3(*channels)
			if ch == 4:
				return gl.vec4(*channels)
			return channels
		
		p_size = sum([1 for _ in [x,y,z] if _ is not None])
		
		if p_size == 1:	p = gl.float(x)
		if p_size == 2: p = gl.vec2(x, y)
		if p_size == 3: p = gl.vec3(x, y, z)
		def roff():
			if p_size == 1:	return gl.float(random.random())*2.0-1.0
			if p_size == 2: return gl.vec2(random.random(), random.random())*2.0-1.0
			if p_size == 3: return gl.vec3(random.random(), random.random(), random.random())*2.0-1.0

		def unpack(p):
			if p_size == 1:	return (p,)
			if p_size == 2: return p.x, p.y
			if p_size == 3: return p.x, p.y, p.z

		for i in range(warp-1):
			p_ = p+roff()*wrand
			# p_ = p
			p += noise_fn(*unpack(p_), ch=p_size) * wamp

		return noise_fn(*unpack(p), ch=ch, norm=norm)
	
	return noise_function






value = make_noise(
	lambda x: value1(x),
	lambda x, y: value2(x, y),
	lambda x, y, z: value3(x, y, z)
)
perlin = make_noise(
	lambda x: perlin2(x, 0.0),
	lambda x, y: perlin2(x, y),
	lambda x, y, z: perlin3(x, y, z)
)
simplex = make_noise(
	lambda x: simplex2(x, 0.0),
	lambda x, y: simplex2(x, y),
	lambda x, y, z: simplex3(x, y, z)
)