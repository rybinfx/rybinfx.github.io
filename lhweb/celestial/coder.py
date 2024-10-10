import os

def replace(code, vals):
	for key in vals:
		code = code.replace(key, vals[key])
	return code

def shift(code, n=1):
	return "\n".join(["\t"*n + c for c in code.split("\n")])

def add(*codes):
	return "\n".join(list(codes))

def load(file):
	return open(file, "r").read()

def save(code, file):
	path = os.path.split(file)[0]
	os.makedirs(path, exist_ok=True)
	with open(file, "w") as f:
		f.write(code)