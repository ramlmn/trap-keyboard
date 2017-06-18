# TrapKeyboard.js

A library to help trap the focus of keyboard inside an element.

> **Warn:** Don't trap the users keyboard unless the usecase is so, it might be a usability issue rather
> than providing accessibility
> Refer to [https://youtu.be/JS68faEUduk?t=10m56s](https://youtu.be/JS68faEUduk?t=10m56s)
>
> You'r usecase might be suited by [inert](https://github.com/WICG/inert) [https://youtu.be/fGLp_gfMMGU](https://youtu.be/fGLp_gfMMGU)

## Usage:

Using the `TrapKeyboard` class:

``` js
let trap = new TrapKeyboard(element);

// Call the 'trap' method
trap.trap();
```

The `TrapKeyboard` class takes a DOM node(`element`) as its parameter.

Creating an object for `TrapKeyboard` class would by default call the `trap` method. Pass the
second argument as `false` for it to not.

To untrap the keyboard, just call the `unTrap` method on the reference object:
``` js
trap.unTrap();
```

## License:

[Apache 2.0](/LICENSE)

## Inspired from
[https://www.youtube.com/watch?v=BoAsayPVogE](https://www.youtube.com/watch?v=BoAsayPVogE)
