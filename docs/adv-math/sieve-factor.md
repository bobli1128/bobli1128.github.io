# 线性筛与质因数分解

## 埃氏筛的遗留问题

第 9 章的埃氏筛 $O(n \log \log n)$ 已经很快，但**同一个合数会被划掉多次**（如 12 被 2 和 3 各划一次）。**线性筛（欧拉筛）**保证每个合数只被它**最小的质因数**划掉一次——严格 $O(n)$，而且顺路产出「每个数的最小质因数」这张宝藏表。

## 线性筛：三句话的精髓

```cpp
int primes[N], cnt;      // 质数表
int mpf[N];              // mpf[i] = i 的最小质因数（min prime factor）

void sieve(int n) {
    for (int i = 2; i <= n; i++) {
        if (mpf[i] == 0) {          // 没被划过 → i 是质数
            primes[cnt++] = i;
            mpf[i] = i;
        }
        // 用「已知的质数」划掉合数：i * primes[j]
        for (int j = 0; j < cnt && primes[j] <= mpf[i] && (long long)i * primes[j] <= n; j++) {
            mpf[i * primes[j]] = primes[j];   // 最小质因数恰好是 primes[j]
        }
    }
}
```

精髓在循环条件 **`primes[j] <= mpf[i]`**：只允许「不超过 i 最小质因数的质数」去划合数。以 12 = 2×6 为例：j=2 划掉 12（2 是 6 的最小质因数，放行）；j=3 时 3 > mpf[6]=2，**及时刹车**——12 的划分权完全交给 2，每人只划一次。

## 质因数分解：O(log n) 的免费午餐

有 `mpf` 表后，分解 n 的质因数**不再需要试除**——不断查表、不断除：

```cpp
// 分解 n：打印 n = p1^e1 * p2^e2 * ...
void factor(int n) {
    while (n > 1) {
        int p = mpf[n];          // 查表拿最小质因数
        int e = 0;
        while (mpf[n] == p) { n /= p; e++; }
        cout << p << "^" << e << " ";
    }
}
```

每个数最多被它质因数的个数层循环分解（$\le \log_2 n$）——筛一次表，终身受益。第 9 章「算术基本定理」的所有推论（因数个数、因数和、完全平方判断）从此都能在毫秒级算出。

## 例题：因数个数

> **题目描述**　读入 $n$ 个正整数，输出每个数的因数个数。
>
> **输入格式**　第一行一个整数 $n$；接下来 $n$ 行每行一个正整数。
>
> **输出格式**　$n$ 行，每行一个整数。
>
> **数据范围**　$1 \le n \le 10^5$，每个数 $\le 10^6$。
>
> **样例输入 / 样例输出**
>
> ```text
> 3
> 12
> 17
> 100
> ```
>
> ```text
> 6
> 2
> 9
> ```

**思路分析**　回收第 9 章公式：$n = p_1^{e_1} \cdots$ 则因数个数 $= (e_1+1)(e_2+1)\cdots$。验证：$12 = 2^2 \cdot 3$ → $3 \times 2 = 6$ ✅（1,2,3,4,6,12）；17 是质数 → 2 ✅；$100 = 2^2 \cdot 5^2$ → $3 \times 3 = 9$ ✅。方案：线性筛出 $10^6$ 的 mpf 表，每个数 O(log) 分解后乘一遍 $(e+1)$。

**参考代码**

```cpp
#include <iostream>
using namespace std;

const int N = 1000005;
int primes[N], cnt, mpf[N];

void sieve(int n) {
    for (int i = 2; i <= n; i++) {
        if (mpf[i] == 0) { primes[cnt++] = i; mpf[i] = i; }
        for (int j = 0; j < cnt && primes[j] <= mpf[i] && (long long)i * primes[j] <= n; j++)
            mpf[i * primes[j]] = primes[j];
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    sieve(N - 1);
    int n;
    cin >> n;
    while (n--) {
        int x;
        cin >> x;
        long long ans = 1;
        while (x > 1) {
            int p = mpf[x], e = 0;
            while (x % p == 0) { x /= p; e++; }
            ans *= (e + 1);
        }
        cout << ans << "\n";
    }
    return 0;
}
```

洛谷搜「因数个数」有同类题（[P1403 AHOI2005 约数研究](https://www.luogu.com.cn/problem/P1403) 还有巧妙的「枚举因数贡献」解法，学完试试）。

## 三种筛的选型

| 场景 | 工具 |
| ---- | ---- |
| 只要质数 | 埃氏筛（好写） |
| 要最小质因数 / 线性时间 | 线性筛 |
| 只判单个数 | 试除到 √n（第 4 章） |

线性筛还能衍生「欧拉函数」「约数和」等积性函数的线性求法——数论工具链的地基，先掌握这一个。

## 动手试一试

1. 手模线性筛 n=12：写出 mpf[2..12] 每一项（答案：2,3,2,5,2,7,2,3,2,11,2）
2. 用 mpf 分解 360（答案 $2^3 \cdot 3^2 \cdot 5$），并算出它的因数个数（$4 \times 3 \times 2 = 24$）
3. 思考：为什么埃氏筛从 $i^2$ 开始划，线性筛却从 $i \times primes[0] = 2i$ 开始？（提示：线性筛的每个合数由「最小质因数」唯一负责，重复 = 0）
4. 挑战：欧拉函数 φ(n)（1~n 中与 n 互质的个数）——积性函数，$\varphi(p^e) = p^e - p^{e-1}$，试着在线性筛顺路求出（洛谷 P2158 门槛较低）

---

下一课：让「除法」也能取模——[扩展欧几里得与逆元](exgcd-inv.md)。
