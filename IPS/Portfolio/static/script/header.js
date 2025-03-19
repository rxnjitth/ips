// Toggle Mobile Menu
function toggleMobileMenu() {
    let menu = document.getElementById("mobile-menu");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

// Close menu when a link is clicked
document.addEventListener("DOMContentLoaded", function() {
    let links = document.querySelectorAll(".mobile-menu a");
    links.forEach(link => {
        link.addEventListener("click", () => {
            document.getElementById("mobile-menu").style.display = "none";
        });
    });
});
