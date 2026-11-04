(function () {
  'use strict';

  var MOBILE_BREAKPOINT = 768;
  var body = document.body;

  function getMode() {
    return window.matchMedia('(max-width: ' + MOBILE_BREAKPOINT + 'px)').matches
      ? 'mobile'
      : 'desktop';
  }

  function readStored(mode) {
    try {
      return sessionStorage.getItem('qige-random-bg-' + mode) || '';
    } catch (error) {
      return '';
    }
  }

  function pickImage(config) {
    var mode = getMode();
    var list = Array.isArray(config) ? config : (config[mode] || config.desktop || []);
    if (!list.length) return '';

    var stored = readStored(mode);
    if (stored && list.indexOf(stored) !== -1) return stored;

    var previous = stored;
    var candidates = list.length > 1
      ? list.filter(function (image) { return image !== previous; })
      : list;
    var image = candidates[Math.floor(Math.random() * candidates.length)];

    try {
      sessionStorage.setItem('qige-random-bg-' + mode, image);
    } catch (error) {}
    return image;
  }

  function applyLuminance(imageUrl) {
    var image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = function () {
      try {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d', { willReadFrequently: true });
        canvas.width = 20;
        canvas.height = 20;
        context.drawImage(image, 0, 0, 20, 20);
        var pixels = context.getImageData(0, 0, 20, 20).data;
        var total = 0;

        for (var index = 0; index < pixels.length; index += 4) {
          total += 0.2126 * pixels[index] +
            0.7152 * pixels[index + 1] +
            0.0722 * pixels[index + 2];
        }

        var luminance = total / (pixels.length / 4);
        body.classList.toggle('movie-light-image', luminance > 150);
        body.classList.toggle('movie-dark-image', luminance <= 150);
      } catch (error) {
        body.classList.add('movie-dark-image');
      }
    };
    image.onerror = function () {
      body.classList.add('movie-dark-image');
    };
    image.src = imageUrl;
  }

  function applyBackground(imageUrl, candidateImages, imageIndex) {
    if (!imageUrl) return;

    var preload = new Image();
    preload.onload = function () {
      var mode = getMode();
      var overlay = mode === 'mobile'
        ? 'rgba(9, 15, 28, 0.38)'
        : 'rgba(9, 15, 28, 0.28)';
      body.style.backgroundImage =
        'linear-gradient(' + overlay + ', ' + overlay + '), url("' + imageUrl + '")';
      body.style.backgroundSize = 'cover';
      body.style.backgroundPosition = 'center';
      body.style.backgroundRepeat = 'no-repeat';
      body.style.backgroundAttachment = mode === 'mobile' ? 'scroll' : 'fixed';
      applyLuminance(imageUrl);
    };
    preload.onerror = function () {
      var nextIndex = (typeof imageIndex === 'number' ? imageIndex : 0) + 1;
      if (Array.isArray(candidateImages) && nextIndex < candidateImages.length) {
        applyBackground(candidateImages[nextIndex], candidateImages, nextIndex);
      } else {
        body.classList.add('movie-dark-image');
      }
    };
    preload.src = imageUrl;
  }

  function refresh() {
    fetch('/background-images.json', { cache: 'no-store' })
      .then(function (response) {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.json();
      })
      .then(function (config) {
        var mode = getMode();
        var list = Array.isArray(config) ? config : (config[mode] || config.desktop || []);
        var image = pickImage(config);
        var imageIndex = list.indexOf(image);
        applyBackground(image, list, imageIndex < 0 ? 0 : imageIndex);
      })
      .catch(function () {
        body.classList.add('movie-dark-image');
      });
  }

  function loadVideoList() {
    var grid = document.querySelector('.movie-grid');
    if (!grid) return;

    fetch('videos.json', { cache: 'no-store' })
      .then(function (response) {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.json();
      })
      .then(function (videos) {
        grid.textContent = '';
        videos.forEach(function (video, index) {
          var link = document.createElement('a');
          var number = document.createElement('span');
          var title = document.createElement('strong');
          var action = document.createElement('small');

          link.className = 'movie-card';
          link.href = 'player.html?id=' + encodeURIComponent(video.id);
          number.textContent = String(index + 1).padStart(2, '0');
          title.textContent = video.title;
          action.textContent = '打开播放';
          link.appendChild(number);
          link.appendChild(title);
          link.appendChild(action);
          grid.appendChild(link);
        });
      })
      .catch(function () {
        grid.innerHTML = '<p class="movie-loading movie-loading--error">视频列表加载失败，请刷新重试。</p>';
      });
  }

  function loadPlayer() {
    var iframe = document.getElementById('videoIframe');
    if (!iframe) return;

    var id = new URLSearchParams(window.location.search).get('id');
    var title = document.getElementById('videoTitle');
    var previousLink = document.querySelector('.movie-nav-prev');
    var nextLink = document.querySelector('.movie-nav-next');

    fetch('videos.json', { cache: 'no-store' })
      .then(function (response) {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.json();
      })
      .then(function (videos) {
        var video = videos.find(function (item) { return String(item.id) === String(id); });
        if (!video) throw new Error('视频不存在');
        title.textContent = video.title;
        document.title = video.title + ' - 视频播放';
        iframe.title = video.title;
        iframe.src = video.embed;
        var index = videos.indexOf(video);
        var previous = videos[(index - 1 + videos.length) % videos.length];
        var next = videos[(index + 1) % videos.length];
        if (previousLink) previousLink.href = 'player.html?id=' + encodeURIComponent(previous.id);
        if (nextLink) nextLink.href = 'player.html?id=' + encodeURIComponent(next.id);
      })
      .catch(function () {
        title.textContent = '未找到该视频';
        iframe.removeAttribute('src');
      });
  }

  var resizeTimer = null;

  function init() {
    body = document.body || body;
    refresh();
    loadVideoList();
    loadPlayer();
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(refresh, 150);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
