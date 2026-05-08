import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/models/car.glb";

function CarModel({ color }: { color: string }) {
  const { scene } = useGLTF(MODEL_URL);
  const groupRef = useRef<THREE.Group>(null!);

  // Clone once so we can mutate materials without polluting cache
  const cloned = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    const target = new THREE.Color(color);
    cloned.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!(mesh as any).isMesh) return;
      const name = (mesh.name || "").toLowerCase();
      const isBody =
        !name.includes("glass") &&
        !name.includes("window") &&
        !name.includes("wheel") &&
        !name.includes("rim") &&
        !name.includes("tyre") &&
        !name.includes("tire") &&
        !name.includes("brake") &&
        !name.includes("interior") &&
        !name.includes("light") &&
        !name.includes("plate");
      const mat = mesh.material as THREE.MeshStandardMaterial | THREE.MeshStandardMaterial[];
      const apply = (m: THREE.Material) => {
        const sm = m as THREE.MeshStandardMaterial;
        if (!sm.isMaterial) return;
        // Always clone to avoid sharing
        if (!(sm as any).__cloned) {
          const c = sm.clone();
          (c as any).__cloned = true;
          (mesh as any).material = c;
        }
      };
      if (Array.isArray(mat)) mat.forEach(apply);
      else apply(mat);

      const final = mesh.material as THREE.MeshStandardMaterial | THREE.MeshStandardMaterial[];
      const setColor = (m: THREE.MeshStandardMaterial) => {
        if (!isBody) return;
        m.color.copy(target);
        m.metalness = 0.85;
        m.roughness = 0.25;
        m.needsUpdate = true;
      };
      if (Array.isArray(final)) final.forEach(setColor);
      else setColor(final);
    });
  }, [cloned, color]);

  useFrame((_, dt) => {
    if (groupRef.current) groupRef.current.rotation.y += dt * 0.35; // ~18s/volta
  });

  return (
    <group ref={groupRef}>
      <primitive object={cloned} />
    </group>
  );
}

useGLTF.preload(MODEL_URL);

export function Car3DViewer({ color = "#888888" }: { color?: string }) {
  return (
    <Canvas
      shadows
      camera={{ position: [4.5, 1.6, 5.5], fov: 35 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#0a0a0a"]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-5, 3, -5]} intensity={0.6} color="#ff3355" />
      <Suspense fallback={null}>
        <CarModel color={color} />
        <ContactShadows position={[0, -0.05, 0]} opacity={0.6} scale={10} blur={2.4} far={4} />
        <Environment preset="city" />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2.05}
      />
    </Canvas>
  );
}
