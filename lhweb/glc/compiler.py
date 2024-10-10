################################################
#                   Graph  					   #
################################################
import json
from . import nodes
from .handles import Handle, Pointer, const
from .draw_graph import draw

import time
import copy

WARNINGS = False

class SetEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)
        return json.JSONEncoder.default(self, obj)

def save_json(graph, filename='graph.json'):
	with open(filename, 'w') as f:
		json.dump(graph, f, cls=SetEncoder, indent=4)


def clear_graph(graph, root_nodes):
	new_graph = {}
	indices = {}
	
	def parse(index):
		if index in indices:
			return indices[index]

		node = graph[index]
		if node['type'] == 'reference':
			new_index = parse(node['conn']['args'][0])
			indices[index] = new_index
			return new_index
		new_index = len(new_graph)
		indices[index] = new_index
		new_graph[new_index] = node
		node['conn'] = parse_connections(node['conn'], parse)
		return new_index

	root_nodes = [parse(node) for node in root_nodes]

	return new_graph, root_nodes


def select_graph(graph, root_nodes):
	new_graph = {}
	
	def parse(index):
		if index in new_graph:
			return
		node = graph[index]
		new_graph[index] = node
		conns = node['conn']
		# if 'comp' in node:
		# 	node['comp']['info'] = ''
		# 	node['comp']['conds'] = ''
		# 	if node["type"] == "loop":
		# 		if "comp" in node and "endpoints" in node["comp"]:
		# 			conns["endpoints"] = node["comp"]["endpoints"]
		parse_connections(conns, parse)

	for node in root_nodes:
		parse(node)

	return new_graph



# Graph utils

def parse_connections(connections, func):
	new_connections = {}
	for connection_type in connections:
		connection_list = []
		for connection in connections[connection_type]:
			result = func(connection)
			connection_list.append(result)
		new_connections[connection_type] = connection_list
	return new_connections

def parse_dfs(graph, index, func, visited=None):
	if visited is None:
		visited = set()
	if index in visited: return
	visited.add(index)
	node = graph[index]
	parse_connections(node['conn'], lambda idx: parse_dfs(graph, idx, func, visited))
	func(graph, index)


def hash_node(node):
	return hash(json.dumps(node, sort_keys=True))

def topological_sort(graph, root_nodes, loop_endpoints = False):
	topology = []
	visited = set()
	def dfs(index):
		if index in visited: return
		visited.add(index)
		conns = graph[index]['conn'].copy()
		if loop_endpoints and graph[index]['type'] == 'loop':
			conns['loop_endpoints'] = graph[index]['comp']['endpoints']
		parse_connections(graph[index]['conn'], dfs)
		topology.insert(0, index)
	for index in root_nodes:
		dfs(index)
	return topology



# Convert handles to graph

def build_graph(handles):

	graph = {} # index -> node
	visited_handles = {} # handle -> index
	hash_table = {} # hash -> index
	loops = {} # index -> loop_count

	history = []

	def parse(handle):
		for i, hh in enumerate(history):
			if handle is hh:
				# return visited_handles[handle]
				import os
				# Loop detected
				loop_chain = history[max(0,i-4):]+[handle]
				names = []
				import inspect
				for h in loop_chain:

					# calframe = [c[3] for c in calframe][1:][::-1]
					# name = '/'.join(calframe[:4])+'  '
					name = ''

					if isinstance(handle, Pointer):
						name += 'pointer'
					else:
						name += h._node['type']
						if 'value' in h._node: name += '('+str(h._node['value'])+')'
					# name = h._name +': '+name+' '+str(handle)
					name = ('>> 'if h is handle else '   ') +name
					names.append(name)
				calframe = inspect.getouterframes(h._frame, 3)
				calframe = calframe[:10]
				names += ['\nFrame context:']
				for f in calframe[::-1]:
					if f[4] is None: continue
					names += [
						# '',
						f'Function "{f[3]}" at "{os.path.split(f[1])[-1]}" at line {f[2]}:'
					]
					names += [''.join([
						# '--------------------------------\n',
						'\n',
						*[('--> ' if i == f[5] else '    ') + f'{f[2]-f[5]+i: 5} '+ str(cl) for i, cl in enumerate(f[4])],
						'--------------------------------'
					])]
				raise ValueError('Loop Detected:\n'+'\n'.join(names))

		if isinstance(handle, Pointer):
			return parse(handle._handle)
		if handle in visited_handles:
			return visited_handles[handle]

		assert not isinstance(handle._node, Handle)
		node = handle._node.copy()

		history.append(handle)
		node['conn'] = parse_connections(node['conn'], parse)
		history.pop()
		index = len(graph)
		if node['type'] not in ['loop_arg', 'loop_count']:
			hash_value = hash_node(node)
			if hash_value in hash_table:
				index = hash_table[hash_value]
				visited_handles[handle] = index
				return hash_table[hash_value]
			hash_table[hash_value] = index
		if node['type'] == 'loop':
			loop_index = len(loops)
			loops[index] = loop_index
		graph[index] = node
		visited_handles[handle] = index
		
		return index

	root_nodes = [parse(handle) for handle in handles]

	for index, loop_index in loops.items():
		loop = graph[index]
		loop['index'] = loop_index
		for child in loop['conn']['count'] + loop['conn']['inputs']:
			graph[child]['loop'] = loop_index

	return graph, root_nodes


