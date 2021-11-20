/*
    数组的创建通常需要申请一段连续的内存空间，而且数组在开头或中间插入数据成本很高，需要进行大量元素的位移
    不同于数组，链表的元素在内存中不必是连续的空间。
    链表的每个元素由一个存储元素本身的节点和一个指向下一个元素的引用（有些语言称作指针）组成

    链表的优点：
    内存空间不是必须连续的，可以重复利用计算机的内存，实现灵活的内存动态管理
    链表不必再创建时确定大小，可以无限延伸下去
    插入和删除数据值，时间复杂度可以达到O(1),，效率很高
    缺点：
    访问任何位置的元素是，都需要从头开始访问，无法通过下表直接访问元素
*/

// 链表的实现

function Node(data) {
    this.data = data; //存储的数据
    this.next = null; //指向下个元素的指针
}

function LinkedList() {
    this.head = null; //头部，指向第一个元素
    this.length = 0;
}

// 1.向链表添加元素
LinkedList.prototype.append = function (data) {
    let node = new Node(data);

    // 如果长度为0，为第一个节点，直接给head赋值
    if (this.length === 0) {
        this.head = node;
    } else {
        // 找到最后一个节点，next为null就是最后一个
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        // 最后一个节点的next指向新的节点
        current.next = node;
    }

    // 长度加一
    this.length += 1;
};

// 2.往链表插入节点
LinkedList.prototype.insert = function (position, data) {
    // 位置的值越界，则直接返回false
    if (position < 0 || position > this.length) return false;

    let node = new Node(data);
    // 如果插入的位置是第一个
    if (position === 0) {
        node.next = this.head;
        this.head = node;
    } else {
        let index = 0;
        let current = this.head;
        let prev = null;
        while (index++ < position) {
            // 保存插入位置前面的元素
            prev = current;
            // 找到插入位置的元素
            current = current.next;
        }
        prev.next = node;
        node.next = current;

        // 长度加一
        this.length += 1;
    }
    return true;
};

// 3.获取对应位置的元素
LinkedList.prototype.get = function (position) {
    // 越界判断
    if (position < 0 || position >= this.length) return false;
    let index = 0;
    let current = this.head;
    // 找到对应位置的元素
    while (index++ < position) {
        current = current.next;
    }
    return current.data;
};

// 4.获取元素的索引
LinkedList.prototype.indexOf = function (data) {
    let index = 0;
    let current = this.head;
    // 开始查找
    while (current) {
        if (current.data === data) {
            return index;
        }
        current = current.next;
        index++;
    }
    // 没有找到返回-1
    return -1;
};

// 5.更新元素
LinkedList.prototype.update = function (position, newdata) {
    // 越界判断
    if (position < 0 || position >= this.length) return false;
    let index = 0;
    let current = this.head;
    // 找到对应位置的元素
    while (index++ < position) {
        current = current.ext;
    }
    // 进行更新
    current.data = newdata;
    return true;
};

// 6.移除指定位置的元素
LinkedList.prototype.removeAt = function (position) {
    // 越界判断
    if (position < 0 || position >= this.length) return null;

    let current = this.head;
    if (position === 0) {
        this.head = this.head.next;
    } else {
        let index = 0;
        let prev = null;
        while (index++ < position) {
            prev = current;
            current = current.next;
        }
        // 让上一个元素的next指向对应位置元素的next即可
        prev.next = current.next;
    }

    // 长度减一
    this.length -= 1;
    // 返回删除的数据
    return current.data;
};

// 7.移除指定元素
LinkedList.prototype.remove = function (data) {
    // 找到它的位置
    let index = this.indexOf(data);
    // 移除该位置的元素
    return this.removeAt(index);
};

// 8.判断链表是否为空
LinkedList.prototype.isEmpty = function () {
    return this.length === 0;
};

// 9.获取链表的长度
LinkedList.prototype.size = function () {
    return this.length;
};

// 10.toString方法
LinkedList.prototype.toString = function () {
    let str = "";
    let current = this.head;
    while (current) {
        str += current.data + " ";
        current = current.next;
    }
    return str;
};

let list = new LinkedList();
list.append("a");
list.append("b");
list.append("c");
console.log(list);
list.insert(1, "d");
console.log(list);
console.log(list.get(1));
console.log(list.indexOf("c"));

list.update(0, "aa");
console.log("update", list);

list.removeAt(1);
console.log("removeAt", list);
list.remove("c");
console.log("remove", list);

console.log(list.isEmpty());
console.log(list.size());
