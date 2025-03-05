function openSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.height = "100vh";
  sidebar.style.visibility = "visible";
}

function closeSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.height = "0vh";
  sidebar.style.visibility = "hidden";
}
