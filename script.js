document.addEventListener("scroll", () => {
    const bigText = document.querySelector(".big-text");
    const scrollY = window.scrollY;

    // Adjust opacity or other styles based on scroll position
    bigText.style.opacity = 1 - scrollY / 800; // Fades out as you scroll down
    bigText.style.transform = `translateY(${scrollY * 0.5}px)`; // Parallax-like effect
});

/** Blob Setup */
// Select the canvas element where the blob will render
const blobCanvas = document.querySelector('#blob'); // Blob container in your HTML

// Create the WebGL renderer, enabling transparency with `alpha: true`
const renderer = new THREE.WebGLRenderer({ canvas: blobCanvas, alpha: true });
renderer.setSize(blobCanvas.clientWidth, blobCanvas.clientHeight); // Match canvas dimensions
renderer.setPixelRatio(window.devicePixelRatio); // Optimize for high-DPI screens

// Create a 3D scene
const scene = new THREE.Scene();

// Set up the camera
const camera = new THREE.PerspectiveCamera(
    75, // Field of view in degrees
    blobCanvas.clientWidth / blobCanvas.clientHeight, // Aspect ratio
    0.1, // Near clipping plane
    2000 // Far clipping plane
);
camera.position.z = 3; // Position the camera slightly away from the blob

/** Lighting */

// Ambient light adds a subtle base light to the entire scene
const ambientLight = new THREE.AmbientLight(0x330033, 0.5); // Dim purple color
scene.add(ambientLight);

// Point light provides a localized bright light
const pointLight = new THREE.PointLight(0xff00ff, 1.5, 1000); // Bright pink light
pointLight.position.set(2, 3, 4); // Place it at an angle for depth and shadows
scene.add(pointLight);

/** Blob Geometry and Material */
// Create a sphere geometry with more detail for smooth morphing
const geometry = new THREE.SphereGeometry(1.5, 64, 64); // Radius, width segments, height segments

// Define the material for the blob with a vibrant purple tone
const material = new THREE.MeshStandardMaterial({
    color: 0x9900cc, // Vibrant purple
    roughness: 0.2,  // Slightly reflective surface
    metalness: 0.1   // Gives it a "delicious" glossy effect
});

// Combine geometry and material into a mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere); // Add the blob to the scene

/** Morphing Effect */

// Create a clock to track time for smooth animations
const clock = new THREE.Clock();

// Animation function to morph the blob
function animate() {
    const elapsedTime = clock.getElapsedTime(); // Get elapsed time since the animation started

    const positionAttribute = geometry.attributes.position; // Access vertex positions
    const vertex = new THREE.Vector3(); // Temporary vector for calculations

    // Loop through each vertex to apply the morphing effect
    for (let i = 0; i < positionAttribute.count; i++) {
        vertex.fromBufferAttribute(positionAttribute, i); // Get vertex data

        vertex.normalize(); // Normalize to keep vertices on a sphere
        const distance =
            1.5 + // Base radius of the sphere
            Math.sin(elapsedTime * 2 + vertex.x * 3 + vertex.y * 3) * 0.2 + // Smooth, subtle noise
            Math.cos(elapsedTime * 3 + vertex.z * 2) * 0.1; // Add variation with cosine
        vertex.multiplyScalar(distance); // Scale vertex positions

        positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z); // Update vertex data
    }

    positionAttribute.needsUpdate = true; // Notify Three.js to re-render the updated geometry

    // Rotate the blob slightly for a dynamic feel
    sphere.rotation.y += 0.01; // Rotate on the Y-axis
    sphere.rotation.x += 0.005; // Rotate on the X-axis

    // Render the scene
    renderer.render(scene, camera);

    // Continue the animation
    requestAnimationFrame(animate);
}

// Start the animation loop
animate();

/** Handle Window Resize */

// Resize the renderer and camera when the window is resized
window.addEventListener('resize', () => {
    const width = blobCanvas.clientWidth;
    const height = blobCanvas.clientHeight;

    // Update camera aspect ratio and projection matrix
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // Update renderer size
    renderer.setSize(width, height);
});
