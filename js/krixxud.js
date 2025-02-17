// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = '#000';
    } else {
        header.style.background = 'transparent';
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 로딩 애니메이션
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingLogo = document.querySelector('.loading-logo');
    const navLogo = document.querySelector('.logo');

    // 페이지가 완전히 로드될 때까지 기다림
    window.addEventListener('load', () => {
        // 약간의 지연 후 애니메이션 시작
        setTimeout(() => {
            loadingLogo.classList.add('move');

            // 로고 이동 애니메이션이 거의 완료될 때쯤 실행
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                navLogo.classList.add('show');

                // 페이드 아웃 애니메이션이 완료된 후 요소 제거
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1000);
        }, 200);
    });
});

// 커서 동작 개선
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
let isVisible = false;

// 커서 초기 상태 설정
document.addEventListener('mousemove', (e) => {
    if (!isVisible) {
        cursorDot.style.opacity = 1;
        cursorOutline.style.opacity = 1;
        isVisible = true;
    }

    // RequestAnimationFrame을 사용하여 부드러운 움직임 구현
    requestAnimationFrame(() => {
        cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorOutline.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
});

// 호버 효과
const hoverElements = document.querySelectorAll('.hero-text > h1');
hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('cursor-hover');
    });

    element.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('cursor-hover');
    });
});

// 커서가 화면을 벗어날 때 처리
document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = 0;
    cursorOutline.style.opacity = 0;
});

document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = 1;
    cursorOutline.style.opacity = 1;
});

// 모바일 터치 이벤트에서는 커서 숨김
if ('ontouchstart' in window) {
    cursorDot.style.display = 'none';
    cursorOutline.style.display = 'none';
}

// 모바일 메뉴
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// 모바일 메뉴 링크 클릭시 메뉴 닫기
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});