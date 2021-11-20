/*
优先级队列：
在插入一个元素到队列时，需要考虑数据的优先级
插入时和其他数据的优先级进行比较
比较完成后，插入正确的位置
*/
function QueueElement(element, priority) {
    this.element = element; //元素
    this.priority = priority; //优先级，数值越小，优先级越高
}

// 优先级队列的实现
function PriorityQueue() {
    this.items = [];
}

// 1.将元素推入队列
PriorityQueue.prototype.equeue = function (element, priority) {
    let ele = new QueueElement(element, priority);

    // 1.队列长度为0的时候，不用考虑优先级，直接插入队列
    if (this.items.length === 0) {
        this.items.push(ele);
    } else {
        let added = false;
        for (let i = 0; i < this.items.length; i++) {
            // 2.遍历队列中的元素，找到优先级的值比它大的，插入到其前面的位置并跳出循环
            if (ele.priority < this.items[i].priority) {
                this.items.splice(i, 0, ele);
                added = true;
                break;
            }
        }

        // 3.如果还没插入队列，说明它的优先级最低
        if (!added) {
            this.items.push(ele);
        }
    }
};

// 2.从队列中删除前端元素
PriorityQueue.prototype.dqueue = function () {
    return this.items.shift();
};

// 3.查看前端元素
PriorityQueue.prototype.front = function () {
    return this.items[0];
};

// 4.判断队列是否为空
PriorityQueue.prototype.isEmpty = function () {
    return this.items.length === 0;
};

// 5.获取队列中元素的个数
PriorityQueue.prototype.size = function () {
    return this.items.length;
};

// 6.toString方法
PriorityQueue.prototype.toString = function () {
    let str = "";
    for (let i = 0; i < this.items.length; i++) {
        str += this.items[i].element + "-" + this.items[i].priority + " ";
    }
    return str;
};

let pq = new PriorityQueue();
pq.equeue("kfg", 10);
pq.equeue("Tom", 20);
pq.equeue("Jack", 15);
pq.equeue("Sam", 40);
console.log(pq.toString());
