/*
    单向链表：只能从头遍历到尾

    双向链表：既可以从头遍历到尾，又可以从尾遍历到头
             一个节点既有向前连接的引用，又有向后连接的引用
*/

// 双向链表的实现
function Node(data) {
    this.data = data; //存储的数据
    this.prev = null; //指向前一个元素的指针
    this.next = null; //指向下个元素的指针
}

function DoubleLinkedList() {
    this.head = null;
    this.tail = null; //尾部，指向最后一个节点
    this.length = 0;
}

// 1.向双向链表添加元素
DoubleLinkedList.prototype.append = function (data) {
    let node = new Node(data);
    if (this.length === 0) {
        this.head = node;
        this.tail = node;
    } else {
        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
    }
    this.length += 1;
};

// 2.往双向链表插入节点
DoubleLinkedList.prototype.insert = function (position, data) {
    // 越界判断
    if (position < 0 || position > this.length) return false;

    let node = new Node(data);
    // 当链表还没有元素的时候
    if (this.length === 0) {
        this.head = node;
        this.tail = node;
    } else {
        if (position === 0) {
            // 插入到第一个元素的位置
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
        } else if (position === this.length) {
            // 插入到末尾
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        } else {
            // 插入到中间的位置
            let index = 0;
            let current = this.head;

            while (index++ < position) {
                current = current.next;
            }

            // 修改指针
            node.prev = current.prev;
            node.next = current;
            current.prev.next = node;
            current.prev = node;
        }
    }

    // 长度加一
    this.length += 1;
};

// 3.获取对应位置的元素
DoubleLinkedList.prototype.get = function (position) {
    // 越界判断
    if (position < 0 || position >= this.length) return null;

    // 双向链表查找可以进行优化：
    // this.length / 2 > position  从前往后遍历
    // this.length / 2 < position  从后往前遍历

    if (this.length / 2 > position) {
        let index = 0;
        let current = this.head;
        // 找到对应位置的元素
        while (index++ < position) {
            current = current.next;
        }
        return current.data;
    } else {
        let index = this.length - 1;
        let current = this.tail;
        while (index-- > position) {
            current = current.prev;
        }
        return current.data;
    }
};

// 4.获取元素的索引
DoubleLinkedList.prototype.indexOf = function (data) {
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
DoubleLinkedList.prototype.update = function (position, newdata) {
    // 越界判断
    if (position < 0 || position >= this.length) return false;

    if (this.length / 2 > position) {
        let index = 0;
        let current = this.head;
        // 找到对应位置的元素
        while (index++ < position) {
            current = current.next;
        }
        // 更新数据
        current.data = newdata;
    } else {
        let index = this.length - 1;
        let current = this.tail;
        while (index-- > position) {
            current = current.prev;
        }
        current.data = newdata;
    }
    return true;
};

// 6.移除指定位置的元素
DoubleLinkedList.prototype.removeAt = function (position) {
    // 越界判断
    if (position < 0 || position >= this.length) return null;

    let current = this.head;
    // 只有一个元素时
    if (this.length === 1) {
        this.head = null;
        this.tail = null;
    } else {
        if (position === 0) {
            // 删除第一个位置的元素
            this.head.next.prev = null;
            this.head = this.head.next;
        } else if (position === this.length - 1) {
            // 删除最后一个位置的元素
            current = this.tail;
            this.tail.prev.next = null;
            this.tail = this.tail.prev;
        } else {
            // 删除中间的元素
            // 也能进行优化
            if (this.length / 2 > position) {
                let index = 0;
                current = this.head;
                // 找到对应位置的元素
                while (index++ < position) {
                    current = current.next;
                }
            } else {
                let index = this.length - 1;
                current = this.tail;
                while (index-- > position) {
                    current = current.prev;
                }
            }
            current.prev.next = current.next;
            current.next.prev = current.prev;
        }
    }

    // 长度减一
    this.length -= 1;
    // 返回删除的数据
    return current.data;
};

// 7.移除指定元素
DoubleLinkedList.prototype.remove = function (data) {
    // 找到它的位置
    let index = this.indexOf(data);
    // 移除该位置的元素
    return this.removeAt(index);
};

// 8.判断链表是否为空
DoubleLinkedList.prototype.isEmpty = function () {
    return this.length === 0;
};

// 9.获取链表的长度
DoubleLinkedList.prototype.size = function () {
    return this.length;
};

// 10.获取第一个元素
DoubleLinkedList.prototype.getHead = function () {
    return this.head.data;
};

// 12.获取最后一个元素
DoubleLinkedList.prototype.getTail = function () {
    return this.tail.data;
};

// 10.toString，从开始到结尾
DoubleLinkedList.prototype.forwardToString = function () {
    let str = "";
    let current = this.head;
    while (current) {
        str += current.data + " ";
        current = current.next;
    }
    return str;
};

// 11.toString，从结尾到开始
DoubleLinkedList.prototype.backwardToString = function () {
    let str = "";
    let current = this.tail;
    while (current) {
        str += current.data + " ";
        current = current.prev;
    }
    return str;
};

let dbList = new DoubleLinkedList();
dbList.append("a");
dbList.append("b");
dbList.append("c");
console.log(dbList);
console.log(dbList.forwardToString()); //a b c
console.log(dbList.backwardToString()); //c b a
dbList.insert(0, "aa");
dbList.insert(2, "bb");
console.log("insert", dbList);
console.log(dbList.get(3)); //b
console.log(dbList.indexOf("a")); //1
dbList.update(0, "aaa");
dbList.update(1, "aa");
console.log("update", dbList);
// console.log("removeAt", dbList.removeAt(0));
// console.log("removeAt", dbList.removeAt(1));
console.log("removeAt", dbList.removeAt(4));
dbList.remove("aaa");
console.log(dbList);
console.log(dbList.isEmpty());
console.log(dbList.size());
console.log(dbList.getHead());
console.log(dbList.getTail());
