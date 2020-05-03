import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default new class {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 0);

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    this.camera.position.z = 1;

    this.scene = new THREE.Scene();

    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);    

    this.clock = new THREE.Clock();

    this.init();
  }

  render() {
    // this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    for (let i = 0; i < this.scene.children.length; i++) {
      const obj = this.scene.children[i];
      obj.updateTime(this.clock.getElapsedTime());
    }    

    this.render();
  }

  addEvents() {
    window.addEventListener('resize', this.resize.bind(this));
  }

  init() {
    this.addToDom();
    this.animate();
    this.addEvents();
  }

  addToDom() {
    const canvas = this.renderer.domElement;
    const container = document.querySelector('#webgl');
    container.appendChild(canvas);
  }

  resize() {
    let width = window.innerWidth;
    let height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}