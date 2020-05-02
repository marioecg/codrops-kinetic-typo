import * as THREE from 'three';
import Gl from './index';

import shaders from './shaders';

// THREE BMFONT TEXT
import loadFont from 'load-bmfont';
import createGeometry from 'three-bmfont-text';
import MSDFShader from 'three-bmfont-text/shaders/msdf';
import fontFile from '../../assets/Orbitron-Black.fnt';
import fontAtlas from '../../assets/Orbitron-Black.png';

export default class extends THREE.Object3D {
  init(opts) {
    this.word = opts.word;
    this.wordColor = opts.color;
    this.fillColor = opts.fill;
    this.wordPosition = opts.position;
    this.wordScale = opts.scale;

    // Create geometry of packed glyphs
    loadFont(fontFile, (err, font) => {
      this.fontGeometry = createGeometry({
        font,
        text: this.word,
      })

      // Load texture containing font glyps
      this.loader = new THREE.TextureLoader();
      this.loader.load(fontAtlas, (texture) => {
        this.fontMaterial = new THREE.RawShaderMaterial(
          MSDFShader({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true,
            negate: false,
            color: this.wordColor
          })
        );

        this.createRenderTarget();
        this.createMesh();
      });  
    });    
  }

  createRenderTarget() {
    // Render Target setup
    this.rt = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
    this.rtCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    this.rtCamera.position.z = 2.4;
    
    this.rtScene = new THREE.Scene();
    this.rtScene.background = new THREE.Color(this.fillColor);

    this.text = new THREE.Mesh(this.fontGeometry, this.fontMaterial);
    this.text.position.set(...this.wordPosition); 
    this.text.rotation.set(Math.PI, 0, 0);  
    this.text.scale.set(...this.wordScale);
    this.rtScene.add(this.text);    
  }

  createMesh() {
    this.geometry = new THREE.TorusKnotGeometry(9, 3, 768, 3, 4, 3);

    this.material = new THREE.ShaderMaterial({
      vertexShader: shaders.vertex.demo1,
      fragmentShader: shaders.fragment.demo1,
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: this.rt.texture },
      },
      defines: {
        PI: Math.PI
      },
      // wireframe: true,
      side: THREE.DoubleSide
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.set(0, 0, Math.PI * -0.25);

    this.mesh.onBeforeRender = (renderer) => {
      renderer.setRenderTarget(this.rt);
      renderer.render(this.rtScene, this.rtCamera);
      renderer.setRenderTarget(null);    
    }    

    this.add(this.mesh);

    Gl.scene.add(this);  
  }  

  updateTime(time) {
    this.material.uniforms.uTime.value = time;
  }    
}