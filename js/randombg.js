(function () {
  var MOBILE_BREAKPOINT = 768;
  var currentKey = '';
  var cache = null;
  var resizeTimer = null;

  function getMode() {
    return window.matchMedia('(max-width: ' + MOBILE_BREAKPOINT + 'px)').matches
      ? 'mobile'
      : 'desktop';
  }

  function pickRandom(images, mode) {
    if (!Array.isArray(images) || images.length === 0) return null;

    var storageKey = 'qige-random-bg-' + mode;
    var previous = '';
    try {
      previous = sessionStorage.getItem(storageKey) || '';
    } catch (error) {}

    var candidates = images.length > 1
      ? images.filter(function (image) { return image !== previous; })
      : images;
    var image = candidates[Math.floor(Math.random() * candidates.length)];

    try {
      sessionStorage.setItem(storageKey, image);
    } catch (error) {}
    return image;
  }

  function applyBackground(image, mode, listKey, images, imageIndex) {
    var webBg = document.getElementById('web_bg');
    if (!webBg || !image) return;

    var preload = new Image();
    preload.onload = function () {
      if (currentKey !== listKey || getMode() !== mode) return;
      webBg.style.backgroundImage = 'url("' + image + '")';
      webBg.style.backgroundSize = 'cover';
      webBg.style.backgroundPosition = 'center';
      webBg.style.backgroundRepeat = 'no-repeat';
      webBg.style.backgroundAttachment = 'fixed';
    };
    preload.onerror = function () {
      var nextIndex = (typeof imageIndex === 'number' ? imageIndex : 0) + 1;
      if (Array.isArray(images) && nextIndex < images.length) {
        applyBackground(images[nextIndex], mode, listKey, images, nextIndex);
      } else {
        console.error('随机背景图片加载失败，已尝试全部候选图片');
      }
    };
    preload.src = image;
  }

  function setRandomBackground() {
    var mode = getMode();
    var listKey = mode + '-' + Date.now();
    currentKey = listKey;

    function apply(config) {
      var images = Array.isArray(config)
        ? config
        : (config[mode] || config.desktop || []);
      var image = pickRandom(images, mode);
      var imageIndex = images.indexOf(image);
      applyBackground(image, mode, listKey, images, imageIndex < 0 ? 0 : imageIndex);
    }

    if (cache) {
      apply(cache);
      return;
    }

    fetch('/background-images.json', { cache: 'no-store' })
      .then(function (response) {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.json();
      })
      .then(function (config) {
        cache = config;
        apply(config);
      })
      .catch(function (error) {
        console.error('加载随机背景配置失败:', error);
      });
  }

  function scheduleBackground() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setRandomBackground, 150);
  }

  window.addEventListener('resize', scheduleBackground);
  document.addEventListener('pjax:complete', setRandomBackground);

  if (document.readyState === 'complete') {
    setRandomBackground();
  } else if (document.readyState === 'interactive') {
    setRandomBackground();
  } else {
    document.addEventListener('DOMContentLoaded', setRandomBackground, { once: true });
  }
})();