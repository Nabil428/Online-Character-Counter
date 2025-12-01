// Text statistics logic
const textInput = document.getElementById("text-input");
const wordCountEl = document.getElementById("word-count");
const charWithSpacesEl = document.getElementById("char-with-spaces");
const charNoSpacesEl = document.getElementById("char-no-spaces");
const sentenceCountEl = document.getElementById("sentence-count");
const paragraphCountEl = document.getElementById("paragraph-count");
const readingTimeEl = document.getElementById("reading-time");
const clearBtn = document.getElementById("clear-btn");

function countStats(text) {
  const trimmed = text.trim();

  // Characters
  const charsWithSpaces = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;

  // Words
  let words = 0;
  if (trimmed.length > 0) {
    // split on any whitespace sequence
    words = trimmed.split(/\s+/).length;
  }

  // Sentences (very simple heuristic)
  let sentences = 0;
  const sentenceMatches = trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  sentences = sentenceMatches.length;

  // Paragraphs (split by blank lines)
  let paragraphs = 0;
  if (trimmed.length > 0) {
    paragraphs = trimmed.split(/\n+/).filter((p) => p.trim().length > 0).length;
  }

  // Reading time (words per minute)
  const wordsPerMinute = 200;
  let readingText = "0 sec";
  if (words > 0) {
    const totalMinutes = words / wordsPerMinute;
    const totalSeconds = Math.round(totalMinutes * 60);

    if (totalSeconds < 30) {
      readingText = "< 30 sec";
    } else if (totalSeconds < 60) {
      readingText = "≈ 1 min";
    } else {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      if (minutes >= 1 && seconds < 20) {
        readingText = `≈ ${minutes} min`;
      } else if (minutes >= 1 && seconds >= 20) {
        readingText = `≈ ${minutes + 1} min`;
      } else {
        readingText = `${totalSeconds} sec`;
      }
    }
  }

  // Update DOM
  wordCountEl.textContent = words;
  charWithSpacesEl.textContent = charsWithSpaces;
  charNoSpacesEl.textContent = charsNoSpaces;
  sentenceCountEl.textContent = sentences;
  paragraphCountEl.textContent = paragraphs;
  readingTimeEl.textContent = readingText;
}

textInput.addEventListener("input", (e) => {
  countStats(e.target.value);
});

clearBtn.addEventListener("click", () => {
  textInput.value = "";
  countStats("");
  textInput.focus();
});

// Initialize with empty text
countStats("");

// FAQ accordion
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const questionBtn = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  questionBtn.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");

    // Close others
    faqItems.forEach((other) => {
      if (other !== item) {
        other.classList.remove("open");
        const otherAnswer = other.querySelector(".faq-answer");
        otherAnswer.style.maxHeight = 0;
      }
    });

    // Toggle current
    if (!isOpen) {
      item.classList.add("open");
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      item.classList.remove("open");
      answer.style.maxHeight = 0;
    }
  });
});

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // Close menu on link click (mobile)
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
