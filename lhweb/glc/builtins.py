from .handles import *


def bool(x): return func('bool', 'bool', ['genType'], x)
def int(x): return func('int', 'int', ['genType'], x)
def float(x): return func('float', 'float', ['genType'], x)
def vec2(x, y): return func('vec2', 'vec2', ['float', 'float'], x, y)
def vec3(x, y, z): return func('vec3', 'vec3', ['float', 'float', 'float'], x, y, z)
def vec4(x, y, z, w): return func('vec4', 'vec4', ['float', 'float', 'float', 'float'], x, y, z, w)




# https://mew.cx/glsl_quickref.pdf

"""
Angle and Trigonometry Functions (8.1 p51)

genType sin( genType )
genType cos( genType )
genType tan( genType )
genType asin( genType )
genType acos( genType )
genType atan( genType, genType )
genType atan( genType )
genType radians( genType )
genType degrees( genType )
"""

def sin(x): return func('sin', 'genType', ['genType'], x)
def cos(x): return func('cos', 'genType', ['genType'], x)
def tan(x): return func('tan', 'genType', ['genType'], x)
def asin(x): return func('asin', 'genType', ['genType'], x)
def acos(x): return func('acos', 'genType', ['genType'], x)
def atan(x, y=None):
	if y is None: return func('atan', 'genType', ['genType'], x)
	else: return func('atan', 'genType', ['genType', 'genType'], x, y)
def radians(x): return func('radians', 'genType', ['genType'], x)
def degrees(x): return func('degrees', 'genType', ['genType'], x)

"""
Exponential Functions (8.2 p52)
genType pow( genType, genType )
genType exp( genType )
genType log( genType )
genType exp2( genType )
genType log2( genType )
genType sqrt( genType )
genType inversesqrt( genType )
"""

def pow(x, y): return func('pow', 'genType', ['genType', 'genType'], x, y)
def exp(x): return func('exp', 'genType', ['genType'], x)
def log(x): return func('log', 'genType', ['genType'], x)
def exp2(x): return func('exp2', 'genType', ['genType'], x)
def log2(x): return func('log2', 'genType', ['genType'], x)
def sqrt(x): return func('sqrt', 'genType', ['genType'], x)
def inversesqrt(x): return func('inversesqrt', 'genType', ['genType'], x)

"""
Common Functions (8.3 p52)
genType abs( genType )
genType ceil( genType )
genType clamp( genType, genType, genType )
genType clamp( genType, float, float )
genType floor( genType )
genType fract( genType )
genType max( genType, genType )
genType max( genType, float )
genType min( genType, genType )
genType min( genType, float )
genType mix( genType, genType, genType )
genType mix( genType, genType, float )
genType mod( genType, genType )
genType mod( genType, float )
genType sign( genType )
genType smoothstep( genType, genType, genType )
genType smoothstep( float, float, genType )
genType step( genType, genType )
genType step( float, genType ) 
"""

def abs(x): return func('abs', 'genType', ['genType'], x)
def ceil(x): return func('ceil', 'genType', ['genType'], x)
def clamp(x, min, max): return func('clamp', 'genType', ['genType', 'genType', 'genType'], x, min, max)
def floor(x): return func('floor', 'genType', ['genType'], x)
def fract(x): return func('fract', 'genType', ['genType'], x)
def max(x, y): return func('max', 'genType', ['genType', 'genType'], x, y)
def min(x, y): return func('min', 'genType', ['genType', 'genType'], x, y)
def mix(x, y, a): return func('mix', 'genType', ['genType', 'genType', 'genType'], x, y, a)
def mod(x, y): return func('mod', 'genType', ['genType', 'genType'], x, y)
def sign(x): return func('sign', 'genType', ['genType'], x)
def smoothstep(x, y, a): return func('smoothstep', 'genType', ['genType', 'genType', 'genType'], x, y, a)
def step(x, y): return func('step', 'genType', ['genType', 'genType'], x, y)

"""
Geometric Functions (8.4 p54)
vec4 ftransform() Vertex ONLY
vec3 cross( vec3, vec3 )
float distance( genType, genType )
float dot( genType, genType )
genType faceforward( genType V, genType I, genType N )
float length( genType )
genType normalize( genType )
genType reflect( genType I, genType N )
genType refract( genType I, genType N, float eta )
"""

def ftransform(): return func('ftransform', 'vec4', [])
def cross(x, y): return func('cross', 'vec3', ['vec3', 'vec3'], x, y)
def distance(x, y): return func('distance', 'float', ['genType', 'genType'], x, y)
def dot(x, y): return func('dot', 'float', ['genType', 'genType'], x, y)
def faceforward(x, y, z): return func('faceforward', 'genType', ['genType', 'genType', 'genType'], x, y, z)
def length(x): return func('length', 'float', ['genType'], x)
def normalize(x): return func('normalize', 'genType', ['genType'], x)
def reflect(x, y): return func('reflect', 'genType', ['genType', 'genType'], x, y)
def refract(x, y, z): return func('refract', 'genType', ['genType', 'genType', 'float'], x, y, z)

