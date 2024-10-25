
def compile(code, numpoints, template='thk_template.js', output='thk.js'):
    with open(template, 'r') as f:
        html = f.read()
    html = html.replace("@SHADER", code)
    html = html.replace("@NUMPOINTS", str(numpoints))
    with open(output, 'w') as f:
        f.write(html)
if __name__ == "__main__":
    import json
    datafile = "graph.json"
    with open(datafile, 'r') as f:
        data = json.load(f)
    code = data["glsl"]
    numpoints = data["points"]
    compile(code, numpoints)