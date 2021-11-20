// 队列的实现
function Queue() {
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

/*
击鼓传花游戏:
    几个朋友一起玩一个游戏，围成一圈，开始数数，
    数到某个数字的人自动淘汰，然后剩下的人继续玩，直到剩下最后一个人
    请问最后剩下的那个人是原来哪个位置上的人
*/

function passGame(nameList, num) {
    let q = new Queue();
    for (let i = 0; i < nameList.length; i++) {
        // 将所有人依次入队
        q.equeue(nameList[i]);
    }

    while (q.size() > 1) {
        // 人数大于1继续循环
        for (let i = 1; i < num; i++) {
            // 数到这个数前面的都不会淘汰
            // 出队再入队
            q.equeue(q.dqueue());
        }
        // 数到num的这个人则淘汰
        q.dqueue();
    }

    // 拿到这个人
    let person = q.front();

    return nameList.indexOf(person); //返回这个人的位置
}

console.log(passGame(["Tom", "Sam", "Jack", "Rose", "Amy"], 3)); //3
