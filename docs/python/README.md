# Python 笔记
## 序列类型

Python 内置序列类型有很多，按照存放数据的方式，分为两类：

* 容器序列: `list`, `tuple` 和 `collections.deque` 等能存放不同类型的数据

* 扁平序列: `str`, `bytes`, `bytearray`, `memoryview` 和 `array.array` 等只能容纳一种序列。

### list 类型

#### 列表推导式

```python
newlist = [expression for item in iterable if condition == True]
```

语法精简，效率比循环高，没有变量污染.

::: tip
Python 没有块作用域
:::

#### 切片

切片左闭右开，支持负数索引，如 `list[-1]` 表示最后一个元素。


#### 常用方法

`list.sort` 方法会就地排序列表，返回 None。`sorted` 会新建一个列表作为返回值，不会改变原列表。


#### 操作列表般操作对象

列表的语法太甜了，对象也想来分一杯羹，只要实现相应的 **魔术函数** 就可以了。

* 索引访问和切片: `__getitem__` 和 `__setitem__`
* `for` 循环: `__iter__` 或 `__getitem__`
* `len` 计算: `__len__`
* `+ 拼接`: `__add__`
* `* 复制`: `__mul__`

::: details 对象的 for 循环机制

1. 检查该对象是否有 `__iter__` 方法，没有跳到 5
2. `__iter__` 返回迭代器
3. 依次调用迭代器的 `__next__` 方法
4. 直至捕获 `StopIteration` 异常，结束
5. 依次调用 `__getitem__` 方法，获取元素
6. 捕获 `IndexError` 异常，结束

```python
class MyRange:
    def __init__(self, start, stop):
         self.start = start
         self.stop = stop

    def __iter__(self):
         return MyRangeIterator(self)

class MyRangeIterator:  
    def __init__(self, rangeobj): 
        self.current = rangeobj.start
        self.stop = rangeobj.stop
    def __iter__(self):
        return self             
    def __next__(self):         
        retval = self.current   
        if retval >= self.stop:
            raise StopIteration 
        self.current += 1       
        return retval           
```
:::

### tuple 类型

元组其实是对数据的记录(不可变)：字段内容+字段位置

元组拆包是一个好用的语法糖:

```python
a,b = (1,2)
a, b, *rest = range(5)
```

## 文件与编码

Byte object 是 二进制序列，String 是 字符序列。字符串序列需要编码，二进制序列需要解码。

> 字符串是文本的抽象表示，是与任何特定二进制表示无关的抽象实体。

从 Python 3 的str 对象中获取的元素是 Unicode 字符，从 Python 2 的 str 对象中获取的是原始字节序列(默认编码方式是ascii码)。