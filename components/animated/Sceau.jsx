"use client";

import { Canvas, useFrame, extend } from "@react-three/fiber";
import { useGLTF, Environment, Lightformer, Html } from "@react-three/drei";
import { Physics, RigidBody, BallCollider, CuboidCollider, useRopeJoint, useSphericalJoint } from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import { useRef, useState, useEffect, useMemo, Suspense } from "react";
import { couleurs } from "@/styles/generated-colors";  // Chemin correct vers votre fichier couleurs.js

extend({ MeshLineMaterial });

const SEAL_GLB_URL = "/assets/mon-sceau.glb";

function SealMesh() {
  const { nodes } = useGLTF(SEAL_GLB_URL);
  const geometry = nodes?.texture_pbr_v128?.geometry;
  return (
    <mesh geometry={geometry} rotation={[Math.PI / 2, 0, 0]}>
      <meshStandardMaterial color={couleurs.doré} metalness={2} roughness={0.3} />
    </mesh>
  );
}

function RopeLine({ curve, texture, resolution }) {
  const ref = useRef();
  const geometry = useMemo(() => new MeshLineGeometry(), []);
  useEffect(() => {
    geometry.setPoints(curve.getPoints(32));
  }, [curve, geometry]);

  return (
    <mesh ref={ref}>
      <primitive object={geometry} attach="geometry" />
      <meshLineMaterial
        map={texture}
        useMap={true}
        lineWidth={2}
        color={new THREE.Color("#ffffff")}
        transparent
        depthTest={false}
        resolution={resolution}
        repeat={[-17, 1]}
        attach="material"
      />
    </mesh>
  );
}

function RopeSeal({ interactive = true, resolution }) {
  const fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), seal = useRef();
  const [dragged, setDragged] = useState(false);
  const curve = useMemo(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]), []);
  const vec = new THREE.Vector3(), dir = new THREE.Vector3();
  const [ropeTexture, setRopeTexture] = useState();

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, seal, [[0, 0, 0], [0, 1.5, 0]]);

  useEffect(() => {
    new THREE.TextureLoader().load("/assets/chain-texture.png", (tex) => {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.anisotropy = 16;
      setRopeTexture(tex);
    });
  }, []);

  useFrame(({ camera, pointer }) => {
    if (!dragged || !interactive) return;
    vec.set(pointer.x, pointer.y, 0.5).unproject(camera);
    dir.copy(vec).sub(camera.position).normalize();
    vec.add(dir.multiplyScalar(camera.position.length()));
    seal.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
  });

  useFrame((state, delta) => {
    if (!fixed.current || !j1.current || !j2.current || !j3.current) return;

    const damping = 3;
    const lerp = (ref) => {
      if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
      ref.current.lerped.lerp(ref.current.translation(), delta * damping);
    };

    lerp(j1);
    lerp(j2);

    curve.points[0].copy(j3.current.translation());
    curve.points[1].copy(j2.current.lerped);
    curve.points[2].copy(j1.current.lerped);
    curve.points[3].copy(fixed.current.translation());
  });

  return (
    <group position={[0, 4, 0]}>
      <RigidBody ref={fixed} type="fixed" />
      <RigidBody ref={j1} colliders={false}><BallCollider args={[0.1]} /></RigidBody>
      <RigidBody ref={j2} colliders={false}><BallCollider args={[0.1]} /></RigidBody>
      <RigidBody ref={j3} colliders={false}><BallCollider args={[0.1]} /></RigidBody>

      <RigidBody
        ref={seal}
        type={dragged ? "kinematicPosition" : "dynamic"}
        angularDamping={4}
        linearDamping={3}
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
        <group scale={2} position={[0, -1.2, -0.05]}>
          <SealMesh />
        </group>
      </RigidBody>

      {ropeTexture && <RopeLine curve={curve} texture={ropeTexture} resolution={resolution} />}
    </group>
  );
}

export default function Sceau() {
  const [resolution, setResolution] = useState([0, 0]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const update = () => setResolution([window.innerWidth, window.innerHeight]);
      update();
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }
  }, []);

  return (

      <Canvas camera={{ position: [0, 0, 20], fov: 30 }}>
        <ambientLight intensity={1.2} />
        <Suspense fallback={<Html><div className="text-anthracite">Chargement du sceau...</div></Html>}>
          <Environment blur={0.6}>
            <Lightformer intensity={5} position={[0, -1, 5]} scale={[10, 1, 1]} />
          </Environment>
          <Physics gravity={[0, -10, 0]}>
            <RopeSeal interactive resolution={resolution} />
          </Physics>
        </Suspense>
      </Canvas>
  );
}