def precompute_graph(graph, root_nodes):

	def get(index, idx=False):
		node = graph[index]
		if node['type'] == 'reference':
			return get(node['conn']['args'][0], idx)
		out = node
		if idx:
			out = (node, index)
		return out

	removed_switches = []
	

	visited = set()
	def parse(index):
		if index in visited: return
		visited.add(index)
		node = graph[index]
		type = node['type']

		# TODO: float(), int(), bool()

		for conn in node['conn']:
			for child in node['conn'][conn]:
				parse(child)

		new_value = None
		new_value_node = None
		if type == 'op':
			chindex = [get(child, True) for child in node['conn']['args']]
			children = [ch[0] for ch in chindex]
			children_index = [ch[1] for ch in chindex]
			if len(children) == 2 and chindex[0] == chindex[1]:
				new_value = 0
			if len(children) == 2 and all([ch['type'] in ['const_int', 'const_float', 'const_bool'] for ch in children]):
				if node['value'] == '+':
					new_value = children[0]['value'] + children[1]['value']
				elif node['value'] == '-':
					new_value = children[0]['value'] - children[1]['value']
				elif node['value'] == '*':
					new_value = children[0]['value'] * children[1]['value']
				elif node['value'] == '/':
					if children[1]['value'] != 0:
						new_value = children[0]['value'] / children[1]['value']
			elif len(children) == 2 and any([ch['type'] in ['const_int', 'const_float', 'const_bool'] for ch in children]):
				const_idx = 0 if children[0]['type'] in ['const_int', 'const_float', 'const_bool'] else 1
				other_idx = 1 - const_idx
				if node['value'] in ['+', '-']:
					if children[const_idx]['value'] == 0:
						new_value_node = children_index[other_idx]
				elif node['value'] == '*':
					if children[const_idx]['value'] == 0:
						new_value_node = children_index[const_idx]
					elif children[const_idx]['value'] == 1:
						new_value_node = children_index[other_idx]
				elif node['value'] == '/':
					if children[const_idx]['value'] == 0:
						if const_idx == 0:
							new_value_node = children_index[const_idx]
					if children[const_idx]['value'] == 1:
						if const_idx == 1:
							new_value_node = children_index[other_idx]


		elif type == 'bool_op':
			children = [get(child) for child in node['conn']['args']]
			if len(children) == 2:
				if node['value'] in ['<', '<=', '>', '>=', '==', '!=']:
					if len(children) == 2 and all([ch['type'] in ['const_bool', 'const_int', 'const_float'] for ch in children]):
						if node['value'] == '<':
							new_value = children[0]['value'] < children[1]['value']
						elif node['value'] == '<=':
							new_value = children[0]['value'] <= children[1]['value']
						elif node['value'] == '>':
							new_value = children[0]['value'] > children[1]['value']
						elif node['value'] == '>=':
							new_value = children[0]['value'] >= children[1]['value']
						elif node['value'] == '==':
							new_value = children[0]['value'] == children[1]['value']
						elif node['value'] == '!=':
							new_value = children[0]['value'] != children[1]['value']
				if node['value'] == '||':
					# If any of children is const_bool and True, then result is True
					if any([ch['type'] == 'const_bool' and ch['value'] for ch in children]):
						new_value = True
				if node['value'] == '&&':
					# If any of children is const_bool and False, then result is False
					if any([ch['type'] == 'const_bool' and not ch['value'] for ch in children]):
						new_value = False
		
		elif type == 'bool_not':
			child = get(node['conn']['args'][0])
			if child['type'] == 'const_bool':
				new_value = not child['value']

		elif type == 'func':
			children = [get(child) for child in node['conn']['args']]
			def is_const_dtype(node): return node['type'] in ['const_int', 'const_float', 'const_bool']
			if node['value'] == 'float':
				if is_const_dtype(children[0]):
					new_value = float(children[0]['value'])
			elif node['value'] == 'int':
				if is_const_dtype(children[0]):
					new_value = int(children[0]['value'])
			elif node['value'] == 'bool':
				if is_const_dtype(children[0]):
					new_value = bool(children[0]['value'])
		
		elif type == 'int':
			new_value = float(node['value'])
			



		if new_value is not None:
			if isinstance(new_value, bool):
				new_node = nodes.const_bool(new_value)
			elif isinstance(new_value, float):
				new_node = nodes.const_float(new_value)
			elif isinstance(new_value, int):
				new_node = nodes.const_int(new_value)
			else:
				raise Exception('Unknown type of precomputed value:', new_value)
			graph[index] = new_node
		
		if new_value_node is not None:
			graph[index] = nodes.reference(new_value_node)

		if type == 'output':
			parent = graph[node['conn']['input'][0]]
			if parent['type'] == 'switch':
				new_node = None
				conds = [get(child) for child in parent['conn']['conds']]
				for i, cond in enumerate(conds):
					if cond['type'] == 'const_bool' and cond['value']:
						branch_index = parent['conn'][f'out_{node["index"]}'][i]
						new_node = nodes.reference(branch_index)
						break
				if new_node is not None:
					removed_switches.append(graph[node['conn']['input'][0]])
					graph[index] = new_node
	
	for index in root_nodes:
		parse(index)

	graph, root_nodes = clear_graph(graph, root_nodes)

	return graph, root_nodes



