//哈希表笔记地址 https://github.com/XPoet/js-data-structures-and-algorithms/blob/master/assets/doc/10_JavaScript%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95%EF%BC%88%E5%8D%81%EF%BC%89%E5%93%88%E5%B8%8C%E8%A1%A8.md

/*
我们知道数组的查询效率是很高的，但是插入和删除的效率不高。


哈希表是根据关键码值(Key value)而直接进行访问的，本质上也是个数组。通过某种方式，把key转换成数组的下标，通过下标快速定位元素的位置，而这种方式就叫做哈希函数

哈希表可以提供非常快速的 插入-删除-查找 操作。
无论多少数据，插入和删除值都只需接近常量的时间，即 O(1) 的时间复杂度。实际上，只需要几个机器指令即可完成。
哈希表的速度比树还要快，基本可以瞬间查找到想要的元素。
哈希表相对于树来说编码要简单得多。
*/

// 哈希表的实现，这里使用链地址法实现
function HashTable() {
    this.storage = []; //存储数据
    this.limit = 7; //数组最大的长度，选择为质数
    this.count = 0;

    // 装填因子(已有个数/总个数)
    this.loadFactor = 0.75;
    this.minLoadFactor = 0.25;
}

/**
 * @description:哈希函数
 * @param {*} str 进行哈希化的key
 * @param {*} size 数组的长度
 * @return {*}
 */
HashTable.prototype.hashFun = function (str, size) {
    // 定义哈希值，初始为0
    let hashCode = 0;

    // 计算哈希值用到的质数（无强制要求，质数即可）
    // 保证计算出的哈希值在数组中是均匀分布的
    const PRIME = 37;

    // 使用霍纳算法（秦九韶算法），减少乘法的运算
    for (let i = 0; i < str.length; i++) {
        hashCode = PRIME * hashCode + str.charCodeAt(i);
    }

    // 除以数组的的长度并取余，保证得到的索引在数组范围内
    let index = hashCode % size;

    return index;
};

//1.插入和修改操作
// [ [ [key,value], [key,value] ], [ [key,value], [key,value] ] ]
HashTable.prototype.put = function (key, value) {
    // 1.将key哈希化得到索引
    let index = this.hashFun(key, this.limit);

    // 2.根据index取出对应的bucket
    let bucket = this.storage[index];

    // 3.如果bucket为undefined，则创建bucket
    if (bucket == null) {
        bucket = [];
        this.storage[index] = bucket;
    }

    // 4.如果bucket不为空，再对bucket进行线性探测
    for (let i = 0; i < bucket.length; i++) {
        let tuple = bucket[i];
        // 如果找到了相同的key，说明应该为修改操作
        if (tuple[0] === key) {
            tuple[1] = value;
            return;
        }
    }

    // 5.遍历完了，还没找到，就是插入操作
    bucket.push([key, value]);
    this.count++; //长度加一

    // 6.判断哈希表是否要扩容，若装填因子 > 0.75，则扩容
    if (this.count / this.limit > this.loadFactor) {
        this.resize(this.getPrime(this.limit * 2));
    }
};

// 2.获取操作
HashTable.prototype.get = function (key) {
    // 1.将key哈希化得到索引
    let index = this.hashFun(key, this.limit);

    // 2.根据index取出对应的bucket
    let bucket = this.storage[index];

    // 3.如果bucket为undefined，则直接返回，没有对应的数据
    if (bucket == null) {
        return null;
    }

    // 4.如果bucket不为空，再对bucket进行线性探测
    for (let i = 0; i < bucket.length; i++) {
        let tuple = bucket[i];
        // 如果找到了相同的key，返回它的值
        if (tuple[0] === key) {
            return tuple[1];
        }
    }

    // 5.依然没找到，返回null
    return null;
};

