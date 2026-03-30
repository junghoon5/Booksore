document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        
        item.classList.toggle('active');
        
        document.querySelectorAll('.accordion-item').forEach(otherItem => {
            if (otherItem !== item) otherItem.classList.remove('active');
        });
    });
});

document.querySelectorAll('.detail-tabs a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); 

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const offsetPosition = targetElement.offsetTop - 100;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth' 
            });
        }
    });
});

window.addEventListener('DOMContentLoaded', () => {
    initDetailTabs();
});

function initDetailTabs() {
    const tabs = document.querySelectorAll('.detail-tabs li');
    const sections = document.querySelectorAll('.tab-content'); 
    const tabHeight = document.querySelector('.detail-tabs').offsetHeight;

    tabs.forEach(tab => {
        const anchor = tab.querySelector('a');
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); 

            
            tabs.forEach(t => t.classList.remove('active'));

            this.parentElement.classList.add('active');

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetPosition = targetElement.offsetTop - tabHeight - 20; 
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const observerOptions = {
        root: null, 
        rootMargin: `-${tabHeight + 50}px 0px -50% 0px`,
        threshold: 0 
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                tabs.forEach(tab => {
                    const link = tab.querySelector('a');
                    tab.classList.remove('active'); 

                    if (link.getAttribute('href') === `#${id}`) {
                        tab.classList.add('active'); 
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}