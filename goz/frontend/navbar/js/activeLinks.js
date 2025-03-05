document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".navlink");
  const currentPath = window.location.pathname;

  links.forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });
});
