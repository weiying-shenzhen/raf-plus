# raf-plus

[![Build Status](https://travis-ci.org/weiying-shenzhen/raf-plus.svg?branch=master)](https://travis-ci.org/weiying-shenzhen/raf-plus)

raf-plus is `window.requestAnimationFrame` with queue management, which will only invokes the passed function at most once per animation frame.

可观看[中文文档](https://github.com/weiying-shenzhen/raf-plus/blob/master/README_zh.md)

## Reason

> The `window.requestAnimationFrame` method tells the browser that you wish to perform an animation and requests that the browser call a specified function to update an animation before the next repaint.  
> -- [MDN](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)

However, it does not manage the queue. For example:

```js
const heavyAnimation = () => {
    // A animation function with heavy operations
}

document.addEventListener('scroll', e => requestAnimationFrame(heavyAnimation), false)
```

The scroll event may fire more than once within one frame, so the `heavyAnimation` function may be called more than once before next repaint, but repetitively call `heavyAnimation` at one animation frame is unnecessary and waste of resources!!!

The raf-plus help you manage requestAnimationFrame's queue by ignoring the duplicate callback function in same animation frame. For comparison:

```js
const { requestAnimationFrame } from 'raf-plus'
const animationTwice = () => console.log('I will be invoked twice!')
const animationOnce = () => console.log('Although call twice, I will be invoked once')

// call same animation within one animation frame
// lead to animation twice
window.requestAnimationFrame(animationTwice)
window.requestAnimationFrame(animationTwice)

// call same animation within one animation frame
// but only invoke once
requestAnimationFrame(animationOnce)
requestAnimationFrame(animationOnce)
```

## Install

```bash
$ npm install --save raf-plus
```
or
```bash
$ yarn add raf-plus
```

## Usage

The raf-plus provides two methods `requestAnimationFrame` and `cancelAnimationFrame`. They keep the same API as `window.requestAnimationFrame` and `window.cancelAnimationFrame`. Therefore, It is costless to switch from native's to raf-plus's.

### `requestAnimationFrame(callback)`

The same as [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame). Be aware that raf-plus uses === operator to compare two callbacks, so passing anonymous function won't invoke the management!

```js
const { requestAnimationFrame } from 'raf-plus'

const animation = timeStamp => {
    // animation
}

// animation will be invoked once within one frame
requestAnimationFrame(animation)
requestAnimationFrame(animation)

// animation will be invoked twice cause the function are not equal
requestAnimationFrame(timeStamp => { /* animation */})
requestAnimationFrame(timeStamp => { /* animation */})
```

### `cancelAnimationFrame(requestID)`

The same as [cancelAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelAnimationFrame).

```js
const { requestAnimationFrame, cancelAnimationFrame } from 'raf-plus'

const animation = timeStamp => {
    // animation
}
const requestId = requestAnimationFrame(animation)
cancelAnimationFrame(requestId)
```

## Contributing

- ⇄ Pull requests and ★ Stars are always welcome.
- For bugs and feature requests, please create an issue.

## Licence

MIT
