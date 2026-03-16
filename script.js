(function() {
  'use strict';

  /**
   * Гамбургер и мобильное меню.
   * Закрытие: по клику на бургер (крестик), по клику/тапу на оверлей (пустое пространство),
   * по клику на любую ссылку или кнопку в меню.
   */
  var burgerBtn = document.getElementById('burgerBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  var menuOverlay = document.getElementById('menuOverlay');
  var menuLinks = mobileMenu ? mobileMenu.querySelectorAll('.header__menu-link, .header__menu-btn') : [];

  function openMenu() {
    if (!burgerBtn || !mobileMenu || !menuOverlay) return;
    burgerBtn.classList.add('is-active');
    mobileMenu.classList.add('is-open');
    menuOverlay.classList.add('is-open');
    menuOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!burgerBtn || !mobileMenu || !menuOverlay) return;
    burgerBtn.classList.remove('is-active');
    mobileMenu.classList.remove('is-open');
    menuOverlay.classList.remove('is-open');
    menuOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    if (mobileMenu && mobileMenu.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (burgerBtn) {
    burgerBtn.addEventListener('click', toggleMenu);
  }
  if (menuOverlay) {
    menuOverlay.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('touchstart', closeMenu, { passive: true });
  }
  menuLinks.forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });

  /**
   * Аккордеон расписания (мобильные).
   * По клику на заголовок дня раскрывается блок с занятиями;
   * при открытии другого дня предыдущий закрывается.
   */
  var scheduleItems = document.querySelectorAll('.schedule__item');
  scheduleItems.forEach(function(item) {
    var header = item.querySelector('.schedule__item-header');
    var body = item.querySelector('.schedule__item-body');
    if (!header || !body) return;

    header.addEventListener('click', function() {
      var isOpen = item.classList.contains('is-open');
      scheduleItems.forEach(function(other) {
        other.classList.remove('is-open');
        var otherBody = other.querySelector('.schedule__item-body');
        if (otherBody) otherBody.style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('is-open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  /**
   * Карусель отзывов.
   * Переключение: по точкам и по кнопкам-стрелкам (prev/next).
   * Один слайд на экран, плавный сдвиг через transform.
   */
  var track = document.getElementById('reviewsTrack');
  var dotsContainer = document.getElementById('reviewsDots');
  var btnPrev = document.getElementById('reviewsPrev');
  var btnNext = document.getElementById('reviewsNext');

  if (track && dotsContainer) {
    var slides = track.querySelectorAll('.reviews__slide');
    var dotButtons = dotsContainer.querySelectorAll('.reviews__dot');
    var total = slides.length;
    var current = 0;

    function goTo(index) {
      current = (index + total) % total;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dotButtons.forEach(function(dot, i) {
        dot.classList.toggle('is-active', i === current);
      });
      if (btnPrev) btnPrev.classList.toggle('is-hidden', current === 0);
      if (btnNext) btnNext.classList.toggle('is-hidden', current === total - 1);
    }

    dotButtons.forEach(function(dot, i) {
      dot.addEventListener('click', function() {
        goTo(i);
      });
    });

    if (btnPrev) {
      btnPrev.addEventListener('click', function() {
        goTo(current - 1);
      });
      btnPrev.classList.toggle('is-hidden', current === 0);
    }
    if (btnNext) {
      btnNext.addEventListener('click', function() {
        goTo(current + 1);
      });
    }
    goTo(0);
  }

  /**
   * Появление блоков при скролле (Intersection Observer).
   */
  var animatedSections = document.querySelectorAll('.animate-in');
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  animatedSections.forEach(function(section) {
    observer.observe(section);
  });
})();
