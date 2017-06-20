# TrapKeyboard.js

A library to help trap the focus of keyboard inside an element.

> **Warn:** Don't trap the users keyboard unless the usecase is so, it might be a usability issue rather
> than providing accessibility
>
> Refer to [https://youtu.be/JS68faEUduk?t=10m56s](https://youtu.be/JS68faEUduk?t=10m56s)
>
> You'r usecase might be suited by [inert](https://github.com/WICG/inert) [https://youtu.be/fGLp_gfMMGU](https://youtu.be/fGLp_gfMMGU)

## Usage:

Using the `TrapKeyboard` class:

``` js
const trap = new TrapKeyboard(root, options);

// Call the 'trap' method
trap.trap();
```

### Arguments
`root`: Element to trap keyboard inside of.

`options`: [MutationObserverInit](https://developer.mozilla.org/en/docs/Web/API/MutationObserver#MutationObserverInit) object for responding to changes on root and child elements.

To untrap the keyboard, just call the `unTrap` method on the instance:
``` js
trap.unTrap();
```

## License:

[MIT](/LICENSE)

## Inspired from
[https://www.youtube.com/watch?v=BoAsayPVogE](https://www.youtube.com/watch?v=BoAsayPVogE)
