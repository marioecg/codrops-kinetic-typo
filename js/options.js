import shaders from './gl/shaders';
import f from './fonts';

const options = [
  {
    word: 'ENDLESS',
    color: '#ffffff',
    fill: '#000000',
    geometry: new THREE.TorusKnotGeometry(9, 3, 768, 3, 4, 3),
    position: {
      texture: [-0.965, -0.4, 0],
      mesh: [0, 0, 0]
    },
    scale: [0.008, 0.04, 1],
    shaders: {
      vertex: shaders.vertex.demo1,
      fragment: shaders.fragment.demo1
    },
    font: {
      file: f.file.demo1,
      atlas: f.atlas.demo1
    },
    class: 'demo-1'
  },

  {
    word: 'SWIRL',
    color: '#ffffff',
    fill: '#3e64ff',
    geometry: new THREE.SphereGeometry(12, 64, 64),
    position: {
      texture: [-0.9, -0.5, 0],
      mesh: [0, 0, 0]
    },
    scale: [0.0115, 0.04, 1],
    shaders: {
      vertex: shaders.vertex.demo2,
      fragment: shaders.fragment.demo2
    },
    font: {
      file: f.file.demo2,
      atlas: f.atlas.demo2
    },
    class: 'demo-2'
  },

  {
    word: 'TWISTED',
    color: '#ffffff',
    fill: '#d8345f',
    geometry: new THREE.BoxGeometry(100, 10, 10, 64, 64, 64),
    position: {
      texture: [-0.945, -0.5, 0],
      mesh: [0, 0, 0]
    },
    scale: [0.009, 0.04, 1],
    shaders: {
      vertex: shaders.vertex.demo3,
      fragment: shaders.fragment.demo3
    },
    font: {
      file: f.file.demo3,
      atlas: f.atlas.demo3
    },
    class: 'demo-3'
  },

  {
    word: 'RELAX',
    color: '#fff',
    fill: '#e3e6e5',
    geometry: new THREE.PlaneGeometry(27, 27, 64, 64),
    position: {
      texture: [-0.9, -0.65, 0],
      mesh: [0, 0, 0]
    },
    scale: [0.014, 0.05, 1],
    shaders: {
      vertex: shaders.vertex.demo4,
      fragment: shaders.fragment.demo4
    },
    font: {
      file: f.file.demo4,
      atlas: f.atlas.demo4
    },
    class: 'demo-4'
  }
];

export default options;