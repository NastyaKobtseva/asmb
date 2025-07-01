// preloader
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  if (preloader) {
    preloader.classList.add("hidden");

    preloader.addEventListener("transitionend", () => {
      preloader.style.display = "none";
    });
  }
});

// burger menu
const menu = document.querySelector(".navigation");
const menuItems = document.querySelectorAll(".menu__link");
const hamburger = document.querySelector(".hamburger");
const closeIcon = document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");

function toggleMenu() {
  if (menu.classList.contains("showNavigation")) {
    menu.classList.remove("showNavigation");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    menu.classList.add("showNavigation");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
  }
}

hamburger.addEventListener("click", toggleMenu);

menuItems.forEach(function (menuItem) {
  menuItem.addEventListener("click", toggleMenu);
});

// lang
let currentLanguage = localStorage.getItem("language") || "uk";

function switchLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem("language", lang);

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.getAttribute("data-lang") === lang) {
      btn.classList.add("active");
    }
  });

  // Текстовий контент
  document.querySelectorAll("[data-en][data-uk]").forEach((element) => {
    const html = element.getAttribute("data-" + lang);
    if (html) {
      element.innerHTML = html;
    }
  });

  // Атрибути
  const attributesToTranslate = ["placeholder", "value", "aria-label", "title"];
  attributesToTranslate.forEach((attr) => {
    document.querySelectorAll(`[data-${lang}-${attr}]`).forEach((el) => {
      const translated = el.getAttribute(`data-${lang}-${attr}`);
      if (translated) {
        el.setAttribute(attr, translated);
      }
    });
  });

  document.documentElement.setAttribute("lang", lang);
  console.log("Language switched to:", lang);
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const lang = this.getAttribute("data-lang");
      switchLanguage(lang);
    });
  });

  switchLanguage(currentLanguage);
});

