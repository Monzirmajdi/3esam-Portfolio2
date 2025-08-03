document.addEventListener("DOMContentLoaded", function() {
    // Elements
    const navLinks = document.querySelectorAll(".nav-link");
    const actionBtns = document.querySelectorAll(".action-btn");
    const modals = document.querySelectorAll(".modal");
    const closeBtns = document.querySelectorAll(".close-btn");
    const projectCategories = document.querySelectorAll(".project-category");
    const backToProjectsBtn = document.getElementById("backToProjectsBtn");

    // Project Data
    const projectData = {
        "branding-1": {
            title: "Brand Identity for Tech Startup",
            client: "Innovate Inc.",
            duration: "2 months",
            role: "Lead Designer",
            tools: "Illustrator, Photoshop",
            description: "Developed a complete brand identity, including logo, color palette, and typography.",
            images: ["images/Social-media/Untitled74_20250803153857.webp"],
            type: "branding"
        },
        "branding-2": {
            title: "Rebranding for a Coffee Shop",
            client: "The Daily Grind",
            duration: "1 month",
            role: "Graphic Designer",
            tools: "Illustrator, InDesign",
            description: "A fresh new look for a local coffee shop, including a new logo and menu design.",
            images: ["images/branding/brand2.jpg"],
            type: "branding"
        },
        "social-1": {
            title: "Social Media Campaign",
            client: "Fashion Brand",
            duration: "3 weeks",
            role: "Content Creator",
            tools: "Photoshop, Canva",
            description: "Designed a series of engaging posts for Instagram and Facebook.",
            images: ["images/Social-media/Untitled74_20250803153857.webp"],
            type: "social-media"
        },
        "illustration-1": {
            title: "Character Design",
            client: "Children's Book",
            duration: "1.5 months",
            role: "Illustrator",
            tools: "Procreate, Photoshop",
            description: "Created lovable characters for an upcoming children's book.",
            images: ["images/illustrations/illus1.jpg"],
            type: "illustrations"
        }
    };

    // Event Listeners
    navLinks.forEach(link => link.addEventListener("click", handleNavClick));
    actionBtns.forEach(btn => btn.addEventListener("click", handleActionBtnClick));
    closeBtns.forEach(btn => btn.addEventListener("click", handleCloseBtnClick));
    modals.forEach(modal => modal.addEventListener("click", handleModalOutsideClick));
    document.addEventListener("click", handleProjectItemClick);
    projectCategories.forEach(category => category.addEventListener("click", handleCategoryClick));
    
    if (backToProjectsBtn) {
        backToProjectsBtn.addEventListener("click", handleBackToProjects);
    }

    // Initialize components
    initExperienceCardFlip();
    createFloatingElements();
    setupLazyLoading();
    setupPageLoader();
    setupHoverEffects();
    setupScrollers();

    // Functions
    function handleNavClick(e) {
        e.preventDefault();
        const section = this.getAttribute("data-section");
        
        navLinks.forEach(l => l.classList.remove("active"));
        this.classList.add("active");
        
        if (section === "experience") {
            document.querySelector(".experience-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
        } 
        else if (section === "contact") {
            openModal(section);
        }
        else if (section === "projects") {
            document.querySelector(".projects-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        else if (section === "portfolio") {
            openModal(section);
        }
        else if (section === "about") {
            document.querySelector(".about-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        else if (section === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }

    function handleActionBtnClick() {
        const section = this.getAttribute("data-section");
        openModal(section);
    }

    function handleCloseBtnClick() {
        const modalId = this.getAttribute("data-modal");
        const modal = document.getElementById(modalId);
        
        if (modal) {
            modal.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    }

    function handleModalOutsideClick(e) {
        if (e.target === this) {
            this.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    }

    function handleProjectItemClick(e) {
        const projectItem = e.target.closest(".project-item");
        if (projectItem) {
            const projectId = projectItem.getAttribute("data-project-id");
            if (projectId) showProjectDetail(projectId);
        }
    }

    function handleCategoryClick() {
        const categoryType = this.getAttribute("data-category");
        let modalId = "";
        
        switch(categoryType) {
            case "branding": modalId = "brandingModal"; break;
            case "social-media": modalId = "socialMediaModal"; break;
            case "illustrations": modalId = "illustrationsModal"; break;
        }
        
        if (modalId) openModal(modalId.replace("Modal", ""));
    }

    function handleBackToProjects() {
        const projectDetailModal = document.getElementById("projectDetailModal");
        const activeProject = document.querySelector(".project-item[data-project-id]");
        
        if (projectDetailModal) {
            projectDetailModal.classList.remove("active");
            
            if (activeProject) {
                const projectId = activeProject.getAttribute("data-project-id");
                const project = projectData[projectId];
                if (project) openModal(project.type);
            }
        }
    }

    function showProjectDetail(projectId) {
        const project = projectData[projectId];
        const projectDetailModal = document.getElementById("projectDetailModal");
        const projectDetail = document.getElementById("projectDetail");
        
        if (project && projectDetail) {
            projectDetail.innerHTML = `
                <div class="project-detail-header">
                    <h2 class="project-detail-title">${project.title}</h2>
                    <div class="project-detail-meta">
                        <div class="project-detail-meta-item">
                            <h4>Client</h4>
                            <p>${project.client}</p>
                        </div>
                        <div class="project-detail-meta-item">
                            <h4>Duration</h4>
                            <p>${project.duration}</p>
                        </div>
                        <div class="project-detail-meta-item">
                            <h4>Role</h4>
                            <p>${project.role}</p>
                        </div>
                        <div class="project-detail-meta-item">
                            <h4>Tools</h4>
                            <p>${project.tools}</p>
                        </div>
                    </div>
                    <p class="project-detail-description">${project.description}</p>
                </div>
                <img src="${project.images[0]}" alt="${project.title}" class="project-detail-image">
            `;
            
            document.querySelector(".modal.active")?.classList.remove("active");
            projectDetailModal.classList.add("active");
        }
    }

    function openModal(section) {
        const modal = document.getElementById(section + "Modal");
        if (modal) {
            modals.forEach(m => m.classList.remove("active"));
            modal.classList.add("active");
            document.body.style.overflow = "hidden";
        }
    }

    function initExperienceCardFlip() {
        const experienceCards = document.querySelectorAll('.experience-card');
        
        experienceCards.forEach(card => {
            card.addEventListener('click', function() {
                this.classList.toggle('flipped');
            });
            
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.classList.toggle('flipped');
                }
            });
            
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', 'Click to flip card and view details');
        });
    }

    function createFloatingElements() {
        const container = document.body;
        
        for (let i = 0; i < 5; i++) {
            const element = document.createElement("div");
            element.style.cssText = `
                position: fixed;
                width: ${Math.random() * 100 + 50}px;
                height: ${Math.random() * 100 + 50}px;
                background: linear-gradient(45deg, rgba(0, 255, 136, 0.1), rgba(0, 204, 255, 0.1));
                border-radius: 50%;
                pointer-events: none;
                z-index: -1;
                animation: float ${Math.random() * 10 + 10}s infinite linear;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            container.appendChild(element);
        }

        const style = document.createElement("style");
        style.textContent = `
            @keyframes float {
                0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
                50% { opacity: 1; }
                100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    function setupLazyLoading() {
        const lazyImages = document.querySelectorAll("img[data-src]");
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute("data-src");
                    imageObserver.unobserve(img);
                }
            });
        }, { rootMargin: "200px" });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    function setupPageLoader() {
        window.addEventListener("load", function() {
            const loader = document.createElement("div");
            loader.className = "page-loader";
            loader.innerHTML = `
                <div class="loader-content">
                    <div class="loader-spinner"></div>
                    <div class="loader-logo">✦ Esam</div>
                </div>
            `;
            document.body.appendChild(loader);
            
            setTimeout(() => {
                loader.style.opacity = "0";
                setTimeout(() => loader.remove(), 500);
            }, 1000);
        });
    }

    function setupHoverEffects() {
        document.querySelectorAll(".portfolio-item, .action-btn, .social-link").forEach(el => {
            el.addEventListener("mousemove", function(e) {
                const rect = this.getBoundingClientRect();
                this.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
                this.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
            });
        });
    }

    function setupScrollers() {
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            const scrollers = document.querySelectorAll(".scroller");
            
            scrollers.forEach((scroller) => {
                scroller.setAttribute("data-animated", true);
                const scrollerInner = scroller.querySelector(".scroller__inner");
                const scrollerContent = Array.from(scrollerInner.children);
                
                scrollerContent.forEach((item) => {
                    const duplicatedItem = item.cloneNode(true);
                    duplicatedItem.setAttribute("aria-hidden", true);
                    scrollerInner.appendChild(duplicatedItem);
                });
            });
        }
    }
}); 
