import { useRef } from "react";
import { MeshTransmissionMaterial, Text, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const Model = () => {
  const { nodes } = useGLTF("/models/torrus.glb");
  const { viewport } = useThree();
  const text = useRef(null);
  const text2 = useRef(null);
  const torusRig = useRef(null);
  const torus = useRef(null);

  const materialProps = useControls({
    thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 1.1, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.05, min: 0, max: 1 },
    backside: { value: true },
  });

  useFrame((state, delta) => {
    if (!torus.current) {
      return;
    }

    const time = state.clock.elapsedTime;

    torus.current.rotation.x = -0.16 + Math.sin(time * 0.45) * 0.05;
    torus.current.rotation.z += delta * 0.18;
  });

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".empty_sec",
        endTrigger: ".first_text_cont",
        scrub: true,
        start: "top top",
        end: "center center",
      },
    });

    tl.to(
      text.current.position,
      {
        y: 3.4,
      },
      0
    );

    tl.to(
      text2.current.position,
      {
        y: 2.75,
      },
      0
    );

    tl.to(
      torusRig.current.rotation,
      {
        y: 4.6,
        x: -0.12,
      },
      0
    );

    tl.to(
      torusRig.current.scale,
      {
        x: 0.56,
        y: 0.56,
        z: 0.56,
      },
      0
    );

    tl.to(
      torusRig.current.position,
      {
        x: 0,
        y: 0,
        z: 0.08,
      },
      0
    );
  });

  return (
    <group scale={viewport.width / 3}>
      <Text
        ref={text}
        font={"/fonts/SUIT-ExtraBold.otf"}
        position={[0, 0.38, -1]}
        fontSize={0.7}
        letterSpacing={-0.04}
        color="#fff"
        anchorX="center"
        anchorY="middle"
      >
        there's no place
      </Text>
      <Text
        ref={text2}
        font={"/fonts/SUIT-ExtraBold.otf"}
        position={[0, -0.38, -1]}
        fontSize={0.7}
        letterSpacing={-0.04}
        color="#fff"
        anchorX="center"
        anchorY="middle"
      >
        like out of home
      </Text>

      <group ref={torusRig}>
        <mesh ref={torus} {...nodes.Torus002}>
          <MeshTransmissionMaterial {...materialProps} />
        </mesh>
      </group>
    </group>
  );
};
