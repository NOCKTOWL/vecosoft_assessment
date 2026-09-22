LRU CACHE

After cloning the repo cd to ```lru-cache``` directory and simply run ```node lru-cache.js``` to run the program.

The data structure I used here is the ```Hashmap``` cause I had to keep track of key, value pair. So the ```put``` function adds a key to the end of the hashmap if it doesn't exceed the capacity of the map. ```get``` removes and then adds again bringing the key value pair at the end. If capacity exceeds my least recently used entry gets removed which is basically the first key in the map at that particular moment because of the get logic from before. And the time complexity for these ```get``` and ```put``` operations are ```O(1)``` becuase they are not iterating through the whole map rather updating the keys only. And the space complexity is ```O(n)``` where ```n``` is basically the capacity of the hashmap.

