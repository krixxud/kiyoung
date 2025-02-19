// 로딩 애니메이션
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingLogo = document.querySelector('.loading-logo');
    const navLogo = document.querySelector('.logo');
    const heroTitle = document.querySelector('.hero-text .greeting');
    const heroIntroduce = document.querySelector('.hero-text .introduceFirst');
    const heroLastName = document.querySelector('.hero-text .introduceName');
    const heroDesc = document.querySelector('.hero-text p');

    // 페이지가 완전히 로드될 때까지 기다림
    window.addEventListener('load', () => {
        // 약간의 지연 후 애니메이션 시작
        setTimeout(() => {
            loadingLogo.classList.add('move');

            // 로고 이동 애니메이션이 거의 완료될 때쯤 실행
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                navLogo.classList.add('show');
                heroTitle.classList.add('animate');
                heroIntroduce.classList.add('animate');
                heroLastName.classList.add('animate');
                heroDesc.classList.add('animate');

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
const hoverElements = document.querySelectorAll('.hero-text');
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

function initScrolling() {
    const container = document.querySelector('.scroll-container');
    const sections = document.querySelectorAll('section');
    let currentSection = 0;
    let isScrolling = false;
    
    console.log('Scroll init:', 'Container:', container, 'Sections:', sections);
    
    if (container && sections.length > 0) {
        window.addEventListener('wheel', handleWheel);
        
        // 키보드 이벤트도 추가하여 접근성 향상
        window.addEventListener('keydown', handleKeyDown);
    } else {
        console.error('Container or sections not found!');
    }
    
    function handleWheel(e) {
        e.preventDefault(); // 기본 스크롤 동작 방지
        
        if (isScrolling) return;
        
        if (e.deltaY > 0) {
            // 아래로 스크롤
            if (currentSection < sections.length - 1) {
                currentSection++;
                moveToSection(currentSection);
            }
        } else {
            // 위로 스크롤
            if (currentSection > 0) {
                currentSection--;
                moveToSection(currentSection);
            }
        }
    }
    
    function handleKeyDown(e) {
        if (isScrolling) return;
        
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            e.preventDefault();
            if (currentSection < sections.length - 1) {
                currentSection++;
                moveToSection(currentSection);
            }
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            if (currentSection > 0) {
                currentSection--;
                moveToSection(currentSection);
            }
        }
    }
    
    function moveToSection(index) {
        isScrolling = true;
        container.style.transform = `translateY(-${index * 100}vh)`;
        
        // 현재 활성 섹션에 클래스 추가
        sections.forEach((section, i) => {
            if (i === index) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
        
        setTimeout(() => {
            isScrolling = false;
        }, 800);
    }
}