// navigation-script
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".section");
  const navDots = document.querySelectorAll(".nav-dot");

  window.addEventListener("scroll", function () {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navDots.forEach((dot) => {
      dot.classList.remove("active");
      if (dot.getAttribute("href").substring(1) === current) {
        dot.classList.add("active");
      }
    });
  });
});
// pricing-toggle-script
document.addEventListener("DOMContentLoaded", () => {
  let currentLanguage = localStorage.getItem("language") || "uk";
  let currentPeriod = "monthly";

  function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem("language", lang);

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });

    // Оновити тексти з data-en/data-uk
    document.querySelectorAll("[data-en][data-uk]").forEach((el) => {
      el.innerHTML = el.getAttribute(`data-${lang}`);
    });

    // Оновити атрибути
    const attrs = ["placeholder", "value", "aria-label", "title"];
    attrs.forEach((attr) => {
      document.querySelectorAll(`[data-${lang}-${attr}]`).forEach((el) => {
        el.setAttribute(attr, el.getAttribute(`data-${lang}-${attr}`));
      });
    });

    document.documentElement.setAttribute("lang", lang);

    // Оновити періодні підписи
    updatePeriodLabelsLanguage();

    // Оновити ціну з правильним періодом
    updatePrices(currentPeriod);
  }

  function updatePeriodLabelsLanguage() {
    document.querySelectorAll(".period-label").forEach((label) => {
      label.textContent = label.getAttribute(`data-${currentLanguage}`);
    });
  }

  function updatePrices(period) {
    const prices = document.querySelectorAll(".price");
    prices.forEach((priceEl) => {
      const monthly = priceEl.dataset.monthly;
      const annual = priceEl.dataset.annual;

      // Оновлюємо числову частину без затирання span
      priceEl.childNodes[0].textContent = `$${
        period === "monthly" ? monthly : annual
      }`;

      // Показуємо/ховаємо потрібний періодний лейбл
      priceEl.querySelectorAll(".period-label").forEach((label) => {
        if (label.classList.contains("month-label")) {
          label.style.display = period === "monthly" ? "inline" : "none";
        } else if (label.classList.contains("year-label")) {
          label.style.display = period === "annual" ? "inline" : "none";
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const monthlyBtn = document.getElementById("monthly-btn");
    const annualBtn = document.getElementById("annual-btn");

    monthlyBtn.addEventListener("click", () => {
      currentPeriod = "monthly";
      monthlyBtn.classList.add("bg-primary", "text-white");
      monthlyBtn.classList.remove("text-gray-700");
      annualBtn.classList.remove("bg-primary", "text-white");
      annualBtn.classList.add("text-gray-700");
      updatePrices("monthly");
    });

    annualBtn.addEventListener("click", () => {
      currentPeriod = "annual";
      annualBtn.classList.add("bg-primary", "text-white");
      annualBtn.classList.remove("text-gray-700");
      monthlyBtn.classList.remove("bg-primary", "text-white");
      monthlyBtn.classList.add("text-gray-700");
      updatePrices("annual");
    });

    // Ініціалізація на завантаженні
    switchLanguage(currentLanguage);
    updatePrices(currentPeriod);
  });
});
// achievements-chart-script
document.addEventListener("DOMContentLoaded", function () {
  const chartContainer = document.getElementById("achievements-chart");
  if (chartContainer) {
    const chart = echarts.init(chartContainer);

    const option = {
      animation: false,
      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderColor: "#ccc",
        borderWidth: 1,
        textStyle: {
          color: "#1f2937",
        },
      },
      grid: {
        top: 10,
        right: 10,
        bottom: 30,
        left: 60,
      },
      xAxis: {
        type: "category",
        data: ["2019", "2020", "2021", "2022", "2023", "2024"],
        axisLine: {
          lineStyle: {
            color: "#ddd",
          },
        },
        axisLabel: {
          color: "#1f2937",
        },
      },
      yAxis: {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#ddd",
          },
        },
        axisLabel: {
          color: "#1f2937",
        },
        splitLine: {
          lineStyle: {
            color: "#eee",
          },
        },
      },
      series: [
        {
          name: "Members",
          type: "line",
          smooth: true,
          data: [120, 180, 240, 320, 420, 500],
          lineStyle: {
            width: 3,
            color: "rgba(87, 181, 231, 1)",
          },
          symbol: "none",
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(87, 181, 231, 0.2)",
                },
                {
                  offset: 1,
                  color: "rgba(87, 181, 231, 0.05)",
                },
              ],
            },
          },
        },
        {
          name: "Events",
          type: "line",
          smooth: true,
          data: [30, 40, 60, 90, 150, 250],
          lineStyle: {
            width: 3,
            color: "rgba(141, 211, 199, 1)",
          },
          symbol: "none",
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(141, 211, 199, 0.2)",
                },
                {
                  offset: 1,
                  color: "rgba(141, 211, 199, 0.05)",
                },
              ],
            },
          },
        },
      ],
    };

    chart.setOption(option);

    window.addEventListener("resize", function () {
      chart.resize();
    });
  }
});

