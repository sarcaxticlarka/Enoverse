import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const VideoGallery = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const videosRef = useRef([]);
  const videoGroupRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  
  // Mock video data - replace with your actual videos
  const videoData = [
    { id: 1, placeholder: '/api/placeholder/480/270', title: 'Nature Timelapse' },
    { id: 2, placeholder: '/api/placeholder/480/270', title: 'Cityscape Tour' },
    { id: 3, placeholder: '/api/placeholder/480/270', title: 'Ocean Waves' },
    { id: 4, placeholder: '/api/placeholder/480/270', title: 'Mountain View' },
    { id: 5, placeholder: '/api/placeholder/480/270', title: 'Desert Sunset' },
    { id: 6, placeholder: '/api/placeholder/480/270', title: 'Forest Walk' },
  ];

  useEffect(() => {
    // Initialize scene
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 10;
    cameraRef.current = camera;
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Create video group
    const videoGroup = new THREE.Group();
    scene.add(videoGroup);
    videoGroupRef.current = videoGroup;
    
    // Create video panels
    const radius = 8;
    const videoPanels = [];
    
    videoData.forEach((video, index) => {
      // Create texture placeholder - in a real app, this would be a video texture
      const texture = new THREE.TextureLoader().load(video.placeholder);
      texture.minFilter = THREE.LinearFilter;
      
      // Create material with the texture
      const material = new THREE.MeshBasicMaterial({ 
        map: texture,
        side: THREE.DoubleSide
      });
      
      // Create video panel
      const geometry = new THREE.PlaneGeometry(4, 2.25); // 16:9 aspect ratio
      const mesh = new THREE.Mesh(geometry, material);
      
      // Position around a circle
      const angle = (index / videoData.length) * Math.PI * 2;
      mesh.position.x = Math.cos(angle) * radius;
      mesh.position.z = Math.sin(angle) * radius;
      
      // Rotate to face the center
      mesh.rotation.y = Math.PI / 2 - angle;
      
      // Add to group
      videoGroup.add(mesh);
      videoPanels.push(mesh);
    });
    
    videosRef.current = videoPanels;
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    
    animate();
    setLoaded(true);
    
    // Handle window resize
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);
  
  // Handle scroll to rotate the gallery
  useEffect(() => {
    if (!loaded) return;
    
    const handleScroll = () => {
      if (videoGroupRef.current) {
        // Calculate rotation based on scroll position
        const scrollY = window.scrollY;
        const rotationSpeed = 0.001;
        videoGroupRef.current.rotation.y = scrollY * rotationSpeed;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loaded]);
  
  return (
    <div className="relative">
      {/* Three.js container */}
      <div 
        ref={containerRef} 
        className="w-full h-screen bg-gradient-to-b from-black to-gray-900"
      />
      
      {/* UI overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-between p-8 pointer-events-none">
        <h1 className="text-4xl font-bold text-white mb-4 pointer-events-auto">
          3D Video Gallery
        </h1>
        <p className="text-xl text-white text-center mt-8 pointer-events-auto">
          Scroll to spin the gallery
        </p>
      </div>
    </div>
  );
};

export default VideoGallery;