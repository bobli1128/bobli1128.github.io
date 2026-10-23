# 使用指南

本节介绍如何在这个文档站里写作、组织和管理文档。

## 目录结构

```text
bobli1128.github.io/
├── docs/               # 所有 Markdown 文档放在这里
│   ├── index.md        # 网站首页
│   ├── about.md
│   └── guide/
│       ├── index.md    # 「使用指南」栏目首页
│       └── markdown-demo.md
├── mkdocs.yml          # 站点配置（主题、导航、插件等）
└── .github/workflows/  # GitHub Actions 自动部署
```

## 新增一篇文档

1. 在 `docs/` 下创建 Markdown 文件，例如 `docs/notes/my-note.md`
2. 在 `mkdocs.yml` 的 `nav` 中加入导航项：

```yaml
nav:
  - 笔记:
      - 我的笔记: notes/my-note.md
```

3. 本地运行 `mkdocs serve` 预览，确认无误后提交推送

## 自动部署

推送到 `master` 分支后，GitHub Actions 会自动执行 `mkdocs build`，并把生成的 `site/` 目录部署到 GitHub Pages，无需手动操作。

部署状态可以在仓库的 **Actions** 标签页查看，站点地址：<https://bobli1128.github.io/>
