from celestial.generate import generate

result = generate(uniforms=['off', 'seed', 'val1', 'val2', 'resx', 'resy'], kwargs=[])

primitives = result['primitives']
npoints = result['points']
code = result['glsl']


import os
with open('lighthouse_template.js', 'r') as f:
    html = f.read()

html = html.replace("@SHADER", code)
html = html.replace("@NUMPOINTS", str(npoints))


with open('lighthouse_generate.js', 'w') as f:
    f.write(html)


