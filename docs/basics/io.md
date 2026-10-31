# 输入与输出

竞赛题都是这个模式：**程序读入题目给的数据 → 计算 → 按格式输出结果**。这一课我们学 C++ 的输入输出。

## cin：从键盘读入

`cin`（读作 C-in）配合 `>>` 把键盘输入的内容放进变量：

```cpp
#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;          // 读入两个整数，用空格或回车分隔
    cout << a + b << endl;  // 输出它们的和
    return 0;
}
```

运行时输入 `3 5`（中间空格），程序输出 `8`。这就是大名鼎鼎的「A+B 问题」——你的第一道竞赛题！

**规则**：多个 `>>` 连用时，`cin` 会自动跳过空格和回车，按顺序把内容装进各个变量。

## cout：输出到屏幕

`cout` 配合 `<<` 输出内容，可以连续拼接：

```cpp
int x = 10, y = 25;
cout << "x + y = " << x + y << endl;
// 输出：x + y = 35
```

记住三件套：

- `endl` —— 换行（也可以用 `"\n"`，效果相同且稍快）
- `"\t"` —— 制表符，输出时对齐用
- 字符串要加双引号 `"..."`，单个字符用单引号 `'...'`

## 保留小数位

竞赛高频考点！比如要求「结果保留 2 位小数」：

```cpp
#include <iostream>
#include <iomanip>      // 需要额外包含这个头文件
using namespace std;

int main() {
    double a = 10, b = 3;
    cout << fixed << setprecision(2) << a / b << endl;
    return 0;
}
```

输出 `3.33`。

- `fixed` —— 用普通方式（而非科学计数法）显示小数
- `setprecision(2)` —— 保留 2 位小数（配合 fixed 时指小数点后位数）

!!! tip "读题时划重点"

    「保留 X 位小数」「四舍五入到整数」「以百分号形式输出」——输出格式要求
    都藏在题目里，格式错了**一分都拿不到**。做完题一定要回头核对输出格式。

## 一个完整的竞赛程序模板

结合目前所学，我们的标准答题模板长这样：

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    // 1. 定义变量
    // 2. cin 读入数据
    // 3. 计算
    // 4. cout 按格式输出
    return 0;
}
```

把模板背下来（写多了自然就记住了），每道题都从它开始。

## 例题 1：A+B 问题

> **题目描述**　读入两个整数 $a$、$b$，输出它们的和。
>
> **输入格式**　一行两个整数，用空格分隔。
>
> **输出格式**　一个整数，即 $a + b$。
>
> **数据范围**　$-2^{31} \le a, b \le 2^{31}-1$。
>
> **样例输入 / 样例输出**
>
> ```text
> 1000000000 2000000000
> ```
>
> ```text
> 3000000000
> ```

**思路分析**　程序本身只有三步：读入 → 相加 → 输出。真正的考点藏在**数据范围**里：$a+b$ 最大可达约 $4 \times 10^9$，超出 `int` 上限（约 $2.1 \times 10^9$），所以必须用 `long long`。

**参考代码**

```cpp
#include <iostream>
using namespace std;

int main() {
    long long a, b;
    cin >> a >> b;
    cout << a + b << endl;
    return 0;
}
```

这就是大名鼎鼎的 [洛谷 P1001 A+B Problem](https://www.luogu.com.cn/problem/P1001)，全球程序员的第一道题。提交前想一想：如果用 `int`，样例会输出什么？（提示：溢出）

## 例题 2：平均分

> **题目描述**　期末考试考了三门课，读入三科成绩，输出平均分，**保留 2 位小数**。
>
> **输入格式**　一行三个数，用空格分隔。
>
> **输出格式**　一个数，保留 2 位小数。
>
> **数据范围**　每科成绩在 $0 \sim 100$ 之间，可能是小数。
>
> **样例输入 / 样例输出**
>
> ```text
> 90 85.5 100
> ```
>
> ```text
> 91.83
> ```

**思路分析**　成绩有小数，用 `double`；「保留 2 位小数」就是 `fixed << setprecision(2)` 三件套。**输出格式是本题唯一的考点**，格式错不得分。

**参考代码**

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double a, b, c;
    cin >> a >> b >> c;
    cout << fixed << setprecision(2) << (a + b + c) / 3 << endl;
    return 0;
}
```

## 动手试一试

1. 读入你的名字（`string name; cin >> name;` 需 `#include <string>`）和年龄，输出「XXX 今年 X 岁」
2. 读入一个double类型的圆半径 $r$，输出圆的面积（$\pi$ 取 3.14159），保留 3 位小数
3. 读入两个整数，第一行输出它们的和，第二行输出它们的乘积

---

下一课：让程序会算数——[运算符与表达式](operator.md)。
