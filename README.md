# Tasks

- [Task 1 - Order Tracking Screen](#task-1---order-tracking-screen)
- [Task 2 - LRU Cache](#task-2---lru-cache)

---

# Task 1 - Order Tracking Screen

- Clone the repository

- ```npm i``` to install all dependencies

- ```npm run dev``` to run the local dev environment

- Visit [localhost://300](http://localhost:3000/) to view the assessment task 01.

---

# Task 2 - LRU Cache

## LRU CACHE

After cloning the repo cd to `lru-cache` directory and simply run `node lru-cache.js` to run the program.

The data structure I used here is the `Hashmap` cause I had to keep track of key, value pair. So the `put` function adds a key to the end of the hashmap if it doesn't exceed the capacity of the map. `get` removes and then adds again bringing the key value pair at the end. If capacity exceeds my least recently used entry gets removed which is basically the first key in the map at that particular moment because of the get logic from before. And the time complexity for these `get` and `put` operations are `O(1)` becuase they are not iterating through the whole map rather updating the keys only. And the space complexity is `O(n)` where `n` is basically the capacity of the hashmap.

# Some Acknowledgements

Thank you for giving me this opportunity. I tried my best to fulfill all the mandatory tasks. I attempted the last bonus task of Figma prototyping but due to the time constraint, I was almost sure I can't finish it and more importantly do not want to miss the mandatory submission for this. Please pardon me for that incomplete task.