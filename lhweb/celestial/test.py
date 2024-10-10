import sys
import os
sys.path.append(os.getcwd())
from glc.gl import gl, Context


a = gl.float(2.0)
b = a + a
c = a * a

lx, ly, lz = gl.ForLoop(lambda i, x, y, z: (x + a, y + b, i+c), 16, 0.0, 1.0, 2.0)

# print(gl.ForLoop)

vars = [lx, ly, lz]

defs, vals = Context().compile(vars)

print()
print("Defs:")
print(defs)
print()
print("Vals:")
for val in vals:
	print(val)
print()
