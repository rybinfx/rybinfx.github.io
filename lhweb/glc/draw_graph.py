#####################
# Mermaid functions #
#####################


import json


def prepare_graph(graph):
	draw_graph = {}
	for index in graph:
		draw_node = {}
		node = graph[index]
		type = node['type']

		name = type
		color = 'gray'
		info = None
		tooltip = None
		scope = []

		if type == 'const':
			name = node['value']
			color = '#2a2a75'
		
		if type in ['func', 'op', 'bool_op', 'bool_not']:
			if type == 'bool_not':
				name = '!'
			else:
				name = node['value']
			color = '#4e1a8a'

		if type == 'switch':
			name = 'switch'
			color = 'orange'

		if type == 'loop':
			name = f'loop: {node["index"]}'
			color = 'orange'

		if type in ['loop_arg', 'loop_count']:
			name = f'{type}: {node["loop"]}'
			color = 'purple'

		if type == 'output':
			name = f'output: {node["index"]}'
			color = 'violet'

		if 'comp' in node:
			if 'info' in node['comp']:
				info = node['comp']['info']
			if 'scope' in node['comp']:
				scope = node['comp']['scope']
			if 'fill' in node['comp']:
				fill = node['comp']['fill']
				if fill is not None:
					color = fill
			if 'tooltip' in node['comp']:
				tooltip = node['comp']['tooltip']

		draw_node['name'] = f'({index}) {name}'
		draw_node['color'] = color
		draw_node['info'] = info
		draw_node['tooltip'] = tooltip
		draw_node['scope'] = scope

		new_conn = []
		for ctype, conns in node['conn'].items():
			for conn in conns:
				new_conn.append({'index': conn})
		
		if type in ['loop', 'switch']:
			if 'comp' in node:
				if 'endpoints' in node['comp']:
					for conn in node['comp']['endpoints']:
						new_conn.append({'index': conn, 'style': 'dotted'})

		draw_node['conn'] = new_conn
		draw_graph[index] = draw_node

	return draw_graph


def save(code, filename='graph.dot'):
	with open(filename, 'w') as f:
		f.write(code)


def draw(graph, filename='graph.dot'):



	graph = prepare_graph(graph)

	gstyle = []

	gstyle.append('graph [bgcolor="transparent", splines="false"];')
	gstyle.append('node [shape=box, style="filled, rounded", fontname="Arial", fontcolor="#ffffff", fontsize=16, color="#d0d0d0"];')
	gstyle.append('edge [fontname="Arial", fontsize=10, color="#d0d0d0"];')


	scopes = {}
	subgraphs = []
	nodes = []
	edges = []

	def draw_scope(node_def, sg, tab=0):
		if len(sg) == tab:
			return node_def
		else:
			return f'subgraph cluster_{sg[tab][0]} {{ label="{sg[tab][1]}"; {draw_scope(node_def, sg, tab+1)} }}'

	for index in graph:
		node = graph[index]
		name = node['name']
		color = node['color']
		info = node['info']
		tooltip = node['tooltip']
		scope = node['scope']
		conn = node['conn']


		if info:
			name += f'\n{info}'
		node_cfg = f'label="{name}" fillcolor="{color}"'
		if tooltip:
			node_cfg += f' tooltip="{tooltip}"'
		node_def = f'{index} [{node_cfg}];'

		sg = []
		for s in scope:
			if s not in scopes:
				scopes[s] = len(scopes)
				if s[0] == "L":
					color = 'orange'
				if s[0] == "S":
					color = 'orange'
				sdef = f'subgraph cluster_{scopes[s]} {{ style="rounded"; label="{s}"; color="{color}"; fontcolor="{color}"; fontname="Arial"; fontsize=16; }}'
				subgraphs.append(sdef)
			sg.append([scopes[s], s])

		node_def = draw_scope(node_def, sg)
		nodes.append(node_def)

		for c in conn:
			cindex = c['index']
			edef = f'{index} -> {cindex}'
			if 'style' in c:
				edef += f' [style="{c["style"]}"];'
			edges.append(edef)

	code = '\n\t'.join(['\n']+gstyle+subgraphs+nodes+edges)
	code = 'digraph G {'+code+'\n\n}'

	save(code, filename)

	return