// modal
document.addEventListener("DOMContentLoaded", () => {
  function disableScroll() {
    document.documentElement.classList.add("modal-open");
    document.body.classList.add("modal-open");
  }

  function enableScroll() {
    document.documentElement.classList.remove("modal-open");
    document.body.classList.remove("modal-open");
  }

  document.querySelectorAll(".open-modal").forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target");
      const modal = document.getElementById(targetId);
      if (!modal) return;

      modal.classList.remove("hide");
      modal.classList.add("show");
      modal.style.display = "block";

      disableScroll();
    });
  });

  document.querySelectorAll(".modal .close").forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
      const modal = closeBtn.closest(".modal");
      if (!modal) return;

      modal.classList.remove("show");
      modal.classList.add("hide");

      setTimeout(() => {
        modal.style.display = "none";
        enableScroll();
      }, 400);
    });
  });

  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      e.target.classList.remove("show");
      e.target.classList.add("hide");

      setTimeout(() => {
        e.target.style.display = "none";
        enableScroll();
      }, 400);
    }
  });

  document.querySelectorAll(".form-board").forEach((form) => {
    const radioOwner = form.querySelector(".radio-owner");
    const radioManager = form.querySelector(".radio-manager");
    const employeesWrapper = form.querySelector(".employees-wrapper");

    if (radioOwner && radioManager && employeesWrapper) {
      radioOwner.addEventListener("change", () => {
        if (radioOwner.checked) {
          employeesWrapper.style.display = "block";
        }
      });

      radioManager.addEventListener("change", () => {
        if (radioManager.checked) {
          employeesWrapper.style.display = "none";
        }
      });
    }
  });
  document.querySelectorAll(".modal form").forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const lang = document.documentElement.lang || "uk";

      const errors = [];

      const nameInput = form.querySelector('[name="name"]');
      if (validator.isEmpty(nameInput.value.trim())) {
        errors.push(
          lang === "uk"
            ? "Будь ласка, введіть ім’я та прізвище"
            : "Please enter your full name"
        );
      }
      const phoneInput = form.querySelector('[name="phone"]');
      const phoneValue = phoneInput.value.trim();
      if (!validator.isEmpty(phoneValue)) {
        const onlyDigits = phoneValue.replace(/\D/g, "");

        if (onlyDigits.length !== 9) {
          errors.push(
            lang === "uk"
              ? "Номер телефону має містити 9 цифр"
              : "Phone number must contain 9 digits"
          );
        }
      } else {
        errors.push(
          lang === "uk"
            ? "Поле телефону є обов'язковим"
            : "Phone field is required"
        );
      }

      const emailInput = form.querySelector('[name="email"]');
      if (!validator.isEmail(emailInput.value.trim())) {
        errors.push(lang === "uk" ? "Невірний email" : "Invalid email");
      }

      const cityInput = form.querySelector('[name="city"]');
      if (validator.isEmpty(cityInput.value.trim())) {
        errors.push(
          lang === "uk" ? "Будь ласка, введіть місто" : "Please enter your city"
        );
      }

      const consentCheckbox = form.querySelector('[name="consent"]');
      if (!consentCheckbox.checked) {
        errors.push(
          lang === "uk" ? "Потрібно дати згоду" : "Consent is required"
        );
      }

      if (errors.length > 0) {
        alert(errors.join("\n"));
        return;
      }
      const iti = window.intlTelInputGlobals.getInstance(phoneInput);
      const fullNumber = iti.getNumber();
      const formData = new FormData(form);
      formData.set("phone", fullNumber);
      fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { Accept: "application/json" },
      })
        .then((response) => {
          if (response.ok) {
            const submitButton = form.querySelector('button[type="submit"]');
            const successText =
              submitButton.getAttribute(`data-${lang}-success`) ||
              "Заявка відправлена ✓";
            submitButton.textContent = successText;
            form.reset();
          } else {
            showAlertByLang(lang, "error");
          }
        })
        .catch(() => {
          showAlertByLang(lang, "connectionError");
        });
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('input[name="phone"]').forEach((input) => {
    window.intlTelInput(input, {
      initialCountry: "ua",
      preferredCountries: ["ua"],
      separateDialCode: true,
      showFlags: true,
      utilsScript:
        "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
    });
  });
});

