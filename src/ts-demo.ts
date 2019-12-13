let p: Number = 10000

// Array
let arr1: number[] = [1, 2, 3]
let arr2: Array<number | string> = [1, 2, 3, 'aaa']

// 元组
let tuple: [number, string] = [1, 'a']

// 函数
let add = (x: number, y: number) => x + y
// add = (a, b) => a + b
console.log(add(1, 2), '==add==')

// 对象
let obj: {x: number, y: number} = {x: 1, y: 2}
obj.x = 3
console.log(obj, '==obj==')

// 数字枚举
enum Role {
  Developer = 3,
  Reporter,
}
console.log(Role.Reporter, '===rrr===')

enum Message {
  Success = '成功了',
  Fail = '失败了',
}
console.log(Message.Fail, '==Message.Fail==')

enum E { a, b }
enum G { a = 'apple', b = 'banana' }

let e1: E.a = 3
let e2: E.b
let e3: E.a = 3
console.log(e1 === e3, 'e1 e3')

let g1: G = G.b
let g2: G.a = G.a
console.log(g1, '==g1==')
console.log(g2, '==g2==')

export default {p, arr1, arr2}