"""
Fragment Processing Functions (8.8 p58) Fragment ONLY
genType dFdx( genType )
genType dFdy( genType )
genType fwidth( genType )
"""

def dFdx(x): return func('dFdx', 'genType', ['genType'], x)
def dFdy(x): return func('dFdy', 'genType', ['genType'], x)
def fwidth(x): return func('fwidth', 'genType', ['genType'], x)

"""
Matrix Functions (8.5 p55)
mat matrixCompMult( mat, mat ) 
"""

def matrixCompMult(x, y): return func('matrixCompMult', 'mat', ['mat', 'mat'], x, y)

"""
Vector Relational Functions (8.6 p55)
bool all( bvec )
bool any( bvec )
bvec equal( vec, vec )
bvec equal( ivec, ivec )
bvec equal( bvec, bvec )
bvec greaterThan( vec, vec )
bvec greaterThan( ivec, ivec )
bvec greaterThanEqual( vec, vec )
bvec greaterThanEqual( ivec, ivec )
bvec lessThan( vec, vec )
bvec lessThan( ivec, ivec )
bvec lessThanEqual( vec, vec )
bvec lessThanEqual( ivec, ivec )
bvec not( bvec )
bvec notEqual( vec, vec )
bvec notEqual( ivec, ivec )
bvec notEqual( bvec, bvec )
"""

# TODO: Implement

"""
Texture Lookup Functions (8.7 p56)
Optional bias term is Fragment ONLY
vec4 texture1D( sampler1D, float [,float bias] )
vec4 texture1DProj( sampler1D, vec2 [,float bias] )
vec4 texture1DProj( sampler1D, vec4 [,float bias] )
vec4 texture2D( sampler2D, vec2 [,float bias] )
vec4 texture2DProj( sampler2D, vec3 [,float bias] )
vec4 texture2DProj( sampler2D, vec4 [,float bias] )
vec4 texture3D( sampler3D, vec3 [,float bias] )
vec4 texture3DProj( sampler3D, vec4 [,float bias] )
vec4 textureCube( samplerCube, vec3 [,float bias] )
vec4 shadow1D( sampler1DShadow, vec3 [,float bias] )
vec4 shadow2D( sampler2DShadow, vec3 [,float bias] )
vec4 shadow1DProj( sampler1DShadow, vec4 [,float bias] )
vec4 shadow2DProj( sampler2DShadow, vec4 [,float bias] ) 
"""

# TODO: Implement more texture functions

def texture1D(sampler, x): return func('texture1D', 'vec4', ['sampler1D', 'float'], sampler, x)
def texture2D(sampler, x): return func('texture2D', 'vec4', ['sampler2D', 'vec2'], sampler, x)
def texture3D(sampler, x): return func('texture3D', 'vec4', ['sampler3D', 'vec3'], sampler, x)

"""
Texture Lookup Functions with LOD (8.7 p56)
Vertex ONLY; ensure GL_MAX_VERTEX_TEXTURE_IMAGE_UNITS > 0
vec4 texture1DLod( sampler1D, float, float lod )
vec4 texture1DProjLod( sampler1D, vec2, float lod )
vec4 texture1DProjLod( sampler1D, vec4, float lod )
vec4 texture2DLod( sampler2D, vec2, float lod )
vec4 texture2DProjLod( sampler2D, vec3, float lod )
vec4 texture2DProjLod( sampler2D, vec4, float lod )
vec4 texture3DProjLod( sampler3D, vec4, float lod )
vec4 textureCubeLod( samplerCube, vec3, float lod )
vec4 shadow1DLod( sampler1DShadow, vec3, float lod )
vec4 shadow2DLod( sampler2DShadow, vec3, float lod )
vec4 shadow1DProjLod( sampler1DShadow, vec4, float lod )
vec4 shadow2DProjLod( sampler2DShadow, vec4, float lod )
"""

# TODO: Implement

"""
Noise Functions (8.9 p60)
float noise1( genType )
vec2 noise2( genType )
vec3 noise3( genType )
vec4 noise4( genType ) 
"""

def noise1(x): return func('noise1', 'float', ['genType'], x)
def noise2(x): return func('noise2', 'vec2', ['genType'], x)
def noise3(x): return func('noise3', 'vec3', ['genType'], x)
def noise4(x): return func('noise4', 'vec4', ['genType'], x)