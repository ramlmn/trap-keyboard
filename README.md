# TrapKeyboard.js

A library to help trap the focus of keyboard inside an element.

> **Note:** This library is written in ES2015 and so requires
> [direct browser support](https://kangax.github.io/compat-table/es6/). You can
> transpile it with [BabelJS](https://babeljs.io/docs/usage/cli/):
```
babel --presets=es2015 keyboard-trap.js --out-file keyboard-trap-es5.js
```

## Usage:

Using the `TrapKeyboard` class:

``` js
let trap = new TrapKeyboard(element);

// Call the 'trap' method
trap.trap();
```

The `TrapKeyboard` class takes a DOM node(`element`) as its parameter.

> Note: Creating an object for `TrapKeyboard` class would by default call the
> `trap` method. Pass the second argument as `false` for it to not.

To untrap the keyboard, just call the `unTrap` method on the reference object:
``` js
trap.unTrap();
```

### License:

Author: [ramlmn](https://github.com/ramlmn)

License: [Apache 2.0](/LICENSE)

Inspired from [https://www.youtube.com/watch?v=BoAsayPVogE](https://www.youtube.com/watch?v=BoAsayPVogE)
