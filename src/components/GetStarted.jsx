import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FloatingLabelsUI = () => {
  const labelsRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%", // Start animation when 75% of the section is visible
        end: "bottom 25%", // Reset when 25% is left
        toggleActions: "play none none reverse", // Play on enter, reverse on leave
      },
    });

    tl.fromTo(
      labelsRef.current,
      { 
        y: (i) => (i % 2 === 0 ? -100 : 100), 
        x: (i) => (i % 2 === 0 ? -50 : 50), 
        opacity: 0, 
        rotation: (i) => (i % 2 === 0 ? -10 : 10),
        scale: 0.8
      },
      { 
        y: 0, 
        x: 0, 
        opacity: 1, 
        rotation: 0, 
        scale: 1,
        stagger: 0.15, 
        duration: 1.5,
        ease: "power3.out"
      }
    );

    // Floating effect for continuous movement
    labelsRef.current.forEach((label, i) => {
      gsap.to(label, {
        y: "+=15", 
        rotation: (i % 2 === 0 ? 3 : -3),
        repeat: -1,
        yoyo: true,
        duration: 2 + Math.random(), 
        ease: "sine.inOut",
        delay: Math.random() * 1.5,
      });
    });
  }, []);

  const labels = [
    { text: "Immersive", color: "bg-white text-black" },
    { text: "Story-driven", color: "bg-white text-black" },
    { text: "Interactive", color: "bg-white text-black" },
    { text: "Seamless", color: "bg-green-500 text-white" },
    { text: "Smart Automation", color: "bg-blue-500 text-white" },
    { text: "Informative", color: "bg-green-500 text-white" },
    { text: "Effortless Collaboration", color: "bg-white text-black" },
    { text: "Future-ready", color: "bg-pink-500 text-white" },
    { text: "Cinematic", color: "bg-pink-500 text-white" },
    { text: "Engaging", color: "bg-white text-black" },
    { text: "Doctor-driven", color: "bg-green-500 text-white" },
    { text: "Next-Gen Entertainment", color: "bg-yellow-500 text-black" },
    { text: "Game-changing", color: "bg-yellow-500 text-black" },
    { text: "Revolutionary", color: "bg-pink-500 text-white" },
    { text: "Hyper-realistic", color: "bg-white text-black" },
  ];

  return (
    <div ref={containerRef} className="h-screen w-full bg-black text-white flex flex-col items-center justify-center relative overflow-hidden px-8">
      <h1 className="text-5xl font-bold text-center leading-tight">
        <span className="underline decoration-pink-500">Let’s Build </span> the Future 
        <br />
        <span className="underline decoration-green-500"> Together</span>
      </h1>
      <div className="relative w-full max-w-3xl mt-12 flex flex-wrap justify-center gap-6">
        {labels.map((label, index) => (
          <div
            key={index}
            ref={(el) => (labelsRef.current[index] = el)}
            className={`px-6 py-3 rounded-full text-lg font-semibold shadow-xl transition-all transform-gpu ${label.color}`}
          >
            {label.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloatingLabelsUI;













// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";
 
// const FloatingLabelsUI = () => {
//   const labelsRef = useRef([]);

//   useEffect(() => {
//     gsap.fromTo(
//       labelsRef.current,
//       { y: -50, opacity: 0, rotation: (i) => (i % 2 === 0 ? -15 : 15) },
//       { y: 0, opacity: 1, rotation: 0, stagger: 0.1, ease: "power3.out" }
//     );
//   }, []);

//   const labels = [
//     { text: "Immersive", color: "bg-white text-black" },
//     { text: "story-driven", color: "bg-white text-black" },
//     { text: "Interactive", color: "bg-white text-black" },
//     { text: "Seamless", color: "bg-green-500 text-white" },
//     { text: "Smart Automation", color: "bg-blue-500 text-white" },
//     { text: "Informative", color: "bg-green-500 text-white" },
//     { text: "Effortless Collaboration", color: "bg-white text-black" },
//     { text: "Future-ready", color: "bg-pink-500 text-white" },
//     { text: "Cinematic", color: "bg-pink-500 text-white" },
//     { text: "Engaging", color: "bg-white text-black" },
//     { text: "Doctor-driven", color: "bg-green-500 text-white" },
//     { text: "Next-Gen Entertainment", color: "bg-yellow-500 text-black" },
//     { text: "Game-changing", color: "bg-yellow-500 text-black" },
//     { text: "Revolutionary", color: "bg-pink-500 text-white" },
//     { text: "Hyper-realistic", color: "bg-white text-black" },
//   ];

//   return (
//     <div className="h-screen w-full bg-black text-white flex flex-col items-center justify-center relative overflow-hidden px-8">
//       <h1 className="text-4xl font-bold text-center">
//         <span className="underline decoration-pink-500">Let’s Build  </span> the Future 
//         <br />
//         <span className="underline decoration-green-500"> Together</span>
//       </h1>
//       <div className="relative w-full max-w-2xl mt-12 flex flex-wrap justify-center gap-4">
//         {labels.map((label, index) => (
//           <div
//             key={index}
//             ref={(el) => (labelsRef.current[index] = el)}
//             className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${label.color}`}
//             style={{ transform: `rotate(${index % 2 === 0 ? -15 : 15}deg)` }}
//           >
//             {label.text}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FloatingLabelsUI; make this more intersting animation to text