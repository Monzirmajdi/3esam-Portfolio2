document.addEventListener("DOMContentLoaded", function() {
    // Get DOM elements
    const loadingOverlay = document.getElementById("loadingOverlay");
    const prevProjectBtn = document.getElementById("prevProject");
    const nextProjectBtn = document.getElementById("nextProject");
    const viewLiveBtn = document.getElementById("viewLiveProject");
    const contactBtn = document.getElementById("contactAboutProject");

    // Initialize the page
    function init() {
        setupProjectNavigation();
        setupActionButtons();
        setupKeyboardNavigation();
    }

    // Setup project navigation
    function setupProjectNavigation() {
        // For demo purposes, disable navigation buttons
        // In a real implementation, these would navigate to other projects
        prevProjectBtn.disabled = true;
        nextProjectBtn.disabled = true;
        
        prevProjectBtn.addEventListener("click", function() {
            // Navigate to previous project
            console.log("Navigate to previous project");
        });

        nextProjectBtn.addEventListener("click", function() {
            // Navigate to next project
            console.log("Navigate to next project");
        });
    }

    // Setup action buttons
    function setupActionButtons() {
        viewLiveBtn.addEventListener("click", function() {
            // Open live project in new tab
            window.open("https://example.com", "_blank");
        });

        contactBtn.addEventListener("click", function() {
            // Navigate back to main site contact section
            window.location.href = "index.html#contact";
        });
    }

    // Setup keyboard navigation
    function setupKeyboardNavigation() {
        document.addEventListener("keydown", function(e) {
            switch(e.key) {
                case "Escape":
                    // Navigate back to main site
                    window.location.href = "index.html";
                    break;
            }
        });
    }

    // Show loading overlay
    function showLoading() {
        loadingOverlay.classList.add("active");
    }

    // Hide loading overlay
    function hideLoading() {
        setTimeout(() => {
            loadingOverlay.classList.remove("active");
        }, 300);
    }

    // Smooth scroll to details section
    function scrollToDetails() {
        const detailsSection = document.querySelector(".project-details");
        detailsSection.scrollIntoView({ 
            behavior: "smooth",
            block: "start"
        });
    }

    // Add scroll indicator
    function addScrollIndicator() {
        const scrollIndicator = document.createElement("div");
        scrollIndicator.className = "scroll-indicator";
        scrollIndicator.innerHTML = "مرر لأسفل لمزيد من التفاصيل ↓";
        scrollIndicator.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            color: #ccc;
            font-size: 14px;
            text-align: center;
            animation: bounce 2s infinite;
            cursor: pointer;
            z-index: 20;
        `;
        
        scrollIndicator.addEventListener("click", scrollToDetails);
        document.getElementById("projectImageContainer").appendChild(scrollIndicator);
    }

    // Add CSS for bounce animation
    const style = document.createElement("style");
    style.textContent = `
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { 
                transform: translateX(-50%) translateY(0); 
            }
            40% { 
                transform: translateX(-50%) translateY(-10px); 
            }
            60% { 
                transform: translateX(-50%) translateY(-5px); 
            }
        }
        
        .scroll-indicator:hover {
            color: #FFD700;
        }
    `;
    document.head.appendChild(style);

    // Initialize everything
    init();
    addScrollIndicator();

    // Handle image load errors
    const projectImage = document.getElementById("projectImage");
    if (projectImage) {
        projectImage.addEventListener("error", function() {
            console.error("Failed to load image:", this.src);
            // You could show a placeholder image here
        });
    }

    // Performance optimization: Intersection Observer for lazy loading
    const observerOptions = {
        root: null,
        rootMargin: "50px",
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, observerOptions);

    // Observe elements for animations
    document.querySelectorAll(".project-details > *").forEach(el => {
        observer.observe(el);
    });
});