// 3.删除操作
HashTable.prototype.remove = function (key) {
    // 1.将key哈希化得到索引
    let index = this.hashFun(key, this.limit);

    // 2.根据index取出对应的bucket
    let bucket = this.storage[index];

    // 3.如果bucket为undefined，则直接返回，没有对应的数据
    if (bucket == null) {
        return null;
    }

    // 4.如果bucket不为空，再对bucket进行线性探测
    for (let i = 0; i < bucket.length; i++) {
        let tuple = bucket[i];
        // 如果找到了相同的key，
        if (tuple[0] === key) {
            bucket.splice(i, 1); //删除
            this.count--;

            // 6.判断哈希表是否要压缩，若装填因子 < 0.25，则压缩
            if (this.count / this.limit < this.minLoadFactor) {
                this.resize(this.getPrime(Math.floor(this.limit / 2)));
            }

            return tuple[1]; //返回被删除的数据
        }
    }
    // 5.依然没找到，返回null
    return null;
};

// 4.判断哈希表是否为空
HashTable.prototype.isEmpty = function () {
    return this.count === 0;
};

// 5.哈希表中元素的个数
HashTable.prototype.size = function () {
    return this.count;
};

/*
哈希表的扩容与压缩：
当填入表中的元素个数逐渐接近哈希表的最大长度时，
storage 中每一个 index 对应的 bucket 数组（链表）就会越来越长，这就会造成哈希表效率的降低
这个时候就需要进行扩容，一般在装填因子大于0.75的时候进行扩容
装填因子 = 填入表中的元素个数 / 哈希表的长度

当删除时，哈希表在元素的个数逐渐变少时，如果不进行压缩，会造成空间浪费
一般在装填因子小于0.75的时候进行压缩
*/

// 6.扩容操作
HashTable.prototype.resize = function (newLimit) {
    // 1.拿到旧的storage
    let oldStorage = this.storage;

    // 2.重置所有属性
    this.storage = [];
    this.limit = newLimit;
    this.count = 0;

    // 3.遍历旧的storage，重新进行添加
    for (let i = 0; i < oldStorage.length; i++) {
        let bucket = oldStorage[i];

        // 如果bucket为undefined的，直接跳过
        if (bucket == null) continue;

        // bucket有数据，则遍历bucket，重新插入
        for (let j = 0; j < bucket.length; j++) {
            let tuple = bucket[j];
            this.put(tuple[0], tuple[1]);
        }
    }
};

/*
判断一个数是否为质数

方法一：
只能被 1 和 number 整除，即不能被 2 ~ (number-1)整除，遍历 2 ~ (num-1)
穷举法，性能不高
function isPrime(number) {
    for (let i = 2; i < number; i++) {
        if (number % i === 0) {
            return false;
        }
    }
    return true;
}

方式二：
对一个数进行因式分解，那么分解得到的两个数一定是，一个小于number开根号，一个大于number开根号

function isPrime(number) {
    // 获取平方根
    const temp = parseInt(Math.sqrt(number));

    // 循环判断
    for (let i = 2; i <= temp; i++) {
        if (number % i === 0) {
            return false;
        }
    }
    return true;
}
*/

// 判断一个数是否为质数
HashTable.prototype.isPrime = function (number) {
    // 获取平方根
    const temp = parseInt(Math.sqrt(number));

    // 循环判断
    for (let i = 2; i <= temp; i++) {
        if (number % i === 0) {
            return false;
        }
    }
    return true;
};

// 2 倍扩容或压缩之后，循环调用isPrime 判断得到的容量是否为质数，不是则加一，直到是为止
HashTable.prototype.getPrime = function (number) {
    while (!this.isPrime(number)) {
        number++;
    }
    return number;
};

let ht = new HashTable();
ht.put("a", 1);
ht.put("b", 2);
ht.put("c", 3);
ht.put("d", 4);
ht.put("a", 111);
console.log(ht);
console.log(ht.get("a"));
ht.remove("d");
console.log(ht);
ht.put("e", 5);
ht.put("f", 6);
ht.put("g", 7);
console.log(ht);
ht.remove("g");
ht.remove("f");
ht.remove("e");
console.log(ht);
