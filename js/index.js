import '../css/base.css';

import Gl from './gl';
import Type from './gl/Type';

const type = new Type();
type.init({
  word: 'ENDLESS',
  color: '#ffffff',
  fill: '#000000',
  position: [-0.965, -0.4, 0],
  scale: [0.008, 0.04, 1]
});