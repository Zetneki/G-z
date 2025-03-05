function toggleOptions() {
    const completeMenu = document.getElementById('completeGame');
    const removeMenu = document.getElementById('removeGame');
    completeMenu.style.display = (completeMenu.style.display === 'block') ? 'none' : 'block';
    removeMenu.style.display = (removeMenu.style.display === 'block') ? 'none' : 'block';
}