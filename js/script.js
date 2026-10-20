const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Đóng menu" : "Mở menu");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Mở menu");
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}


// Những ngôi sao bốn cánh nhỏ, rải đều dọc trang.
(() => {
  const colors = ["star-green", "star-white", "star-pink", "star-yellow"];
  const positions = [
    [7, 7, 10], [91, 10, 13], [48, 15, 9], [16, 22, 14],
    [83, 27, 10], [5, 35, 12], [94, 41, 9], [72, 47, 14],
    [12, 53, 9], [88, 59, 13], [4, 66, 10], [62, 70, 9],
    [95, 76, 14], [19, 81, 11], [78, 87, 10], [8, 93, 13],
    [51, 96, 9], [91, 97, 10]
  ];
  const starLayer = document.createDocumentFragment();

  positions.forEach(([left, pageRatio, size], index) => {
    const star = document.createElement("span");
    star.className = `four-star ${colors[index % colors.length]}`;
    star.setAttribute("aria-hidden", "true");
    star.style.left = `${left}%`;
    star.style.top = `${pageRatio}%`;
    star.style.setProperty("--star-size", `${size}px`);
    star.style.setProperty("--star-speed", `${3.2 + (index % 4) * 0.45}s`);
    star.style.animationDelay = `${(index % 6) * -0.37}s`;
    starLayer.appendChild(star);
  });

  document.body.appendChild(starLayer);

  // Chạm hoặc nhấp vào các thành phần tương tác sẽ bật ra vài tia sao.
  const interactiveSelector = "a, button, .interest-card, .project-feature";
  document.addEventListener("pointerdown", (event) => {
    if (!event.target.closest(interactiveSelector)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const palette = ["star-green", "star-white", "star-pink", "star-yellow"];
    for (let i = 0; i < 4; i += 1) {
      const burst = document.createElement("span");
      const angle = (Math.PI * 2 * i) / 4 + Math.PI / 4;
      burst.className = `four-star star-interactive ${palette[i]}`;
      burst.setAttribute("aria-hidden", "true");
      burst.style.left = `${event.clientX}px`;
      burst.style.top = `${event.clientY}px`;
      burst.style.setProperty("--burst-x", `${Math.cos(angle) * 24}px`);
      burst.style.setProperty("--burst-y", `${Math.sin(angle) * 24}px`);
      document.body.appendChild(burst);
      burst.addEventListener("animationend", () => burst.remove(), { once: true });
    }
  });
})();
