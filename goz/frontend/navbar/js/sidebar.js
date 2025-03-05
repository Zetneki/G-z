function openSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.height = "100%";
  sidebar.style.visibility = "visible";
}

function closeSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.height = "0%";
  sidebar.style.visibility = "hidden";
}
