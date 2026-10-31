# 结构体：把相关数据打包

## 为什么需要结构体？

第 3 章的「奖学金」用三个平行数组存语数英成绩，排序时要成对交换、手忙脚乱。根本原因：**一个学生的三科成绩本来是一体的**，却被拆散在三个数组里。

**结构体（struct）就是把几个相关的变量捆成一个整体**：

```cpp
struct Student {
    int id;       // 学号
    int chinese;  // 语文
    int math;     // 数学
    int english;  // 英语
    int sum;      // 总分
};   // ← 这里的分号不能少！
```

注意 `};` 末尾的分号——忘了它报错信息会指到天边。

## 定义变量与访问成员

```cpp
Student s1;                 // 定义一个学生
s1.id = 1;
s1.chinese = 90;
s1.sum = s1.chinese + 95 + 80;   // 用 . 访问成员

Student s2 = {2, 88, 76, 92, 88 + 76 + 92};  // 按顺序整体赋值
cout << s2.sum << endl;
```

`s1.chinese` 读作「s1 的 chinese 成员」，就像「3 号房间 2 号床」。

## 结构体数组 + 自定义排序

结构体的真正威力在**配合 sort 排序**：把整个学生当作一个元素交换，再也不用成对搬家。

排序规则需要告诉 `sort` 一个**比较函数**：返回 true 表示「a 应该排在 b 前面」。

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

struct Student {
    int id, chinese, math, english, sum;
};

Student s[305];

// 比较函数：a 排在 b 前面返回 true
bool cmp(Student a, Student b) {
    return a.sum > b.sum;    // 按总分从高到低
}

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> s[i].chinese >> s[i].math >> s[i].english;
        s[i].id = i;
        s[i].sum = s[i].chinese + s[i].math + s[i].english;
    }
    sort(s + 1, s + n + 1, cmp);   // 传入比较函数名
    for (int i = 1; i <= 5; i++) {
        cout << s[i].id << " " << s[i].sum << endl;
    }
    return 0;
}
```

## 多级比较规则

真实排名往往有平局规则（总分相同比语文，再比学号）。`cmp` 里写成分级判断：

```cpp
bool cmp(Student a, Student b) {
    if (a.sum != b.sum) return a.sum > b.sum;   // 第一关键字：总分
    if (a.chinese != b.chinese) return a.chinese > b.chinese;  // 第二：语文
    return a.id < b.id;                          // 第三：学号小的在前
}
```

**写法口诀：先比第一关键字，不相等就下结论；相等再比第二关键字……全部相等时返回「不排前面」（false）。**

## 例题：奖学金

> **题目描述**　全班 $n$ 名同学考语、数、英（各 $0 \sim 150$ 分）。按**总分从高到低**排序；总分相同按**语文**从高到低；再相同按**学号**从小到大。输出前 5 名的学号和总分。
>
> **输入格式**　第一行一个整数 $n$；接下来 $n$ 行每行三个整数。
>
> **输出格式**　5 行，每行「学号 总分」。
>
> **数据范围**　$6 \le n \le 300$。
>
> **样例输入 / 样例输出**
>
> ```text
> 5
> 90 80 70
> 75 85 80
> 95 75 80
> 80 80 85
> 70 90 75
> ```
>
> ```text
> 3 250
> 4 245
> 1 240
> 2 240
> 5 235
> ```

**思路分析**　样例专门埋了个平局：1 号和 2 号总分都是 240，1 号语文 90 > 2 号语文 75，所以 1 号排前面——这正是第二关键字在干活。第 3 章我们用「平行数组 + 冒泡」硬扛过简化版，现在有了结构体，`sort` + `cmp` 十行搞定。

**参考代码**

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

struct Student {
    int id, chinese, math, english, sum;
};

Student s[305];

bool cmp(Student a, Student b) {
    if (a.sum != b.sum) return a.sum > b.sum;
    if (a.chinese != b.chinese) return a.chinese > b.chinese;
    return a.id < b.id;
}

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> s[i].chinese >> s[i].math >> s[i].english;
        s[i].id = i;
        s[i].sum = s[i].chinese + s[i].math + s[i].english;
    }
    sort(s + 1, s + n + 1, cmp);
    for (int i = 1; i <= 5; i++) {
        cout << s[i].id << " " << s[i].sum << endl;
    }
    return 0;
}
```

这就是洛谷 [P1093 奖学金](https://www.luogu.com.cn/problem/P1093)——当年第 3 章埋的伏笔，现在兑现了。记得回去把那道题用新方法重交一遍。

## 动手试一试

1. 定义结构体 `Point { int x, y; }`，读入 $n$ 个点，输出距离原点最近的点坐标（距离比较用平方，避免开方）
2. 给 `Student` 增加 `double height` 成员，按身高从矮到高排序输出
3. 平面扫描：读入 $n$ 个点，先按 x 从小到大，x 相同按 y 从小到大，排序后输出（双关键字 cmp）
4. 思考：`cmp` 里写成 `return a.sum >= b.sum;` 会有什么问题？（提示：两个总分相等时它也说 a 排前面，`sort` 内部会乱掉甚至崩溃——比较必须严格）

---

下一课：两种最经典的「有规矩的容器」——[栈与队列](stack-queue.md)。
