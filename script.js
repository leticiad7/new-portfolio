document.addEventListener("scroll", () => {
    const bigText = document.querySelector(".big-text");
    const scrollY = window.scrollY;

    // Adjust opacity or other styles based on scroll position
    bigText.style.opacity = 1 - scrollY / 800; // Fades out as you scroll down
    bigText.style.transform = `translateY(${scrollY * 0.5}px)`; // Parallax-like effect
});

/** */
// Import Three.js (include in your HTML <head> if not already done)
// <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

const blobCanvas = document.querySelector('#blob'); // Renamed from 'canvas' to 'blobCanvas'
const renderer = new THREE.WebGLRenderer({ canvas: blobCanvas, alpha: true });
renderer.setSize(blobCanvas.clientWidth, blobCanvas.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, blobCanvas.clientWidth / blobCanvas.clientHeight, 0.1, 2000);
camera.position.z = 3;


// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);

// Blob Geometry
const geometry = new THREE.SphereGeometry(1.5, 23, 64);
const material = new THREE.MeshStandardMaterial({
    color: 0xff9f68, // Peachy tone for a "delicious" look
    roughness: 0.3,  // Slightly shiny surface

    //color: 0xff6347, // Tomato color
    //roughness: 0.9,
        //metalness: 0.5,

});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Morphing Effect
const clock = new THREE.Clock();
/*function animate() {
    const elapsedTime = clock.getElapsedTime();

    const positionAttribute = geometry.attributes.position;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < positionAttribute.count; i++) {
        vertex.fromBufferAttribute(positionAttribute, i);

        const offset = geometry.parameters.radius;
        const amp = 0.2; // Amplitude
        const time = elapsedTime * 2; // Speed

        vertex.normalize();
        const distance = offset + Math.sin(time + vertex.x * 2 + vertex.y * 2) * amp;
        vertex.multiplyScalar(distance);

        positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    positionAttribute.needsUpdate = true;
    sphere.rotation.y += 0.01;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();*/

function animate() {
    const elapsedTime = clock.getElapsedTime();

    const positionAttribute = geometry.attributes.position;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < positionAttribute.count; i++) {
        vertex.fromBufferAttribute(positionAttribute, i);

        const offset = geometry.parameters.radius;
        const amp = 0.4; // Higher amplitude for exaggerated morphing
        const time = elapsedTime * 1.5; // Slower, smoother morphing

        vertex.normalize();
        const distance = offset + Math.sin(time + vertex.x * 3 + vertex.y * 3) * amp;
        vertex.multiplyScalar(distance);

        positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    positionAttribute.needsUpdate = true;
    sphere.rotation.y += 0.005; // Slow rotation
    sphere.rotation.x += 0.003; // Add slight rotation on the X-axis

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();


// Responsive Resize
window.addEventListener('resize', () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});
