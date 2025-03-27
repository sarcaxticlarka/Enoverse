import React from 'react';
import './Gallery.css'; // We'll create this CSS file next
import { div } from 'framer-motion/client';

const Gallery = () => {
    const images = [
        "https://images.unsplash.com/photo-1620655796542-4ac76a76743c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        "https://images.unsplash.com/photo-1620421680906-275860f61e27?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
        "https://images.unsplash.com/photo-1620611824637-d33a5c34dec8?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
        "https://images.unsplash.com/photo-1589111502533-e78e1fae673e?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
        "https://images.unsplash.com/photo-1611095567319-2f4c389168a9?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw1M3x8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
        "https://images.unsplash.com/photo-1620422554271-3e1747251272?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1Nnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
        "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1OHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
        "https://images.unsplash.com/photo-1620536382869-c634e4d8475f?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3OHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
    ];

    return (
        <div className='h-screen w-full bg-black flex justify-center items-center relative'>
            <h1 className='font-[Oswald] text-[3.7vw] font-bold text-white absolute'> Streamlining filmmaking with automation and collaboration.</h1>
            <div className="gallery">
                {images.map((image, index) => (
                    <span key={index} style={{ '--i': index + 1 }}>
                        <img src={image} alt={`Gallery item ${index + 1}`} />
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Gallery;


