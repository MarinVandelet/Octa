import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";

function DemoMesh() {
  return (
    <group>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.1, 1.4, 0.35]} />
        <meshStandardMaterial />
      </mesh>

      {/* Sleeves */}
      <mesh position={[-0.85, 0.05, 0]}>
        <boxGeometry args={[0.55, 0.5, 0.35]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[0.85, 0.05, 0]}>
        <boxGeometry args={[0.55, 0.5, 0.35]} />
        <meshStandardMaterial />
      </mesh>

      {/* Hood */}
      <mesh position={[0, 0.8, -0.05]}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial />
      </mesh>
    </group>
  );
}

export default function ProductViewer3D() {
  return (
    <div className="rounded-2xl border border-neutral-800 overflow-hidden bg-neutral-950">
      <div className="px-4 py-3 border-b border-neutral-800 text-sm text-neutral-300">
        Vue 3D (démo)
      </div>
      <div className="h-[420px]">
        <Canvas camera={{ position: [0, 1.2, 2.6], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 3, 2]} intensity={1.2} />
          <Environment preset="city" />
          <DemoMesh />
          <OrbitControls enablePan={false} />
        </Canvas>
      </div>
    </div>
  );
}
