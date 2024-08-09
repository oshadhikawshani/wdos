document.getElementById('toggle').addEventListener('change', function() {
    var navbar = document.getElementById('navbar');
    if (this.checked) {
        navbar.style.display = 'flex';
    } else {
        navbar.style.display = 'none';
    }
});
