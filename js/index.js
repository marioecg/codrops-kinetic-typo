import '../css/base.css';

import gsap from 'gsap';

import Gl from './gl';
import Type from './gl/Type';
import options from './options';

// Create type gl elements
for (let i = 0; i < options.length; i++) {
  let len = options.length - 1;

  // Position elements in a circle
  let angle = (i / options.length) * (Math.PI * 2);
  let radius = 50;
  let x = radius * Math.cos(angle);
  let z = radius * Math.sin(angle);  
  options[len - i].position.mesh = [x, 0, z];

  // Create kinetic type
  let type = new Type();
  type.init(options[len - i]);
}

// Change demo on click
let prev = 0;
let current = 0;
let turn;

const links = [...document.querySelectorAll('.frame__demo')];
links.forEach((link, index) => link.addEventListener('click', click.bind(null, index)));

function click(index, { currentTarget }) {
  links.forEach(link => link.classList.remove('frame__demo--current'));
  currentTarget.classList.add('frame__demo--current');

  prev = current;
  current = links.indexOf(currentTarget);

  if (prev === current) return;

  turn = -(Math.PI / 2) * (current - prev);

  const tl = gsap.timeline({
    onStart: () => {
      document.body.classList = "";
      document.body.classList.add(options[index].class);
    }
  });
  tl
    .to(Gl.scene.rotation, {
      duration: 1.5,
      ease: "expo.inOut",
      y: `+=${turn}`,
    });
}