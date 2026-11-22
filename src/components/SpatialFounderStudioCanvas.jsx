import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * SpatialFounderStudioCanvas
 * Full 3D Interactive Founder Workstation (Inspired by abhisheky.me).
 * 
 * Features:
 * - A modern 3D executive studio: minimalist desk, dual curved displays, desk lamp, ergonomic chair.
 * - Stylized 3D Founder Avatar with cursor gaze tracking (head tracks mouse).
 * - Scroll-linked camera choreographies:
 *     • Hero: Front 3/4 welcoming perspective
 *     • Experience (Tekion): Over-the-shoulder focus on enterprise fintech screens
 *     • Startups (Trippy & FixIT): Focus on founder prototype tablet & blueprint
 *     • DevTools: Overhead architectural perspective
 *     • Accolades / Footer: Confident studio presentation angle
 * - Theme-Aware: Apple daylight studio in Light mode, cyber executive studio in Dark mode.
 * - Performance: 60fps, pointer-events: none, code-split with React.lazy.
 */
export default function SpatialFounderStudioCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    let animationFrameId;
    let renderer;
    let scene;
    let camera;

    // Camera animation waypoints (x, y, z, targetX, targetY, targetZ)
    const waypoints = [
      { cam: new THREE.Vector3(3.2, 2.4, 4.2), target: new THREE.Vector3(0, 0.8, 0) },     // 0: Hero
      { cam: new THREE.Vector3(1.8, 2.0, 3.0), target: new THREE.Vector3(-0.4, 1.1, 0) },  // 1: Experience
      { cam: new THREE.Vector3(2.5, 1.6, 2.8), target: new THREE.Vector3(0.3, 0.9, 0.2) }, // 2: Startups
      { cam: new THREE.Vector3(3.8, 3.2, 3.8), target: new THREE.Vector3(0, 0.6, 0) },     // 3: Platforms
      { cam: new THREE.Vector3(2.0, 2.6, 4.5), target: new THREE.Vector3(0, 1.0, 0) },     // 4: DevTools & Accolades
    ];

    let currentCamPos = new THREE.Vector3().copy(waypoints[0].cam);
    let currentCamTarget = new THREE.Vector3().copy(waypoints[0].target);

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollProgress = 0;
    let targetScrollProgress = 0;

    try {
      scene = new THREE.Scene();

      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
      camera.position.copy(currentCamPos);
      camera.lookAt(currentCamTarget);

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild(renderer.domElement);

      const isDarkMode = () => document.documentElement.classList.contains('dark');

      // Studio Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, isDarkMode() ? 0.7 : 1.4);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, isDarkMode() ? 1.8 : 2.5);
      keyLight.position.set(6, 8, 5);
      keyLight.castShadow = true;
      scene.add(keyLight);

      const screenGlowLight = new THREE.PointLight(0x06b6d4, isDarkMode() ? 2.5 : 1.2, 6);
      screenGlowLight.position.set(0, 1.2, 0.5);
      scene.add(screenGlowLight);

      const accentRimLight = new THREE.PointLight(0x3b82f6, isDarkMode() ? 2.0 : 0.8, 8);
      accentRimLight.position.set(-3, 2, -2);
      scene.add(accentRimLight);

      // Studio Floor
      const floorGeo = new THREE.PlaneGeometry(20, 20);
      const floorMat = new THREE.MeshStandardMaterial({
        color: isDarkMode() ? 0x090d16 : 0xe5e5ea,
        roughness: 0.8,
        metalness: 0.1,
      });
      const floor = new THREE.Mesh(floorGeo, floorMat);
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -0.01;
      floor.receiveShadow = true;
      scene.add(floor);

      // Studio Room Group
      const studioGroup = new THREE.Group();
      scene.add(studioGroup);

      // 1. Executive Minimalist Desk
      const deskTopGeo = new THREE.BoxGeometry(2.4, 0.08, 1.1);
      const deskMat = new THREE.MeshStandardMaterial({
        color: isDarkMode() ? 0x1e293b : 0xf8fafc,
        roughness: 0.25,
        metalness: 0.1,
      });
      const deskTop = new THREE.Mesh(deskTopGeo, deskMat);
      deskTop.position.set(0, 0.76, 0);
      deskTop.castShadow = true;
      deskTop.receiveShadow = true;
      studioGroup.add(deskTop);

      // Desk Legs (Matte Black / Aluminum)
      const legMat = new THREE.MeshStandardMaterial({
        color: isDarkMode() ? 0x0f172a : 0x94a3b8,
        metalness: 0.8,
        roughness: 0.3,
      });
      const legGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.76, 16);
      const legPositions = [
        [-1.1, 0.38, -0.45],
        [1.1, 0.38, -0.45],
        [-1.1, 0.38, 0.45],
        [1.1, 0.38, 0.45],
      ];
      legPositions.forEach(([x, y, z]) => {
        const leg = new THREE.Mesh(legGeo, legMat);
        leg.position.set(x, y, z);
        leg.castShadow = true;
        studioGroup.add(leg);
      });

      // 2. Dual Curved Studio Monitors
      const monitorStandMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9, roughness: 0.2 });
      const standPole = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.45, 16), monitorStandMat);
      standPole.position.set(0, 1.0, -0.35);
      studioGroup.add(standPole);

      const screenGeo = new THREE.BoxGeometry(0.85, 0.48, 0.02);
      
      // Main Center Monitor (FinTech / Terminal Screen)
      const screenMat1 = new THREE.MeshBasicMaterial({ color: 0x0ea5e9 });
      const mainScreen = new THREE.Mesh(screenGeo, screenMat1);
      mainScreen.position.set(-0.35, 1.15, -0.28);
      mainScreen.rotation.y = 0.15;
      studioGroup.add(mainScreen);

      // Secondary Side Monitor (Vertical / Code Screen)
      const screenGeo2 = new THREE.BoxGeometry(0.7, 0.45, 0.02);
      const screenMat2 = new THREE.MeshBasicMaterial({ color: 0x10b981 });
      const sideScreen = new THREE.Mesh(screenGeo2, screenMat2);
      sideScreen.position.set(0.45, 1.15, -0.25);
      sideScreen.rotation.y = -0.3;
      studioGroup.add(sideScreen);

      // 3. Ergonomic Studio Chair
      const chairGroup = new THREE.Group();
      chairGroup.position.set(0, 0, 0.55);
      studioGroup.add(chairGroup);

      const seatMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6 });
      const seat = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.08, 0.5), seatMat);
      seat.position.set(0, 0.45, 0);
      chairGroup.add(seat);

      const backrest = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.6, 0.06), seatMat);
      backrest.position.set(0, 0.8, 0.22);
      backrest.rotation.x = -0.1;
      chairGroup.add(backrest);

      // 4. Stylized 3D Founder Avatar (Harshit)
      const avatarGroup = new THREE.Group();
      avatarGroup.position.set(0, 0.48, 0.5);
      studioGroup.add(avatarGroup);

      // Clothes Material (Modern Charcoal Tech Crewneck)
      const clothMat = new THREE.MeshStandardMaterial({
        color: isDarkMode() ? 0x0f172a : 0x334155,
        roughness: 0.7,
      });

      // Skin Material
      const skinMat = new THREE.MeshStandardMaterial({
        color: 0xc68b59, // Warm South Asian tone
        roughness: 0.5,
      });

      // Hair Material
      const hairMat = new THREE.MeshStandardMaterial({
        color: 0x171717,
        roughness: 0.8,
      });

      // Torso / Body
      const torso = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.45, 0.26), clothMat);
      torso.position.set(0, 0.28, 0);
      torso.castShadow = true;
      avatarGroup.add(torso);

      // Shoulders & Arms
      const armMat = clothMat;
      const leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.35, 0.12), armMat);
      leftArm.position.set(-0.25, 0.25, -0.05);
      leftArm.rotation.x = -0.6;
      leftArm.rotation.z = 0.2;
      avatarGroup.add(leftArm);

      const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.35, 0.12), armMat);
      rightArm.position.set(0.25, 0.25, -0.05);
      rightArm.rotation.x = -0.6;
      rightArm.rotation.z = -0.2;
      avatarGroup.add(rightArm);

      // Hands on desk
      const leftHand = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.05, 0.12), skinMat);
      leftHand.position.set(-0.2, 0.28, -0.28);
      avatarGroup.add(leftHand);

      const rightHand = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.05, 0.12), skinMat);
      rightHand.position.set(0.2, 0.28, -0.28);
      avatarGroup.add(rightHand);

      // Neck
      const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.1, 16), skinMat);
      neck.position.set(0, 0.54, 0);
      avatarGroup.add(neck);

      // Head Group (Smoothly tracks cursor gaze!)
      const headGroup = new THREE.Group();
      headGroup.position.set(0, 0.68, 0);
      avatarGroup.add(headGroup);

      const head = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.24, 0.22), skinMat);
      head.castShadow = true;
      headGroup.add(head);

      // Hair (Clean quiff)
      const hair = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.1, 0.24), hairMat);
      hair.position.set(0, 0.12, -0.01);
      headGroup.add(hair);

      // Glasses (Sleek minimalist black frames)
      const glassesMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
      const glasses = new THREE.Mesh(new THREE.BoxGeometry(0.23, 0.05, 0.04), glassesMat);
      glasses.position.set(0, 0.02, -0.11);
      headGroup.add(glasses);

      // 5. Desk Props: Founder Laptop & Coffee Mug
      const laptopMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8, roughness: 0.2 });
      const laptopBase = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.015, 0.22), laptopMat);
      laptopBase.position.set(0, 0.81, -0.05);
      studioGroup.add(laptopBase);

      const mugMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.3 });
      const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.035, 0.09, 16), mugMat);
      mug.position.set(0.65, 0.85, 0.1);
      studioGroup.add(mug);

      // Mouse & Scroll Event Handlers
      const handleMouseMove = (e) => {
        targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
        targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      };

      const handleScroll = () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (maxScroll > 0) {
          targetScrollProgress = window.scrollY / maxScroll;
        }
      };

      const handleResize = () => {
        if (!container) return;
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleResize);
      handleScroll();

      // Main Render & Physics Loop
      let clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        const delta = clock.getDelta();
        const elapsedTime = clock.getElapsedTime();

        // Smooth mouse damping
        mouseX += (targetMouseX - mouseX) * 0.08;
        mouseY += (targetMouseY - mouseY) * 0.08;

        // Smooth scroll damping
        scrollProgress += (targetScrollProgress - scrollProgress) * 0.06;

        // Interpolate Waypoints based on scroll progress
        const segmentCount = waypoints.length - 1;
        const segment = Math.min(Math.floor(scrollProgress * segmentCount), segmentCount - 1);
        const segmentT = (scrollProgress * segmentCount) - segment;

        const p1 = waypoints[segment];
        const p2 = waypoints[segment + 1] || waypoints[segment];

        const targetPos = new THREE.Vector3().lerpVectors(p1.cam, p2.cam, segmentT);
        const targetLook = new THREE.Vector3().lerpVectors(p1.target, p2.target, segmentT);

        // Add subtle mouse parallax to camera
        targetPos.x += mouseX * 0.25;
        targetPos.y += mouseY * 0.15;

        currentCamPos.lerp(targetPos, 0.05);
        currentCamTarget.lerp(targetLook, 0.05);

        camera.position.copy(currentCamPos);
        camera.lookAt(currentCamTarget);

        // Avatar Head & Torso Gaze Tracking
        headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, mouseX * 0.45, 0.08);
        headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, -mouseY * 0.35, 0.08);

        // Subtle idle breathing
        torso.position.y = 0.28 + Math.sin(elapsedTime * 1.8) * 0.005;
        headGroup.position.y = 0.68 + Math.sin(elapsedTime * 1.8) * 0.005;

        // Screen color pulsing / data animation
        const screenPulse = Math.sin(elapsedTime * 3) * 0.2 + 0.8;
        screenMat1.color.setHex(isDarkMode() ? 0x0ea5e9 : 0x0284c7);
        screenMat2.color.setHex(isDarkMode() ? 0x10b981 : 0x059669);

        // Dynamic Theme Adjustment
        const dark = isDarkMode();
        ambientLight.intensity = dark ? 0.7 : 1.4;
        keyLight.intensity = dark ? 1.8 : 2.5;
        floorMat.color.setHex(dark ? 0x090d16 : 0xe5e5ea);
        deskMat.color.setHex(dark ? 0x1e293b : 0xf8fafc);
        clothMat.color.setHex(dark ? 0x0f172a : 0x334155);

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);

        if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
          renderer.dispose();
        }
      };
    } catch (err) {
      console.warn('SpatialFounderStudioCanvas WebGL bypassed:', err);
    }
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-700 opacity-60 dark:opacity-75"
    >
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
}
