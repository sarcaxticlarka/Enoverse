import { useEffect, useRef } from "react";
import * as THREE from "three";
import billa from "../assets/billa.mp4"; // Replace with your actual video paths

export default function Enhanced3DVideoGallery() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const videosRef = useRef([]);
  const cardsRef = useRef([]);
  const currentRotationRef = useRef(0);
  const targetRotationRef = useRef(0);
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);
  const clockRef = useRef(new THREE.Clock());

  // Sample video data - replace with your actual videos
  const videos = [
    { id: 1, title: "Ocean Waves", src: billa },
    { id: 2, title: "City Timelapse", src: billa },
    { id: 3, title: "Space Exploration", src: billa },
    { id: 4, title: "Nature Documentary", src: billa },
    { id: 5, title: "Urban Life", src: billa },
    { id: 6, title: "Mountain Views", src: billa },
  ];

  useEffect(() => {
    // Initialize Three.js scene
    const initialize = () => {
      const canvas = canvasRef.current;

      // Create renderer with high-quality settings
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 1);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      rendererRef.current = renderer;

      // Create scene with enhanced atmosphere
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x000010, 0.02);
      sceneRef.current = scene;

      // Create perspective camera with enhanced field of view
      const camera = new THREE.PerspectiveCamera(
        80, // Wider FOV for more dramatic 3D effect
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, 18);
      cameraRef.current = camera;

      // Add advanced lighting setup
      addLights(scene);

      // Add environment
      addEnvironment(scene);

      // Add 3D video cards
      createVideoCards(scene);

      // Start animation
      animate();
    };

    // Create advanced lighting setup
    const addLights = (scene) => {
      // Ambient light for base illumination
      const ambientLight = new THREE.AmbientLight(0x111122, 0.4);
      scene.add(ambientLight);

      // Main directional light with shadows
      const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
      mainLight.position.set(10, 10, 10);
      mainLight.castShadow = true;
      mainLight.shadow.mapSize.width = 1024;
      mainLight.shadow.mapSize.height = 1024;
      mainLight.shadow.camera.near = 0.5;
      mainLight.shadow.camera.far = 50;
      mainLight.shadow.bias = -0.0001;
      scene.add(mainLight);

      // Create dramatic blue spotlight
      const blueSpotlight = new THREE.SpotLight(0x0055ff, 3, 50, Math.PI / 4, 0.3, 1);
      blueSpotlight.position.set(-15, 10, 15);
      blueSpotlight.lookAt(0, 0, 0);
      blueSpotlight.castShadow = true;
      scene.add(blueSpotlight);

      // Create purple/pink accent light
      const purpleLight = new THREE.PointLight(0xaa22ff, 2, 40);
      purpleLight.position.set(15, -5, -10);
      scene.add(purpleLight);

      // Tracking spotlight that follows front card
      const trackingLight = new THREE.SpotLight(0xffffff, 4, 30, Math.PI / 6, 0.5, 1);
      trackingLight.position.set(0, 5, 20);
      trackingLight.lookAt(0, 0, 0);
      trackingLight.castShadow = true;
      trackingLight.shadow.mapSize.width = 1024;
      trackingLight.shadow.mapSize.height = 1024;
      scene.add(trackingLight);

      // Store tracking light for animation
      sceneRef.current.userData.trackingLight = trackingLight;
    };

    // Add environment elements to enhance 3D feeling
    const addEnvironment = (scene) => {
      // Create particle system for background
      const particlesGeometry = new THREE.BufferGeometry();
      const particleCount = 2000;

      const positionArray = new Float32Array(particleCount * 3);
      const scaleArray = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        // Position in a large sphere around scene
        const radius = 15 + Math.random() * 35;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        positionArray[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positionArray[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6; // Flatten vertically
        positionArray[i * 3 + 2] = radius * Math.cos(phi);

        scaleArray[i] = Math.random() * 0.5 + 0.1;
      }

      particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positionArray, 3));
      particlesGeometry.setAttribute("scale", new THREE.BufferAttribute(scaleArray, 1));

      // Create shader material for stars/particles
      const particlesMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
        },
        vertexShader: `
          attribute float scale;
          uniform float time;
          varying vec3 vPosition;

          void main() {
            vPosition = position;

            // Subtle movement
            vec3 pos = position;
            pos.y += sin(time * 0.2 + position.x * 0.1) * 0.2;
            pos.x += cos(time * 0.3 + position.z * 0.1) * 0.2;

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

            gl_PointSize = scale * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform float time;
          varying vec3 vPosition;

          void main() {
            // Create circular point
            vec2 uv = gl_PointCoord.xy - 0.5;
            float circle = 1.0 - smoothstep(0.45, 0.5, length(uv));

            // Color based on position and time
            float hue = abs(vPosition.x) * 0.01 + time * 0.05;
            vec3 color = 0.5 + 0.5 * cos(6.28318 * (hue + vec3(0.0, 0.33, 0.67)));

            // Pulsing effect
            float pulse = 0.8 + 0.2 * sin(time * 2.0 + vPosition.z * 0.5);

            gl_FragColor = vec4(color, circle * pulse * 0.6);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);

      // Store for animation
      sceneRef.current.userData.particles = particles;

      // Add a floor plane with reflective material to enhance depth
      const floorGeometry = new THREE.PlaneGeometry(100, 100);
      const floorMaterial = new THREE.MeshStandardMaterial({
        color: 0x000816,
        metalness: 0.9,
        roughness: 0.3,
        envMapIntensity: 0.8,
      });

      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -6;
      floor.receiveShadow = true;
      scene.add(floor);
    };

    // Create enhanced 3D video cards
    const createVideoCards = (scene) => {
      const cards = [];
      const radius = 15;
      const videoElements = [];

      videos.forEach((video, i) => {
        // Create video element
        const videoElement = document.createElement("video");
        videoElement.style.display = "none";
        videoElement.muted = true;
        videoElement.loop = true;
        videoElement.playsInline = true;
        videoElement.crossOrigin = "anonymous";
        videoElement.src = video.src; // Use the video source from the videos array
        document.body.appendChild(videoElement);
        videoElements.push(videoElement);

        // Create video texture
        const videoTexture = new THREE.VideoTexture(videoElement);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;

        // Enhanced card dimensions (16:9 aspect ratio)
        const width = 10;
        const height = width * (9 / 16);
        const depth = 0.4; // Add depth for 3D effect

        // Create video card with beveled edges (BoxGeometry with segments)
        const geometry = new THREE.BoxGeometry(width, height, depth, 1, 1, 1);

        // Create materials for each face of the box
        const materials = [
          new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }), // right (transparent)
          new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }), // left (transparent)
          new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }), // top (transparent)
          new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }), // bottom (transparent)
          new THREE.MeshBasicMaterial({
            // front - video
            map: videoTexture,
            transparent: true,
          }),
          new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }), // back (transparent)
        ];

        // Create mesh with materials
        const mesh = new THREE.Mesh(geometry, materials);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Position in a circle with depth variation
        const angle = (i / videos.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(angle * 3) * 2; // Vertical variation for 3D effect

        mesh.position.set(x, y, z);

        // Look at center with outward orientation
        mesh.lookAt(0, 0, 0);
        mesh.rotation.y += Math.PI;

        // Add cards to scene
        scene.add(mesh);

        // Store card data
        cards.push({
          mesh,
          videoElement,
          angle,
          initialY: y,
        });

        // Start video playback
        videoElement.play().catch((e) => console.log("Video autoplay prevented:", e));
      });

      cardsRef.current = cards;
      videosRef.current = videoElements;
    };

    // Handle scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollProgress = scrollY / maxScroll;

      // Map scroll to rotation (multiple full rotations)
      targetRotationRef.current = scrollProgress * Math.PI * 4;
    };

    // Handle mouse movement for parallax
    const handleMouseMove = (event) => {
      mouseXRef.current = (event.clientX / window.innerWidth - 0.5) * 0.3;
      mouseYRef.current = (event.clientY / window.innerHeight - 0.5) * 0.3;
    };

    // Handle window resize
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clockRef.current.getDelta();
      const elapsedTime = clockRef.current.getElapsedTime();

      // Smoothly interpolate to target rotation
      currentRotationRef.current += (targetRotationRef.current - currentRotationRef.current) * 0.05;

      // Rotate scene
      if (sceneRef.current) {
        sceneRef.current.rotation.y = currentRotationRef.current;
      }

      // Apply camera parallax from mouse
      if (cameraRef.current) {
        cameraRef.current.position.x += (mouseXRef.current - cameraRef.current.position.x) * 0.05;
        cameraRef.current.position.y += (-mouseYRef.current - cameraRef.current.position.y) * 0.05;
        cameraRef.current.lookAt(0, 0, 0);
      }

      // Update particles shader
      if (sceneRef.current && sceneRef.current.userData.particles) {
        sceneRef.current.userData.particles.material.uniforms.time.value = elapsedTime;
      }

      // Update tracking spotlight
      if (sceneRef.current && sceneRef.current.userData.trackingLight) {
        const light = sceneRef.current.userData.trackingLight;
        light.position.x = Math.sin(currentRotationRef.current) * 20;
        light.position.z = Math.cos(currentRotationRef.current) * 20;
        light.lookAt(0, 0, 0);
      }

      // Animate video cards
      if (cardsRef.current.length > 0) {
        cardsRef.current.forEach((card) => {
          // Calculate if card is in front view
          const totalAngle = card.angle - currentRotationRef.current;
          const normalizedAngle = ((totalAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);

          // Front-facing cards are between 1.5π and 0.5π in normalized angle
          const isFrontFacing = normalizedAngle > Math.PI * 1.5 || normalizedAngle < Math.PI * 0.5;

          // Check if card is centered in view (within 0.2 radians of dead center)
          const isCenter =
            Math.abs(normalizedAngle) < 0.2 ||
            Math.abs(normalizedAngle - Math.PI * 2) < 0.2;

          // Animate cards based on position
          if (isFrontFacing) {
            // Scale up when in view
            const targetScale = isCenter ? 1.5 : 1.2;
            card.mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

            // Make centered video louder
            card.videoElement.volume = isCenter ? 1 : 0;

            // Rotate slightly toward camera for better viewing angle
            const targetRotY = Math.PI + Math.sin(totalAngle) * 0.3;
            card.mesh.rotation.y += (targetRotY - card.mesh.rotation.y) * 0.1;

            // Add subtle tilt for 3D effect
            card.mesh.rotation.x = Math.sin(elapsedTime * 0.5) * 0.05;
            card.mesh.rotation.z = Math.cos(elapsedTime * 0.3) * 0.05;
          } else {
            // Scale down when not in view
            card.mesh.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);

            // Mute video when not in view
            card.videoElement.volume = 0;

            // Reset rotation to look at center
            card.mesh.lookAt(0, 0, 0);
            card.mesh.rotation.y += Math.PI; // Flip to face outward
          }

          // Add floating animation
          card.mesh.position.y = card.initialY + Math.sin(elapsedTime + card.angle * 3) * 0.5;
        });
      }

      // Render the scene
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    // Initialize the scene
    initialize();

    // Add event listeners
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);

      // Clean up video elements
      videosRef.current.forEach((video) => {
        video.pause();
        video.src = "";
        video.remove();
      });

      // Clean up Three.js resources
      if (cardsRef.current) {
        cardsRef.current.forEach((card) => {
          if (card.mesh.geometry) card.mesh.geometry.dispose();

          if (card.mesh.material.length) {
            // For multi-material objects
            card.mesh.material.forEach((material) => {
              if (material.map) material.map.dispose();
              material.dispose();
            });
          } else if (card.mesh.material) {
            if (card.mesh.material.map) card.mesh.material.map.dispose();
            card.mesh.material.dispose();
          }

          if (card.mesh.children) {
            card.mesh.children.forEach((child) => {
              if (child.geometry) child.geometry.dispose();
              if (child.material) {
                if (child.material.map) child.material.map.dispose();
                child.material.dispose();
              }
            });
          }
        });
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div className="relative">
      {/* Canvas container */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-screen"
      />

      {/* Header overlay */}
      <div className="fixed top-0 left-0 w-full z-10 p-8 text-center bg-gradient-to-b from-black/70 to-transparent">
        {/* <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
          Immersive 3D Video Gallery
        </h1>
        <p className="text-white/80 mt-2 text-lg">Scroll to navigate the experience</p> */}
      </div>

      {/* Scroll content to enable full-page scrolling */}
      <div className="h-[500vh]" />
    </div>
  );
}