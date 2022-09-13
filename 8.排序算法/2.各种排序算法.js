/*
    O(1)                    常数的
    O(log(n))               对数的
    O(n)                    线性的
    O(n*log(n))             线性和对数乘积
    O(n^2)                  平方
    O(2^n)                  指数的



推导大O表示法的方式：
1.用常量1取代运算时间里的所有加法常量
2.在修改后的运算次数中，只保留最高项
3.如果最高项存在且与之相乘的常数不为1，则去除这个常数
2n^2 + 3n +1  =>  O(n^2)
    
*/
function ArrayList() {
    this.array = [];
}

ArrayList.prototype.insert = function (item) {
    this.array.push(item);
};

ArrayList.prototype.toString = function (item) {
    return this.array.join("-");
};

// 交换元素
ArrayList.prototype.swap = function (m, n) {
    let temp = this.array[m];
    this.array[m] = this.array[n];
    this.array[n] = temp;
};

/*
冒泡排序：
从头到尾依次比较相邻的两个元素大小，如果左边的大，则交换位置
当走到最后，最大的元素一定到了最后面
然后继续从最左端开始，比较到倒数第二个位置
以此类推，将数据排序完成

以长度为7的数组的比较次数为例
第一轮循环6次比较
第二轮循环5次比较
...
第六轮循环1次比较
总共：6 + 5 + 4 + 3 + 2 + 1

对于n个长度的数组
(n - 1) + (n - 2) + ... + 1 = n(n-1) / 2 = n^2/2 - n/2
冒泡排序比较次数的大O表示法为O(n^2)

交换次数为n(n-1) / 4，因为交换是可能要交换，也可能不交换，为比较次数的1/2
所以冒泡排序交换次数的大O表示法也是O(n^2)
*/

// 外层循环控制比较的轮数，全部排玩需要length - 1
// 内层循环控制比较的次数，比较的次数依次减少，第一轮为length - 1 ， 第二为轮length - 2 ，即外层循环变量i的大小
ArrayList.prototype.bubbleSort = function () {
    let length = this.array.length;
    for (let i = length - 1; i >= 1; i--) {
        for (let j = 0; j < i; j++) {
            if (this.array[j] > this.array[j + 1]) {
                this.swap(j, j + 1);
            }
        }
    }
};

/*
选择排序：
在未排序的数列中找到最小(or最大)元素，记录最小值的索引，然后将其放在数组的起始位置。
接着再从剩余未排序的元素中继续寻找，直到所有元素均排序完毕

比较次数
对于n个长度的数组
第一轮循环n - 1次比较
第一轮循环n - 2次比较
选择排序比较次数的大O表示法为O(n^2)，与冒泡排序一样

交换次数为n - 1次，因为每轮只交换一次
选择排序交换次数的大O表示法为O(n)
所以选择排序通常认为在执行效率是高于冒泡排序的
...
*/
// 外层循环控制比较的轮数，全部排玩需要length - 1轮
// 内层循环控制与min进行比较
ArrayList.prototype.selectSort = function () {
    let length = this.array.length;
    for (let i = 0; i < length - 1; i++) {
        let min = i; //min记录每轮开始的索引
        for (let j = min + 1; j < length; j++) {
            //从min + 1的位置开始比较
            if (this.array[min] > this.array[j]) {
                min = j;
            }
        }
        this.swap(min, i);
    }
};

/*
插入排序：
从第一个元素开始，该元素可以认定为已经被排序
取出下一个元素，在已经排好序的元素中从后向前扫描
如果该元素（已排序）大于新元素，将该元素移到下一位置
重复上述步骤，直到找到已排序的元素小于或者大于新元素的位置
将新元素插入到该位置后，重复上述步骤

插入排序的比较次数
第一轮，最多1次
第二轮，最多2次
...
第n -1轮，最多n - 1次
实际次数：n^2/4 - n/4
插入排序比较次数的大O表示法也为O(n^2)，但实际比较次数是冒泡排序的一半

插入排序的赋值次数
实际次数：n^2/4 - n/4
大O表示法也为O(n^2)

所以在简单排序中，相对于冒泡、选择排序，插入排序的效率最高
*/
ArrayList.prototype.insertSort = function () {
    let length = this.array.length;
    for (let i = 1; i < length; i++) {
        let temp = this.array[i]; //进行比较的新元素
        let j = i;
        // 从后往前比较已经排好序的元素
        while (this.array[j - 1] > temp && j >= 0) {
            // 如果大于新元素，将该元素往后移
            this.array[j] = this.array[j - 1];
            j--;
        }
        // 接续while循环，说明已经找到了要插入的位置，即索引j
        // 将新元素替换到索引j的位置
        this.array[j] = temp;
    }
};

let arr = new ArrayList();
arr.insert(100);
arr.insert(90);
arr.insert(20);
arr.insert(30);
arr.insert(70);
arr.insert(10);
arr.insert(50);
arr.insert(40);
arr.insert(60);
arr.insert(80);

// arr.bubbleSort();
// arr.selectSort();
arr.insertSort();
console.log(arr.toString());
