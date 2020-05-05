import '../css/base.css';

import gsap from 'gsap';

import Gl from './gl';
import Type from './gl/Type';
import options from './options';

class App {
  constructor() {
    this.elems = [...document.querySelectorAll('.frame__demo')]
    this.prev = 0;
    this.current = 0;
    this.turn = 0;    

    this.init();
  }

  init() {
    this.createGl();
    this.changeDemo();
  }

  createGl() {
    for (let i = 0; i < options.length; i++) {
      // Position elements in a circle
      let angle = (i / options.length) * (Math.PI * 2) + Math.PI * 1.5; // Offset the turn
      let radius = 50;
      let x = radius * Math.cos(angle);
      let z = radius * Math.sin(angle);  
      options[i].position.mesh = [x, 0, z];

      // Create kinetic type
      let type = new Type();
      type.init(options[i]);
    }    
  }

  changeDemo() {
    this.elems.forEach((el, index) => el.addEventListener('click', this.onClick.bind(this, index)));    
  }
  
  onClick(index, { currentTarget }) {
    this.elems.forEach(el => el.classList.remove('frame__demo--current'));
    currentTarget.classList.add('frame__demo--current');
  
    this.prev = this.current;
    this.current = this.elems.indexOf(currentTarget);
  
    if (this.prev === this.current) return;
  
    this.turn = (Math.PI / 2) * (this.current - this.prev);
  
    this.tl = gsap.timeline({
      onStart: () => {
        document.body.classList = "";
        document.body.classList.add(options[index].class);
      }
    });
  
    this.tl
      .to(Gl.scene.rotation, {
        duration: 1.5,
        ease: "expo.inOut",
        y: `+=${this.turn}`,
      });
  }
}

new App();