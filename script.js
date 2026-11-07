// ========================================================
// HIMANSHU YADAV - PORTFOLIO INTERACTIVITY SCRIPT
// Apple-Style Animations, Dynamic Theme, Typewriter, Filters & Modal
// ========================================================

document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------------------------------
  // 1. 🌙 THEME TOGGLE (DARK / LIGHT MODE) WITH PERSISTENCE
  // ----------------------------------------------------
  const themeToggle = document.getElementById("themeToggle");
  const currentTheme = localStorage.getItem("portfolio-theme");

  if (currentTheme === "light") {
    document.body.classList.add("light-theme");
    if (themeToggle) themeToggle.checked = true;
  }

  if (themeToggle) {
    themeToggle.addEventListener("change", () => {
      if (themeToggle.checked) {
        document.body.classList.add("light-theme");
        localStorage.setItem("portfolio-theme", "light");
      } else {
        document.body.classList.remove("light-theme");
        localStorage.setItem("portfolio-theme", "dark");
      }
    });
  }

  // ----------------------------------------------------
  // 2. 🔥 HARDWARE-ACCELERATED SILKY SMOOTH CURSOR GLOW (60-144 FPS)
  // ----------------------------------------------------
  const cursorGlow = document.getElementById("cursorGlow");
  if (cursorGlow) {
    let mouseX = -1000, mouseY = -1000;
    let targetX = -1000, targetY = -1000;
    let isMoving = false;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isMoving) {
        isMoving = true;
        requestAnimationFrame(renderGlow);
      }
    }, { passive: true });

    function renderGlow() {
      targetX += (mouseX - targetX) * 0.22;
      targetY += (mouseY - targetY) * 0.22;
      cursorGlow.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;

      if (Math.abs(mouseX - targetX) > 0.4 || Math.abs(mouseY - targetY) > 0.4) {
        requestAnimationFrame(renderGlow);
      } else {
        isMoving = false;
      }
    }
  }

  // ----------------------------------------------------
  // 3. ⌨️ DYNAMIC TYPEWRITER EFFECT
  // ----------------------------------------------------
  const sentences = [
    "Full Stack Web Developer & SDE Intern",
    "Proficient in Java, Spring Boot & React.js",
    "200+ LeetCode DSA Solved | Knight Badge",
    "Building Scalable RESTful Microservices",
    "Passionate about Data Structures & System Design"
  ];

  const typewriterElement = document.getElementById("typewriter");
  let sentenceIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!typewriterElement) return;

    const currentSentence = sentences[sentenceIndex];

    if (!isDeleting) {
      typewriterElement.textContent = currentSentence.substring(0, charIndex++);
      if (charIndex > currentSentence.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1800);
        return;
      }
    } else {
      typewriterElement.textContent = currentSentence.substring(0, charIndex--);
      if (charIndex === 0) {
        isDeleting = false;
        sentenceIndex = (sentenceIndex + 1) % sentences.length;
      }
    }

    setTimeout(typeEffect, isDeleting ? 35 : 75);
  }

  typeEffect();

  // ----------------------------------------------------
  // 5. 🏷️ CERTIFICATION CATEGORY FILTERING LOGIC
  // ----------------------------------------------------
  const filterButtons = document.querySelectorAll(".filter-btn");
  const certCards = document.querySelectorAll(".cert-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      certCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        if (filterValue === "all" || cardCategory === filterValue) {
          card.classList.remove("hide");
        } else {
          card.classList.add("hide");
        }
      });
    });
  });

  // ----------------------------------------------------
  // 6. 📱 MOBILE DRAWER MENU
  // ----------------------------------------------------
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const closeDrawerBtn = document.getElementById("closeDrawerBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileDrawer.classList.add("open");
    });
  }

  if (closeDrawerBtn && mobileDrawer) {
    closeDrawerBtn.addEventListener("click", () => {
      mobileDrawer.classList.remove("open");
    });
  }

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileDrawer) mobileDrawer.classList.remove("open");
    });
  });

  // Close drawer if user clicks outside
  document.addEventListener("click", (e) => {
    if (
      mobileDrawer &&
      mobileDrawer.classList.contains("open") &&
      !mobileDrawer.contains(e.target) &&
      !mobileMenuBtn.contains(e.target)
    ) {
      mobileDrawer.classList.remove("open");
    }
  });

  // ----------------------------------------------------
  // 7. 📥 RESUME DOWNLOAD BUTTON HANDLER
  // ----------------------------------------------------
  const downloadCvBtn = document.getElementById("downloadCvBtn");
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener("click", (e) => {
      // You can replace 'assets/Himanshu_Yadav_Resume.pdf' with your actual resume file in VS Code
      const resumeUrl = "assets/Himanshu_Yadav_Resume.pdf";
      fetch(resumeUrl, { method: "HEAD" })
        .then((res) => {
          if (res.ok) {
            window.open(resumeUrl, "_blank");
          } else {
            showToast("Tip: Put your resume as assets/Himanshu_Yadav_Resume.pdf in VS Code!");
          }
        })
        .catch(() => {
          showToast("Tip: Put your resume as assets/Himanshu_Yadav_Resume.pdf in VS Code!");
        });
    });
  }
});