// contact form
document.querySelectorAll(".form-tw").forEach((form) => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const lang = document.documentElement.lang || "uk";

    const errors = [];

    const nameInput = form.querySelector('[name="name"]');
    if (validator.isEmpty(nameInput.value.trim())) {
      errors.push(
        lang === "uk"
          ? "Будь ласка, введіть ім’я та прізвище"
          : "Please enter your full name"
      );
    }

    const emailInput = form.querySelector('[name="email"]');
    if (!validator.isEmail(emailInput.value.trim())) {
      errors.push(lang === "uk" ? "Невірний email" : "Invalid email");
    }

    const subjectInput = form.querySelector('[name="subject"]');
    if (validator.isEmpty(subjectInput.value.trim())) {
      errors.push(
        lang === "uk" ? "Будь ласка, введіть тему" : "Please enter a subject"
      );
    }

    const messageInput = form.querySelector('[name="message"]');
    if (validator.isEmpty(messageInput.value.trim())) {
      errors.push(
        lang === "uk"
          ? "Будь ласка, введіть повідомлення"
          : "Please enter a message"
      );
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    const formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          const submitButton = form.querySelector('button[type="submit"]');
          const successText =
            submitButton.getAttribute(`data-${lang}-success`) ||
            (lang === "uk" ? "Повідомлення надіслано ✓" : "Message sent ✓");
          submitButton.textContent = successText;
          form.reset();
        } else {
          showAlertByLang(lang, "error");
        }
      })
      .catch(() => {
        showAlertByLang(lang, "connectionError");
      });
  });
});
document.querySelectorAll(".form-footer").forEach((form) => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const lang = document.documentElement.lang || "uk";

    const errors = [];

    const emailInput = form.querySelector('[name="email"]');
    if (!validator.isEmail(emailInput.value.trim())) {
      errors.push(lang === "uk" ? "Невірний email" : "Invalid email");
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    const formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          const submitButton = form.querySelector('button[type="submit"]');
          const successText =
            submitButton.getAttribute(`data-${lang}-success`) ||
            (lang === "uk" ? "Підписка оформлена ✓" : "Subscribed ✓");
          submitButton.textContent = successText;
          form.reset();
        } else {
          showAlertByLang(lang, "error");
        }
      })
      .catch(() => {
        showAlertByLang(lang, "connectionError");
      });
  });
});
// carousel
const slides = document.getElementById("carouselSlides");

slides.innerHTML += slides.innerHTML;

let scrollPosition = 0;
const speed = 0.7;

function step() {
  scrollPosition += speed;
  if (scrollPosition >= slides.scrollWidth / 2) {
    scrollPosition = 0;
  }
  slides.style.transform = `translateX(${-scrollPosition}px)`;
  requestAnimationFrame(step);
}

step();

// animation
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

sections.forEach((section, index) => {
  if (!section.closest("header") && !section.closest("footer")) {
    section.classList.add("section-animate");

    if (index === 0) {
      setTimeout(() => {
        section.classList.add("first-visible");
      }, 200);
    } else {
      observer.observe(section);
    }
  }
});

// timer
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  const animateCounter = (el) => {
    const targetText = el.textContent.trim();
    const isMoney = targetText.includes("$");
    const isPlus = targetText.includes("+");

    // Витяг цільового числа (наприклад, 250 з "250+" або 25 з "$25M+")
    const numberOnly = parseFloat(targetText.replace(/[^0-9.]/g, ""));
    const isMillion = targetText.toLowerCase().includes("m");

    const finalValue = isMillion ? numberOnly * 1_000_000 : numberOnly;
    let start = 0;
    const duration = 1200; // в мс
    const stepTime = 10;
    const steps = duration / stepTime;
    const increment = finalValue / steps;

    const updateCounter = () => {
      start += increment;
      if (start >= finalValue) {
        el.textContent =
          (isMoney ? "$" : "") +
          (isMillion
            ? Math.round(start / 1_000_000) + "M"
            : Math.round(start)) +
          (isPlus ? "+" : "");
        clearInterval(timer);
        return;
      }
      el.textContent =
        (isMoney ? "$" : "") +
        (isMillion ? Math.round(start / 1_000_000) + "M" : Math.round(start)) +
        (isPlus ? "+" : "");
    };

    const timer = setInterval(updateCounter, stepTime);
  };

  // Використовуємо IntersectionObserver, щоб запустити анімацію лише при вході секції в область видимості
  const observer = new IntersectionObserver(
    (entries, observerSelf) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observerSelf.unobserve(entry.target); // Запускається лише раз
        }
      });
    },
    {
      threshold: 0.3, // Коли 50% елемента видно
    }
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });
});
