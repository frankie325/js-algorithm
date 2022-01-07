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

// 高级排序：

/*
希尔排序：
将待排序元素进行增量分组，
按照增量的间隔，即分组的元素，进行插入排序
接着递减增量，重复上述步骤，直到增量为1，排序完成

选择不同的增量，排序效率稍有不同，下面增量以数组长度除以2为示例
*/

ArrayList.prototype.shellSort = function () {
    let length = this.array.length;
    let gap = Math.floor(length / 2); //增量为数组长度除以2
    while (gap >= 1) {
        // 按照增量为间隔对元素进行插入排序
        for (let i = gap; i <= length - 1; i++) {
            let j = i;
            let temp = this.array[i];
            while (this.array[j - gap] > temp && j > gap - 1) {
                this.array[j] = this.array[j - gap];
                j -= gap;
            }
            this.array[j] = temp;
        }

        // 增量继续减半
        gap = Math.floor(gap / 2);
    }
};

/*
快速排序:

找到一个基准值，即枢纽
常见策略有选中间、随机选、三选一

然后将数组分为比基准值小的元素
比基准值大的元素

排列成以下形式
比基准值小的元素  基准值  比基准值大的元素

接着分别对基准值两边的数组继续上述步骤，直至基准直左侧（右侧）只有一个数据，则排序完成
快排有多种写法，举几个例子
*/

/*
五行代码的快速排序，非原地排序，需要开辟额外的空间
function quickSort(array) {
    if (array.length == 0) return []; //结束条件，返回空数组，保证扩展符不会报错
    let pivot = array[array.length - 1];  //选取枢纽
    let left = array.filter((v, i) => v <= pivot && i != array.length - 1); //筛选出小于枢纽的数组
    let right = array.filter((v) => v > pivot); //筛选出大于枢纽的数组
    return [...quickSort(left), pivot, ...quickSort(right)]; //递归
}
*/


function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// https://juejin.cn/post/6844903938915827725
// 这个快排是原地排序，不需要额外空间
function quickSort(arr, start = 0, end = arr.length - 1) {
    if (end - start < 1) return; //如果只有一个元素，结束递归
    let pivotIndex = partition(arr, start, end);
    // 分而治之
    quickSort(arr, start, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, end);
    return arr;
}

function partition(arr, start, end) {
    let pivot = arr[end]; //选择枢纽，取最后一个元素
    let j = start; //交换的元素位置
    for (let i = start; i <= end; i++) {
        //从开始位置进行遍历
        if (arr[i] <= pivot) {
            //比枢纽小的元素，与j进行交换，j加一
            swap(arr, i, j++);
        }
    }
    // 枢纽的位置
    return j - 1;
}

console.log(quickSort([100, 90, 10, 30, 70, 20, 50, 40, 60, 80]));
// 选择枢纽
// ArrayList.prototype.median = function (left, right) {
//     let center = Math.floor((left + right) / 2);
//     // 选择数组头中尾，进行排序
//     if (this.array[left] > this.array[center]) {
//         this.swap(left, center);
//     }
//     if (this.array[center] > this.array[right]) {
//         this.swap(center, right);
//     }
//     if (this.array[left] > this.array[center]) {
//         this.swap(left, center);
//     }

//     // 将中位数与最右边的位置减一进行交换
//     this.swap(center, right - 1);

//     // 该中位数就是我们选择的枢纽
//     return this.array[right - 1];
// };

// ArrayList.prototype.quickSort = function () {
//     this.quick(0, this.array.length - 1);
// };

// ArrayList.prototype.quick = function (left, right) {
//     // 如果left大于大于right，说明排序已完成，结束递归
//     if (left >= right) return;
//     // 找到枢纽
//     let pivot = this.median(left, right);

//     let i = left; //左边的指针
//     let j = right - 1; //右边的指针
//     console.log(i);
//     while (true) {
//         while (this.array[++i] < pivot) {
//             console.log(i);
//         } //从左开始找到比枢纽大的位置
//         while (this.array[--j] > pivot) {} //从右开始找到比枢纽小的位置
//         if (i < j) {
//             //如果左指针小于右指针，则将元素进行交换
//             this.swap(i, j);
//         } else {
//             // 一旦左指针大于等于右指针，则跳出循环，将枢纽的位置与i进行互换
//             break;
//         }
//     }
//     // 枢纽的与i位置的元素进行交换，此时枢纽左边的值都小于它，右边的值都大于它
//     this.swap(i, right - 1);

//     // 分而治之，继续进行递归
//     this.quick(left, i - 1);
//     this.quick(i + 1, right);
// };

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
// arr.insertSort();
// arr.shellSort();
// arr.quickSort();
console.log(arr.toString());
