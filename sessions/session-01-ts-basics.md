# Session 1: TypeScript 入门 — 告别 any

**日期：** 2026-07-13  
**目标：** 掌握基础类型、interface、函数类型声明  
**状态：** ✅ 已完成

---

## 核心知识点

### 1. 类型声明

```typescript
let name: string = "小明"    // 字符串
let age: number = 18         // 数字
let isActive: boolean = true // 真或假
let tags: string[] = ["a", "b"] // 数组
```

**大白话：** TS 给变量贴标签，说是什么类型就必须是什么类型。JS 没人管，TS 有老师盯着。

### 2. interface（对象模板）

```typescript
interface User {
  name: string
  age: number
  email?: string  // ? = 可选
}
```

**大白话：** 规定对象必须有哪些字段、每个字段什么类型。不符合就报错。

### 3. 函数类型

```typescript
function add(a: number, b: number): number {
  return a + b
}
```

**大白话：** 参数和返回值都声明类型，传错类型立刻报错。

---

## 练习题

### Q1: 为什么 TS 需要类型声明？
> TS 在写代码时就能发现错误，不用等到运行才崩。比如传了字符串当数字用，TS 立刻报警。

### Q2: interface 中 `?` 的作用？
> 可选属性，这个字段可以没有也可以有。

### Q3: 写出 `interface Book` 的定义
```typescript
interface Book {
  name: string
  author: string
  pages: number
}
```

### Q4: 定义一个 `interface Product`（名称/价格/库存）
```typescript
interface Product {
  name: string
  price: number
  stock: number
}
```

### Q5: 写一个函数 `calcTotal(product: Product, count: number): number`
```typescript
// 基础版
function calcTotal(product: Product, count: number): number {
  return product.price * count
}

// 带折扣版
interface Product {
  name: string
  price: number
  stock: number
  discount?: number
}

function calcTotal(product: Product, count: number): number {
  let total = product.price * count
  if (product.discount) {
    total -= product.discount
  }
  return total
}
```

---

## 复盘问题

- [x] interface 和 type 什么时候用哪个？→ 目前先用 interface，后面学 type
- [x] 可选属性的 `?` 加和不加有什么区别？→ 加了可以有也可以没有，不加必须有

---

## 学习笔记

> TS 的核心价值是类型检查——在写代码时就能发现错误，而不是等到运行时才崩掉。
> 接口 interface 是对象模板，可选属性 ? 表示字段可有可无。
> 函数类型标注让参数和返回值都有保护。

## 费曼复述

> 今天学习了TS的基本语法，重要的概念是类型和可选属性，我学会定义接口、变量和函数的类型声明。
