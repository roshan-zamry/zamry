"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const ThreeScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      60,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1, 4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Optional: HDR Environment (only if you have studio.hdr in /public/hdr/)
    new RGBELoader()
      .setPath("/hdr/")
      .load("studio.hdr", (hdr: THREE.Texture) => {
        hdr.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = hdr;
      });

    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 256, 32);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffa500,
      metalness: 1,
      roughness: 0.2,
      clearcoat: 0.3,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableRotate = true;
    controls.enableZoom = false;
    controls.enablePan = false;
    renderer.domElement.addEventListener("contextmenu", (e) =>
      e.preventDefault()
    );

    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      mesh.rotation.x = t * 0.3;
      mesh.rotation.y = t * 0.5;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      currentMount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default ThreeScene;
