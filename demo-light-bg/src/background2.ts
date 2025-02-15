import {
  GLSL3,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  RawShaderMaterial,
  Texture,
  Vector2
} from 'three';
import { getCoordAsPixel } from '~/utils';
import vertexShader from './glsl/background.vs';
import fragmentShader from './glsl/background2.fs';

export class Background extends Mesh<PlaneGeometry, RawShaderMaterial> {
  time: number;

  constructor() {
    super(
      new PlaneGeometry(1, 1, 1, 1),
      new RawShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: new Vector2() },  
          uNoiseTexture: { value: null },
          uImageTexture: { value: null },
        },
        vertexShader,
        fragmentShader,
        glslVersion: GLSL3,
      }),
    );

    this.time = 0;
  }
  start(noiseTexture: Texture, imageTexture: Texture) {
    this.material.uniforms.uNoiseTexture.value = noiseTexture;
    this.material.uniforms.uImageTexture.value = imageTexture;
  }
  update(time: number) {
    this.time += time;
    this.material.uniforms.uTime.value = this.time;
  }
  resize(resolution: Vector2, camera: PerspectiveCamera) {
    const coordAsPixel = getCoordAsPixel(camera, this.position);

    this.material.uniforms.uResolution.value.copy(resolution);
    this.scale.set(coordAsPixel.x, coordAsPixel.y, 1);
  }
}
