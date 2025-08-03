"use client";

declare module "three/examples/jsm/loaders/RGBELoader" {
  import { Loader, Texture } from "three";
  export class RGBELoader extends Loader {
    load(
      url: string,
      onLoad?: (texture: Texture) => void,
      onProgress?: (event: ProgressEvent<EventTarget>) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
  }
}

declare module "three/examples/jsm/controls/OrbitControls" {
  import { Camera, EventDispatcher, MOUSE, TOUCH, Vector3 } from "three";

  export class OrbitControls extends EventDispatcher {
    constructor(object: Camera, domElement?: HTMLElement);

    // Properties (partial)
    enabled: boolean;
    target: Vector3;
    minDistance: number;
    maxDistance: number;
    minPolarAngle: number;
    maxPolarAngle: number;
    enableDamping: boolean;
    dampingFactor: number;
    enableZoom: boolean;
    zoomSpeed: number;
    enableRotate: boolean;
    rotateSpeed: number;
    enablePan: boolean;
    keyPanSpeed: number;
    autoRotate: boolean;
    autoRotateSpeed: number;
    screenSpacePanning: boolean;
    keys: { LEFT: number; UP: number; RIGHT: number; BOTTOM: number };
    mouseButtons: { LEFT: MOUSE; MIDDLE: MOUSE; RIGHT: MOUSE };
    touches: { ONE: TOUCH; TWO: TOUCH };

    update(): boolean;
    dispose(): void;
    reset(): void;
    saveState(): void;
    getPolarAngle(): number;
    getAzimuthalAngle(): number;
  }
}
