import {
  GLSL3,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  RawShaderMaterial,
  Texture
} from 'three';
import { getCoordAsPixel } from '~/utils';
import fragmentShader from './glsl/background.fs';
import vertexShader from './glsl/background.vs';

export class Background extends Mesh<PlaneGeometry, RawShaderMaterial> {
  time: number;

  constructor() {
    super(
      new PlaneGeometry(1, 1, 24, 36),
      new RawShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
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
  update(camera: PerspectiveCamera, time: number) {
    const coordAsPixel = getCoordAsPixel(camera, this.position);

    this.time += time;
    this.scale.set(coordAsPixel.x, coordAsPixel.y, 1);
    this.material.uniforms.uTime.value = this.time;
  }
}
