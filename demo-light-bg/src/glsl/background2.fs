precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform sampler2D uNoiseTexture;
uniform sampler2D uImageTexture;

in vec2 vUv;

out vec4 fragColor;

void main() {
  vec2 imageResolution = vec2(5000.0, 3376.0);
  vec2 ratio = vec2(
    min((uResolution.x / uResolution.y) / (imageResolution.x / imageResolution.y), 1.0),
    min((uResolution.y / uResolution.x) / (imageResolution.y / imageResolution.x), 1.0)
  );
  vec2 uv = vec2(
    vUv.x * ratio.x,
    vUv.y * ratio.y + (1.0 - ratio.y)
  );
  vec2 noiseUv = vec2(uv.x, uv.y * 9.0 / 16.0 + (1.0 - 9.0 / 16.0) / 2.0);
  vec3 noise1 = texture(uNoiseTexture, noiseUv * 0.5 + vec2(uTime * 0.024, 0.0)).rgb;
  vec3 noise2 = texture(uNoiseTexture, noiseUv * 0.5 + vec2(uTime * -0.024, 0.5)).rgb;
  vec3 noiseAmount = ((noise1 + noise2) - 1.0);
  vec3 baseColor = texture(uImageTexture, uv).rgb;
  vec3 lightColor1 = smoothstep(0.86, 1.0, texture(uImageTexture, uv + noiseAmount.rg * 0.11).rgb);
  vec3 lightColor2 = smoothstep(0.86, 1.0, texture(uImageTexture, uv - noiseAmount.rg * 0.11).rgb);

  fragColor = vec4(baseColor + lightColor1 * 0.04 + lightColor2 * 0.04, 1.0);
}