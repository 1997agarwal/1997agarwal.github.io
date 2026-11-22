import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * SpatialMonolithCanvas
 * Executive 3D architectural artifact rendering a precision obsidian-and-glass
 * geometric monolith with orbital telemetry rings. Reacts smoothly to scroll position
 * and mouse cursor with dampened inertia (lerp).
 * 
 * Fully non-intrusive, pointer-events-none, high performance, and accessible.
 */
export default function SpatialMonolithCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    // Respect reduced motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    let animationFrameId;
    let renderer;
    let scene;
    let camera;

    // Target rotation & scale values for smooth lerp
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;
    let scrollProgress = 0;
    let targetScrollProgress = 0;
    let mouseX = 0;
    let mouseY = 0;

    try {
      scene = new THREE.Scene();

      const width = container.clientWidth || 400;
      const height = container.clientHeight || 600;

      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 0, 7.5);

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0x06b6d4, 2.5); // Cyan key
      keyLight.position.set(5, 5, 5);
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0x3b82f6, 1.8); // Blue fill
      fillLight.position.set(-5, -3, 2);
      scene.add(fillLight);

      const rimLight = new THREE.PointLight(0xf59e0b, 1.5, 10); // Amber rim
      rimLight.position.set(0, 4, -3);
      scene.add(rimLight);

      // Core Monolith Group
      const monolithGroup = new THREE.Group();
      scene.add(monolithGroup);

      // 1. Central Faceted Crystal (Octahedron with bevel)
      const coreGeometry = new THREE.OctahedronGeometry(1.6, 0);
      const coreMaterial = new THREE.MeshStandardMaterial({
        color: 0x0b1329,
        metalness: 0.9,
        roughness: 0.15,
        wireframe: false,
        flatShading: true,
      });
      const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
      monolithGroup.add(coreMesh);

      // 2. Precision Glowing Wireframe Cage
      const edges = new THREE.EdgesGeometry(coreGeometry);
      const wireframeMaterial = new THREE.LineBasicMaterial({
        color: 0x22d3ee,
        linewidth: 1.5,
        transparent: true,
        opacity: 0.75,
      });
      const wireframe = new THREE.LineSegments(edges, wireframeMaterial);
      monolithGroup.add(wireframe);

      // 3. Orbital Telemetry Ring (Outer Gyroscope)
      const ringGeometry = new THREE.TorusGeometry(2.4, 0.02, 16, 100);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.35,
      });
      const orbitalRing1 = new THREE.Mesh(ringGeometry, ringMaterial);
      orbitalRing1.rotation.x = Math.PI / 3;
      scene.add(orbitalRing1);

      // 4. Secondary Telemetry Ring (Inner Orthogonal)
      const ringGeometry2 = new THREE.TorusGeometry(2.1, 0.015, 16, 80);
      const ringMaterial2 = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.25,
      });
      const orbitalRing2 = new THREE.Mesh(ringGeometry2, ringMaterial2);
      orbitalRing2.rotation.y = Math.PI / 4;
      scene.add(orbitalRing2);

      // 5. Satellite Nodes (Data Packets / Escrow Blocks)
      const nodeCount = 4;
      const nodes = [];
      const nodeGeo = new THREE.BoxGeometry(0.12, 0.12, 0.12);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x06b6d4,
        emissiveIntensity: 0.5,
        roughness: 0.2,
      });

      for (let i = 0; i < nodeCount; i++) {
        const node = new THREE.Mesh(nodeGeo, nodeMat);
        scene.add(node);
        nodes.push({
          mesh: node,
          angle: (i * Math.PI * 2) / nodeCount,
          radius: 2.4,
          speed: 0.008 + i * 0.002,
        });
      }

      // Event Listeners for Cursor and Scroll
      const handleMouseMove = (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      };

      const handleScroll = () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (maxScroll > 0) {
          targetScrollProgress = window.scrollY / maxScroll;
        }
      };

      const handleResize = () => {
        if (!container) return;
        const w = container.clientWidth || 400;
        const h = container.clientHeight || 600;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleResize);
      handleScroll();

      // Render Loop with Dampened Lerp
      let clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        // Smooth scroll interpolation
        scrollProgress += (targetScrollProgress - scrollProgress) * 0.05;

        // Camera / Monolith interactive tilt
        targetRotationY = mouseX * 0.4 + scrollProgress * Math.PI * 4;
        targetRotationX = mouseY * 0.3 + Math.sin(scrollProgress * Math.PI * 2) * 0.5;

        currentRotationY += (targetRotationY - currentRotationY) * 0.05;
        currentRotationX += (targetRotationX - currentRotationX) * 0.05;

        monolithGroup.rotation.y = currentRotationY + elapsedTime * 0.1;
        monolithGroup.rotation.x = currentRotationX;
        monolithGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.15;

        // Counter-rotating rings
        orbitalRing1.rotation.z = elapsedTime * 0.15 + scrollProgress * Math.PI;
        orbitalRing1.rotation.x = Math.PI / 3 + Math.sin(elapsedTime * 0.3) * 0.1;

        orbitalRing2.rotation.z = -elapsedTime * 0.2 + scrollProgress * Math.PI * 0.5;

        // Orbiting satellite nodes
        nodes.forEach((n) => {
          n.angle += n.speed;
          n.mesh.position.x = Math.cos(n.angle) * n.radius;
          n.mesh.position.y = Math.sin(n.angle) * Math.sin(Math.PI / 3) * n.radius + Math.sin(elapsedTime) * 0.1;
          n.mesh.position.z = Math.sin(n.angle) * Math.cos(Math.PI / 3) * n.radius;
          n.mesh.rotation.x += 0.02;
          n.mesh.rotation.y += 0.02;
        });

        // Dynamic theme shift based on scroll sections
        // Scroll 0.0-0.2: Cyan/Blue (Hero)
        // Scroll 0.2-0.45: Indigo/Blue (Tekion / Corporate)
        // Scroll 0.45-0.7: Emerald/Gold (Trippy & FixIT)
        // Scroll 0.7-1.0: Cyan/Purple (Open Source & Accolades)
        if (scrollProgress < 0.25) {
          wireframeMaterial.color.setHex(0x22d3ee); // Cyan
        } else if (scrollProgress < 0.5) {
          wireframeMaterial.color.setHex(0x60a5fa); // Indigo / Blue
        } else if (scrollProgress < 0.75) {
          wireframeMaterial.color.setHex(0x34d399); // Emerald
        } else {
          wireframeMaterial.color.setHex(0xf59e0b); // Amber
        }

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);

        // Cleanup WebGL resources
        if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
          renderer.dispose();
        }
        coreGeometry.dispose();
        coreMaterial.dispose();
        edges.dispose();
        wireframeMaterial.dispose();
        ringGeometry.dispose();
        ringMaterial.dispose();
        ringGeometry2.dispose();
        ringMaterial2.dispose();
        nodeGeo.dispose();
        nodeMat.dispose();
      };
    } catch (err) {
      console.warn('SpatialMonolithCanvas WebGL initialization bypassed:', err);
    }
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 right-0 w-[420px] lg:w-[480px] xl:w-[560px] h-screen pointer-events-none z-0 hidden lg:block opacity-75 transition-opacity duration-1000 overflow-hidden"
    >
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
}
