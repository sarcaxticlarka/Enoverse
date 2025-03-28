// import React from 'react'
// import Page1 from './components/Page1'
// import Hero from './components/Hero'
// import Navbar from './components/Navbar'
// import Page2 from './components/Page2'
//  import Gallery from './Gallery'
// import Feature from './components/Feature'
// import GetStarted from './components/GetStarted'
// import Logo from './components/Logo'
//  const App = () => {
//   return (
//     <div>
//       {/* <Page1/> */}
//       {/* <Navbar/> */}
//       {/* <Logo/> */}
//       <Hero/>
//       <Page2/>
//      {/* <VedioGallery/> */}
//      {/* <scrollingGallery/> */}
//      <Gallery/>
//      <Feature/> 
//       <GetStarted/>
//     </div>
//   )
// }

// export default App


import React from 'react'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Page2 from './components/Page2'
import Gallery from './Gallery'
import Feature from './components/Feature'
import GetStarted from './components/GetStarted'
import CylinderShape from './components/CylinderShape'


const App = () => {
  return (
    <div>
      
      <Navbar />
      <div id="hero">
        <Hero />
      </div>
      <div id="about">
        <Page2 />
      </div>
      <div id="explore">
        {/* <Gallery /> */}
        <CylinderShape/>
      </div>
      <div id="contact">
        <Feature />
        <GetStarted />
      </div>
    </div>
  )
}

export default App;
