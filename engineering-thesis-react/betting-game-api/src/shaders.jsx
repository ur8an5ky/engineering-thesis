export const vertexShader = /* glsl */ `
  uniform float uTime;

  varying vec3 vPosition;
  varying vec2 vUv;
  varying vec3 vNormal;

  float wave(float waveSize, float tipDistance, float centerDistance) {
    bool isTip = (gl_VertexID + 1) % 5 == 0;

    float waveDistance = isTip ? tipDistance : centerDistance;
    return sin((uTime / 2000.0) + waveSize) * waveDistance;
  }

  void main() {
    vPosition = position;
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);

    if (vPosition.y < 0.0) {
      vPosition.y = 0.0;
    } else {
      vPosition.x += wave(uv.x * 10.0, 0.3, 0.1);      
    }

    gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
  }
`

export const fragmentShader = /* glsl */ `
  varying vec3 vPosition;
  varying vec2 vUv;
  varying vec3 vNormal;

  vec3 green = vec3(0.2, 0.6, 0.3); // Podstawowy kolor zielony
  vec3 yellow = vec3(0.8, 0.8, 0.2); // Dodanie żółtego koloru
  vec3 white = vec3(1.0, 1.0, 1.0); // Biały kolor

  void main() {
    vec3 color = mix(green, yellow, 0.4); // Mieszanie zielonego z odrobiną żółtego
    color = mix(color, white, 0.3); // Dodanie odrobiny bieli do mieszanki
    color = mix(color, color * 0.7, vPosition.y);

    float lighting = normalize(dot(vNormal, vec3(10)));
    gl_FragColor = vec4(color + lighting * 0.03, 1.0);
  }
`;
