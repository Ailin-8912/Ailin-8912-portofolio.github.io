document.addEventListener("DOMContentLoaded", () => {
  /*====================================================================
      1. INISIALISASI PLUGIN (WOW.js)
    ======================================================================*/
  if (typeof WOW !== "undefined") {
    new WOW().init();
  }

  /*====================================================================
      2. LOGIKA TYPING EFFECT (Teks Berjalan)
    ======================================================================*/
  const typingElement = document.getElementById("typing-text");
  const typingElement2 = document.getElementById("typing-text-2");

  const textArray = ["Fadhil Muhammad Abid Al Jabbar", "Web Developer"];
  const textArray2 = [
    "Santri Of SMAIT HSI Boarding School",
    "Can speak Arabic and read the Quran fluently",
  ];

  let arrayIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isSecondLine = false;

  function type() {
    if (!typingElement || !typingElement2) return;

    let currentText = isSecondLine
      ? textArray2[arrayIndex]
      : textArray[arrayIndex];
    let currentElement = isSecondLine ? typingElement2 : typingElement;

    if (isDeleting) {
      currentElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      currentElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let typingSpeed = isDeleting ? 75 : 150;

    if (!isDeleting && charIndex === currentText.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      if (isSecondLine) {
        isSecondLine = false;
        arrayIndex = (arrayIndex + 1) % textArray.length;
      } else {
        isSecondLine = true;
      }
      typingSpeed = 500;
    }
    setTimeout(type, typingSpeed);
  }

  type();

  /*====================================================================
      3. LOGIKA NAVBAR SCROLL (Efek Transparansi)
    ======================================================================*/
  const navbar = document.getElementById("navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    });
  }

  /*====================================================================
      4. LOGIKA TOGGLE DARK MODE (Dengan Perubahan Ikon)
    ======================================================================*/
  const darkModeToggle = document.querySelector(".dark-mode-toggle");

  if (darkModeToggle) {
    const darkModeIcon = darkModeToggle.querySelector("i");
    darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      if (document.body.classList.contains("dark-mode")) {
        darkModeIcon.classList.replace("fa-moon", "fa-sun");
      } else {
        darkModeIcon.classList.replace("fa-sun", "fa-moon");
      }
    });
  }

  /*====================================================================
      5. LOGIKA ANIMASI SKILLS (Bar & Angka Berjalan)
    ======================================================================*/
  const skillItems = document.querySelectorAll(".skill-item");

  const animateSkills = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressFill = entry.target.querySelector(".progress-fill");
        const progressNumber = entry.target.querySelector(".progress-number");

        if (progressFill && progressNumber) {
          const targetValue =
            parseInt(progressFill.getAttribute("data-progress")) || 0;
          progressFill.style.width = targetValue + "%";

          let startValue = 0;
          let duration = 1500;
          let stepTime = Math.abs(Math.floor(duration / targetValue));

          if (targetValue > 0) {
            let counter = setInterval(() => {
              startValue += 1;
              progressNumber.textContent = startValue + "%";

              if (startValue >= targetValue) {
                progressNumber.textContent = targetValue + "%";
                clearInterval(counter);
              }
            }, stepTime);
          }
        }
        observer.unobserve(entry.target);
      }
    });
  };

  const skillObserver = new IntersectionObserver(animateSkills, {
    threshold: 0.5,
  });
  skillItems.forEach((item) => skillObserver.observe(item));

  /*====================================================================
      6. LOGIKA MOBILE MENU & NAV ACTIVE
    ======================================================================*/
  const menuToggle =
    document.getElementById("mobile-menu") ||
    document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu li a");
  const sections = document.querySelectorAll("section");

  // Toggle Menu Mobile
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      menuToggle.classList.toggle("is-active");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuToggle.classList.remove("is-active");
      });
    });
  }

  // Active Link Berdasarkan URL
  const currentPath = window.location.pathname.split("/").pop();
  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href");
    if (
      currentPath === linkPath ||
      (currentPath === "" && linkPath === "index.html")
    ) {
      link.classList.add("active");
    }
  });

  // Active Link Berdasarkan Scroll (Single Page)
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    if (current) {
      navLinks.forEach((a) => {
        a.classList.remove("active");
        if (a.getAttribute("href").includes(current)) {
          a.classList.add("active");
        }
      });
    }
  });
  document.addEventListener("DOMContentLoaded", () => {
    const skillItems = document.querySelectorAll(".skill-item");

    const showProgress = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill = entry.target.querySelector(".progress-fill");
          const num = entry.target.querySelector(".progress-number");
          const targetWidth = fill.getAttribute("data-progress");

          // Gerakkan Bar
          fill.style.width = targetWidth;

          // Animasi Angka Berjalan
          let count = 0;
          const targetNum = parseInt(targetWidth);
          const interval = setInterval(() => {
            if (count >= targetNum) {
              clearInterval(interval);
            } else {
              count++;
              num.innerText = count + "%";
            }
          }, 20); // Kecepatan angka berjalan

          observer.unobserve(entry.target); // Jalankan hanya sekali
        }
      });
    };

    const observer = new IntersectionObserver(showProgress, {
      threshold: 0.5, // Aktif saat 50% elemen terlihat
    });

    skillItems.forEach((item) => observer.observe(item));
  });
});
