# raf-plus

raf-plus is the same as `window.requestAnimationFrame` but better, which will only invokes the passed function at most once per animation frame.

## Reason

> The `window.requestAnimationFrame` method tells the browser that you wish to perform an animation and requests that the browser call a specified function to update an animation before the next repaint.  
> -- [MDN](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)

However, it does not manage the queue. For example:

```
const heavyAnimation = () => {
    // A animation function with heavy operations
}

document.addEventListener('scroll', e => requestAnimation(heavyAnimation), false)
```

The scroll event may fire more than once within one frame, so the heavyAnimation function may be called more than once before next repaint, but repetitively call heavyAnimation at one animation frame is unnecessary and waste of resources!!!

The raf-plus help you manage requestAnimation's queue by ignoring the duplicate callback function in same animation frame. For comparison:

```
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

```
$ npm install --save raf-plus
```
or
```
$ yarn add raf-plus
```

## Usage

The raf-plus only exports two methods

### `requestAnimationFrame(callback)`

The same as [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame). Be aware that raf-plus uses === operator to compare two callbacks, so passing anonymous function won't invoke the management!

```
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

### `cancelAnimationFrame(callback)`

The same as [cancelAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelAnimationFrame).

```
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
