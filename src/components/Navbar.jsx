// import React from 'react'
// import logo from '../assets/logo.png'

// const Navbar = () => {
//   return (
//     <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-12 px-8 py-3 rounded-full bg-white/10 backdrop-blur-md shadow-lg border border-white/20">
//     {["Home", "About", "Explore", "Contact"].map((item, index) => (
//       <h3
//         key={index}
//         className="text-white text-lg font-medium cursor-pointer transition-all duration-300 hover:text-[#FF00AB] hover:scale-105 px-2 font-[Oswald]"
//       >
//         {item}
//       </h3>
//     ))}
//     {/* <img className='absolute right-200 bottom-[1100%] w-45 rotate-[-40deg]' src={logo} alt="" /> */}
//   </div>
//   )
// }

// export default Navbar

// import React from 'react'

// const Navbar = () => {
//   const handleScroll = (id) => {
//     document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-12 px-8 py-3 rounded-full bg-white/10 backdrop-blur-md shadow-lg border border-white/20">
//       {[
//         { name: "Home", id: "hero" },
//         { name: "About", id: "about" },
//         { name: "Explore", id: "explore" },
//         { name: "Contact", id: "contact" }
//       ].map((item, index) => (
//         <h3
//           key={index}
//           className="text-white text-lg font-medium cursor-pointer transition-all duration-300 hover:text-[#FF00AB] hover:scale-105 px-2 font-[Oswald]"
//           onClick={() => handleScroll(item.id)}
//         >
//           {item.name}
//         </h3>
//       ))}
//     </div>
//   )
// }

// export default Navbar;



import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isAboutSection, setIsAboutSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        setIsAboutSection(rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-12 px-8 py-3 rounded-full backdrop-blur-md shadow-lg border border-white/20 transition-all duration-300 ${
        isAboutSection ? "bg-black/80" : "bg-white/10"
      }`}
    >
      {[
        { name: "Home", id: "hero" },
        { name: "About", id: "about" },
        { name: "Explore", id: "explore" },
        { name: "Contact", id: "contact" },
      ].map((item, index) => (
        <h3
          key={index}
          className="text-white text-lg font-medium cursor-pointer transition-all duration-300 hover:text-[#FF00AB] hover:scale-105 px-2 font-[Oswald]"
          onClick={() => handleScrollTo(item.id)}
        >
          {item.name}
        </h3>
      ))}
    </div>
  );
};

export default Navbar;
