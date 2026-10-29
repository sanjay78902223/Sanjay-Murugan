import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { calculateCubeState } from '../utils/scrollMath';

interface CubeCanvasProps {
  progress: number; // 0.0 to 1.0
}

export const CubeCanvas: React.FC<CubeCanvasProps> = ({ progress }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const cubeGroupRef = useRef<THREE.Group | null>(null);
  const innerCoreRef = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const frameIdRef = useRef<number>(0);
  const progressRef = useRef<number>(progress);

  // Keep progressRef updated without re-triggering effect
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect software WebGL to balance rendering cost
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Background fog to blend with deep navy canvas
    scene.fog = new THREE.FogExp2(0x05070d, 0.045);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting Rig (Studio Key, Rim, and Electric Cyan accents)
    const ambientLight = new THREE.AmbientLight(0x0f1c3f, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x00f0ff, 2.5);
    keyLight.position.set(5, 6, 8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x3b82f6, 3.0);
    rimLight.position.set(-6, -4, -5);
    scene.add(rimLight);

    const pointLight = new THREE.PointLight(0x00f0ff, 2.0, 15);
    pointLight.position.set(0, 0, 0); // Illuminates the hollow cube from inside
    scene.add(pointLight);

    // 5. Construct Composite 3D Cube (Hierarchical multi-part group)
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);
    cubeGroupRef.current = masterGroup;

    // Part A: Main Outer Cube with Chamfered Frame / Wireframe edges
    const boxSize = 2.4;
    const boxGeo = new THREE.BoxGeometry(boxSize, boxSize, boxSize);

    // Create custom canvas texture for high-tech cyber cube faces
    const createFaceTexture = (index: number) => {
      const cvs = document.createElement('canvas');
      cvs.width = 512;
      cvs.height = 512;
      const ctx = cvs.getContext('2d')!;

      // Deep dark blue base
      ctx.fillStyle = '#070b16';
      ctx.fillRect(0, 0, 512, 512);

      // Tech Grid
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
      ctx.lineWidth = 1.5;
      const step = 64;
      for (let x = 0; x <= 512; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 512);
        ctx.stroke();
      }
      for (let y = 0; y <= 512; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();
      }

      // Outer bezel line
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 6;
      ctx.strokeRect(16, 16, 480, 480);

      // Corner technical brackets
      ctx.lineWidth = 12;
      const len = 40;
      // top-left
      ctx.beginPath();
      ctx.moveTo(16, 16 + len);
      ctx.lineTo(16, 16);
      ctx.lineTo(16 + len, 16);
      ctx.stroke();
      // top-right
      ctx.beginPath();
      ctx.moveTo(496 - len, 16);
      ctx.lineTo(496, 16);
      ctx.lineTo(496, 16 + len);
      ctx.stroke();
      // bottom-left
      ctx.beginPath();
      ctx.moveTo(16, 496 - len);
      ctx.lineTo(16, 496);
      ctx.lineTo(16 + len, 496);
      ctx.stroke();
      // bottom-right
      ctx.beginPath();
      ctx.moveTo(496 - len, 496);
      ctx.lineTo(496, 496);
      ctx.lineTo(496, 496 - len);
      ctx.stroke();

      // Center typographic insignia
      ctx.fillStyle = '#00f0ff';
      ctx.font = 'bold 32px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const titles = ['AI VOICE', 'AUTOMATION', 'LEAD ENGINE', 'INTELLIGENCE', 'SAAN CODE', 'SCALE'];
      ctx.fillText(titles[index % titles.length], 256, 230);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '500 18px monospace';
      ctx.fillText(`PHASE_0${index + 1} // SECURE`, 256, 275);

      // Crosshair center
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(256, 256, 140, 0, Math.PI * 2);
      ctx.stroke();

      const tex = new THREE.CanvasTexture(cvs);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    const faceMaterials: THREE.Material[] = [];
    for (let i = 0; i < 6; i++) {
      faceMaterials.push(
        new THREE.MeshStandardMaterial({
          map: createFaceTexture(i),
          roughness: 0.25,
          metalness: 0.85,
          transparent: true,
          opacity: 0.92,
        })
      );
    }

    const mainCubeMesh = new THREE.Mesh(boxGeo, faceMaterials);
    masterGroup.add(mainCubeMesh);

    // Part B: Glowing Wireframe / Edge Highlights
    const edgesGeo = new THREE.EdgesGeometry(boxGeo);
    const edgesMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      linewidth: 2,
      transparent: true,
      opacity: 0.95,
    });
    const edgesMesh = new THREE.LineSegments(edgesGeo, edgesMat);
    masterGroup.add(edgesMesh);

    // Part C: Inner Rotating Core (Octahedron with glass/neon emissive)
    const coreGeo = new THREE.OctahedronGeometry(0.85, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00b4d8,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: true,
    });
    const innerCore = new THREE.Mesh(coreGeo, coreMat);
    masterGroup.add(innerCore);
    innerCoreRef.current = innerCore;

    // Part D: Surrounding Tech Nodes / Floating Orbital Rings
    const ringGeo = new THREE.TorusGeometry(1.9, 0.02, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x2563eb,
      transparent: true,
      opacity: 0.7,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh1.rotation.x = Math.PI / 4;
    masterGroup.add(ringMesh1);

    const ringMesh2 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh2.rotation.y = Math.PI / 3;
    masterGroup.add(ringMesh2);

    // Part E: Floating Ambient Particles Field
    const particleCount = isSoftwareGl ? 80 : 250;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 16;
      positions[i + 1] = (Math.random() - 0.5) * 16;
      positions[i + 2] = (Math.random() - 0.5) * 16;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // 6. Animation / Render Loop
    let lastTime = performance.now();
    const render = () => {
      const now = performance.now();
      const dt = (now - lastTime) * 0.001;
      lastTime = now;

      const p = progressRef.current;
      const state = calculateCubeState(p);

      if (masterGroup) {
        // Multi-axis rotation directly driven by scroll progress
        masterGroup.rotation.x = state.rotX;
        masterGroup.rotation.y = state.rotY;
        masterGroup.rotation.z = state.rotZ;

        // Scale and Z-position linked to scroll
        masterGroup.scale.set(state.scale, state.scale, state.scale);
        masterGroup.position.z = state.positionZ;

        // Smooth opacity transition
        masterGroup.visible = state.opacity > 0.01;
        mainCubeMesh.traverse((child) => {
          if (child instanceof THREE.Mesh && Array.isArray(child.material)) {
            child.material.forEach((mat) => {
              mat.opacity = state.opacity * 0.92;
            });
          }
        });
        edgesMat.opacity = state.opacity * 0.95;
      }

      if (innerCore) {
        // Counter-rotation of core for visual depth
        innerCore.rotation.x -= dt * 0.8;
        innerCore.rotation.y += dt * 1.2;
      }

      if (particles) {
        particles.rotation.y += dt * 0.05;
        particles.rotation.x += dt * 0.02;
      }

      renderer.render(scene, camera);
      frameIdRef.current = requestAnimationFrame(render);
    };

    render();

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameIdRef.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      boxGeo.dispose();
      edgesGeo.dispose();
      coreGeo.dispose();
      ringGeo.dispose();
      particleGeo.dispose();
      faceMaterials.forEach((m) => m.dispose());
      edgesMat.dispose();
      coreMat.dispose();
      ringMat.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full max-w-full overflow-hidden"
      style={{
        opacity: progress < 0.3 ? 0 : Math.min(1, (progress - 0.3) / 0.12),
        transition: 'opacity 0.2s ease-out',
      }}
      aria-hidden="true"
    />
  );
};
