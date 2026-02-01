// Мобильное меню
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Закрытие меню при клике на ссылку
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Подсветка активного раздела
    const sections = document.querySelectorAll('section');
    const navLinksArray = document.querySelectorAll('.nav-links a');
    
    function highlightNavLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // ===========================================
    // АНИМАЦИИ ДЛЯ КАРТОЧЕК ИСТОРИИ
    // ===========================================
    const stepElements = document.querySelectorAll('.step');
    
    const stepObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 200);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    stepElements.forEach(el => {
        stepObserver.observe(el);
    });
    
    
    const typingTitles = document.querySelectorAll('.typing-title');
    
    // Функция для запуска анимации печатания
    function startTypingAnimation(element) {
        if (element.classList.contains('active')) return;
        
        // Получаем текст из элемента
        const text = element.textContent;
        element.textContent = '';
        element.classList.add('active');
        

        element.style.width = '0';
        
      
        setTimeout(() => {
            element.style.width = '100%';
            
            
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 3000);
        }, 300);
    }
    
   
    const titleObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startTypingAnimation(entry.target);
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });
    

    typingTitles.forEach(title => {
        titleObserver.observe(title);
    });
    

    setTimeout(() => {
        const firstVisibleTitle = Array.from(typingTitles).find(title => {
            const rect = title.getBoundingClientRect();
            return rect.top >= 0 && rect.top <= window.innerHeight * 0.8;
        });
        
        if (firstVisibleTitle) {
            startTypingAnimation(firstVisibleTitle);
        }
    }, 1000);
    
    
    const animateElements = document.querySelectorAll(
        '.feature-card, .resource-card, .fact'
    );
    
    const elementObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 100);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(el => {
        elementObserver.observe(el);
    });
    
   
    const fadeInElements = document.querySelectorAll('.feature-card, .app-card, .resource-card, .timeline-item');
    
    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeInElements.forEach(el => {
        fadeObserver.observe(el);
    });
    

    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .resource-card, .fact, .stat {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-card.animated, .resource-card.animated, .fact.animated, .stat.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature-card, .app-card, .resource-card, .timeline-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .feature-card.visible, .app-card.visible, .resource-card.visible, .timeline-item.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .nav-links a.active {
            color: white !important;
            font-weight: 700;
        }
    `;
    document.head.appendChild(style);
});