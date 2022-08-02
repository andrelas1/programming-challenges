interface IQueue<T> {
  add: (input: T) => T[];
  remove: () => T | undefined;
  peek: () => T;
  isEmpty: () => boolean;
}

export class Queue<T> implements IQueue<T> {
  private elements: T[];

  constructor() {
    this.elements = [];
  }

  add(input: T) {
    this.elements.push(input);
    return this.elements;
  }

  remove() {
    return this.elements.shift();
  }

  peek() {
    return this.elements[0];
  }

  isEmpty() {
    return this.elements.length === 0;
  }
}
