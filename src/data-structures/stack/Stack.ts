interface IStack<T> {
  pop: () => T | undefined;
  push: (el: T) => T[];
  peek: () => T;
  isEmpty: () => boolean;
}

class Stack<T> implements IStack<T> {
  private readonly elements: T[] = [];

  pop() {
    return this.elements.pop();
  }

  push(el: T) {
    this.elements.push(el);
    return this.elements;
  }

  peek() {
    return this.elements[this.elements.length - 1];
  }

  isEmpty() {
    return this.elements.length === 0;
  }
}
