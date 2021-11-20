// 1.栈结构：
// 栈（stack），是一种受限的线性表，后进先出（先进后出）

// 比如平常所说的函数调用栈
// 函数之间的相互调用，A调用B，B又调用C，C又调用D
// 过程为，A最先入栈，因为调用了B，所以B又入栈，接着C入栈
// 然后C执行完，出栈，再到B执行完，出栈，最终A出栈。

// 栈结构的实现
function Stack() {
    this.items = [];
}

// 栈的一些常用操作
// 1.将元素推入栈
Stack.prototype.push = function (element) {
    this.items.push(element);
};

// 2.剔除栈顶元素
Stack.prototype.pop = function () {
    return this.items.pop();
};

// 3.查看栈顶元素
Stack.prototype.peek = function () {
    return this.items[this.items.length - 1];
};

// 4.判断栈是否为空
Stack.prototype.isEmpty = function () {
    return this.items.length === 0;
};

// 5.获取栈中元素的个数
Stack.prototype.size = function () {
    return this.items.length;
};

// 6.toString方法
Stack.prototype.toString = function () {
    return this.items.join(",");
};

let s = new Stack();

s.push(10);
s.push(20);
s.push(30);
s.push(40);
console.log(s.peek());
