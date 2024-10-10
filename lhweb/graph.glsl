float node23 = float(Clone_0.idx);
float node27 = float(Clone_1.idx);
float node15 = float((float(float(((((node23 * 9.0) - node23) - 4.0) + node27))) / 9.0));
float node55 = (u_off * 0.4);
float node51 = (float(((node55 * 0.05) * 2.0)) * Clone_3.size);
float node47 = float((Clone_3.idx + fract(node51)));
bool node42 = (Clone_3.size > 1.0);
float node41_out0;
if (node42) {
	node41_out0 = (node47 / Clone_3.size);
} else {
	node41_out0 = fract((node47 + 0.5));
}
float node39 = floor(node41_out0);
float node66 = fract(node41_out0);
bool node78 = (Clone_1.size > 1.0);
float node77_out0;
if (node78) {
	node77_out0 = (node27 / (Clone_1.size - 1.0));
} else {
	node77_out0 = 0.5;
}
float node75 = parabola(node77_out0, 1.0);
float node85 = (u_seed * 100.0);
vec2 node73 = vec2((node75 - u_val1), node85);
float node67 = pow(2.0, ns_simplex2((vec2(node73.x, node73.y) / 1.5)));
float node99 = ((node66 * 8.0) - u_val1);
vec3 node98 = vec3(node99, ((node75 * 2.0) + node66), node85);
float node97 = node98.x;
float node104 = node98.y;
float node105 = node98.z;
bool node127 = (Clone_2.size > 1.0);
float node126_out0;
if (node127) {
	node126_out0 = (float(Clone_2.idx) / (Clone_2.size - 1.0));
} else {
	node126_out0 = 0.5;
}
float node124 = n11(node126_out0);
float node123 = (node124 * n11(node77_out0));
vec3 node121 = vec3(node99, (node123 + 10.0), node85);
float node62 = ((gain(pow(node66, node67), node67) + ((((ns_simplex3((vec3(node97, node104, node105) / 1.5)) + (ns_simplex3((vec3((node97 * 2.0), (node104 * 2.0), (node105 * 2.0)) / 1.5)) * 0.5)) / 1.5) * 0.08) * parabola(node66, 1.0))) + ((ns_simplex3((vec3(node121.x, node121.y, node121.z) / 1.5)) * 0.02) * parabola(node66, 2.0)));
float node38 = (node39 + node62);
vec4 node11 = vec4((0.5 + (node15 * mix(0.2, 0.8, n01(cos((((node38 + 0.5) * 3.141592653589793) * 2.0)))))), node38, 0.0, 0.0);
vec2 node9 = vec2(node11.x, node11.y);
vec3 node6 = vec3(n11(node9.x), n11(node9.y), 0.0);
float node164 = (node38 + 0.0009765625);
vec4 node155 = vec4((0.5 + (node15 * mix(0.2, 0.8, n01(cos((((node164 + 0.5) * 3.141592653589793) * 2.0)))))), node164, 0.0, 0.0);
vec2 node153 = vec2(node155.x, node155.y);
vec3 node148 = normalize((vec3(n11(node153.x), n11(node153.y), 0.0) - node6));
float node191 = (u_val2 * 4.0);
float node188 = ((node66 * 5.0) - node191);
float node194 = (node75 - node66);
float node195 = (5.0 + node85);
vec3 node187 = vec3(node188, node194, node195);
float node198 = ((clamp(parabola(node62, 1.0), 0.0, 1.0) * 0.75) + 0.25);
pos = ((vec3(0.0, 0.0, 0.0) + node6) + ((vec3(node148.y, (node148.x * -1.0), node148.z) * ((0.06 * ((((gain(((ns_simplex3((vec3(node187.x, node187.y, node187.z) / 1.5)) * 0.5) + 0.5), 4.0) * 2.0) - 1.0) * 0.5) + 0.5)) * node198)) * node124));
alpha = min(smoothstep(0.0, 0.05, node41_out0), smoothstep(1.0, 0.95, node41_out0));
vec3 node230 = vec3(node188, node194, (node85 + 20.0));
bool node239 = (mod(float((Clone_3.idx - floor(node51))), 32.0) == 0.0);
float node238_out0;
if (node239) {
	node238_out0 = 1.0;
} else {
	node238_out0 = 0.0;
}
weight = (((((4.0 + (((((gain(((ns_simplex3((vec3(node230.x, node230.y, node230.z) / 1.5)) * 0.5) + 0.5), 1.0) * 2.0) - 1.0) * 0.5) + 0.5) * 14.0)) + (node238_out0 * 8.0)) * node198) * mix(1.0, pow(clamp(((node62 * -1.0) + 1.0), 0.0, 1.0), 0.6), float((node39 == 6.0)))) * 0.5);
float node287 = (node66 * 2.0);
vec3 node285 = vec3((node287 - (u_val2 * 2.0)), node194, (node85 + 30.0));
vec3 node306 = vec3((node287 - node191), (node123 * 2.0), node85);
vec3 node319 = vec3(node188, ((20.0 + node75) - node66), node195);
hue = (((((u_seed + (u_val2 * 0.2)) + ((ns_simplex2((vec2(float((node85 - u_val2)), 0.0) / 1.5)) * 0.2) + (u_val2 * 0.01))) + (((((gain(((ns_simplex3((vec3(node285.x, node285.y, node285.z) / 1.5)) * 0.5) + 0.5), 2.0) * 2.0) - 1.0) * 0.5) + 0.5) * 0.33)) + (((((gain(((ns_simplex3((vec3(node306.x, node306.y, node306.z) / 1.5)) * 0.5) + 0.5), 2.0) * 2.0) - 1.0) * 0.5) + 0.5) * 0.2)) + ((0.5 * node238_out0) * ((ns_simplex3((vec3(node319.x, node319.y, node319.z) / 1.5)) * 0.5) + 0.5)));
vec3 node340 = vec3(node188, node194, (node85 + 10.0));
sat = pow(pow(((((gain(((ns_simplex3((vec3(node340.x, node340.y, node340.z) / 1.5)) * 0.5) + 0.5), 1.0) * 2.0) - 1.0) * 0.5) + 0.5), 1.0), (1.0 - (node238_out0 * 0.2)));
vec3 node364 = vec3(node188, node194, node85);
vec3 node379 = vec3((node287 - (node55 * 4.0)), (node123 * 3.0), node85);
val = (pow(((parabola(node66, 0.5) * ((((gain(((ns_simplex3((vec3(node364.x, node364.y, node364.z) / 1.5)) * 0.5) + 0.5), 4.0) * 2.0) - 1.0) * 0.5) + 0.5)) * pow(((((gain(((ns_simplex3((vec3(node379.x, node379.y, node379.z) / 1.5)) * 0.5) + 0.5), 2.0) * 2.0) - 1.0) * 0.5) + 0.5), 0.5)), (0.5 + ((1.0 - node41_out0) * 1.5))) * clamp(parabola(node62, 0.25), 0.0, 1.0));
