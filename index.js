'use strict'

class Cache {
  constructor(cache) {
    this.cache = cache
    this.dependents = {}
  }

  add(file, dep) {
    if (Array.isArray(dep)) {
      return dep.forEach(d => this.add(file, d))
    }

    this.dependents[dep] = this.dependents[dep] || {}
    this.dependents[dep][file] = true
  }

  invalidate(file, deep) {
    if (Array.isArray(file)) {
      return file.forEach(f => this.invalidate(f))
    }

    delete this.cache[file]

    if (deep !== false) {
      Object.keys(this.dependents[file] || {})
        .forEach(f => this.invalidate(f))
    }
  }
}

module.exports = Cache

