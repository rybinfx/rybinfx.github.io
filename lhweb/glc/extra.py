from .handles import func, const, convert
from .builtins import sin, cos, vec2


PI = convert(3.1415926535897932384626433832795)

sinn = 			lambda x: sin(x*PI*2)
cosn = 			lambda x: cos(x*PI*2)
n01 = 			lambda x: func("n01", "float", ["float"], x)
n11 = 			lambda x: func("n11", "float", ["float"], x)
parabola = 		lambda a, b: func("parabola", "float", ["float", "float"], a, b)
pcurve = 		lambda a, b, c: func("pcurve", "float", ["float", "float", "float"], a, b, c)
gain = 			lambda x, y: func("gain", "float", ["float", "float"], x, y)
rand = 			lambda x: func("rand", "float", ["float"], x)
rnoise = 		lambda x: func("rnoise", "float", ["float"], x)
vnoise = 		lambda x: func("vnoise", "float", ["float"], x)
cnoise = 		lambda *xyz: func("cnoise", "float", ["float", "float", "float"], *xyz)
sinnoise = 		lambda *xyz: func("sinnoise", "float", ["float", "float", "float"], *xyz)
rot2 = 			lambda pos, a: func("rot2", "vec2", ["vec2", "float"], pos, a)

def sinn_it(x, amp=0.5, off=0.5):
	return off*x - (amp*cos((x-0.25)*PI*2))/(PI*2)

time = const("time", "float")

def texf(ptx, pty, tex=0):
	# print("nrw")
	sampler = const(f"sTD2DInputs[{tex}]", "sampler2D")
	return func("texture", "vec4", ["sampler2D", "vec2"], sampler, vec2(ptx, pty))