// starfield-init.js
// 当页面中存在 .starfield 容器（目前仅首页 hero 区使用）时启动星空动画；
// 其他页面自动跳过，不产生任何开销。
document$.subscribe(() => {
  const container = document.querySelector(".starfield");
  const origin = document.querySelector(".starfield-origin");
  if (container && origin && typeof Starfield !== "undefined") {
    Starfield.setup({
      // 库的速度没有上限：加速度随悬停时长持续累积，默认 maxAcceleration=10
      // 时峰值加速度是基础值的 100 倍，悬停一两秒就进入"曲速"。
      // 这里把峰值压到基础值的 4 倍（baseAcc 0.01 × (1 + 0.3×10)），
      // 悬停 3 秒拖尾依然柔和；移开后以较大减速率快速回落。
      maxAcceleration: 0.3,
      accelerationRate: 0.05,
      decelerationRate: 0.3,
    });
  }
});
