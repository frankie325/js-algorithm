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

// 5.获取栈中元素的个数
Stack.prototype.toString = function () {
    return this.items.join(",");
};

function dec2bin(number) {
    let s = new Stack();
    while (number > 0) {
        s.push(number % 2); //将除2得到的余数推入栈中
    }
    number = parseInt(number / 2);

    let str = "";
    while (s.isEmpty()) {
        str += s.pop(); //再依次取出栈顶元素，进行凭借，得到的就是二进制
    }
    return str;
}

console.log(dec2bin(1000))
