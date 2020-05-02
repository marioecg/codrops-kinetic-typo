import '../css/base.css';

import Gl from './gl';
import Type from './gl/Type';
import shaders from './gl/shaders';
import f from './fonts';

const torus = new Type();

// torus.init({
//   word: 'ENDLESS',
//   color: '#ffffff',
//   background: '#000000',
//   geometry: new THREE.TorusKnotGeometry(9, 3, 768, 3, 4, 3),
//   position: {
//     texture: [-0.965, -0.4, 0],
//     mesh: [0, 0, 0]
//   },
//   scale: [0.008, 0.04, 1],
//   shaders: {
//     vertex: shaders.vertex.demo1,
//     fragment: shaders.fragment.demo1
//   },
//   font: {
//     file: f.file.demo1,
//     atlas: f.atlas.demo1
//   }    
// });

const sphere = new Type();

sphere.init({
  word: 'SWIRL',
  color: '#ffffff',
  background: '#000000',
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
  }  
});