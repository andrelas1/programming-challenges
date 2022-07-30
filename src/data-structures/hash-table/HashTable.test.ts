import { HashTable } from "./HashTable";
describe("HashTable", () => {
  it("should be defined", () => {
    expect(HashTable).toBeDefined();
  });

  it("should have set, get, remove and getSize methods", () => {
    const hashTable = new HashTable();

    expect(hashTable.set).toBeDefined();
    expect(hashTable.get).toBeDefined();
    expect(hashTable.remove).toBeDefined();
    expect(hashTable.getSize).toBeDefined();
  });

  it("should set and get the element correctly", () => {
    const hashTable = new HashTable();
    const element = "test";
    hashTable.set(element);
    expect(hashTable.get(element)).toBe(element);
  });

  it("should return the same element when it is already set", () => {
    const hashTable = new HashTable();
    const element = "test";
    hashTable.set(element);
    hashTable.set(element);
    expect(hashTable.get(element)).toBe(element);
  });

  it("should remove the element correctly", () => {
    const hashTable = new HashTable();
    const element = "test";
    hashTable.set(element);
    hashTable.remove(element);
    expect(hashTable.get(element)).toBe(undefined);
  });

  it("should increment the size of the hash table", () => {
    const hashTable = new HashTable();
    const element = "test";
    hashTable.set(element);
    expect(hashTable.getSize()).toBe(1);

    hashTable.set("test2");
    expect(hashTable.getSize()).toBe(2);

    hashTable.remove("test2");
    expect(hashTable.getSize()).toBe(1);
  });

  it("should turn the value into an array if there is a collision", () => {
    const hashTable = new HashTable();
    const store = (hashTable as any).store;

    jest.spyOn(hashTable, "generateHash").mockImplementation(() => "same-key");
    const element = "test";
    const element2 = "test2";
    hashTable.set(element);
    hashTable.set(element2);
    expect(store.get("same-key")).toEqual([element, element2]);
  });

  it("when removing an element from a collision and the rest is an empty array, remove the whole key/value", () => {
    const hashTable = new HashTable();
    jest.spyOn(hashTable, "generateHash").mockImplementation(() => "same-key");

    const element = "test";
    const element2 = "test2";
    hashTable.set(element);
    hashTable.set(element2);

    hashTable.remove(element);
    expect(hashTable.get(element)).toBe(undefined);
    expect(hashTable.get(element2)).toBe(element2);

    hashTable.remove(element2);
    expect(hashTable.get(element)).toBe(undefined);
  });
});
