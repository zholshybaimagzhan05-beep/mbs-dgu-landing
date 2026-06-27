const header = document.querySelector("[data-header]");
const form = document.querySelector("#leadForm");
const note = document.querySelector("#formNote");
let selectedContext = "Подбор ДГУ";

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
});

document.querySelectorAll("[data-fit]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-fit]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    selectedContext = button.dataset.fit || "Подбор ДГУ";
    document.querySelector("#request")?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});

document.querySelectorAll("[data-request-type]").forEach((link) => {
  link.addEventListener("click", () => {
    selectedContext = link.getAttribute("data-request-type") || "Подбор ДГУ";
  });
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const company = String(data.get("company") || "").trim();
  const phone = String(data.get("phone") || "").trim();

  const message = [
    "Здравствуйте! Нужна консультация по ДГУ.",
    selectedContext ? `Интерес: ${selectedContext}` : "",
    `Имя: ${name}`,
    `Компания: ${company}`,
    `Телефон: ${phone}`,
    "Источник: рекламный лендинг"
  ].filter(Boolean).join("\n");

  if (note) {
    note.textContent = "Заявка сформирована. Сейчас откроется WhatsApp отдела продаж.";
    note.classList.add("success");
  }

  window.open(`https://wa.me/77715255152?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});