# Optimize graph ###############################

def optimize_graph(graph, root_nodes):



	# Utils ######################################

	def compile_info():
		return {
			'comp': {
				'dtype': None,
				'value': None,
				'compiled': False,
				'req': [],
				'cond': set(),
				'scope': [],
				'endpoints': set(),
				'use_proxy': False,
				'loop_stack': [],

				'fill': None,
				'info': '',
			}
		}

	def add_node(node, graph):
		index = len(graph)
		graph[index] = node
		return index









	# Process requests #############################

	def decode_scope(scope):
		code, info = scope[:2], scope[2:]
		scope_info = {}
		if code == "SB":
			scope_info['type'] = 'switch'
			scope_info['btype'] = 'branch'
			idx, branch = info.split(':')
			idx, branch = int(idx), int(branch)
			scope_info['index'] = idx
			scope_info['branch'] = branch
			return scope_info
		if code[0] == "L":
			scope_info['type'] = 'loop'
			if code[1] == "P":
				scope_info['btype'] = 'scope'
			if code[1] == "E":
				scope_info['btype'] = 'endpoint'
			idx = int(info)
			scope_info['index'] = idx
			return scope_info
		raise Exception("Unknown scope code: " + code)

	def requests_tree(requeests):
		tree = {}
		for r in requests:
			t = tree
			for i in range(len(r)+1):
				if i < len(r):
					k = r[i]
					if k not in t:
						t[k] = {}
					t = t[k]
				if i == len(r):
					t[None] = {}
		return tree

	def find_sets(t, graph, index):
		sets = {}
		loop_sets = {}
		# Collect [branches], [conds] for each switch node
		for k in t:
			if k is None: continue
			si = decode_scope(k)
			if si['type'] == 'switch':
				if si['btype'] == 'branch':
					k_node, k_inp = si['index'], si['branch']
					if k_node not in sets:
						sets[k_node] = {'cond': False, 'branch': []}
					sets[k_node]['branch'].append(k_inp)
				

		# Select swich connections to eliminate
		found = {}
		for k in sets:
			if k in graph[index]['comp']['cond']:
				found[k] = sets[k]
				continue
			if graph[k]['else']:
				num_conds = len(graph[k]['conn']['conds'])
				if len(sets[k]['branch']) == num_conds:
					found[k] = sets[k]
					continue

		# Convert back to scope format
		result = []
		for k in found:
			for b in found[k]['branch']:
				sc = "SB" + str(k) + ":" + str(b)
			result.append(sc)

		# Collect [scopes] for each loop node
		for k in t:
			if k[:2] == "LE":
				idx = int(k[2:])
				sc = "LP" + str(idx)
				assert sc in t, f'{index} {sc} {t}'
				result.append(sc)
				result.append(k)

		return result

	def purge_tree(t, graph, index):
		if t is None: return
		for k in list(t):
			if k is None: continue
			purge_tree(t[k], graph, index)
			del t[k]
			si = decode_scope(k)
			if si['type'] == 'switch':
				node = graph[index]
				# node is not switch always?
				sw_node = graph[si['index']]
				sw_node['comp']['endpoints'].add(index)
			if si['type'] == 'loop':
				pass
				# draw(select_graph(graph, [loop_table[si["index"]]]), "err.dot")
				# raise Exception(f"Purging loop WFT {index}, {graph[index]}\n {k}")


		t.update({None: {}})

	def chop_tree(t):
		request = []
		while len(t) > 0 and len(t) < 2:
			request.append(list(t.keys())[0])
			t = t[request[-1]]
		return request, t

	def remove_sets(t, graph, index, process_children = True):
		if len(t) == 0 or (None in t and len(t) == 1):
			# End of branch
			return

		if None in t and len(t) > 1:
			# Accessed from lower scope
			# Remove requests and set endpoints
			purge_tree(t, graph, index)
			return


		for k in t:
			# Process children first. Why? Last!
			remove_sets(t[k], graph, index)


		elim_scopes = find_sets(t, graph, index)
		new_children = {}
		for sc in elim_scopes:
			# Inherit switch children
			if sc[0] == "S":
				branch_children = t.pop(sc)
				for branch_child in branch_children:
					assert branch_child is None or branch_child not in new_children
					new_children[branch_child] = branch_children[branch_child]
			if sc[0] == "L":
				# Inherit loop children
				loop_children = t.pop(sc)
				for loop_child in loop_children:
					assert loop_child is None or loop_child not in new_children
					sc_tree = loop_children[loop_child]
					if loop_child is not None:
						if loop_child[:2] == "SB":
							chinfo = decode_scope(loop_child)
							switch_index = chinfo['index']
							switch_branch = chinfo['branch']
							cond = graph[graph[switch_index]['conn']['conds'][switch_branch]]
							# Check if conditional branch is in loop
							loop_states = cond['comp']['loop_states']
							loop_index = int(sc[2:])
							if loop_states[loop_index]:
								# Bad news
								purge_tree(sc_tree, graph, index)

					new_children[loop_child] = sc_tree

		for new_child in new_children:
			assert new_child not in t
			t[new_child] = new_children[new_child]

		


		if None in t and len(t) > 1:
			# Accessed from lower scope
			# Remove requests and set endpoints
			purge_tree(t, graph, index)
			return

		if len(new_children) > 0:
			remove_sets(t, graph, index)


		# # How is this possible?
		# if len(new_children) > 0:
		# 	remove_sets(t, graph, index, False)




	def clear_nulls(t):
		if None in t:
			del t[None]
		for k in t:
			clear_nulls(t[k])

	def request_from_tree(t):
		assert len(t) < 2, t
		for k in t:
			if k is None: return []
			return [k] + request_from_tree(t[k])
		return []

	def replace_tree(tree, switch_trees):

		def populate_replace(tree, heads):
			tree = copy.deepcopy(tree)
			def parse(t):
				if len(t) == 0:
					for h in heads:
						t[h] = copy.deepcopy(heads[h])
					return
				for k in t:
					parse(t[k])
			parse(tree)
			return tree


		def parse(t):
			if t is None:
				return
			children = list(t.keys())
			count = 0
			while count < len(children):
				k = children[count]
				if k is None:
					continue
				if k[:2] == "SB":
					chinfo = decode_scope(k)
					switch_index = chinfo['index']
					if switch_index in switch_trees:
						# print("Replacing", k, "with", switch_trees[switch_index])
						replace_tree = copy.deepcopy(switch_trees[switch_index])
						replace_tree = populate_replace(replace_tree, t[k])
						del t[k]
						for k in replace_tree:
							t[k] = replace_tree[k]
							children.append(k)
				else:
					parse(t[k])
				count += 1

		parse(tree)
		return tree



	def process_requests(requests, graph, index, switch_trees):
		tree = requests_tree(requests)
		# tree = replace_tree(tree, switch_trees)
		remove_sets(tree, graph, index)
		clear_nulls(tree)
		return tree

	def hash_tree(t):
		if t is None: return 'None'
		return str(sorted([(k, hash_tree(t[k])) for k in t]))



	# Compile conditions ##########################

	def get_cond(graph, branch):
		assert branch[:2] == "SB", branch
		node_idx, branch_idx = branch[2:].split(':')
		return graph[int(node_idx)]['conn']['conds'][int(branch_idx)]

	# TODO: Propagate conds?
	def compile_condition(tree, graph, index):
		update_nodes = []
		children = []
		for b in tree:
			b_cond = get_cond(graph, b)
			if len(tree[b]) == 0:
				ch = b_cond
			else:
				ch_cond, upd = compile_condition(tree[b], graph, index)
				update_nodes += upd
				# Check if b_cond and ch_conds in the same scope
				a_scope = graph[b_cond]['comp']['scope']
				b_scope = graph[ch_cond]['comp']['scope']
				if a_scope != b_scope:
					if WARNINGS: print("Warning: Condition in different scopes", a_scope, b_scope)
					ch = add_node({**nodes.const_bool(True), **compile_info()}, graph)
				else:
					ch = add_node({**nodes.bool_op('&&', b_cond, ch_cond), **compile_info()}, graph)
				update_nodes += [ch]
				topology.insert(top_idx+1, ch)
			children.append(ch)
		if len(children) == 1:
			return children[0], update_nodes
		or_node = add_node({**nodes.bool_op('||', *children), **compile_info()}, graph)
		update_nodes += [or_node]
		return or_node, update_nodes


	
	###############################################
	# Parse graph #################################







	# Add compile info to nodes

	def add_compile_info(graph, index):
		node = graph[index]
		node.update(compile_info())
	
	for rn in root_nodes:
		parse_dfs(graph, rn, add_compile_info)




	# Check Loops
	visited = set()
	loop_check = set()
	err_graph = {}
	def check_loops(index, plist=[]):
		if index in loop_check:
			# for idx in visited:
			for idx in plist:
				err_graph[idx] = graph[idx]
			# for idx in plist:
			# 	err_graph[idx]['comp']['fill'] = 'brown'
			graph[index]['comp']['fill'] = 'red'
			draw(err_graph, 'err.dot')
			raise Exception(f'Loop detected early at node {index}:\n{graph[index]}\n')
		if index in visited: return
		visited.add(index)
		loop_check.add(index)
		parse_connections(graph[index]['conn'], lambda x: check_loops(x, plist + [index]))
		if graph[index]['type'] in ['loop', 'switch']:
			for ep in graph[index]['comp']['endpoints']:
				check_loops(ep, plist + [index])

		loop_check.remove(index)
	
	for index in root_nodes:
		check_loops(index)




	# Check cyclic loops
	visited = set()
	loop_check = set()
	def check_loops(index):
		if index in loop_check:
			raise ValueError('Loop detected early')
		if index in visited: return
		visited.add(index)
		loop_check.add(index)
		parse_connections(graph[index]['conn'], check_loops)
		loop_check.remove(index)
	
	for index in root_nodes:
		check_loops(index)
			


	# draw(graph, 'raw.dot')



	# Parse loop scopes

	loop_table = {}
	for index in graph:
		node = graph[index]
		if node['type'] == 'loop':
			loop_index = node['index']
			assert loop_index not in loop_table
			loop_table[loop_index] = index


	visited = set()
	def parse_loop_states(index, loop_stack = []):
		if index in visited: return
		visited.add(index)


		node = graph[index]
		type = node['type']

		loop_states = {lidx: None for lidx in loop_table}

		if type in ['loop_count', 'loop_arg']:
			loop_states[node['loop']] = True

		if type == 'loop':
			loop_states[node['index']] = False


		children = [ch for conn in node['conn'].values() for ch in conn]
		for ch in children: parse_loop_states(ch, loop_stack)
		ch_loop_states = [graph[ch]['comp']['loop_states'] for ch in children]
		
		if type == 'loop':
			ch_states = [chls[node['index']] for chls in ch_loop_states]
			for ch, state in zip(children, ch_states):
				if not state:
					node['comp']['endpoints'].add(ch)

		for lx in loop_states:
			if loop_states[lx] is not None: continue
			ch_states = [chls[lx] for chls in ch_loop_states]
			if not any(ch_states):
				loop_states[lx] = False
				continue
			loop_node = graph[loop_table[lx]]
			for ch, state in zip(children, ch_states):
				if not state:
					loop_node['comp']['endpoints'].add(ch)
			loop_states[lx] = True
		
		node['comp']['loop_states'] = loop_states

	for index in root_nodes:
		parse_loop_states(index)



	# for node in graph.values():
	# 	node['comp']['info'] = node['comp']['loop_states']


	# with open('raw.json', 'w') as f:
	# 	f.write(json.dumps(graph, indent=4))

	# draw(graph, 'raw.dot')
	# save_json(graph, 'raw.json')




	###############################################
	# Parse conds 								  #
	###############################################
	# Topological sort 

	topology = topological_sort(graph, root_nodes, True)	
	switch_table = {}
	switch_trees = {}

	# Process nodes



	top_idx = 0
	while top_idx < len(topology):

		
		index = topology[top_idx]
		node = graph[index]
		comp = node['comp']

		if node['type'] in ['const', 'const_int', 'const_float', 'const_bool']:
			top_idx += 1
			continue

		# Process requests
		requests = comp['req']
		conds = comp['cond']
		requests_copy = requests.copy()
		request = []
		use_proxy = len(requests) > 1

		tree_copy = {}

		# One request - pass on
		if len(requests) == 1:
			request = requests[0]

		# Multiple requests - process
		elif len(requests) > 1:

			# Combine requests
			# Merge same scopes, return the rest as a tree
			tree = process_requests(requests, graph, index, switch_trees)
			# print("Combining", index)
			# print("Requests", requests)
			# print("Tree0:", tree)
			request, tree = chop_tree(tree)
			# print("Tree1:", tree)
			# print("Request", request)
			# print("Tree", tree)
			# print("Conds", conds)
			# print('-'*20)

			if len(tree) > 0 and node['type'] != 'output':

				requests.clear() # ??
				update_nodes = [] # List of created nodes, topologically oredered

				tree_copy = copy.deepcopy(tree)


				# Move current node to new index
				new_index = len(graph)
				graph[new_index] = node


				if node['type'] == 'switch':

					# print("Switch", index, new_index)
					# print(tree)
					# assert False
					
					# print("Requests:", requests_copy)
					# print("Request:", request)
					# print("Tree:", tree)
					cond_index, upd = compile_condition(tree, graph, index)
					update_nodes += upd

					num_outs = len(node['conn']) - 1
					old_outs = [{**nodes.output(new_index, i), **compile_info()} for i in range(num_outs)]
					outs_idx = [add_node(o, graph) for o in old_outs]
					swt = {**nodes.switch([cond_index], *[[o] for o in outs_idx]), **compile_info()}
					update_nodes += [new_index] + outs_idx

					graph[index] = swt
					node = swt
					comp = node['comp']
					comp['cond'] = conds.copy()
					switch_trees[index] = tree_copy

				else:

					h_tree = hash_tree(tree)
				
					if h_tree not in switch_table:
						# Compile new condition

						cond_index, upd = compile_condition(tree, graph, index)
						update_nodes += upd

						# Create switch node and attach
						swt = {**nodes.switch([cond_index], [new_index]), **compile_info()}
						switch_index = add_node(swt, graph)
						out = {**nodes.output(switch_index, 0), **compile_info()}
						update_nodes += [new_index, switch_index]
						switch_table[h_tree] = (switch_index, cond_index)
						switch_trees[switch_index] = tree_copy
					
					else:

						# Attach to existing switch node
						switch_index, cond_index = switch_table[h_tree]
						swt = graph[switch_index]
						num_outs = len(swt['conn'])-1
						swt['conn'][f'out_{num_outs}'] = [new_index]
						out = {**nodes.output(switch_index, num_outs), **compile_info()}
						update_nodes += [new_index] # Skip switch node update
						comp['req'] = [swt['comp']['req'][0]+[f'SB{switch_index}:{0}']]

					requests = [request]
					graph[index] = out
					node = out
					comp = node['comp']
					comp['cond'] = conds.copy()




				# Purge tree
				purge_tree(tree, graph, index)
					
				
				upd = []
				for cond in update_nodes:
					if cond not in upd:
						upd.append(cond)

				for cond in upd:
					topology.insert(top_idx+1, cond)
					graph[cond]['comp']['cond'] = conds.copy()


		comp['scope'] = request.copy()
		comp['info'] = f'tidx: {top_idx} '+ str(tree_copy) + str(comp['scope']) + '\n' + str(comp['cond'])
		# comp['info'] = ''

		# Set proxy flags
		comp['use_proxy'] = comp['use_proxy'] or use_proxy
		if node['type'] == 'set':
			arg = graph[node['conn']['args'][0]]
			arg['comp']['use_proxy'] = True

		# Propagate request

		def add_cond(idx):
			graph[idx]['comp']['cond'] = graph[idx]['comp']['cond'].union(graph[index]['comp']['cond'])

		if node['type'] == 'switch': 

			num_conds = len(node['conn']['conds'])
			for i in range(num_conds):
			
				cond_idx = node['conn']['conds'][i]
				cond_node = graph[cond_idx]
				add_cond(cond_idx)
				cond_node['comp']['cond'].add(index)
				cond_node['comp']['req'].append(request)

				for j in range(len(node['conn'])-1):

					out_name = f'out_{j}'
					out_idx = node['conn'][out_name][i]
					out_req = request + [f'SB{index}:{i}']
					graph[out_idx]['comp']['req'].append(out_req)
					add_cond(out_idx)

		elif node['type'] == 'loop':

			loop_index = node['index']
			loop_req = request + [f'LP{loop_index}']
			endp_req = request + [f'LE{loop_index}']

			parse_connections(node['conn'], lambda idx: add_cond(idx))
			parse_connections(node['conn'], lambda idx: graph[idx]['comp']['req'].append(loop_req))

			for idx in node['comp']['endpoints']:
				add_cond(idx)
				graph[idx]['comp']['req'].append(endp_req)
				
			for inp in node['conn']['inputs']:
				idx = graph[inp]['conn']['arg'][0]
				add_cond(idx)
				graph[idx]['comp']['req'].append(endp_req)


		elif node['type'] == 'output':
			add_cond(node['conn']['input'][0])
			graph[node['conn']['input'][0]]['comp']['req'].extend(requests)


		else:

			parse_connections(node['conn'], lambda idx: add_cond(idx))
			parse_connections(node['conn'], lambda idx: graph[idx]['comp']['req'].append(request))
			

							
		top_idx += 1


	
	# draw(graph, 'optimized.dot')
	# save_json(graph, 'optimized.json')



	###############################################
	# Parse loops 								  #
	###############################################

	# Check Loops
	visited = set()
	loop_check = set()
	err_graph = {}
	def check_loops(index, plist=[]):
		if index in loop_check:
			# for idx in visited:
			for idx in plist:
				err_graph[idx] = graph[idx]
			# for idx in plist:
			# 	err_graph[idx]['comp']['fill'] = 'brown'
			graph[index]['comp']['fill'] = 'red'
			# draw(graph, 'optimized.dot')
			draw(err_graph, 'err.dot')
			raise Exception(f'Loop detected at node {index}:\n{graph[index]}')
		if index in visited: return
		visited.add(index)
		loop_check.add(index)
		parse_connections(graph[index]['conn'], lambda x: check_loops(x, plist + [index]))
		if graph[index]['type'] in ['loop', 'switch']:
			for ep in graph[index]['comp']['endpoints']:
				check_loops(ep, plist + [index])

		loop_check.remove(index)
	
	for index in root_nodes:
		check_loops(index)


	return graph, root_nodes








