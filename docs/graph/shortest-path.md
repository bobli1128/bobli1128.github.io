# 最短路

## 松弛：所有最短路算法的心脏

记 `dist[v]` = 目前找到的「从源点 s 到 v 的最短距离」。松弛就是反复试同一件事：

![边松弛示意](../assets/diagrams/relaxation.svg)

> **「绕道 u 再到 v，会不会更近？」** 若 `dist[u] + w < dist[v]`，则 `dist[v] = dist[u] + w`。

三大最短路算法的区别只在于**按什么顺序松弛**。先定三件事，再选算法：

| 数据特征 | 选谁 | 复杂度 |
| ---- | ---- | ---- |
| 点少（$n \le 500$） | Floyd（多源） | $O(n^3)$ |
| 无负边、单源 | **Dijkstra（堆优化）** | $O(m \log n)$ ✅ |
| 有负边 | Bellman-Ford / SPFA | $O(nm)$ / 均摊较快 |

## Floyd：三行代码的多源最短路

「任意两点间的最短路」，$n$ 小时最省心。思路：**只允许经过前 k 个中转点**，逐个放宽：

$$d[i][j] = \min(d[i][j],\ d[i][k] + d[k][j])$$

```cpp
for (int k = 1; k <= n; k++)          // 中转点在最外层！
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            d[i][j] = min(d[i][j], d[i][k] + d[k][j]);
```

初始化 `d[i][i] = 0`，有边 `d[u][v] = w`，无边设无穷大。**k 必须在最外层**（保证状态「只经前 k 个中转」无后效）——调换顺序结果会错，笔试爱考。

## Dijkstra：单源最短路的王者

贪心直觉：**每次把「已确定的最小 dist」的点敲定为终局**——因为它已经比所有候选都小，未来不会再更小（前提：边权非负！）。敲定一个点，就松弛它的所有出边；「挑最小的未确定点」用第 10 章的优先队列加速。

```cpp
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

const long long INF = 1e18;
long long dist[100005];
vector<pair<int,int>> adj[100005];   // {邻居, 边权}

int main() {
    int n, m, s;
    cin >> n >> m >> s;
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});     // 有向图只存一遍
    }
    for (int i = 1; i <= n; i++) dist[i] = INF;

    priority_queue<pair<long long,int>,
                   vector<pair<long long,int>>,
                   greater<>> pq;                       // 小根堆 {dist, 点}
    dist[s] = 0;
    pq.push({0, s});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;      // 过期条目（松弛出过更小的），跳过
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    for (int i = 1; i <= n; i++)
        cout << (dist[i] == INF ? -1 : dist[i]) << " ";
    return 0;
}
```

两个灵魂细节：**「非负边权」是 Dijkstra 的生命线**（有负边时「敲定终局」不再成立，会得错解——负权上 SPFA）；堆里会有过期条目，靠 `d > dist[u]` 识别丢弃。

## SPFA / Bellman-Ford：负权的兜底

Bellman-Ford：把**所有边**松弛 $n-1$ 轮，$O(nm)$，简单可靠。SPFA 是它的队列优化：只把「dist 刚变小过」的点排进队列去松弛出边。负权图用它；无负图选 Dijkstra（SPFA 会被恶意卡成 $O(nm)$——出题人 Known 技巧「卡 SPFA」）。

**判断负环**：某条边被松弛 $n$ 次仍有更新 → 存在负环（Bellman-Ford 的附加技能）。

## 例题：热浪 / Dijkstra 模板

> **题目描述**　$T$ 个城镇、$R$ 条双向道路，从城镇 $S$ 去往 $E$，求最短时间。
>
> **输入格式**　第一行 $T, R, S, E$；接下来 $R$ 行每行 $u, v, w$。
>
> **输出格式**　一个整数。
>
> **数据范围**　$1 \le T \le 2500$，$1 \le R \le 6200$，$1 \le w \le 1000$。
>
> **样例输入 / 样例输出**
>
> ```text
> 4 5 1 4
> 1 2 3
> 2 4 4
> 1 3 5
> 3 4 2
> 2 3 1
> ```
>
> ```text
> 6
> ```

**思路分析**　边权非负的单源最短路，Dijkstra 直选。验证：路线 $1 \to 2 \to 3 \to 4$ = 3+1+2 = 6，比 $1 \to 3 \to 4$（5+2=7）近——第二条路被算法的「贪心敲定」排除，正是 Dijkstra 工作方式的缩影。

**参考代码**　见上方 Dijkstra 模板（双向边要 `addEdge` 两次；输出 `dist[E]`）。同款题：洛谷 [P4779 单源最短路径（标准版）](https://www.luogu.com.cn/problem/P4779)、[P1339 热浪](https://www.luogu.com.cn/problem/P1339)。

## 例题 2：最短路计数

> **题目描述**　$1$ 号点到其余每个点的**最短路线条数**（模 100003），边无向、权均为 1。
>
> **输入格式**　第一行 $n, m$；接下来 $m$ 行每行两个数。
>
> **输出格式**　$n$ 行，第 $i$ 行是 1 到 $i$ 的最短路条数。
>
> **数据范围**　$1 \le n \le 2 \times 10^5$，$1 \le m \le 4 \times 10^5$。
>
> **样例输入 / 样例输出**
>
> ```text
> 4 4
> 1 2
> 1 3
> 2 4
> 3 4
> ```
>
> ```text
> 1
> 1
> 1
> 2
> ```

**思路分析**　权全 1 → BFS 层次即最短路（第 7 章的老朋友）。**计数规则**：从 u 松弛 v 成功（`dist[v] = dist[u]+1`）时 `cnt[v] = cnt[u]`；`dist[v] == dist[u]+1`（另一条同层路径）时 `cnt[v] += cnt[u]`——「继承 + 汇合」两句话。

**参考代码**

```cpp
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

const int MOD = 100003;
int dist[200005], cnt[200005];
vector<int> adj[200005];

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    queue<int> q;
    q.push(1);
    dist[1] = 0;
    cnt[1] = 1;
    vector<bool> vis(n + 1, false);
    vis[1] = true;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (!vis[v]) {
                vis[v] = true;
                dist[v] = dist[u] + 1;
                cnt[v] = cnt[u];          // 第一次到达：直接继承
                q.push(v);
            } else if (dist[v] == dist[u] + 1) {
                cnt[v] = (cnt[v] + cnt[u]) % MOD;   // 同层汇合：累加
            }
        }
    }
    for (int i = 1; i <= n; i++) cout << cnt[i] << "\n";
    return 0;
}
```

这就是洛谷 [P1144 最短路计数](https://www.luogu.com.cn/problem/P1144)。「最短路 + 计数」是图论 DP 的敲门砖——第 12 章还会见面。

## 动手试一试

1. 手模 Dijkstra：样例图上写每轮「敲定谁、松弛了谁」
2. 把 Floyd 的 k 循环挪到最内层，样例会出错吗？构造一个反例
3. 为什么 Dijkstra 遇到负边会错？构造一个 3 点图证明（提示：先被敲定的点，后来出现「负边绕道」更短的路径）
4. 挑战：SPFA 判负环——记录每个点的入队次数，超过 n 次即有负环（洛谷 P3385）

---

下一课：用第 10 章的并查集发电——[最小生成树](mst.md)。
