document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove 'active' class from all links
            document.querySelectorAll('nav ul li a').forEach(link => {
                link.classList.remove('active');
            });
            // Add 'active' class to the clicked link
            this.classList.add('active');

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - document.querySelector('header').offsetHeight, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-50% 0px -50% 0px' // Adjust this value to change when sections become active
    });

    sections.forEach(section => {
        observer.observe(section);
    });


    // Theme Toggle (Dark Mode)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        // Save theme preference
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // Dynamic Skills Section
    const skills = [
        { name: 'HTML5', icon: 'fab fa-html5' }, // Using Font Awesome for icons (if you link it)
        { name: 'CSS3', icon: 'fab fa-css3-alt' },
        { name: 'JavaScript', icon: 'fab fa-js' },
        { name: 'Node.js', icon: 'fab fa-react' },
        { name: 'AWS', icon: 'fab fa-node-js' },
        { name: 'java', icon: 'fab fa-python' },
        { name: 'Git & GitHub', icon: 'fab fa-git-alt' },
        { name: 'Responsive Design', icon: 'fas fa-mobile-alt' } // Font Awesome solid icon
    ];

    const skillsContainer = document.getElementById('skills-container');

    function loadSkills() {
        skillsContainer.innerHTML = ''; // Clear existing skills
        skills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.classList.add('skill-item');
            skillItem.innerHTML = `
                ${skill.icon ? `<i class="${skill.icon} fa-2x"></i>` : ''}
                <h3>${skill.name}</h3>
            `;
            skillsContainer.appendChild(skillItem);
        });
    }

    loadSkills();

    // Portfolio Items Data
    const portfolioItems = [
        {
            id: 1,
            title: 'E-commerce Store',
            description: 'A full-stack e-commerce platform built with React and Node.js.',
            image: 'https://via.placeholder.com/300x200/007bff/FFFFFF?text=Project+1',
            category: 'fullstack',
            tags: ['React', 'Node.js', 'MongoDB'],
            liveLink: '#',
            githubLink: '#'
        },
        {
            id: 2,
            title: 'Personal Blog',
            description: 'A responsive blog website designed for content creators.',
            image: 'https://via.placeholder.com/300x200/28a745/FFFFFF?text=Project+2',
            category: 'web-design',
            tags: ['HTML', 'CSS', 'JavaScript'],
            liveLink: '#',
            githubLink: '#'
        },
        {
            id: 3,
            title: 'Task Manager App',
            description: 'A simple task management application with drag-and-drop functionality.',
            image: 'https://via.placeholder.com/300x200/ffc107/FFFFFF?text=Project+3',
            category: 'frontend',
            tags: ['Vue.js', 'Firebase'],
            liveLink: '#',
            githubLink: '#'
        },
        {
            id: 4,
            title: 'RESTful API Service',
            description: 'Backend API for a mobile application, built with Express.js.',
            image: 'https://via.placeholder.com/300x200/dc3545/FFFFFF?text=Project+4',
            category: 'backend',
            tags: ['Node.js', 'Express', 'PostgreSQL'],
            liveLink: '#',
            githubLink: '#'
        },
        {
            id: 5,
            title: 'Portfolio Website',
            description: 'This very website! Built with pure HTML, CSS, and JavaScript.',
            image: 'https://via.placeholder.com/300x200/6f42c1/FFFFFF?text=Project+5',
            category: 'web-design',
            tags: ['HTML', 'CSS', 'JavaScript'],
            liveLink: '#',
            githubLink: '#'
        }
    ];

    const portfolioContainer = document.getElementById('portfolio-items-container');
    const filterButtons = document.querySelectorAll('.filter-btn');

    function displayPortfolioItems(filter = 'all') {
        portfolioContainer.innerHTML = ''; // Clear existing items

        const filteredItems = filter === 'all'
            ? portfolioItems
            : portfolioItems.filter(item => item.category === filter);

        if (filteredItems.length === 0) {
            portfolioContainer.innerHTML = '<p>No projects found in this category.</p>';
            return;
        }

        filteredItems.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.classList.add('portfolio-item');
            portfolioItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="portfolio-info">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <div class="project-links">
                        <a href="${item.liveLink}" target="_blank">Live Demo</a>
                        <a href="${item.githubLink}" target="_blank">GitHub</a>
                    </div>
                </div>
            `;
            portfolioContainer.appendChild(portfolioItem);
        });
    }

    // Initial load of portfolio items
    displayPortfolioItems();

    // Add event listeners for filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove 'active' class from all filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add 'active' class to the clicked button
            this.classList.add('active');

            const filter = this.dataset.filter;
            displayPortfolioItems(filter);
        });
    });

    // Contact Form Submission (Basic client-side validation and feedback)
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent default form submission

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name === '' || email === '' || message === '') {
            formStatus.textContent = 'Please fill in all fields.';
            formStatus.classList.remove('success');
            formStatus.classList.add('error');
            formStatus.style.display = 'block';
            return;
        }

        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formStatus.textContent = 'Please enter a valid email address.';
            formStatus.classList.remove('success');
            formStatus.classList.add('error');
            formStatus.style.display = 'block';
            return;
        }

        // Simulate form submission
        formStatus.textContent = 'Sending message...';
        formStatus.classList.remove('success', 'error');
        formStatus.style.display = 'block';

        setTimeout(() => {
          

            formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
            formStatus.classList.remove('error');
            formStatus.classList.add('success');
            contactForm.reset(); // Clear the form
        }, 2000); 
    });
});