# 欢迎来到我的文档站

欢迎！这是部署在 GitHub Pages 上的个人静态文档网站，使用 [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) 构建。

## 网站结构

- **使用指南**：介绍如何写作和维护文档
- **写作示例**：Markdown 各种语法的展示页面
- **关于**：关于本站和作者的信息

## 快速开始（本地预览）

```bash
# 创建并激活虚拟环境
python -m venv .venv
.venv\Scripts\activate      # Windows
# source .venv/bin/activate # Linux / macOS

# 安装依赖
pip install mkdocs-material

# 启动本地预览服务器
mkdocs serve
```

然后浏览器打开 <http://127.0.0.1:8000> 即可实时预览。

## 下一步

1. 在 `docs/` 目录下添加自己的 Markdown 文档
2. 在 `mkdocs.yml` 的 `nav` 部分配置导航结构
3. 提交并推送到 `master` 分支，GitHub Actions 会自动构建并部署
