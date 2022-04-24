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

## 函数

Python 函数是对象。可以把函数 赋值给变量，然后通过变量名调用。

### 可调用对象

1. 用户定义的函数
2. 内置函数，如 `len` 或 `time.strftime`
3. 内置方法，如 `dict.get`
4. 方法，即类的定义体中定义的函数
5. 类
6. 类的实例，实现了 `__call__` 方法
7. 生成器函数，使用 yield 关键字的函数或方法。调用生成器函数返回的是生成器对象。

::: tip 
调用类时会运行类的 `__new__` 方法创建一个实例，然后运行 `__init__` 方法，初始化实例，最后把实例返回给调用方。
:::

### 函数参数

**位置参数** 也叫必传参数，顺序参数，必须在调用函数时明确提供的参数。若实参指定了位置参数的参数名，那么可不按顺序调用，甚至可以在默认参数后面。

在函数定义时提供了默认值，则称之为 **默认参数**。函数定义时，默认参数必须在位置参数后面，否则会报错。

::: warning
函数调用时，默认参数总是指向同一个变量，即默认参数的值可能被改变。

```python
def func(a=[]):
    a.append(1)
    return a
```
:::

#### 动态参数

Python 的动态参数有两种，分别是 `*args` 和 `**kwargs`.

函数定义时，一个星号表示接收任意个参数，调用时会将实参打包成元组。传递数组时参给 `*args`时，实参前也要加上 `*`，否则会报错。

函数定义时，两个星表示接受键值对的动态参数。调用时会将实参打包成字典。传递字典时参给 `**kwargs`时，实参前也要加上 `**`，否则会报错。

### 函数注解

### 装饰器

装饰器能把被装饰的函数替换成其他函数，装饰器在加载模块时立即执行。

## 迭代器

在 Python 语言内部，迭代器用于支持:
* for 循环
* 构建和扩展集合类型
* 逐行遍历文本文件
* 列表推导、字典推导和集合推导
* 元组拆包
* 调用函数时，使用 * 拆包实参

解释器需要迭代对象 x 时，会自动调用 `iter(x)`。

内置的 `iter` 函数作用:

1. 检查对象是否实现了 `__iter__` 方法，如果实现了就调用它，获取一个迭代器。
2. 如果没有实现 `__iter__` 方法，但是实现了 `__getitem__` 方法， Python 会创建一个迭代器，该迭代器尝试按顺序(从索引 0 开始)获取元素，直至 `IndexError`。
3. 如果尝试失败，Python 抛出 `TypeError` 异常。

可迭代的对象：

1. 对象实现了能返回迭代器的 `__iter__`.
2. 对象实现了 `__getitem__` 方法，而且其参数是从零开始的索引。
3. 序列都是可迭代的，如 `list`、`tuple`、`str` 等。

可迭代的对象和迭代器之间的关系：Python 从可迭代的对象中获取迭代器。

标准的迭代器接口有两个方法。
* `__next__` 返回下一个可用的元素，如果没有元素了，抛出 `StopIteration` 异常。
* `__iter__` 返回 self，以便在应该使用可迭代对象的地方使用迭代器，例如在 for 循环中。

一般来说，不要把可迭代对象当作迭代器，而是使用 `iter` 函数获取迭代器，因为可迭代对象可以被多次迭代，而迭代器只能被迭代一次。

::: details 样例代码

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

## 生成器

只要 Python 函数的定义体中有 `yield` 关键字，该函数就是生成器函数。调用生成器函数时，会返回一个生成器对象。

把生成器对象传给 `next` 函数时，生成器函数会向前，执行至下一个 yield 语句，返回产出的值，并在函数定义体的当前位置暂停。最终，函数的定义体返回时，外层的生成器对象会抛出 `StopIteration` 异常。

生成器对象实现了迭代器接口，可以 for 循环遍历。

::: details 样例代码

```python
def gen_AB():
    print('start')
    yield 'A'
    print('next')
    yield 'B'
    print('end')

for c in gen_AB():
    print(c)
```
:::

## 对象

### is 和 id

`==运算符` 比较两个对象的值(对象中保存的数据)，而 `is` 比较对象的标识。

在变量和单例值之间比较时，应该使用 `is`。例如，检查变量绑定的值是不是 `None`. 重写 `__eq__` 方法，可以改变 `==` 运算符的逻辑。

Python 提供了两种方式获取对象的字符串表示形式的方法。

* `__str__` 方法，用户理解的字符串表示形式。
* `__repr__` 方法，程序员理解的字符串表示形式。

### classmethod 与 staticmethod

二者都可以通过类名调用，区别在于：

`classmethod` 修饰符对应的函数不需要实例化，不需要 self 参数，但第一个参数需要是表示自身类的 cls 参数，可以来调用类的属性，类的方法，可以用来实例化对象。

`staticmethod` 修饰符对应的函数和类有关的功能，但又无需类或实例参与，出于代码组织的考虑。