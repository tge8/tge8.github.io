(function () {
  'use strict';

  function init() {
    document.documentElement.classList.add('photo-page');
    document.body.classList.add('photo-page');

    if (document.querySelector('.album-index')) return;

    var images = Array.prototype.slice.call(document.querySelectorAll('body img'));
    images = images.filter(function (image) {
      return !image.closest('.photo-lightbox');
    });

    if (!images.length) return;

    images.forEach(function (image) {
      image.dataset.photoEnabled = 'true';
    });

    var overlay = document.createElement('div');
    overlay.className = 'photo-lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', '图片查看器');
    overlay.innerHTML =
      '<button class="photo-lightbox__close" type="button" aria-label="关闭">×</button>' +
      '<button class="photo-lightbox__prev" type="button" aria-label="上一张">‹</button>' +
      '<img class="photo-lightbox__image" alt="">' +
      '<button class="photo-lightbox__next" type="button" aria-label="下一张">›</button>' +
      '<span class="photo-lightbox__counter"></span>' +
      '<div class="photo-lightbox__actions">' +
        '<button class="photo-lightbox__play" type="button" aria-label="自动播放" aria-pressed="false">▶</button>' +
        '<a class="photo-lightbox__download" aria-label="打开原图" target="_blank" rel="noopener">↗</a>' +
        '<button class="photo-lightbox__fullscreen" type="button" aria-label="全屏">⛶</button>' +
      '</div>';
    document.body.appendChild(overlay);

    var preview = overlay.querySelector('.photo-lightbox__image');
    var counter = overlay.querySelector('.photo-lightbox__counter');
    var closeButton = overlay.querySelector('.photo-lightbox__close');
    var prevButton = overlay.querySelector('.photo-lightbox__prev');
    var nextButton = overlay.querySelector('.photo-lightbox__next');
    var playButton = overlay.querySelector('.photo-lightbox__play');
    var downloadLink = overlay.querySelector('.photo-lightbox__download');
    var fullscreenButton = overlay.querySelector('.photo-lightbox__fullscreen');
    var currentIndex = 0;
    var touchStartX = 0;
    var touchStartY = 0;
    var autoplayTimer = null;
    var trigger = null;

    function uniqueImages() {
      var result = [];
      var seen = new Set();
      images.forEach(function (image) {
        var src = image.currentSrc || image.src;
        if (!src || seen.has(src)) return;
        seen.add(src);
        result.push(image);
      });
      return result;
    }

    var gallery = uniqueImages();

    function show(index) {
      if (!gallery.length) return;
      currentIndex = (index + gallery.length) % gallery.length;
      var image = gallery[currentIndex];
      preview.src = image.currentSrc || image.src;
      preview.alt = image.alt || '相册图片 ' + (currentIndex + 1);
      counter.textContent = (currentIndex + 1) + ' / ' + gallery.length;
      downloadLink.href = preview.src;
      preview.style.transform = '';
    }

    function open(index) {
      trigger = document.activeElement;
      show(index);
      overlay.classList.add('is-open');
      document.body.classList.add('photo-lightbox-open');
      closeButton.focus();
    }

    function close() {
      stopAutoplay();
      overlay.classList.remove('is-open');
      document.body.classList.remove('photo-lightbox-open');
      preview.removeAttribute('src');
      if (trigger && typeof trigger.focus === 'function') trigger.focus();
    }

    function previous() {
      show(currentIndex - 1);
    }

    function next() {
      show(currentIndex + 1);
    }

    function stopAutoplay() {
      if (autoplayTimer) window.clearInterval(autoplayTimer);
      autoplayTimer = null;
      playButton.setAttribute('aria-pressed', 'false');
      playButton.textContent = '▶';
      playButton.setAttribute('aria-label', '自动播放');
    }

    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = window.setInterval(next, 3000);
      playButton.setAttribute('aria-pressed', 'true');
      playButton.textContent = 'Ⅱ';
      playButton.setAttribute('aria-label', '暂停自动播放');
    }

    gallery.forEach(function (image, index) {
      image.setAttribute('tabindex', '0');
      image.setAttribute('role', 'button');
      image.setAttribute('aria-label', '查看图片 ' + (index + 1));
      image.addEventListener('click', function () {
        open(index);
      });
      image.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          open(index);
        }
      });
    });

    closeButton.addEventListener('click', close);
    prevButton.addEventListener('click', previous);
    nextButton.addEventListener('click', next);
    playButton.addEventListener('click', function () {
      if (autoplayTimer) stopAutoplay();
      else startAutoplay();
    });
    fullscreenButton.addEventListener('click', function () {
      if (document.fullscreenElement) {
        if (document.exitFullscreen) document.exitFullscreen();
      } else if (overlay.requestFullscreen) {
        overlay.requestFullscreen();
      }
    });
    document.addEventListener('fullscreenchange', function () {
      fullscreenButton.setAttribute('aria-label', document.fullscreenElement ? '退出全屏' : '全屏');
    });
    overlay.addEventListener('click', function (event) {
      if (event.target === overlay) close();
    });

    document.addEventListener('keydown', function (event) {
      if (!overlay.classList.contains('is-open')) return;
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft') previous();
      if (event.key === 'ArrowRight') next();
      if (event.key === 'Home') show(0);
      if (event.key === 'End') show(gallery.length - 1);
    });

    overlay.addEventListener('touchstart', function (event) {
      if (!event.changedTouches.length) return;
      touchStartX = event.changedTouches[0].clientX;
      touchStartY = event.changedTouches[0].clientY;
    }, { passive: true });

    overlay.addEventListener('touchend', function (event) {
      if (!event.changedTouches.length) return;
      var deltaX = event.changedTouches[0].clientX - touchStartX;
      var deltaY = event.changedTouches[0].clientY - touchStartY;
      if (Math.abs(deltaX) < 45 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
      if (deltaX > 0) previous();
      else next();
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
