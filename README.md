# deps-cache
Invalidate caches with dependency graph

## Example

```javascript
var Handle = require('deps-cache')

var cache = {}
var h = Handle(cache)
h.add('a', 'c')   // `a` depends on `c`
h.add('b', ['c', 'd'])  // `b` depends on both `c` and `d`

reset()
h.invalidate('c') // `c` is invalidated
console.log(cache)
// { d: 4 }

reset()
h.invalidate('d') // `d` is invalidated
console.log(cache)
// { a: 1, c: 3 }

function reset() {
  cache.a = 1
  cache.b = 2
  cache.c = 3
  cache.d = 4
}

```

## API

### h.add(key, deps)
Add dependencies.

### h.invalidate(keys)
Invalidate keys.

