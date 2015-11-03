var test = require('tape')
var Handle = require('..')

test('deep', function(t) {
  var cache = {}
  var h = Handle(cache)

  h.add('a', 'c')
  h.add('b', ['c', 'd'])

  reset(cache)
  h.invalidate('a')
  t.same(cache, { b: 2, c: 3, d: 4 })

  reset(cache)
  h.invalidate('c')
  t.same(cache, { d: 4 })

  reset(cache)
  h.invalidate('d')
  t.same(cache, { a: 1, c: 3 })

  reset(cache)
  h.invalidate(['d', 'c'])
  t.same(cache, {})

  t.end()
})

test('shallow', function(t) {
  var cache = {}
  var h = Handle(cache)

  h.add('a', 'c')
  h.add('b', ['c', 'd'])

  reset(cache)
  h.invalidate('a', false)
  t.same(cache, { b: 2, c: 3, d: 4 })

  reset(cache)
  h.invalidate('c', false)
  t.same(cache, { a: 1, b: 2, d: 4 })

  t.end()
})

function reset(cache) {
  cache.a = 1
  cache.b = 2
  cache.c = 3
  cache.d = 4
}