// ========================================================
// 🖼️ MODAL POPUP LOGIC (GLOBAL SCOPE)
// ========================================================
function openModal(src) {
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImg");
  if (modal && modalImg) {
    modal.classList.add("show");
    modalImg.src = src;
    document.body.style.overflow = "hidden";
  }
}

function closeModal() {
  const modal = document.getElementById("imgModal");
  if (modal) {
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
  }
}

// Close on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

// Click outside image closes modal
window.addEventListener("click", (e) => {
  const modal = document.getElementById("imgModal");
  if (e.target === modal) {
    closeModal();
  }
});

// ========================================================
// 📋 CLIPBOARD COPY UTILITY WITH TOAST NOTIFICATION
// ========================================================
function copyText(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    showToast("✓ Copied: " + text);
    if (btnElement) {
      const origHtml = btnElement.innerHTML;
      btnElement.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
      setTimeout(() => {
        btnElement.innerHTML = origHtml;
      }, 2000);
    }
  }).catch(() => {
    showToast("Could not copy automatically. Email: " + text);
  });
}

// ========================================================
// 🔔 TOAST NOTIFICATION UTILITY
// ========================================================
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

// ========================================================
// ✉️ CONTACT FORM SUBMISSION
// ========================================================
function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("nameInput").value.trim();
  const email = document.getElementById("emailInput").value.trim();
  const subject = document.getElementById("subjectInput").value.trim();
  const message = document.getElementById("messageInput").value.trim();
  const submitBtn = document.getElementById("submitBtn");
  const formStatus = document.getElementById("formStatus");

  if (!name || !email || !message) {
    if (formStatus) {
      formStatus.textContent = "Please fill in all required fields.";
      formStatus.style.color = "#ef4444";
    }
    return;
  }

  // Button loading state
  const origBtnText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = origBtnText;

    if (formStatus) {
      formStatus.textContent = "Thank you, " + name + "! Your message was received.";
      formStatus.style.color = "#10b981";
    }

    showToast("Message sent successfully! Opening email client...");

    // Also open mailto link as seamless fallback
    const mailtoUrl = `mailto:yadavhimanshu68493@gmail.com?subject=${encodeURIComponent(
      subject || "Portfolio Contact: " + name
    )}&body=${encodeURIComponent(
      `From: ${name} (${email})\n\n${message}`
    )}`;
    window.location.href = mailtoUrl;

    document.getElementById("contactForm").reset();
    setTimeout(() => {
      if (formStatus) formStatus.textContent = "";
    }, 5000);
  }, 800);
}
