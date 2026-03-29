import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF, useAnimations } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

function Model({ sex, display, color }) {
  const group = useRef();

  let modelFile = "/homme_fixe.glb";

  if (sex === "homme" && display === "fixe") modelFile = "/homme_fixe.glb";
  if (sex === "homme" && display === "mouvement") modelFile = "/homme_mouvement2.glb";
  if (sex === "homme" && display === "seul") modelFile = "/homme_seul.glb";

  if (sex === "femme" && display === "fixe") modelFile = "/femme_fixe.glb";
  if (sex === "femme" && display === "mouvement") modelFile = "/femme_mouvement.glb";
  if (sex === "femme" && display === "seul") modelFile = "/femme_seul.glb";

  const { scene, animations } = useGLTF(modelFile);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const tshirtMesh = scene.getObjectByName("tshirt");

    if (tshirtMesh && tshirtMesh.isMesh) {
      tshirtMesh.material = tshirtMesh.material.clone();
      tshirtMesh.material.color = new THREE.Color(color);
    }
  }, [color, scene]);

  useEffect(() => {
    if (display === "mouvement") {
      Object.values(actions).forEach((action) => action.play());
    }
  }, [actions, display]);

  return (
    <primitive ref={group} object={scene} scale={1.5} position={[0, -4, 0]} />
  );
}

export default function ProductViewer3D({ sex, display, color }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 h-[500px]">
      <Canvas camera={{ position: [2.5, 2.2, 4] }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 3, 2]} intensity={5} />
        <Environment preset="city" />

        <Suspense fallback={null}>
          <Model sex={sex} display={display} color={color} />
        </Suspense>

        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
}
