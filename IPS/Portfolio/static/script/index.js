document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const changingWord = document.getElementById('changing-word');
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const joinCommunityBtn = document.getElementById('joinCommunityBtn');
    const joinBtn = document.getElementById('joinBtn');
    const mobileJoinBtn = document.querySelector('.mobile-join');
    const viewProjectsBtn = document.getElementById('viewProjectsBtn');
    const submitProjectBtn = document.getElementById('submitProjectBtn');
    
    // Words to cycle through
    const words = ["Community", "Co-Kreate", "Humanity", "Solving"];
    let currentWordIndex = 0;
    let isFading = true;
    
    // Mobile menu toggle
    burgerMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('open');
    });
    
    // Word cycling animation
    function cycleWords() {
        // Start fade-out
        changingWord.classList.remove('fade-in');
        changingWord.classList.add('fade-out');
        
        // Wait for fade-out to complete before changing the word
        setTimeout(function() {
            // Change the word
            currentWordIndex = (currentWordIndex + 1) % words.length;
            changingWord.textContent = words[currentWordIndex];
            
            // Start fade-in
            changingWord.classList.remove('fade-out');
            changingWord.classList.add('fade-in');
        }, 500);
    }
    
    // Start the word cycling interval
    setInterval(cycleWords, 3000);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60, // Adjust for header height
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu.classList.contains('open')) {
                    mobileMenu.classList.remove('open');
                }
            }
        });
    });
    
    // View projects button smooth scroll
    viewProjectsBtn.addEventListener('click', function() {
        const projectsSection = document.getElementById('projects');
        window.scrollTo({
            top: projectsSection.offsetTop - 60,
            behavior: 'smooth'
        });
    });
    
    // Join community button navigation
    function navigateToJoinCommunity() {
        // In Django, you'll replace this with the URL to your join community page
        window.location.href = '/join-community/';
    }
    
    joinCommunityBtn.addEventListener('click', navigateToJoinCommunity);
    joinBtn.addEventListener('click', navigateToJoinCommunity);
    mobileJoinBtn.addEventListener('click', navigateToJoinCommunity);
    
    // Submit project button navigation
    submitProjectBtn.addEventListener('click', function() {
        // In Django, you'll replace this with the URL to your project submission page
        window.location.href = '/project-submission/';
    });
    
    // Add header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.background = '#ffffff';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = '#ffffff';
        }
    });
    
    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.info-box, .project-card, .service-box');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialize elements with opacity 0
    document.querySelectorAll('.info-box, .project-card, .service-box').forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Run once on page load
    animateOnScroll();
});