#!/usr/bin/env python3
class MyList():
    def __init__(self):
        self.data = []
    def append(self, item):
        self.data.append(item)
    def __getitem__(self, key):
        return self.data[key]
    # def __len__(self):
    #     return len(self.data)

l = MyList()
for i in range(10):
    l.append(i)

for i in l:
    print(i)