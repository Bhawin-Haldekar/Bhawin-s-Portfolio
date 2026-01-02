const cursor = document.querySelector(".cursor");

window.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});


const canvas = document.getElementById("bg");
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  65,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 12;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const starGeometry = new THREE.BufferGeometry();
const starCount = 3000;
const positions = new Float32Array(starCount * 3);

for (let i = 0; i < starCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 300;
}

starGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.8,
  transparent: true,
  opacity: 0.85
});

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

scene.fog = new THREE.Fog(0x000000, 50, 180);

let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

function animate() {
  requestAnimationFrame(animate);

  stars.rotation.y += 0.0004;
  stars.rotation.x += 0.0002;

  camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
  camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02;

  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


gsap.registerPlugin(ScrollTrigger);

gsap.to(".hero", {
  opacity: 0,
  scale: 0.95,
  scrollTrigger: {
    trigger: ".section-journey",
    start: "top bottom",
    scrub: true
  }
});

const path = document.getElementById("journeyPath");
if (path) {
  const length = path.getTotalLength();
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;

  gsap.to(path, {
    strokeDashoffset: 0,
    scrollTrigger: {
      trigger: ".section-journey",
      start: "top 70%",
      end: "bottom center",
      scrub: true
    }
  });
}

gsap.from(".footer-name", {
  y: 60,
  opacity: 0,
  duration: 1.5,
  ease: "power4.out",
  scrollTrigger: {
    trigger: ".footer",
    start: "top 80%"
  }
});
gsap.from(".footer-socials a", {
  y: 30,
  opacity: 0,
  stagger: 0.15,
  duration: 0.8,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".footer",
    start: "top 80%"
  }
});


document.querySelectorAll(".magnetic-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const target =
      btn.textContent.includes("Skill") ? "#skills" : "#projects";
    document.querySelector(target).scrollIntoView({ behavior: "smooth" });
  });
});

gsap.from(".section-resume", {
  opacity: 0,
  y: 60,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".section-resume",
    start: "top 80%"
  }
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"))
    if (target) {
      e.preventDefault()
      target.scrollIntoView({ behavior: "smooth" })
    }
  })
})

const text = "Bhawin Haldekar";
const speed = 120; 
let index = 0;

function typeWriter() {
  if (index < text.length) {
    document.getElementById("typewriter").textContent += text.charAt(index);
    index++;
    setTimeout(typeWriter, speed);
  }
}

window.addEventListener("load", typeWriter);

const cursor = document.querySelector(".custom-cursor");

// Move cursor
window.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// Elements that should trigger hover effect
const hoverTargets = document.querySelectorAll(
  "a, button, .project-card"
);

hoverTargets.forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("hover");
  });

  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
  });
});

