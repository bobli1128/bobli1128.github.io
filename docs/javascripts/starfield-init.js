// starfield-init.js
// 当页面中存在 .starfield 容器（目前仅首页 hero 区使用）时启动星空动画；
// 其他页面自动跳过，不产生任何开销。
document$.subscribe(() => {
  const container = document.querySelector(".starfield");
  const origin = document.querySelector(".starfield-origin");
  if (container && origin && typeof Starfield !== "undefined") {
    Starfield.setup({});
  }
});
