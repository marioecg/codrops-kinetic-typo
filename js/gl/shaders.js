//----------------- TORUS KNOT SHADERS -----------------//

const torusVertex = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vPosition;

  uniform float uTime;

  void main() {
    vUv = uv;
    vPosition = position;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
  }
`;

const torusFragment = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vPosition;

  uniform float uTime;
  uniform sampler2D uTexture;

  void main() {
    float time = uTime * 0.4;

    vec2 repeat = -vec2(12., 3.);
    vec2 uv = fract(vUv * repeat - vec2(time, 0.));
    vec3 texture = texture2D(uTexture, uv).rgb;
    // texture *= vec3(uv.x, uv.y, 0.);

    float fog = clamp(vPosition.z / 6., 0., 1.);
    vec3 fragColor = mix(vec3(0.), texture, fog);

    gl_FragColor = vec4(fragColor, 1.);
  }
`;

//----------------- SPHERE SHADERS -----------------//

const sphereVertex = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vPosition;

  uniform float uTime;

  void main() {
    vUv = uv;
    vPosition = position;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
  }
`;

const sphereFragment = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vPosition;

  uniform float uTime;
  uniform sampler2D uTexture;

  void main() {
    float time = uTime * 1.5;

    vec2 repeat = vec2(12., 12.);
    vec2 uv = fract(vUv * repeat + vec2(sin(vUv.y * 1.) * 5., time));

    vec3 texture = texture2D(uTexture, uv).rgb;
    // texture *= vec3(uv.x, uv.y, 0.);

    float depth = vPosition.z * 0.075;

    gl_FragColor = vec4(texture * depth, 1.);
  }
`;

//----------------- BOX SHADERS -----------------//

const boxVertex = /* glsl */ `
  varying vec2 vUv;

  uniform float uTime;

  mat4 rotation3d(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;

    return mat4(
      oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
      oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
      oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
      0.0,                                0.0,                                0.0,                                1.0
    );
  }

  vec3 rotate(vec3 v, vec3 axis, float angle) {
    return (rotation3d(axis, angle) * vec4(v, 1.0)).xyz;
  }  

  void main() {
    vUv = uv;

    float time = uTime * .5;
    vec3 pos = position;

    vec3 axis = vec3(1., 0., 0.);
    float twist = 0.2;
    float angle = pos.x * twist;

    vec3 transformed = rotate(pos, axis, angle);    

    // float freq = 0.75;
    // float amp = 1.;
    // transformed.y += cos(transformed.x * freq + 0.) * amp;    

    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.);
  }
`;

const boxFragment = /* glsl */ `
  varying vec2 vUv;

  uniform float uTime;
  uniform sampler2D uTexture;

  void main() {
    float time = uTime * 0.25;
    vec2 uv = fract(vUv * 3. - vec2(time, 0.));
    vec3 texture = texture2D(uTexture, uv).rgb;

    gl_FragColor = vec4(texture, 1.);
  }
`;

//-------------- EXPORT SHADERS -----------------//

export default {
  vertex: {
    demo1: torusVertex,
    demo2: sphereVertex,
    demo3: boxVertex
  },

  fragment: {
    demo1: torusFragment,
    demo2: sphereFragment,
    demo3: boxFragment
  },
};