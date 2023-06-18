declare global {
    interface Map<K, V> {
        getOrFail(this: Map<K, V>, key: K, failMessage?: string): V;
        arrayValues(this: Map<K, V>): V[];
        arrayKeys(this: Map<K, V>): K[];
        arrayEntries(this: Map<K, V>): [K, V][];
    }
}

// type-coverage:ignore-next-line
Map.prototype.getOrFail = function <K, V>(
    this: Map<K, V>,
    key: K,
    failMessage = `Not found item by key (${key})`,
) {
    if (!this.has(key)) {
        throw new Error(failMessage);
    }

    return this.get(key)!;
};

// type-coverage:ignore-next-line
Map.prototype.arrayValues = function <K, V>(this: Map<K, V>) {
    return [...this.values()];
};

// type-coverage:ignore-next-line
Map.prototype.arrayKeys = function <K, V>(this: Map<K, V>) {
    return [...this.keys()];
};

// type-coverage:ignore-next-line
Map.prototype.arrayEntries = function <K, V>(this: Map<K, V>) {
    return [...this.entries()];
};

export {};
