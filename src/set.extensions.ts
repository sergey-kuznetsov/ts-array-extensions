declare global {
    // eslint-disable-next-line
    interface Set<T> {
        toArray: <T>(this: Set<T>) => Array<T>;
    }
}

// type-coverage:ignore-next-line
Set.prototype.toArray = function <T>(this: Set<T>) {
    return [...this];
};

export {};
