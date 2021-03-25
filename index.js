const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, callback) {
      for (let key in collection) {
        callback(collection[key], key, collection);
      }
      return collection;
    },

    map: function(collection, callback) {
      let newCollection = [];
      for (let key in collection) {
        newCollection.push(callback(collection[key], key, collection));
      }
      return newCollection
    },

    reduce: function(collection, callback, a) {
      if (!a){
      a = collection[0]
      collection = collection.slice(1)
      }
      for (let i = 0; i < collection.length; i++){
        a = callback(a, collection[i], collection)
      }
      return a
    },

    filter: function(collection, predicate) {
      collection = (collection instanceof Array) ? collection.slice() : Object.values(collection)
      const newArray = []
      for (let i = 0; i < collection.length; i++){
        if (predicate(collection[i])){
          newArray.push(collection[i])
        }
      }
      return newArray
    },
    
    find: function(collection, predicate) {
      collection = (collection instanceof Array) ? collection.slice() : Object.values(collection)
      for (let i = 0; i < collection.length; i++){
        if (predicate(collection[i])){
          return collection[i]
        }
      }
      return undefined
    },
    
    size: function(collection, predicate) {
      return (collection instanceof Array) ? collection.length : Object.keys(collection).length
    },

    first: function(collection, stop) {
      return (stop) ? collection.slice(0,stop) : collection[0]
    },
    
    last: function(collection, start = false) {
      return (start) ? collection.slice(collection.length-start, collection.length) : collection[collection.length - 1]
    },

    compact: function(collection) {
      const a = new Set([false, null, 0, "", undefined, NaN])
      return collection.filter(element => !a.has(element))
    },
    
    sortBy: function(collection, callback) {
      const newArray =  [...collection]
      return newArray.sort(function(a, b) {
        return callback(a) - callback(b)
      })
    },

    unpack: function(receiver, array) {
      for (let value of array){
        receiver.push(value)
      }
    },
    
    flatten: function(collection, shallow, newArray = []) {
      if (!Array.isArray(collection)){
        return newArray.push(collection)
      }
      if (shallow) {
        for (let value of collection){
          Array.isArray(value) ? this.unpack(newArray, value) : newArray.push(value)
        }
      } else {
        for (let value of collection) {
          this.flatten(value, false, newArray)
        }
      }
      return newArray
    },

    uniqSorted: function(collection) {
      const sorted = [collection[0]]
      for (let i = 1; i < collection.length; i++) {
        if (sorted[i - 1] !== collection[i])
          sorted.push(collection[i])
      }
      return sorted
    },

    uniq: function(collection, sorted=false, callback=false) {
      if (sorted) {
        return fi.uniqSorted(collection)
      } else if (!callback) {
        return Array.from(new Set(collection))
      } else {
        const modVals = new Set()
        const uniqVals = new Set()
        for (let value of collection) {
          const modVals2 = callback(value)
          if (!modVals.has(modVals2)) {
            modVals.add(modVals2)
            uniqVals.add(value)
          }
        }
        return Array.from(uniqVals)
      }
    },

    keys: function(obj) {
      const keys = []
      for (let key in obj){
        keys.push(key)
      }
      return keys
    },

    values: function(obj) {
      const values = []
      for (let key in obj){
        values.push(obj[key])
      }
      return values
    },

    functions: function(obj) {
      const functionNames = []
      for (let key in obj) {
        if (typeof obj[key] === "function"){
          functionNames.push(key)
        }
      }
      return functionNames.sort()
    },
  }
})()

fi.libraryMethod()
