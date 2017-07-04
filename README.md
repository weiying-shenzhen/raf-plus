# raf-plus

raf-plus is used to manage `window.requestAnimationFrame`, which will only invokes the passed function at most once per animation frame.

## Reason

> The `window.requestAnimationFrame` method tells the browser that you wish to perform an animation and requests that the browser call a specified function to update an animation before the next repaint.  
> -- [MDN](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)

However, it does not manage the queue. For example:

``` javascript
const heavyAnimation = () => {
    // A animation function with heavy operations
}

document.addEventListener('scroll', e => requestAnimation(heavyAnimation), false)
```

The scroll event may fire more than once within one frame, so the heavyAnimation function may be called more than once before next repaint, but repetitively call heavyAnimation at one animation frame is unnecessary and waste of resources!!!

The raf-plus help you manage requestAnimation's queue by ignoring the duplicate callback function in same animation frame. For comparison:

``` javascript
const { raf } from 'raf-plus'
const animation = () => console.log('animation')

// call same animation within one animation frame
// lead to animation twice
window.requestAnimationFrame(animation)
window.requestAnimationFrame(animation)

// call same animation within one animation frame
// but only invoke once
raf(animation)
raf(animation)
```

## Install

``` bash
$ npm install --save raf-plus
```
or
```
$ yarn add raf-plus
```

## Usage

The raf-plus only exports two methods

### requestAnimationFrame(callback)

The same as [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame), but it will not return request id.

``` javascript
const { requestAnimationFrame } from 'raf-plus'

const animation = timeStamp => {
    // animation
}
requestAnimationFrame(animation)
```

### cancelAnimationFrame(callback)

The same as [cancelAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelAnimationFrame), but it uses the function passed to requestAnimationFrame as parameter.

``` javascript
const { requestAnimationFrame, cancelAnimationFrame } from 'raf-plus'

const animation = timeStamp => {
    // animation
}
requestAnimationFrame(animation)
// pass the function to cancel
cancelAnimationFrame(animation)
```

## Contributing
- ⇄ Pull requests and ★ Stars are always welcome.
- For bugs and feature requests, please create an issue.

## Licence

MIT
