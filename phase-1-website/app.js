(function () {
  const LANG_KEY = "dermacue-lang";
  let currentLang = "en";

  const waBase = () => `https://wa.me/${CLINIC.whatsapp}`;

  function t(key) {
    return (I18N[currentLang] && I18N[currentLang][key]) || I18N.en[key] || key;
  }

  function getLang() {
    return localStorage.getItem(LANG_KEY) || null;
  }

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang === "hi" ? "hi" : "en";
    document.body.classList.toggle("lang-hi", lang === "hi");
  }

  function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      el.innerHTML = t(el.dataset.i18nHtml);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      el.setAttribute("aria-label", t(el.dataset.i18nAria));
    });

    document.title = t("meta.title");
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = t("meta.description");

    rebuildServiceSelect();
    rebuildTimeSelect();
    rebuildTreatmentsCarousel();
    updateLangSwitcher();
    applyContactConfig();
  }

  function rebuildServiceSelect() {
    const select = document.getElementById("service");
    if (!select) return;
    const prev = select.value;
    select.innerHTML = "";
    const ph = document.createElement("option");
    ph.value = "";
    ph.disabled = true;
    ph.selected = !prev;
    ph.textContent = t("book.servicePh");
    select.appendChild(ph);
    (typeof SERVICE_OPTIONS !== "undefined" ? SERVICE_OPTIONS : []).forEach((key) => {
      const opt = document.createElement("option");
      opt.value = key;
      opt.textContent = t(`service.${key}`);
      if (key === prev) {
        opt.selected = true;
        ph.selected = false;
      }
      select.appendChild(opt);
    });
  }

  function rebuildTreatmentsCarousel() {
    const container = document.getElementById("treatments-scroll");
    if (!container || typeof TREATMENTS === "undefined") return;

    container.innerHTML = "";
    TREATMENTS.forEach(({ id, image }) => {
      const title = t(`service.${id}`);
      const card = document.createElement("article");
      card.className = "treatment-card";
      card.innerHTML = `
        <div class="treatment-card__media">
          <img src="${image}" alt="" loading="lazy" width="280" height="200">
        </div>
        <div class="treatment-card__body">
          <h3 class="treatment-card__title"></h3>
          <p class="treatment-card__desc"></p>
          <a href="#book" class="treatment-card__cta" data-book-service="${id}"></a>
        </div>
      `;
      card.querySelector("img").alt = title;
      card.querySelector(".treatment-card__title").textContent = title;
      card.querySelector(".treatment-card__desc").textContent = t(`svc.card.${id}`);
      card.querySelector(".treatment-card__cta").textContent = t("svc.book");
      container.appendChild(card);
    });

    container.setAttribute("aria-label", t("svc.scrollRegion"));
  }

  function preselectService(serviceId) {
    const select = document.getElementById("service");
    if (!select || !serviceId) return;
    select.value = serviceId;
    const ph = select.querySelector("option[disabled]");
    if (ph) ph.selected = false;
  }

  function scrollTreatments(direction) {
    const scroll = document.getElementById("treatments-scroll");
    if (!scroll) return;
    const card = scroll.querySelector(".treatment-card");
    if (!card) return;
    const gap = parseFloat(getComputedStyle(scroll).gap) || 16;
    scroll.scrollBy({
      left: direction * (card.offsetWidth + gap),
      behavior: "smooth",
    });
  }

  function initTreatmentsCarousel() {
    document.querySelector("[data-scroll-prev]")?.addEventListener("click", () => {
      scrollTreatments(-1);
    });
    document.querySelector("[data-scroll-next]")?.addEventListener("click", () => {
      scrollTreatments(1);
    });

    document.getElementById("treatments-scroll")?.addEventListener("click", (e) => {
      const link = e.target.closest("[data-book-service]");
      if (!link) return;
      preselectService(link.dataset.bookService);
    });
  }

  function rebuildTimeSelect() {
    const select = document.getElementById("time");
    if (!select) return;
    const prev = select.value;
    select.innerHTML = "";
    TIME_OPTIONS.forEach((key, i) => {
      const opt = document.createElement("option");
      opt.value = key;
      if (i === 0) {
        opt.disabled = true;
        opt.selected = !prev;
        opt.textContent = t("book.timePh");
      } else {
        opt.textContent = t(`time.${key}`);
        if (key === prev) {
          opt.selected = true;
          select.querySelector("option[disabled]") &&
            (select.querySelector("option[disabled]").selected = false);
        }
      }
      select.appendChild(opt);
    });
  }

  function updateLangSwitcher() {
    document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
      const active = btn.dataset.langBtn === currentLang;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", active);
    });
  }

  function applyContactConfig() {
    const floatText = t("wa.floatText");

    document.querySelectorAll("[data-wa-link]").forEach((el) => {
      const text = el.dataset.waTextKey ? t(el.dataset.waTextKey) : floatText;
      el.href = `${waBase()}?text=${encodeURIComponent(text)}`;
      if (el.dataset.waTextKey) el.dataset.waText = text;
    });

    document.querySelectorAll("[data-phone-tel]").forEach((el) => {
      el.href = `tel:${CLINIC.phoneTel}`;
    });

    document.querySelectorAll("[data-phone-display]").forEach((el) => {
      el.textContent = CLINIC.phoneDisplay;
    });

    document.querySelectorAll("[data-email]").forEach((el) => {
      el.textContent = CLINIC.email;
      if (el.tagName === "A") el.href = `mailto:${CLINIC.email}`;
    });

    document.querySelectorAll("[data-maps]").forEach((el) => {
      el.href = CLINIC.mapsUrl;
    });

    document.querySelectorAll("[data-social]").forEach((el) => {
      const key = el.dataset.social;
      if (CLINIC.social[key]) el.href = CLINIC.social[key];
    });

    const practoLink = document.getElementById("practo-book-link");
    if (practoLink) {
      if (CLINIC.bookingUrl) {
        practoLink.href = CLINIC.bookingUrl;
        practoLink.style.display = "inline-flex";
      } else {
        practoLink.style.display = "none";
      }
    }
  }

  function buildBookingMessage(data) {
    const serviceKey = data.get("service");
    const timeKey = data.get("time");
    const serviceLabel = serviceKey ? t(`service.${serviceKey}`) : "";
    const timeLabel = timeKey ? t(`time.${timeKey}`) : t("wa.anyTime");

    return [
      t("wa.bookingIntro"),
      "",
      `${t("wa.label.name")}: ${data.get("name")}`,
      `${t("wa.label.phone")}: ${data.get("phone")}`,
      `${t("wa.label.treatment")}: ${serviceLabel}`,
      `${t("wa.label.date")}: ${data.get("date") || t("wa.flexible")}`,
      `${t("wa.label.time")}: ${timeLabel}`,
      data.get("notes") ? `${t("wa.label.notes")}: ${data.get("notes")}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  }

  function handleBookingSubmit(e) {
    e.preventDefault();
    const form = e.target;

    if (!form.querySelector("#consent").checked) {
      alert(t("alert.consent"));
      return;
    }

    const message = buildBookingMessage(new FormData(form));
    window.open(`${waBase()}?text=${encodeURIComponent(message)}`, "_blank");
    form.reset();
    rebuildServiceSelect();
    rebuildTimeSelect();
  }

  function switchLanguage(lang) {
    setLang(lang);
    applyTranslations();
    closeLangModal();
  }

  function showLangModal() {
    const modal = document.getElementById("lang-modal");
    if (modal) {
      modal.classList.add("open");
      document.body.classList.add("modal-open");
    }
  }

  function closeLangModal() {
    const modal = document.getElementById("lang-modal");
    if (modal) {
      modal.classList.remove("open");
      document.body.classList.remove("modal-open");
    }
  }

  function initLangModal() {
    document.querySelectorAll("[data-pick-lang]").forEach((btn) => {
      btn.addEventListener("click", () => switchLanguage(btn.dataset.pickLang));
    });
  }

  function initLangSwitcher() {
    document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
      btn.addEventListener("click", () => switchLanguage(btn.dataset.langBtn));
    });
  }

  function initMobileNav() {
    const toggle = document.querySelector(".nav-hamburger");
    const links = document.querySelector(".nav-links");
    if (!toggle || !links) return;

    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open);
    });

    links.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => links.classList.remove("nav-open"));
    });
  }

  function initFaq() {
    document.querySelectorAll(".faq-question").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".faq-item");
        const open = item.classList.toggle("open");
        btn.setAttribute("aria-expanded", open);
      });
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const href = a.getAttribute("href");
        if (href === "#") return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  function initNavShadow() {
    const nav = document.querySelector("nav");
    window.addEventListener("scroll", () => {
      nav.style.boxShadow =
        window.scrollY > 20 ? "0 2px 20px rgba(44,26,14,0.12)" : "none";
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const saved = getLang();
    if (saved && I18N[saved]) {
      setLang(saved);
      applyTranslations();
    } else {
      setLang("en");
      applyTranslations();
      showLangModal();
    }

    initLangModal();
    initLangSwitcher();
    initMobileNav();
    initFaq();
    initTreatmentsCarousel();
    initSmoothScroll();
    initNavShadow();

    const form = document.getElementById("booking-form");
    if (form) form.addEventListener("submit", handleBookingSubmit);
  });

  window.DermacueI18n = { switchLanguage, t, getLang };
})();
