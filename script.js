// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('cube-canvas'), alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // Transparent background

// Create a cube with larger scale
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshNormalMaterial(); // Reflective material for visual interest
const cube = new THREE.Mesh(geometry, material);

// Scale the cube to make it larger
cube.scale.set(2, 2, 2); // Adjust the size (width, height, depth)

// Position the cube to the top-right
cube.position.set(2, 2, 0); // X (right), Y (up), Z (depth)

// Add the cube to the scene
scene.add(cube);

// Position the camera so the cube is visible
camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the cube
    cube.rotation.x += 0.01; // Rotate on the X-axis
    cube.rotation.y += 0.01; // Rotate on the Y-axis

    // Render the scene
    renderer.render(scene, camera);
}
animate();
