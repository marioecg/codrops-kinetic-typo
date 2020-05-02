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

    gl_FragColor = vec4(texture * texture, 1.);
  }
`;

//-------------- EXPORT SHADERS -----------------//

export default {
  vertex: {
    demo1: torusVertex,
    demo2: sphereVertex,
  },

  fragment: {
    demo1: torusFragment,
    demo2: sphereFragment,
  },
};