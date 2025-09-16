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

    /*
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
*/
    // Dynamic Skills Section with images from inventory folder
    const skills = [
        { name: 'HTML5', icon: './inventory/html.png' },
        { name: 'CSS3', icon: 'inventory/css.png' },
        { name: 'JavaScript', icon: 'inventory/java-script.png' },
        { name: 'Node.js', icon: 'inventory/nodejs.png' },
        { name: 'AWS', icon: 'inventory/aws.png' },
        { name: 'Java', icon: 'inventory/java2.png' },
        { name: 'Git & GitHub', icon: 'inventory/github.png' },
        { name: 'Firebase', icon: 'inventory/firebase.png' }
    ];

    const skillsContainer = document.getElementById('skills-container');

    function loadSkills() {
        skillsContainer.innerHTML = ''; // Clear existing skills
        skills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.classList.add('skill-item');
            skillItem.innerHTML = `
            ${skill.icon ? `<img src="${skill.icon}" alt="${skill.name}" class="skill-icon">` : ''}
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
            title: 'ShopEasePHP',
            description: 'A secure shopping cart system using PHP sessions and MySQL backend with product management and checkout flow.',
            image: './inventory/shopvault.png',
            category: 'backend',
            tags: ['React', 'Node.js', 'MongoDB'],
            githubLink: 'https://github.com/arjunmandal734/ShopEasePHP'
        },
        {
            id: 2,
            title: 'BattelLink',
            description: 'A multiplayer esports slot booking system, profile creating, contest hoisting with secure backend services with role based access control and game data sync.',
            image: './inventory/battellink.png',
            category: "backend",
            tags: ['HTML', 'CSS', 'JavaScript'],
            githubLink: 'https://github.com/arjunmandal734/eSports-slot-booking-web-application'
        },
        {
            id: 3,
            title: 'AuthVault',
            description: 'A secure login/signup system with password encryption, user roles (admin/user), and session-based access control.',
            image: './inventory/authvalt.png',
            category: 'backend',
            tags: ['Vue.js', 'Firebase', "php"],
            githubLink: 'https://github.com/arjunmandal734/AuthVault'
        },
        {
            id: 4,
            title: 'Remote Planting',
            description: 'It is a service where people can plant vegetables and plants remotely',
            image: './inventory/remotePlanting.png',
            category: 'frontend',
            tags: ['Node.js', 'Express', 'PostgreSQL'],
            githubLink: '#'
        },
        {
            id: 5,
            title: 'Portfolio Website',
            description: 'A dynamic and responsive personal portfolio website built from scratch using pure HTML, CSS, and JavaScript. Features include a dark mode toggle, smooth scrolling, and dynamic content loading for skills and projects.',
            image: './inventory/protfolio.png',
            category: 'web-design',
            tags: ['HTML', 'CSS', 'JavaScript'],
            githubLink: 'https://github.com/arjunmandal734/dynamic-Portfolio'
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