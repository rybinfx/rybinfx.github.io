float node25 = float(Clone_0.idx);
float node29 = float(Clone_1.idx);
float node17 = float((float(float(((((node25 * 9.0) - node25) - 4.0) + node29))) / 9.0));
float node57 = (u_off * 0.4);
float node53 = (float(((node57 * 0.05) * 2.0)) * Clone_3.size);
float node49 = float((Clone_3.idx + fract(node53)));
bool node44 = (Clone_3.size > 1.0);
float node43_out0;
if (node44) {
	node43_out0 = (node49 / Clone_3.size);
} else {
	node43_out0 = fract((node49 + 0.5));
}
float node41 = floor(node43_out0);
float node68 = fract(node43_out0);
bool node80 = (Clone_1.size > 1.0);
float node79_out0;
if (node80) {
	node79_out0 = (node29 / (Clone_1.size - 1.0));
} else {
	node79_out0 = 0.5;
}
float node77 = parabola(node79_out0, 1.0);
float node87 = (u_seed * 100.0);
vec2 node75 = vec2((node77 - u_val1), node87);
float node69 = pow(2.0, ns_simplex2((vec2(node75.x, node75.y) / 1.5)));
float node101 = ((node68 * 8.0) - u_val1);
vec3 node100 = vec3(node101, ((node77 * 2.0) + node68), node87);
float node99 = node100.x;
float node106 = node100.y;
float node107 = node100.z;
bool node129 = (Clone_2.size > 1.0);
float node128_out0;
if (node129) {
	node128_out0 = (float(Clone_2.idx) / (Clone_2.size - 1.0));
} else {
	node128_out0 = 0.5;
}
float node126 = n11(node128_out0);
float node125 = (node126 * n11(node79_out0));
vec3 node123 = vec3(node101, (node125 + 10.0), node87);
float node64 = ((gain(pow(node68, node69), node69) + ((((ns_simplex3((vec3(node99, node106, node107) / 1.5)) + (ns_simplex3((vec3((node99 * 2.0), (node106 * 2.0), (node107 * 2.0)) / 1.5)) * 0.5)) / 1.5) * 0.08) * parabola(node68, 1.0))) + ((ns_simplex3((vec3(node123.x, node123.y, node123.z) / 1.5)) * 0.02) * parabola(node68, 2.0)));
float node40 = (node41 + node64);
vec4 node13 = vec4((0.5 + (node17 * mix(0.2, 0.8, n01(cos((((node40 + 0.5) * 3.141592653589793) * 2.0)))))), node40, 0.0, 0.0);
vec2 node11 = vec2(node13.x, node13.y);
vec3 node8 = vec3(n11(node11.x), n11(node11.y), 0.0);
float node166 = (node40 + 0.0009765625);
vec4 node157 = vec4((0.5 + (node17 * mix(0.2, 0.8, n01(cos((((node166 + 0.5) * 3.141592653589793) * 2.0)))))), node166, 0.0, 0.0);
vec2 node155 = vec2(node157.x, node157.y);
vec3 node150 = normalize((vec3(n11(node155.x), n11(node155.y), 0.0) - node8));
float node193 = (u_val2 * 4.0);
float node190 = ((node68 * 5.0) - node193);
float node196 = (node77 - node68);
float node197 = (5.0 + node87);
vec3 node189 = vec3(node190, node196, node197);
float node200 = ((clamp(parabola(node64, 1.0), 0.0, 1.0) * 0.75) + 0.25);
pos = ((((vec3(0.0, 0.0, 0.0) + node8) + ((vec3(node150.y, (node150.x * -1.0), node150.z) * ((0.06 * ((((gain(((ns_simplex3((vec3(node189.x, node189.y, node189.z) / 1.5)) * 0.5) + 0.5), 4.0) * 2.0) - 1.0) * 0.5) + 0.5)) * node200)) * node126)) * vec3((0.5625 / (u_resx / u_resy)), 1.0, 1.0)) * vec3(1.0, 1.0, 1.0));
alpha = min(smoothstep(0.0, 0.05, node43_out0), smoothstep(1.0, 0.95, node43_out0));
vec3 node240 = vec3(node190, node196, (node87 + 20.0));
bool node249 = (mod(float((Clone_3.idx - floor(node53))), 32.0) == 0.0);
float node248_out0;
if (node249) {
	node248_out0 = 1.0;
} else {
	node248_out0 = 0.0;
}
weight = ((((((4.0 + (((((gain(((ns_simplex3((vec3(node240.x, node240.y, node240.z) / 1.5)) * 0.5) + 0.5), 1.0) * 2.0) - 1.0) * 0.5) + 0.5) * 14.0)) + (node248_out0 * 8.0)) * node200) * mix(1.0, pow(clamp(((node64 * -1.0) + 1.0), 0.0, 1.0), 0.6), float((node41 == 6.0)))) * 0.5) * 0.66);
float node298 = (node68 * 2.0);
vec3 node296 = vec3((node298 - (u_val2 * 2.0)), node196, (node87 + 30.0));
vec3 node317 = vec3((node298 - node193), (node125 * 2.0), node87);
vec3 node330 = vec3(node190, ((20.0 + node77) - node68), node197);
hue = (((((u_seed + (u_val2 * 0.2)) + ((ns_simplex2((vec2(float((node87 - u_val2)), 0.0) / 1.5)) * 0.2) + (u_val2 * 0.01))) + (((((gain(((ns_simplex3((vec3(node296.x, node296.y, node296.z) / 1.5)) * 0.5) + 0.5), 2.0) * 2.0) - 1.0) * 0.5) + 0.5) * 0.33)) + (((((gain(((ns_simplex3((vec3(node317.x, node317.y, node317.z) / 1.5)) * 0.5) + 0.5), 2.0) * 2.0) - 1.0) * 0.5) + 0.5) * 0.2)) + ((0.5 * node248_out0) * ((ns_simplex3((vec3(node330.x, node330.y, node330.z) / 1.5)) * 0.5) + 0.5)));
vec3 node351 = vec3(node190, node196, (node87 + 10.0));
sat = pow(pow(((((gain(((ns_simplex3((vec3(node351.x, node351.y, node351.z) / 1.5)) * 0.5) + 0.5), 1.0) * 2.0) - 1.0) * 0.5) + 0.5), 1.0), (1.0 - (node248_out0 * 0.2)));
vec3 node375 = vec3(node190, node196, node87);
vec3 node390 = vec3((node298 - (node57 * 4.0)), (node125 * 3.0), node87);
val = (pow(((parabola(node68, 0.5) * ((((gain(((ns_simplex3((vec3(node375.x, node375.y, node375.z) / 1.5)) * 0.5) + 0.5), 4.0) * 2.0) - 1.0) * 0.5) + 0.5)) * pow(((((gain(((ns_simplex3((vec3(node390.x, node390.y, node390.z) / 1.5)) * 0.5) + 0.5), 2.0) * 2.0) - 1.0) * 0.5) + 0.5), 0.5)), (0.5 + ((1.0 - node43_out0) * 1.5))) * clamp(parabola(node64, 0.25), 0.0, 1.0));
