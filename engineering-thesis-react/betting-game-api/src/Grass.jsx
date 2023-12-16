import * as THREE from 'three';
import { vertexShader, fragmentShader } from './shaders'

// Geometria trawy
const BLADE_WIDTH = 0.1
const BLADE_HEIGHT = 0.15
const BLADE_HEIGHT_VARIATION = 0.1125
const BLADE_VERTEX_COUNT = 5
const BLADE_TIP_OFFSET = 0.1

// Funkcja do interpolacji
function interpolate(val, oldMin, oldMax, newMin, newMax) {
  return ((val - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin
}

export class GrassGeometry extends THREE.BufferGeometry {
  constructor(size, count) {
    super()

    const positions = []
    const uvs = []
    const indices = []

    // Tworzenie każdego źdźbła trawy
    for (let i = 0; i < count; i++) {
      const surfaceMin = (size / 2) * -1
      const surfaceMax = size / 2
      const radius = (size / 2) * Math.random()
      const theta = Math.random() * 2 * Math.PI

      const x = radius * Math.cos(theta)
      const y = radius * Math.sin(theta)

      uvs.push(
        ...Array.from({ length: BLADE_VERTEX_COUNT }).flatMap(() => [
          interpolate(x, surfaceMin, surfaceMax, 0, 1),
          interpolate(y, surfaceMin, surfaceMax, 0, 1)
        ])
      )

      const blade = this.computeBlade([x, 0, y], i)
      positions.push(...blade.positions)
      indices.push(...blade.indices)
    }

    // Ustawianie atrybutów itp.
    this.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(positions), 3)
    )
    this.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2))
    this.setIndex(indices)
    this.computeVertexNormals()
  }

  // Funkcja tworząca pojedyncze źdźbło trawy
  computeBlade(center, index = 0) {
    const height = BLADE_HEIGHT + Math.random() * BLADE_HEIGHT_VARIATION
    const vIndex = index * BLADE_VERTEX_COUNT

    const yaw = Math.random() * Math.PI * 2
    const yawVec = [Math.sin(yaw), 0, -Math.cos(yaw)]
    const bend = Math.random() * Math.PI * 2
    const bendVec = [Math.sin(bend), 0, -Math.cos(bend)]

    const bl = yawVec.map((n, i) => n * (BLADE_WIDTH / 2) * 1 + center[i])
    const br = yawVec.map((n, i) => n * (BLADE_WIDTH / 2) * -1 + center[i])
    const tl = yawVec.map((n, i) => n * (BLADE_WIDTH / 4) * 1 + center[i])
    const tr = yawVec.map((n, i) => n * (BLADE_WIDTH / 4) * -1 + center[i])
    const tc = bendVec.map((n, i) => n * BLADE_TIP_OFFSET + center[i])

    tl[1] += height / 2
    tr[1] += height / 2
    tc[1] += height

    return {
      positions: [...bl, ...br, ...tr, ...tl, ...tc],
      indices: [
        vIndex,
        vIndex + 1,
        vIndex + 2,
        vIndex + 2,
        vIndex + 4,
        vIndex + 3,
        vIndex + 3,
        vIndex,
        vIndex + 2
      ]
    }
  }
}

class Grass extends THREE.Mesh {
  constructor(size, count) {
    const geometry = new GrassGeometry(size, count)
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 }
      },
      side: THREE.DoubleSide,
      vertexShader,
      fragmentShader
    })
    super(geometry, material)

    // Dodanie podłoża
    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(30, 8).rotateX(Math.PI / 2),
      material
    )
    floor.position.y = -Number.EPSILON
    this.add(floor)
  }

  update(time) {
    this.material.uniforms.uTime.value = time
  }
}

export default Grass
