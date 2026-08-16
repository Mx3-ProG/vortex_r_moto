import * as THREE from "three";

/**
 * Procedurally generated PBR materials — no external texture files needed.
 * FUTURE: swap the CanvasTexture calls below for real scanned maps
 * (see public/assets/motorcycle/README.md).
 */

let carbonTexture: THREE.CanvasTexture | null = null;
function getCarbonWeaveTexture(): THREE.CanvasTexture {
  if (carbonTexture) return carbonTexture;
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#0a0a0b";
  ctx.fillRect(0, 0, size, size);
  const cell = 8;
  for (let y = 0; y < size; y += cell) {
    for (let x = 0; x < size; x += cell) {
      const offset = (Math.floor(y / cell) % 2) * (cell / 2);
      ctx.fillStyle = (Math.floor((x + offset) / (cell / 2)) % 2) === 0 ? "#161618" : "#08080a";
      ctx.fillRect(x, y, cell, cell);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(24, 24);
  texture.colorSpace = THREE.SRGBColorSpace;
  carbonTexture = texture;
  return texture;
}

let brushedMetalTexture: THREE.CanvasTexture | null = null;
function getBrushedMetalTexture(): THREE.CanvasTexture {
  if (brushedMetalTexture) return brushedMetalTexture;
  const w = 256;
  const h = 32;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#9a9ca0";
  ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < 900; i++) {
    const y = Math.random() * h;
    const shade = 140 + Math.random() * 80;
    ctx.strokeStyle = `rgba(${shade},${shade},${shade + 4},${0.06 + Math.random() * 0.08})`;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y + (Math.random() - 0.5) * 2);
    ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  brushedMetalTexture = texture;
  return texture;
}

export function carbonFiberMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    map: getCarbonWeaveTexture(),
    color: new THREE.Color("#1a1a1c"),
    roughness: 0.35,
    metalness: 0.15,
    clearcoat: 0.6,
    clearcoatRoughness: 0.25,
  });
}

export function brushedMetalMaterial(tint = "#c7c9cd"): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    map: getBrushedMetalTexture(),
    color: new THREE.Color(tint),
    metalness: 0.9,
    roughness: 0.4,
    clearcoat: 0.1,
  });
}

export function glassMaterial(transmission = true): THREE.MeshPhysicalMaterial {
  if (transmission) {
    return new THREE.MeshPhysicalMaterial({
      color: "#c9d4d8",
      transmission: 1,
      roughness: 0.05,
      thickness: 0.4,
      ior: 1.45,
      metalness: 0,
      transparent: true,
    });
  }
  return new THREE.MeshPhysicalMaterial({
    color: "#c9d4d8",
    roughness: 0.1,
    metalness: 0,
    transparent: true,
    opacity: 0.35,
  });
}

export function paintRedMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: "#e10600",
    metalness: 0.3,
    roughness: 0.25,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  });
}

export function titaniumMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: "#b8b0a8",
    metalness: 0.85,
    roughness: 0.5,
    map: getBrushedMetalTexture(),
  });
}

export function blackPlasticMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: "#050505",
    roughness: 0.55,
    metalness: 0.05,
    clearcoat: 0.3,
  });
}