############################################################################################
####################################### COMPILER  ##########################################
############################################################################################


def compile_graph(graph, root_nodes):




	
	names = {}
	def new_name(name='node'):

		if name not in names:
			names[name] = 0
			return name
		names[name] += 1
		return f'{name}_{names[name]+1}'



	def define_var(dtype, name, value=None):
		return f'{dtype} {name}{" = " + value if value is not None else ""};\n'

	def set_var(name, value):
		return f'{name} = {value};\n'


	compile_graph = {}


	def compile_node(index):


		node = graph[index]
		
		code = ''
		if node['comp']['compiled']:
			if node['comp']['value'] is None or node['comp']['dtype'] is None:
				node['comp']['fill'] = 'red'
				draw(compile_graph, 'err.dot')
				raise Exception('Compile error', index, node)
			return code
		node['comp']['compiled'] = True

		node['comp']['info'] += f'\nCompile index: {len(compile_graph)}'
		compile_graph[index] = node

		if node['type'] in ['const', 'const_int', 'const_float', 'const_bool']:
			# QUICK FIX
			if node['type'] == 'const_int':
				node['type'] = 'const_float'
				node['value'] = str(float(node['value']))


			if node['type'] == 'const_bool':
				value = str(node['value']).lower()
			else:
				value = str(node['value'])
			node['comp']['value'] = value
			node['comp']['dtype'] = node["dtype"]
			return code


		if node['type'] == 'set':
			for index in node['conn']['args']:
				code += compile_node(index)
			arg_nodes = [graph[i] for i in node['conn']['args']]
			arg_vals = [n['comp']['value'] for n in arg_nodes]
			arg_dtypes = [n['comp']['dtype'] for n in arg_nodes]

			code += f'{arg_vals[0]} = {arg_vals[1]};\n'
			value = arg_vals[0]
			dtype = arg_dtypes[0]
			node["comp"]["value"] = value
			node["comp"]["dtype"] = dtype
			return code

		if node['type'] == 'swizzle_set':

			for index in node['conn']['args']:
				code += compile_node(index)
			arg_nodes = [graph[i] for i in node['conn']['args']]
			arg_vals = [n['comp']['value'] for n in arg_nodes]
			arg_dtypes = [n['comp']['dtype'] for n in arg_nodes]


			code += f'{arg_vals[0]}.{node["value"]} = {arg_vals[1]};\n'
			value = arg_vals[0]
			dtype = arg_dtypes[0]
			node["comp"]["value"] = value
			node["comp"]["dtype"] = dtype
			assert node["comp"]["value"] is not None, f"NEW\n{node}\n{arg_nodes}\n{arg_vals}\n{arg_dtypes}\n"
			return code


		if node['type'] in ['func', 'op', 'bool_op', 'bool_not', 'swizzle']:


			for idx in node['conn']['args']:
				code += compile_node(idx)
			arg_nodes = [graph[i] for i in node['conn']['args']]
			arg_vals = [n['comp']['value'] for n in arg_nodes]
			arg_dtypes = [n['comp']['dtype'] for n in arg_nodes]


			if node['type'] == 'func':
				value = f'{node["value"]}({", ".join(arg_vals)})'
				dtype = node['dtype']
				if dtype == 'genType':
					dtype = infer_genType(node['signature'], arg_dtypes)

			if node['type'] == 'op':
				value = '(' + f' {node["value"]} '.join(arg_vals) + ')'
				dtype = infer_opType(arg_dtypes)

			if node['type'] == 'bool_op':
				value = '(' + f' {node["value"]} '.join(arg_vals) + ')'
				dtype = 'bool'

			if node['type'] == 'bool_not':
				value = f'(!{arg_vals[0]})'
				dtype = 'bool'

			if node['type'] == 'swizzle':
				value = f'{arg_vals[0]}.{node["value"]}'
				dtype = infer_swizzleType(arg_dtypes[0], node['value'])
			

			node['comp']['dtype'] = dtype

			if node['comp']['use_proxy']:
				name = new_name(f'node{index}')
				code += define_var(dtype, name, value)
				node['comp']['value'] = name
			else:
				node['comp']['value'] = value

			return code


		
		if node['type'] == 'output':
			
			code += compile_node(node['conn']['input'][0])
			node['comp']['value'] = graph[node['conn']['input'][0]]['comp']['value'][node['index']]
			node['comp']['dtype'] = graph[node['conn']['input'][0]]['comp']['dtype'][node['index']]
			return code


		if node['type'] == 'switch':

			num_conds = len(node['conn']['conds'])
			num_outs = len(node['conn']) - 1

			out_codes = []
			out_dtypes = []
			out_names = [new_name(f'node{index}_out{i}') for i in range(num_outs)]
			out_defs = ''
			out_sets = ['' for i in range(num_conds)]
			cond_vals = []

			for endpoint in node['comp']['endpoints']:
				code += compile_node(endpoint)

			for cond_idx in range(num_conds):
				code += compile_node(node['conn']['conds'][cond_idx])
				cond_vals.append(graph[node['conn']['conds'][cond_idx]]['comp']['value'])
				out_codes.append('')
				for out_idx in range(num_outs):
					conn_name = f'out_{out_idx}'
					assert conn_name in node['conn'], (index, node)
					conn_node = graph[node['conn'][conn_name][cond_idx]]
					out_codes[-1] += compile_node(node['conn'][conn_name][cond_idx])
					out_dtype = conn_node['comp']['dtype']
					out_value = conn_node['comp']['value']
					out_dtypes.append(out_dtype)
					if cond_idx == 0:
						out_defs += define_var(out_dtype, out_names[out_idx])

					if out_idx > 0:
						out_sets[cond_idx] += '\t'
					out_sets[cond_idx] += set_var(out_names[out_idx], out_value)
				out_codes[-1] = '\t' + out_codes[-1].replace('\n', '\n\t')



			# Ternary version


			# Full version
			for i in range(num_conds):
				if i == 0:
					code += out_defs
					prefix = f'if ({cond_vals[i]}) ' + '{\n'
				elif i > 0:
					if i == num_conds - 1 and node['else']:
						prefix = '} else {\n'
					else:
						prefix = '}' + f' else if ({cond_vals[i]}) ' + '{\n'
				code += prefix
				code += out_codes[i]
				code += out_sets[i]
				if i == num_conds-1:
					code += '}\n'

			node['comp']['value'] = out_names
			node['comp']['dtype'] = out_dtypes

			return code

		
		if node['type'] == 'loop':

			for end in node['comp']['endpoints']:
				code += compile_node(end)
			code += compile_node(node['conn']['size'][0])
			
			inp_defs = ''	
			loop_code = ''
			loop_sets = ''
			inp_names = []
			inp_dtypes = []

			count_idx = node['conn']['count'][0]
			count_node = graph[node['conn']['count'][0]]
			count_name = new_name(f'node{count_idx}')
			count_node['comp']['value'] = count_name
			count_node['comp']['dtype'] = 'int'
			count_node['comp']['compiled'] = True

			for input, output in zip(node['conn']['inputs'], node['conn']['outs']):
				inp_node = graph[input]
				out_node = graph[output]
				inp_inp_node = graph[inp_node['conn']['arg'][0]]
				code += compile_node(inp_node['conn']['arg'][0])
				inp_inp_val = inp_inp_node['comp']['value']
				inp_inp_dtype = inp_inp_node['comp']['dtype']
				inp_name = new_name(f'node{input}')
				inp_names.append(inp_name)
				inp_dtypes.append(inp_inp_dtype)
				inp_node['comp']['value'] = inp_name
				inp_node['comp']['dtype'] = inp_inp_dtype
				inp_node['comp']['compiled'] = True
				loop_code += compile_node(output)
				out_val = out_node['comp']['value']
				out_dtype = out_node['comp']['dtype']
				inp_defs += define_var(inp_inp_dtype, inp_name, inp_inp_val)
				loop_sets += set_var(inp_name, out_val)

			size_val = graph[node['conn']['size'][0]]['comp']['value']
			loop_code += loop_sets
			loop_code = '\t' + loop_code[:-1].replace('\n', '\n\t') + '\n'
			code += inp_defs
			code += f'for (int {count_name} = 0; {count_name} < {size_val}; {count_name}++) {{\n'
			code += loop_code
			code += '}\n'

			node['comp']['value'] = inp_names
			node['comp']['dtype'] = inp_dtypes
			
			return code


		node['comp']['fill'] = 'red'
		# draw_graph.save_dot(compile_graph, 'compile_err', True)
		raise Exception(f'Node {index} of type {node["type"]} not implemented')

	code = ''
	for node in root_nodes:
		code += compile_node(node)

	return code





	

