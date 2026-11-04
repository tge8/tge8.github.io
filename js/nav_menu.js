// 返回顶部 显示网页阅读进度
window.addEventListener('scroll', percent);

// 页面百分比
function percent() {
  // 获取滚动的高度
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

  // 获取整个网页的高度，减去可视高度
  let scrollHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );
  let clientHeight = document.documentElement.clientHeight;
  let heightDifference = scrollHeight - clientHeight;

  // 计算百分比
  let result = Math.round((scrollTop / heightDifference) * 100);

  // 确保 result 在 0 到 99 之间
  result = Math.min(99, Math.max(0, result));

  // 获取图标
  let btn = document.querySelector("#percent");
  if (btn) {
    btn.innerHTML = result;
  }
}

// 设置页面标题
var pageName = document.getElementById("page-name");
if (pageName) {
  pageName.innerText = document.title.split(" | 悦惜等风")[0];
}

// 导航栏站点模块循环切换
(function initNavSiteTitleCycle() {
  var title = document.getElementById("nav-site-title-text");
  if (!title || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var texts = (title.dataset.textList || "")
    .split("|")
    .map(function (text) { return text.trim(); })
    .filter(Boolean);

  if (texts.length < 2) return;

  function updateTitleWidth() {
    var style = window.getComputedStyle(title);
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    context.font = style.font;

    var longestWidth = texts.reduce(function (longest, text) {
      return Math.max(longest, context.measureText(text).width);
    }, 0);

    var titleWidth = Math.ceil(longestWidth + 16);
    document.documentElement.style.setProperty("--nav-title-width", titleWidth + "px");
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(updateTitleWidth);
  } else {
    updateTitleWidth();
  }
  window.addEventListener("resize", updateTitleWidth);

  var index = 0;
  window.setInterval(function () {
    title.classList.add("is-changing");
    window.setTimeout(function () {
      index = (index + 1) % texts.length;
      title.textContent = texts[index];
      title.classList.remove("is-changing");
    }, 300);
  }, 3200);
})();

(function initDesktopMenuClickDismiss() {
  var desktopQuery = window.matchMedia("(min-width: 769px)");

  document.querySelectorAll("#nav .menus_items .menus_item > a").forEach(function (link) {
    link.addEventListener("click", function (event) {
      if (!desktopQuery.matches || link.getAttribute("href") !== "javascript:void(0);") return;
      event.preventDefault();
      var parent = link.parentElement;
      if (!parent) return;
      parent.classList.add("menu-click-dismissed");
      if (link.blur) link.blur();
    });
  });

  document.querySelectorAll("#nav .menus_items .menus_item").forEach(function (item) {
    item.addEventListener("mouseleave", function () {
      item.classList.remove("menu-click-dismissed");
    });
    item.addEventListener("mouseenter", function () {
      if (!item.classList.contains("menu-click-dismissed")) return;
      item.classList.remove("menu-click-dismissed");
    });
  });
})();
