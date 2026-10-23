# Markdown 写作示例

这个页面展示 Material for MkDocs 支持的常用语法，可以直接复制使用。

## 标题与正文

支持 **加粗**、*斜体*、~~删除线~~、`行内代码`，以及 [外部链接](https://www.markdownguide.org/)。

## 列表与任务

- 无序列表项
- 另一项
  1. 嵌套有序列表
  2. 第二项

- [x] 已完成的任务
- [ ] 待办任务

## 代码块

```python
def greet(name: str) -> str:
    """向某人问好。"""
    return f"你好，{name}！"

print(greet("世界"))
```

## 提示框（Admonition）

!!! note "注意"

    这是一个 note 类型的提示框。

!!! tip "小技巧"

    这是一个 tip 类型的提示框。

??? warning "可折叠提示框"

    点击标题可以展开或收起。

## 表格

| 功能 | 状态 | 备注 |
| ---- | :--: | ---- |
| 搜索 | ✅ | 支持中文 |
| 暗色模式 | ✅ | 右上角切换 |

## 数学公式

行内公式：质能方程 $E = mc^2$ 是物理学中最著名的等式之一。

块级公式：

$$
\int_{-\infty}^{\infty} e^{-x^2} \, dx = \sqrt{\pi}
$$

## 引用

> 这是一段引用文字。

---
更多语法请参考 [Material 官方文档](https://squidfunk.github.io/mkdocs-material/reference/)。
