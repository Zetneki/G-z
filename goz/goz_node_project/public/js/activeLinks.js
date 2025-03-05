document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".navlink");
  const currentPath = window.location.pathname;

  links.forEach((link) => {
    const linkPath = link.getAttribute("href");
    const regex = new RegExp(`^${linkPath}(\\/\\d+)?$`);

    if (regex.test(currentPath)) {
      link.classList.add("active");
    }
  });
});
