// import { Canvas } from "@react-three/fiber";
// import React from "react";
// import { OrbitControls } from "@react-three/drei";
// import "./style.css"
// import { Bloom, EffectComposer, ToneMapping } from '@react-three/postprocessing'
// import { div } from "three/tsl";
// import Cyl from "./Cyl";

// const CylinderShape = () => {
//     return (
//         <div className="h-screen overflow-auto">
//             <Canvas camera={{ fov: 25 }}>
//                 <OrbitControls enableZoom={false} />
//                 <ambientLight intensity={0.5} />
//                 <Cyl />
//                 <EffectComposer
//                 >
//                     <Bloom
//                         mipmapBlur
//                         intensity={8.0}
//                         luminanceThreshold={0}
//                         luminanceSmoothing={0}

//                     />
//                     <ToneMapping adaptive />
//                 </EffectComposer>
//             </Canvas >
//             <div className="absolute  bg-gray-900 text-white flex justify-center items-center">
//         <h1 className="text-5xl">Scrollable Content Below</h1>
//     </div>
//         </div>
//     );
// };

// export default CylinderShape;

import { Canvas } from "@react-three/fiber";
import React from "react";
import { OrbitControls } from "@react-three/drei";
import { Bloom, EffectComposer, ToneMapping } from "@react-three/postprocessing";
import { motion } from "framer-motion";
import Cyl from "./Cyl";
import "./style.css";

const CylinderShape = () => {
    return (
        <div className="h-screen relative overflow-hidden">
            {/* Moving Text Background */}
            <motion.div
                className="absolute top-1/3 w-full text-white font-bold opacity-30 text-[9vw] whitespace-nowrap"
                initial={{ x: "100%" }}
                animate={{ x: "-100%" }}
                transition={{
                    repeat: Infinity,
                    duration: 10,
                    ease: "linear",
                }}
            >
                Streamlining filmmaking with automation and collaboration.
            </motion.div>

            {/* Canvas */}
            <Canvas
                camera={{ fov: 25 }}
                className="absolute top-0 left-0 w-full h-full z-10"
            >
                <OrbitControls enableZoom={false} />
                <ambientLight intensity={0.5} />
                <Cyl />
                <EffectComposer>
                    <Bloom
                        mipmapBlur
                        intensity={8.0}
                        luminanceThreshold={0.3}
                        luminanceSmoothing={0.3}
                    />
                    <ToneMapping adaptive />
                </EffectComposer>
            </Canvas>
        </div>
    );
};

export default CylinderShape;
