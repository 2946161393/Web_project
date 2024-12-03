// 添加汉堡菜单功能
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');

if (menuToggle) {
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        navbar.classList.toggle('active');
        this.setAttribute('aria-expanded', 
            this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
        );
    });
}

// 点击文档其他地方关闭菜单
document.addEventListener('click', function(e) {
    if (!e.target.closest('.navbar') && !e.target.closest('.menu-toggle')) {
        navbar.classList.remove('active');
        if (menuToggle) {
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }
});

// 你现有的下拉菜单代码
document.querySelectorAll('.dropdown > a').forEach((dropdownToggle) => {
    dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            if (dropdown !== dropdownToggle.parentElement) {
                dropdown.classList.remove('active');
            }
        });
        
        const parent = dropdownToggle.parentElement;
        parent.classList.toggle('active');
    });
});

// 点击外部关闭下拉菜单
document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// 你现有的平滑滚动代码
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        if (!this.parentElement.classList.contains('dropdown')) {  
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth',
                });
            }
        }
    });
});

// 你现有的导航高亮代码
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');

    let currentSection = '';

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 50;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// 添加窗口大小改变事件处理
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) { // 根据你的媒体查询断点调整
        navbar.classList.remove('active');
        if (menuToggle) {
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }
});