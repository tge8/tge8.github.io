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
document.getElementById("page-name").innerText = document.title.split(" | 悦惜等风")[0];

// 切换夜间模式
rmf.switchDarkMode = function(){
  switchNightMode();
};