// python eo kora jeto and honestly python diyei data structure shikha hoise but nextjs initialize koray ar same repo dekhe ekshathe rakhlam

class Cache {
  constructor(capacity) {
    if (capacity <= 0) {
      throw new Error("Capacity must be positive number");
    }
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) {
      console.log(`get(${key}) -> -1`);
      return -1;
    }

    const value = this.cache.get(key);

    this.cache.delete(key);
    this.cache.set(key, value);

    console.log(`get(${key}) ->`, value);
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }

    this.cache.set(key, value);
    console.log(`put(${key}, ${value})`);
  }
}

const cache = new Cache(2);
console.log(cache);

cache.put("A", 10)

cache.put("B", 20);

cache.get("A");

cache.put("C", 30);

cache.get("B");

cache.get("C");

cache.get("A");

console.log(cache);