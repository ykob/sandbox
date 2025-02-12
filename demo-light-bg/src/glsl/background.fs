precision highp float;

uniform sampler2D uNoiseTexture;
uniform sampler2D uImageTexture;
uniform float uTime;

in vec2 vUv;

out vec4 fragColor;

void main() {
  vec2 noiseUv = vec2(vUv.x, vUv.y * 9.0 / 16.0 + (1.0 - 9.0 / 16.0) / 2.0);
  vec3 noise1 = texture(uNoiseTexture, noiseUv * 0.5 + vec2(uTime * 0.03, 0.0)).rgb;
  vec3 noise2 = texture(uNoiseTexture, noiseUv * 0.5 + vec2(uTime * -0.03, 0.5)).rgb;
  vec3 noiseAmount = ((noise1 + noise2) - 1.0);
  vec3 baseColor = texture(uImageTexture, vUv).rgb;
  vec3 lightColor = smoothstep(0.9, 1.0, texture(uImageTexture, vUv + noiseAmount.rg * 0.08).rgb);

  fragColor = vec4(baseColor + lightColor * 0.06, 1.0);
}