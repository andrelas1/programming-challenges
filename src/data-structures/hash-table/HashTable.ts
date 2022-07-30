/**
 * Implementation of the Hash Table in TS
 *
 * A hash table can be defined as:
 *
 * A collection of items that are mapped by a hash key. That key should be unique, but it may be
 * not the case sometimes. When two elements are mapped to the same key, a collision is caused and the
 * Hash Table must save these two items under the same key, in a Linked List.
 *
 * A Hash table has the hash function as it's most important component. The hash function is used to map a value to a key,
 * by using the value to be stored in the collection as an input to the hash function, that will generate a hash string.
 *
 * HashTable.add(value) -> hashFn(value) => string -> HashTable
 *
 * Example:
 * | Key | Value |
 * | abc |   1   |
 * | def |   2   |
 * | ghi |   3   |
 * | jkl |   4   |
 *
 * Big O (Average)
 * Insert: O(1)
 * Search: O(1)
 * Delete: O(1)
 *
 * Big O (Worst)
 * Insert: O(n)
 * Search: O(n)
 * Delete: O(n)
 *
 * Space complexity (Worst): O(n)
 */

interface IHashTable<T> {
  set: (value: T) => T;
  get: (value: T) => T | T[] | undefined;
  remove: (value: T) => boolean;
  getSize: () => number;
  generateHash: (value: T) => string;
}

export class HashTable<T> implements IHashTable<T> {
  private readonly store = new Map<string, T | T[]>();
  private _size = 0;

  get size() {
    return this._size;
  }

  set size(val: number) {
    this._size = val;
  }

  incrementSize() {
    this._size += 1;
  }

  private transformStrIntoCharCodes = (str: string): string => {
    const charCodeStr = `${str}`
      .split("")
      .map((char, i) => char.charCodeAt(i))
      .join("");

    return charCodeStr;
  };

  generateHash = (val: T) => {
    const transformedValIntoCharCodes = this.transformStrIntoCharCodes(
      `${val}`
    );
    const transformedTypeOfIntoCharCodes = this.transformStrIntoCharCodes(
      typeof val
    );

    return `${transformedValIntoCharCodes}${transformedTypeOfIntoCharCodes}${
      `${val}`.length
    }`;
  };

  private checkIfCollision = (hash: string) => {
    return this.store.has(hash);
  };

  set = (val: T) => {
    const key = this.generateHash(val);
    if (this.checkIfCollision(key)) {
      const currentVal = this.store.get(key)!;
      if (val !== currentVal) {
        this.store.set(
          key,
          Array.isArray(currentVal) ? [...currentVal, val] : [currentVal, val]
        );
      }
    } else {
      this.store.set(key, val);
    }
    this.incrementSize();

    return val;
  };

  get = (val: T) => {
    const key = this.generateHash(val);
    const result = this.store.get(key);

    if (Array.isArray(result)) {
      return result.find((item) => item === val);
    } else {
      return this.store.get(key);
    }
  };

  remove = (val: T) => {
    let result: boolean;
    const key = this.generateHash(val);
    if (this.checkIfCollision(key)) {
      const currentVal = this.store.get(key)!;
      if (Array.isArray(currentVal)) {
        const newVal = currentVal.filter((item) => item !== val);
        newVal.length === 0
          ? this.store.delete(key)
          : this.store.set(key, newVal);

        result = true;
      } else {
        this.size -= 1;
        result = this.store.delete(key);
      }
      return result;
    } else {
      return this.store.delete(key);
    }
  };

  getSize = () => this._size;
}
