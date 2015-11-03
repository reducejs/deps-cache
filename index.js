module.exports = Cache

function Cache(cache) {
  if (!(this instanceof Cache)) {
    return new Cache(cache)
  }
  this.cache = cache
  this.dependents = {}
}

Cache.prototype.add = function(file, dep) {
  if (Array.isArray(dep)) {
    return dep.forEach(this.add.bind(this, file))
  }

  this.dependents[dep] = this.dependents[dep] || {}
  this.dependents[dep][file] = true
}

Cache.prototype.invalidate = function(file, deep) {
  if (Array.isArray(file)) {
    return file.forEach(this.invalidate, this)
  }

  delete this.cache[file]

  if (deep !== false) {
    Object.keys(this.dependents[file] || {})
      .forEach(this.invalidate, this)
  }
}
