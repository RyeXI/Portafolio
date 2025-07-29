document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
 
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
        });
    });
 
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); 
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
      
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
 
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    const projectsGrid = document.querySelector('.projects-grid');
    
    const projectsData = [
        {
            title: "Sistema de Contratación",
            description: "Plataforma de gestión de contratación laboral para empresas.",
            image: "img/sistemadecontracion.png",
            tags: ["Web App", "HR", "Management"],
            category: "web"
        },
        {
            title: "Sistema de Seguridad",
            description: "Solución integral para control de accesos y monitoreo de activos.",
            image: "img/sistemadecontroldeseguridad.png",
            tags: ["Security", "Monitoring", "System"],
            category: "web"
        },
        {
            title: "Sitio Web Cafetería",
            description: "Diseño web moderno para cadena de cafeterías artesanales.",
            image: "img/sitiowebcafeteria.png",
            tags: ["Web Design", "Restaurant", "UI/UX"],
            category: "diseño"
        },
        {
            title: "Sitio Web Comida China",
            description: "Landing page para restaurante de comida asiática.",
            image: "img/sitiowebcomidachina.png",
            tags: ["Food", "Restaurant", "Landing Page"],
            category: "diseño"
        },
        {
            title: "Juego en Java",
            description: "Proyecto universitario basado en el juego de sega multijugador.",
            image: "img/proyectouniversitarioenjava2d.png",
            tags: ["Game"],
            category: "branding"
        },
        
    ];
    
    projectsData.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card fade-in';
        projectCard.setAttribute('data-category', project.category);
        
        if (index > 0) {
            projectCard.classList.add(`delay-${index % 3}`);
        }
        
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <a href="#" class="project-link">Ver proyecto</a>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });

    const skillBars = document.querySelectorAll('.bar span');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    }
    
    const aboutSection = document.querySelector('.about');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(aboutSection);

    // Formulario de contacto con feedback visual
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        
        try {
            // Mostrar estado de carga
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            submitBtn.style.opacity = '0.7';
            
            // Enviar datos
            const formData = new FormData(this);
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Mostrar mensaje de éxito
                showAlert('¡Mensaje enviado con éxito!', 'success');
                this.reset();
            } else {
                throw new Error('Error en el servidor');
            }
        } catch (error) {
            // Mostrar mensaje de error
            showAlert('Error al enviar el mensaje. Por favor inténtalo nuevamente.', 'error');
            console.error('Error:', error);
        } finally {
            // Restaurar botón
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            submitBtn.style.opacity = '1';
        }
    });
}

// Función para mostrar alertas
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    // Estilos básicos para la alerta
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.padding = '15px 20px';
    alertDiv.style.borderRadius = '5px';
    alertDiv.style.color = 'white';
    alertDiv.style.zIndex = '1000';
    alertDiv.style.animation = 'fadeIn 0.3s ease forwards';
    
    if (type === 'success') {
        alertDiv.style.backgroundColor = '#28a745'; // Verde
    } else {
        alertDiv.style.backgroundColor = '#dc3545'; // Rojo
    }
    
    document.body.appendChild(alertDiv);
    
    // Eliminar la alerta después de 5 segundos
    setTimeout(() => {
        alertDiv.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => alertDiv.remove(), 300);
    }, 5000);
}



});


const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
        document.body.classList.add('dark-mode');
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
}

toggleSwitch.addEventListener('change', switchTheme, false);

document.querySelector('.info-icon').addEventListener('click', function() {
    const email = "fernandocentenoemm@gmail.com";
    navigator.clipboard.writeText(email);
    alert("Correo copiado: " + email);
});