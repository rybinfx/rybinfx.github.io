import numpy as np
import time


# class TIMER:
# 	def start(self):
# 		self.ts = time.time()
# 	def end(self):
# 		print(f"Time: {time.time() - self.ts}")
# tm = TIMER()

def compile(template, defs, draw):
    code = template.replace("// DEF", defs).replace("// DRAW", draw)
    with open("celestial/generated/generated.glsl", "w") as f:
        f.write(code)
    return code


class Seg:
	def __init__(self, size=1, connected=False, closed=False, name="null"):
		self.parent = None
		self.child = None
		self.size = size
		self.connected = connected
		self.closed = closed
		self.name = name
		self.npoints = None

	def __call__(self, seg):
		seg.parent = self
		self.child = seg
		return self

	def connect(self):
		primitives, child_npoints = self.child.connect() if self.child else ([], 1)
		for i in range(len(primitives)):
			points = primitives[i][0]
			points = points[None, ...] + (np.arange(self.size)*child_npoints).reshape(-1,1,1)
			points = points.reshape(-1, points.shape[-1])
			points = primitives[i][0] = points
		if self.connected:
			points = np.arange(self.size) * child_npoints
			points = points[None, ...] + np.arange(child_npoints).reshape(-1, 1)
			primitive = [points, 1 if self.closed else 0]
			primitives.append(primitive)
		self.npoints = child_npoints*self.size
		return primitives, self.npoints

	def code(self):
		template = "Seg [NAME] = seg_even(float([POINT]), float([NPOINTS]), float([SIZE]));\n"
		point = f"{self.parent.name}.point" if self.parent else "point"
		npoints = f"{self.parent.name}.npoints" if self.parent else "npoints"
		size = str(int(self.size))
		code = template.replace("[NAME]", self.name).replace("[POINT]", point).replace("[NPOINTS]", npoints).replace("[SIZE]", size)
		return code

	def compile(self):
		child_code = self.child.compile() if self.child else ""
		return  self.code() + child_code

	def build(self):
		return *self.connect(), self.compile()

class Group:
	def __init__(self, name="null"):
		self.parent = None
		self.children = []
		self.name = name
		self.npoints = None

	def __call__(self, segs):
		for s in segs: s.parent = self
		self.children = segs
		return self
		
	def connect(self):
		primitives, npoints = [], 0
		for ch in self.children:
			child_primitives, child_npoints = ch.connect()
			for p in child_primitives: p[0] += npoints
			primitives += child_primitives
			npoints += child_npoints
		self.npoints = npoints
		return primitives, npoints

	def code(self):
		template = """
Seg [NAME];
{
  int point = [POINT];
  [NAME].size = [SIZE];
  int npoints[] = int[] ([NPOINTS]);
  int sum = 0;
  for (int i = 0; i < [SIZE]; i++) {
    sum += npoints[i];
    if (point < sum) {
      [NAME].idx = float(i);
      [NAME].npoints = float(npoints[i]);
      [NAME].point = float(point-sum+[NAME].npoints);
	  break;
    }
  }
}
"""
		point = f"{self.parent.name}.point" if self.parent else "point"
		size = str(len(self.children))
		npoints = ", ".join([str(float(ch.npoints)) for ch in self.children])
		code = template.replace("[NAME]", self.name).replace("[POINT]", point).replace("[NPOINTS]", npoints).replace("[SIZE]", size)
		return code

	def compile(self):
		child_codes = [ch.compile() for ch in self.children]
		return  self.code() + "".join(child_codes)

	def build(self):
		return *self.connect(), self.compile()

class Merge:
	def __init__(self, name='merge'):
		self.parent = None
		self.children = []
		self.name = name
		self.npoints = None
		self.size = 0
	
	def __call__(self, segs):
		for s in segs: s.parent = self
		self.children = segs
		return self

	def connect(self):
		primitives, npoints = [], 0
		size = 0
		for ch in self.children:
			child_primitives, child_npoints = ch.connect()
			npoints = max(npoints, child_npoints)
			size = max(size, ch.size)
		self.npoints = npoints
		self.size = size
		return primitives, npoints

	def code(self):

		template = "Seg [NAME];\n[NAME].point = [POINT];\n[NAME].npoints = [NPOINTS];\n[NAME].size = 1.0;\n"
		point = f"{self.parent.name}.point" if self.parent else "point"
		npoints = f"{self.parent.name}.npoints" if self.parent else "npoints"
		size = str(int(self.size))
		code = template.replace("[NAME]", self.name).replace("[POINT]", point).replace("[NPOINTS]", npoints).replace("[SIZE]", size)
		return code

	def compile(self):
		child_codes = [ch.compile() for ch in self.children]
		return  self.code() + "".join(child_codes)

	def build(self):
		return *self.connect(), self.compile()