# 搭建开发环境

写 C++ 程序需要两样工具：**编辑器**（写代码的地方）和**编译器**（把代码翻译成电脑能执行的程序）。这些工具合起来叫**开发环境**。

本课介绍两个最常用的选择，**任选其一**即可。

## 方案一：Dev-C++（推荐零基础同学）

Dev-C++ 小巧、开箱即用，是国内信奥培训中使用最广、考场标配的 IDE。

1. 下载安装版（推荐 5.11 或兼容 Windows 的更新分支，如 Embarcadero 版）：可在 [SourceForge](https://sourceforge.net/projects/orwelldevcpp/) 或搜索「Dev-C++ 官网下载」
2. 双击安装，一路「下一步」，语言可选「简体中文」
3. 打开后按 `Ctrl + N` 新建源代码，就可以开始写代码了

!!! tip "为什么推荐 Dev-C++？"

    CSP 第二轮考场提供的正是 Dev-C++（部分省份附带 VS Code）。平时用它练习，
    考试时就不需要适应新软件。

## 方案二：VS Code（推荐有了一定经验后）

VS Code 界面现代、插件强大，但配置步骤稍多，适合已经写过一阵代码的同学：

1. 从 [官网](https://code.visualstudio.com/) 下载安装 VS Code
2. 安装 [MinGW-w64](https://www.mingw-w64.org/) 编译器（Windows），并配置 `Path` 环境变量
3. 在 VS Code 中安装 **C/C++**、**Code Runner** 插件
4. 具体步骤参考 VS Code 官方文档「Get Started with C++」

## 检查你的环境

新建一个文件，输入下面这段代码（先不用管每行是什么意思，下一课会逐行讲解）：

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, CSP!" << endl;
    return 0;
}
```

然后：

- **Dev-C++**：按 `F11`（编译并运行），会弹出一个黑色窗口
- **VS Code**：右键 → `Run Code`

如果黑窗口里打印出了 `Hello, CSP!`，恭喜你，环境搭好了！🎉

!!! warning "常见问题"

    - **中文乱码**：把源文件保存为 UTF-8 编码（Dev-C++：工具 → 编辑器选项 → 新文档默认编码选 UTF-8）
    - **`g++ 不是内部或外部命令`**（VS Code 用户）：说明编译器没装好或没配置环境变量
    - **杀毒软件拦截**：把代码所在文件夹加入白名单即可

---

环境就绪，下一课我们来正式认识你的第一个程序：[第一个 C++ 程序](hello-world.md)。
