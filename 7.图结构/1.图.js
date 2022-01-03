import Dictionary from "../4.集合/2.字典.js";
import Queue from "../2.队列/1.队列结构.js";

// 图结构的封装

function Graph() {
    this.vertexes = []; //顶点
    this.edges = new Dictionary();
}

// 添加顶点
Graph.prototype.addVertex = function (v) {
    this.vertexes.push(v);
    this.edges.set(v, []); //用来存储边
};

// 添加边
Graph.prototype.addEdge = function (v1, v2) {
    // 添加边进行双向关联l连接
    this.edges.get(v1).push(v2);
    this.edges.get(v2).push(v1);
};

// toString方法
Graph.prototype.toString = function () {
    let str = "";

    for (let i = 0; i < this.vertexes.length; i++) {
        const v = this.vertexes[i];
        str += v + "=>";
        const edges = this.edges.get(v);
        for (let j = 0; j < edges.length; j++) {
            const e = edges[j];
            str += e;
        }
        str += "\n";
    }
    return str;
};

/*
为了记录顶点是否被访问过，我们使用三种颜色来反应它们的状态。(或者两种颜色也可以)记录顶点
    - 白色表示该顶点还没有被访问.
    - 灰色表示该顶点被访问过, 但并未被探索过.
    - 黑色表示该顶点被访问过且被完全探索过.

    下面是初始化颜色代码
*/
Graph.prototype.initColor = function () {
    var colors = {};
    for (let i = 0; i < this.vertexes.length; i++) {
        colors[this.vertexes[i]] = "white";
    }
    return colors;
};

// 广度优先遍历（Breadth-First Search）
Graph.prototype.bfs = function (handle) {
    // 1.初始化颜色
    let colors = this.initColor();
    // 2.创建队列
    let queue = new Queue();
    // 3.将传入的顶点放入队列
    queue.equeue(this.vertexes[0]);

    // 4.依赖队列操作数据， 队列不为空时一直循环
    while (!queue.isEmpty()) {
        // 4.1 移除队列，并拿到该顶点
        let qVal = queue.dqueue();
        // 4.2 将该顶点设置为灰色，表示该顶点被访问过
        colors[qVal] = "gray";
        // 4.3 拿到该顶点连接的其他顶点
        let qEdges = this.edges.get(qVal);

        // 4.4遍历连接的其他顶点
        for (let i = 0; i < qEdges.length; i++) {
            let e = qEdges[i];
            if (colors[e] === "white") {
                // 如果没有被访问过，才会推入到队列，并将顶点的颜色置为灰色，等到下一轮循环继续操作
                colors[e] = "gray";
                queue.equeue(e);
            }
        }

        // 4.5 将顶点置为黑色
        colors[qVal] = "black";
        if (handle) handle(qVal); //触发回调，进行操作
    }
};

// 深度优先遍历（Depth-First Search）
Graph.prototype.dfs = function (handle) {
    // 1.初始化颜色
    let colors = this.initColor();

    this.dfsVisit(this.vertexes[0], colors, handle);
};

Graph.prototype.dfsVisit = function (v, colors, handler) {
    // 1.将颜色设置成灰色
    colors[v] = "gray"; //触发回调，进行操作

    handler(v)
    let vEdges = this.edges.get(v);

    // 2.递归调用，遍历相连的顶点
    for (let i = 0; i < vEdges.length; i++) {
        const e = vEdges[i];
        if (colors[e] === "white") {
            this.dfsVisit(e, colors, handler);
        }
    }
    // 3.设置成黑色
    colors[v] = "black";
};

let g = new Graph();

let myVertexes = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

for (let i = 0; i < myVertexes.length; i++) {
    g.addVertex(myVertexes[i]);
}

g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("A", "D");
g.addEdge("C", "D");
g.addEdge("C", "G");
g.addEdge("D", "G");
g.addEdge("D", "H");
g.addEdge("B", "E");
g.addEdge("B", "F");
g.addEdge("E", "I");

console.log(g.toString());
g.bfs((v) => {
    console.log(v);
});

console.log("--------");
g.dfs((v) => {
    console.log(v);
});
