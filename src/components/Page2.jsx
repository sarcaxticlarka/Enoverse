// import React from 'react'
// import './Page2.css'

// const Page2 = () => {
//   return (
//     <div className='h-screen w-full bg-black flex  '>
//         <div className='left w-1/2 h-full bg-white px-20 py-42 font-[Oswald]'>
//             <h1 className='text-5xl text-black text-7xl font-bold'> A Seamless Ecosystem for Movie Production</h1>
//             <p className='text-black mt-6'>From script to screen—EONVERSE unifies the entire filmmaking process into a seamless digital experience.</p>

//         </div>
//         <div className='right w-1/2 h-full bg-white py-24'>
//         <div className="container">
//        <div id="cube-container">
//         <div className="cube">
//           <img
//             src="https://2.bp.blogspot.com/-mO4hazRk72M/UB6HkCIavzI/AAAAAAAAAXU/TMJaGaEMjTE/s320/wallpaper-57548.jpg"
//             alt="slide1"
//           />
//           <img
//             src="https://38.media.tumblr.com/e5e63479c58f5362c54c93a51e3a3d48/tumblr_nthvcue9iy1tqou9go1_500.gif"
//             alt="slide2"
//           />
//           <img
//             src="https://41.media.tumblr.com/41e0585497f082ef9a6e4f19d2f9c4c5/tumblr_o1cvnwq90X1u7gnm9o1_500.jpg"
//             alt="slide3"
//           />
//           <img
//             src="https://images.unsplash.com/photo-1589569334232-fdc917c38226?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//             alt="slide4"
//           />
//         </div>
//       </div>
//     </div>
//         </div>
//     </div>
//   )
// }

// export default Page2;


import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Page2.css";

gsap.registerPlugin(ScrollTrigger);

const Page2 = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray([".page2-title", ".page2-description"]).forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: el.classList.contains("page2-title") ? 100 : 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none reverse", // Ensures animation reverses when scrolling back
              markers: false,
            },
          }
        );
      });
    });

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <div className="h-screen w-full bg-black flex">
      {/* Left Section */}
      <div className="left w-1/2 h-full bg-white px-20 py-24 font-[Oswald]">
        <h1 className="page2-title text-7xl text-black font-bold">
          A Seamless Ecosystem for Movie Production
        </h1>
        <p className="page2-description text-black mt-6">
          From script to screen—EONVERSE unifies the entire filmmaking process into a seamless digital experience.
        </p>
      </div>

      {/* Right Section - Image Cube */}
      <div className="right w-1/2 h-full bg-white py-24">
        <div className="container">
          <div id="cube-container">
            <div className="cube">
              <img
                src="https://2.bp.blogspot.com/-mO4hazRk72M/UB6HkCIavzI/AAAAAAAAAXU/TMJaGaEMjTE/s320/wallpaper-57548.jpg"
                alt="slide1"
              />
              <img
                src="https://38.media.tumblr.com/e5e63479c58f5362c54c93a51e3a3d48/tumblr_nthvcue9iy1tqou9go1_500.gif"
                alt="slide2"
              />
              <img
                src="https://41.media.tumblr.com/41e0585497f082ef9a6e4f19d2f9c4c5/tumblr_o1cvnwq90X1u7gnm9o1_500.jpg"
                alt="slide3"
              />
              <img
                src="https://images.unsplash.com/photo-1589569334232-fdc917c38226?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="slide4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page2;
