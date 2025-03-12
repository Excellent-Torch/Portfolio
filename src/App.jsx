import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import Navbar from "./Navbar.jsx";
import './App.css';

const RotatingCube = () => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshLambertMaterial color="red" emissive="blue" emissiveIntensity={2} transparent opacity={0.5} />
    </mesh>
  );
};

const App = () => {
  return (
    <>
      <Navbar />
      <Canvas className="canvas">
        <OrbitControls enableZoom enablePan enableRotate />
        <directionalLight position={[10, 10, 10]} intensity={0.5} color={"white"} />
        <color attach="background" args={["black"]} />
        <RotatingCube />
      </Canvas>
      <div className="content">
        <section id="about" className="section-about">
          <h2>About</h2>
          <p>This is the about section.</p>
        </section>
        <section id="projects" className="section-projects">
          <h2>Projects</h2>
          <p>This is the projects section.</p>
        </section>
        <section id="contact" className="section-contact">
          <h2>Contact</h2>
          <p>This is the contact section.</p>
        </section>
      </div>
    </>
  );
};

export default App;