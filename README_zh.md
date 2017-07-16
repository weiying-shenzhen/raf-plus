# raf-plus

[![Build Status](https://travis-ci.org/weiying-shenzhen/raf-plus.svg?branch=master)](https://travis-ci.org/weiying-shenzhen/raf-plus)

raf-plus 是有管理队列功能的 `window.requestAnimationFrame`，他保证在同一帧内最多只会执行一次相同的函数。

## 原因

> Also note that multiple calls to requestAnimationFrame with the same callback (before callbacks are invoked and the list is cleared) will result in multiple entries being in the list with that same callback, and thus will result in that callback being invoked more than once for the animation frame.  
> — [w3c](https://www.w3.org/TR/animation-timing/#dom-windowanimationtiming-requestanimationframe)

即在回调被执行前，多次调用带有同一回调函数的 requestAnimationFrame，会导致回调在同一帧中执行多次。例如：

```js
const animation = () => {
    // A animation function
}

document.addEventListener('scroll', e => requestAnimationFrame(animation), false)
```

scroll 事件可能在一帧内触发多次，这导致 `animation` 函数会在下一次重绘前被执行多次。但是，在同一帧内重复的调用 `animation` 是多余的，而且浪费计算资源！！！

raf-plus 将会帮助你管理 `window.requestAnimationFrame` 的队列。他会忽视同一帧的重复函数。例如：

```js
import { requestAnimationFrame } from 'raf-plus'
const animationTwice = () => console.log('I will be invoked twice!')
const animationOnce = () => console.log('Although call twice, I will be invoked once')

// 在同一帧内调用两次，导致 animationTwice 执行两次
window.requestAnimationFrame(animationTwice)
window.requestAnimationFrame(animationTwice)

// 在同一帧内调用两次，但 animationOnce 只会执行一次
requestAnimationFrame(animationOnce)
requestAnimationFrame(animationOnce)
```

## 下载

```bash
$ npm install --save raf-plus
```
or
```bash
$ yarn add raf-plus
```

## 使用

raf-plus 提供两个方法：`requestAnimationFrame` 和 `cancelAnimationFrame`。他们与原生的 `window.requestAnimationFrame` 和 `window.cancelAnimationFrame` 方法保持同样的API。所以从原生的方法切换成 raf-plus 的不会有任何需要改动的地方。

### `requestAnimationFrame(callback)`

使用方法与 [requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame#Specification) 一致。但是要注意 raf-plus 是通过全等操作符 === 比较传入的函数，所以传入匿名函数会不起作用！

```js
const { requestAnimationFrame } from 'raf-plus'

const animation = timeStamp => {
    // animation
}

// animation 函数只会被调用一次
requestAnimationFrame(animation)
requestAnimationFrame(animation)

// 因为两个匿名函数不相等，回调所以会被调用两次
requestAnimationFrame(timeStamp => { /* animation */})
requestAnimationFrame(timeStamp => { /* animation */})
```

### `cancelAnimationFrame(requestID)`

使用方法与[cancelAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/cancelAnimationFrame)一致。

```js
const { requestAnimationFrame, cancelAnimationFrame } from 'raf-plus'

const animation = timeStamp => {
    // animation
}
const requestId = requestAnimationFrame(animation)
cancelAnimationFrame(requestId)
```

## Contributing
- 欢迎☆ Star。你的支持是我持续开源的动力！
- 有任何问题或者功能改进，欢迎提 issue

## Licence

MIT
