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

    float depth = vPosition.z / 10.;
    vec3 fragColor = mix(vec3(0., 0., .8), texture, depth);

    gl_FragColor = vec4(fragColor, 1.);
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

    vec3 pos = position;

    vec3 axis = vec3(1., 0., 0.);
    float twist = 0.1;
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

//----------------- PLANE SHADERS -----------------//

const planeVertex = /* glsl */ `
  varying vec2 vUv;
  varying float vWave;

  uniform float uTime;

  void main() {
    vUv = uv;

    vec3 pos = position;
    float freq = 0.5;
    float amp = 1.;
    float time = uTime * 3.5;
    pos.z += sin((pos.x - pos.y) * freq - time) * amp;

    vWave = pos.z;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
  }
`;

const planeFragment = /* glsl */ `
  varying vec2 vUv;
  varying float vWave;

  uniform float uTime;
  uniform sampler2D uTexture;

  float map(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
  }

  void main() {
    float time = uTime * 0.25;
    vec2 repeat = vec2(4., 16.);
    vec2 uv = fract(vUv * repeat);
    vec3 texture = texture2D(uTexture, uv).rgb;
    // texture *= vec3(uv.x, uv.y, 0.);

    float wave = vWave;
    wave = map(wave, -1., 1., 0., 0.1);
    float shadow = 1. - wave;

    vec3 fragColor = texture * shadow;

    gl_FragColor = vec4(fragColor, 1.);
  }
`;

//-------------- EXPORT SHADERS -----------------//

export default {
  vertex: {
    demo1: torusVertex,
    demo2: sphereVertex,
    demo3: boxVertex,
    demo4: planeVertex,
  },

  fragment: {
    demo1: torusFragment,
    demo2: sphereFragment,
    demo3: boxFragment,
    demo4: planeFragment,
  },
};