def compile(handles):

	t0 = time.time()
	print('Compiling glsl...')

	graph, root_nodes = build_graph(handles)
	graph, root_nodes = precompute_graph(graph, root_nodes)

	# print("Starting compilation...")
	# t0 = time.time()
	# print(f"Compilation finished in {time.time()-t0} seconds")
	# draw(graph, 'raw.dot')
	graph, root_nodes = optimize_graph(graph, root_nodes)
	# sel = select_graph(graph, [355])
	# draw(sel, 'sel.dot')
	
	# for n in graph: graph[n]['comp']['info'] = ''


	code = ''
	code = compile_graph(graph, root_nodes)
	with open('graph.glsl', 'w') as f:
		f.write(code)

	# draw(graph, 'optimized.dot')
	# save_json(graph, 'graph.json')
	

	# sel = select_graph(graph, [root_nodes[1]])
	# draw(sel, "sel.dot")

	print('Compiled glsl in', time.time() - t0)


	return code








def infer_genType(signature, dtypes):
	ordering = {'bool': 0, 'int': 1, 'float': 2, 'vec2': 3, 'vec3': 4, 'vec4': 5}
	select = []
	assert 'genType' in signature
	for sign, dtype in zip(signature, dtypes):
		if sign == 'genType':
			assert dtype in ordering.keys()
			select.append(dtype)
	select.sort(key=lambda x: ordering[x])
	return select[-1]

def infer_opType(dtypes):
	ordering = {'bool': 0, 'int': 1, 'float': 2, 'vec2': 3, 'vec3': 4, 'vec4': 5}
	select = dtypes
	select.sort(key=lambda x: ordering[x])
	return select[-1]

def infer_swizzleType(dtype, comp):
	if dtype in ['vec2', 'vec3', 'vec4']:
		assert len(comp) < 5
		if (all([c in 'xyzw' for c in comp]) or
			all([c in 'rgba' for c in comp]) or
			all([c in 'stpq' for c in comp])):
			return 'float' if len(comp) == 1 else f'vec{len(comp)}'

	raise ValueError(f'Invalid swizzle for {dtype}: {comp}')