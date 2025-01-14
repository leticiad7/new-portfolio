document.addEventListener("scroll", () => {
    const bigText = document.querySelector(".big-text");
    const scrollY = window.scrollY;

    // Adjust opacity or other styles based on scroll position
    bigText.style.opacity = 1 - scrollY / 800; // Fades out as you scroll down
    bigText.style.transform = `translateY(${scrollY * 0.5}px)`; // Parallax-like effect
});

