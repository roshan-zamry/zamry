"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

interface ThreeSceneProps {
  scaleFactor?: number; // default 0.6
  height?: string; // default "100%"
}

// Define the Font type based on Three.js structure
type ThreeFont = ReturnType<FontLoader["parse"]>;

const ThreeScene = ({
  scaleFactor = 0.6,
  height = "100%",
}: ThreeSceneProps) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // --- Scene + Camera ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1, 6);

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(new THREE.Color("rgb(20, 27, 99)"), 0.2); // semi-transparent bg
    currentMount.appendChild(renderer.domElement);

    // --- Lights ---
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    const spot1 = new THREE.SpotLight(0xffd966, 2, 15, Math.PI / 4);
    spot1.position.set(5, 5, 5);
    scene.add(spot1);

    const spot2 = new THREE.SpotLight(0xffd966, 1.5, 15, Math.PI / 4);
    spot2.position.set(-5, -3, -5);
    scene.add(spot2);

    // --- Environment Map ---
    const cubeTextureLoader = new THREE.CubeTextureLoader();
    const envMap = cubeTextureLoader.load([
      "https://threejs.org/examples/textures/cube/Bridge2/posx.jpg",
      "https://threejs.org/examples/textures/cube/Bridge2/negx.jpg",
      "https://threejs.org/examples/textures/cube/Bridge2/posy.jpg",
      "https://threejs.org/examples/textures/cube/Bridge2/negy.jpg",
      "https://threejs.org/examples/textures/cube/Bridge2/posz.jpg",
      "https://threejs.org/examples/textures/cube/Bridge2/negz.jpg",
    ]);

    // --- Golden Letter ---
    const loader = new FontLoader();

    // Function to create text geometry with the loaded font
    const createTextGeometry = (font: ThreeFont) => {
      const textGeo = new TextGeometry("<rz />", {
        font,
        size: 1.5,
        depth: 0.2,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.03,
        bevelSegments: 6,
      });

      textGeo.computeBoundingBox();
      textGeo.center();
      //material color
      const material = new THREE.MeshPhysicalMaterial({
        color: 0x9370db,
        metalness: 1,
        roughness: 0.15,
        envMap: envMap,
        envMapIntensity: 1.5,
        clearcoat: 1,
        clearcoatRoughness: 0,
      });

      const letterMesh = new THREE.Mesh(textGeo, material);

      letterMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
      letterMesh.position.set(0, 0, 0);

      scene.add(letterMesh);

      // --- Controls ---
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableRotate = true;

      controls.minPolarAngle = Math.PI / 2;
      controls.maxPolarAngle = Math.PI / 2;

      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 1.5;

      // --- Animation ---
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();
    };

    const loadFallbackFont = () => {
      console.warn("Custom font failed to load, using fallback font");
      loader.load(
        "https://threejs.org/examples/fonts/helvetiker_bold.typeface.json",
        (font) => createTextGeometry(font)
      );
    };

    try {
      loader.load(
        "/fonts/Asimovian_Regular.json",
        (font) => createTextGeometry(font),
        undefined,
        (error) => {
          console.error("Error loading custom font:", error);
          loadFallbackFont();
        }
      );
    } catch (error) {
      console.error("Error in font loading:", error);
      loadFallbackFont();
    }

    // --- Handle resize ---
    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [scaleFactor]);

  return <div ref={mountRef} className="w-full" style={{ height }} />;
};

export default ThreeScene;
