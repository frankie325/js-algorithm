// 队列结构：
//跟栈类似，也是一种受限的线性表，先进先出（后进后出）

// 队列的实现
export default function Queue() {
    this.items = [];
}

// 队列的一些常用操作
// 1.将元素推入队列
Queue.prototype.equeue = function (element) {
    this.items.push(element);
};

// 2.从队列中删除前端元素
Queue.prototype.dqueue = function () {
    return this.items.shift();
};

// 3.查看前端元素
Queue.prototype.front = function () {
    return this.items[0];
};

// 4.判断队列是否为空
Queue.prototype.isEmpty = function () {
    return this.items.length === 0;
};

// 5.获取队列中元素的个数
Queue.prototype.size = function () {
    return this.items.length;
};

// 6.toString方法
Queue.prototype.toString = function () {
    return this.items.join(",");
};

let q = new Queue();
q.equeue("a");
q.equeue("b");
q.equeue("c");
q.equeue("d");

console.log(q.front()); //"a"

q.dqueue();
console.log(q.front()); //"b"
