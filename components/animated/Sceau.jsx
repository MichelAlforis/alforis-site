"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Lightformer } from "@react-three/drei";
import { Physics, RigidBody, BallCollider, CuboidCollider, useRopeJoint, useSphericalJoint } from "@react-three/rapier";
import * as THREE from "three";
import { useRef, useState, Suspense } from "react";

const SEAL_GLB_URL = "/assets/mon-sceau.glb";


function Seal() {
  const { nodes } = useGLTF(SEAL_GLB_URL);
  const geometry = nodes?.seal?.geometry || Object.values(nodes)[0]?.geometry;
  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="silver" metalness={1} roughness={0.3} />
    </mesh>
  );
}

function RopeSeal({ interactive = true }) {
  const fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), seal = useRef();
  const [dragged, setDragged] = useState(false);
  const vec = new THREE.Vector3(), dir = new THREE.Vector3();

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, seal, [[0, 0, 0], [0, 1.5, 0]]);

  useFrame(({ camera, pointer }) => {
    if (!dragged || !interactive) return;
    vec.set(pointer.x, pointer.y, 0.5).unproject(camera);
    dir.copy(vec).sub(camera.position).normalize();
    vec.add(dir.multiplyScalar(camera.position.length()));
    seal.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
  });

  return (
    <group position={[0, 4, 0]}>
      <RigidBody ref={fixed} type="fixed" />
      <RigidBody ref={j1}><BallCollider args={[0.1]} /></RigidBody>
      <RigidBody ref={j2}><BallCollider args={[0.1]} /></RigidBody>
      <RigidBody ref={j3}><BallCollider args={[0.1]} /></RigidBody>
      <RigidBody
        ref={seal}
        type={dragged ? "kinematicPosition" : "dynamic"}
        onPointerDown={(e) => {
          if (!interactive) return;
          e.target.setPointerCapture(e.pointerId);
          setDragged(new THREE.Vector3().copy(e.point).sub(seal.current.translation()));
          e.stopPropagation();
        }}
        onPointerUp={(e) => {
          setDragged(false);
          e.stopPropagation();
        }}
        onPointerMove={(e) => {
          if (interactive && dragged) e.stopPropagation();
        }}
      >
        <CuboidCollider args={[0.8, 0.8, 0.01]} />
        <group scale={2} position={[0, -1, -0.05]}>
          <Seal />
        </group>
      </RigidBody>
    </group>
  );
}

export default function Sceau() {
  return (
    <section
      id="sceau"
      className="snap-start relative w-full min-h-screen flex items-center justify-center bg-transparent z-10"
    >
      <Canvas
        camera={{ position: [0, 0, 20], fov: 30 }}
        className="w-full h-full"
      >
        <ambientLight intensity={1.2} />
        <Suspense fallback={null}>
          <Environment blur={0.6}>
            <Lightformer intensity={5} position={[0, -1, 5]} scale={[10, 1, 1]} />
          </Environment>
          <Physics gravity={[0, -30, 0]}>
            <RopeSeal interactive />
          </Physics>
        </Suspense>
      </Canvas>
    </section>
  );
}
