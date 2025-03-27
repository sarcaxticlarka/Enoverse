// import Spline from '@splinetool/react-spline';
// import Navbar from './Navbar'
// import Logo from './Logo';


// export default function App() {
//   return (
//     <div className='h-screen w-screen bg-black'>
//       <Logo />
//       <Navbar />
//       {/* <Spline scene="https://prod.spline.design/Vgqbc3bF3UQoXLBj/scene.splinecode" /> */}
//       <div className='absolute top-1/2  -left-52 transform   -translate-y-1/2 z-50 flex flex-col items-center gap-4'>
//         <h1 className='font-[Oswald]  w-[50%] text-7xl text-white font-[700]'>The Future of Entertainment Begins Here</h1>
//         <p className='font-[Oswald] mt-4 text-white w-[50%]'>From script to screen—EONVERSE unifies the entire filmmaking process into <br /> a seamless digital experience.</p>
//       </div>
//     </div>

//   );
// }



import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Spline from '@splinetool/react-spline';
import Navbar from './Navbar';
import Logo from './Logo';

export default function App() {
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => { 
    const tl = gsap.timeline({
      defaults: { 
        duration: 1.5, 
        ease: "power4.inOut" 
      }
    });
 
    tl.fromTo(headingRef.current, 
      { 
        opacity: 0,
        y: 100,
        scale: 0.8,
        rotationX: 45,
        transformOrigin: 'center bottom'
      },
      { 
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        stagger: 0.1,
        ease: "back.out(1.4)"
      }
    )
    .fromTo(paragraphRef.current, 
      { 
        opacity: 0,
        y: 50,
        scale: 0.9,
        filter: 'blur(20px)'
      },
      { 
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        ease: "power4.out"
      },
      "-=0.5"
    );

    // Add interactive hover effect
    const hoverAnimation = gsap.timeline({ 
      paused: true,
      defaults: { 
        duration: 0.6, 
        ease: "power2.inOut" 
      }
    })
    .to([headingRef.current, paragraphRef.current], {
      y: -15,
      opacity: 0.8,
      scale: 1.02,
      rotationX: 5,
      transformOrigin: 'center center'
    });

 
    const container = containerRef.current;
    container.addEventListener('mouseenter', () => hoverAnimation.play());
    container.addEventListener('mouseleave', () => hoverAnimation.reverse());

 
    return () => {
      container.removeEventListener('mouseenter', () => hoverAnimation.play());
      container.removeEventListener('mouseleave', () => hoverAnimation.reverse());
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className='relative h-screen bg-black w-screen overflow-hidden'
    >
       <div className='absolute inset-0 z-0'>
        <Spline scene="https://prod.spline.design/Vgqbc3bF3UQoXLBj/scene.splinecode" />
      </div>

       <div className='relative z-10 h-full'>
        <Logo />
        <Navbar />
        <div className='absolute top-1/2 -left-52 transform -translate-y-1/2 z-50 flex flex-col items-center gap-4'>
          <h1 
            ref={headingRef}
            className='font-[Oswald] w-[50%] text-7xl text-white font-[700]'
          >
            The Future of Entertainment Begins Here
          </h1>
          <p 
            ref={paragraphRef}
            className='font-[Oswald] mt-4 text-white w-[50%]'
          >
            From script to screen—EONVERSE unifies the entire filmmaking process into <br /> a seamless digital experience.
          </p>
        </div>
      </div>
    </div>
  );
}