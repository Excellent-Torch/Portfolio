import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import Navbar from "./Navbar";

const RotatingCube = () => {
  const meshRef = useRef();

  useFrame(() => {
    if(meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshLambertMaterial color="red" emissive="blue" emissiveIntensity={2} />
    </mesh>
  );
}

const App = () => {
  return (
    <>
    <Navbar />
    
    <Canvas style={{height: "100vh", width: "100vw", alignContent: "center", display: "flex", justifyContent: "center"}}>
      
      <OrbitControls enableZoom enablePan enableRotate />
      <directionalLight  position={[10, 10, 10]} intensity={0.5} color={"black"}/>
      <color attach="background" args={["black"]}/>

      <RotatingCube />
    </Canvas>
    </>
  );
};

export default App;