// import React from 'react';
// import Spline from '@splinetool/react-spline';

// const Feature = () => {
//     return (
//         <div className='relative' style={{ height: '100vh', overflowY: 'auto' }}>
//             <div style={{ height: '100vh', position: 'relative' }}>
//                 <Spline 
//                     scene="https://prod.spline.design/hdT4zbGNSYrxAkuH/scene.splinecode"
//                     style={{
//                         pointerEvents: 'none',
//                         position: 'absolute',
//                         top: 0,
//                         left: 0,
//                         width: '100%',
//                         height: '100%'
//                     }}
//                 />
//                 <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
//                     <h1 className='text-white text-8xl font-[Oswald]'>Create, Innovate, Inspire</h1>
//                     <button className="absolute -bottom-30 right-70 mt-6 px-8 py-3 text-lg font-[200] text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out">
//                         Get Inspired →
//                     </button>                
//                     </div>
//             </div>
//         </div>
//     );
// }

// export default Feature;




import React, { useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Feature = () => {
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".feature-title",
                { opacity: 0.3, y: 90 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".feature-title",
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            gsap.fromTo(
                ".feature-button",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".feature-button",
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className='relative' style={{ height: '100vh', overflowY: 'auto' }}>
            <div style={{ height: '100vh', position: 'relative' }}>
                {/* Background 3D Scene */}
                <Spline 
                    scene="https://prod.spline.design/hdT4zbGNSYrxAkuH/scene.splinecode"
                    style={{
                        pointerEvents: 'none',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%'
                    }}
                />

                {/* Animated Content */}
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
                    <h1 className='feature-title text-white text-8xl font-[Oswald] opacity-0'>
                        Create, Innovate, Inspire
                    </h1>
                    <button className="feature-button mt-8 px-8 py-3 text-lg font-[200] text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg opacity-0 hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out">
                        Get Inspired →
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Feature;























// import React from 'react';
// import Spline from '@splinetool/react-spline';


// import React from 'react'
// import Spline from '@splinetool/react-spline';

// const Feature = () => {
//   return (
//     <div className='h-screen w-screen bg-black'>
//   <Spline 
//                     scene="https://prod.spline.design/hdT4zbGNSYrxAkuH/scene.splinecode"
                    
//                 />
//     </div>
//   )
// }

// export default Feature