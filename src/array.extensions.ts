type TFn<T, R> = (item: T, index: number, array: T[]) => R;
type TTakeFields<T extends object, V> = {
    [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

declare global {
    interface ArrayConstructor {
        range: typeof range;
    }

    // eslint-disable-next-line
    interface Array<T> {
        groupBy: typeof groupBy;
        indexBy: typeof indexBy;
        uniqBy: typeof uniqBy;
        uniq: typeof uniq;
        nonNullable: typeof nonNullable;
        toSet: typeof toSet;
    }
}

function getKeyFn<T, Key>(keyOrFn: keyof T | TFn<T, Key>) {
    return typeof keyOrFn === 'function'
        ? keyOrFn
        : (i: T): Key => i[keyOrFn] as unknown as Key;
}

// type-coverage:ignore-next-line
Array.prototype.groupBy = groupBy;

function groupBy<T extends object>(
    this: Array<T>,
    key: TTakeFields<T, number>,
): Map<number, T[]>;
function groupBy<T extends object>(
    this: Array<T>,
    key: TTakeFields<T, string>,
): Map<string, T[]>;
function groupBy<T, Key>(this: Array<T>, fn: TFn<T, Key>): Map<Key, T[]>;
function groupBy<T, Key>(
    this: Array<T>,
    keyOrFn: keyof T | TFn<T, Key>,
): Map<Key, T[]> {
    const fn = getKeyFn(keyOrFn);

    const result = new Map<Key, T[]>();

    for (let i = 0; i < this.length; i++) {
        const key = fn(this[i], i, this);

        const group = result.get(key) ?? [];

        group.push(this[i]);

        result.set(key, group);
    }

    return result;
}

// type-coverage:ignore-next-line
Array.prototype.indexBy = indexBy;

function indexBy<T extends object>(
    this: Array<T>,
    key: TTakeFields<T, number>,
): Map<number, T>;
function indexBy<T extends object>(
    this: Array<T>,
    key: TTakeFields<T, string>,
): Map<string, T>;
function indexBy<T, Key>(this: Array<T>, fn: TFn<T, Key>): Map<Key, T>;
function indexBy<T, Key>(
    this: Array<T>,
    keyOrFn: keyof T | TFn<T, Key>,
): Map<Key, T> {
    const fn = getKeyFn(keyOrFn);

    const result = new Map<Key, T>();

    for (let i = 0; i < this.length; i++) {
        const key = fn(this[i], i, this);

        result.set(key, this[i]);
    }

    return result;
}

// type-coverage:ignore-next-line
Array.prototype.uniqBy = uniqBy;

function uniqBy<T extends object>(
    this: Array<T>,
    key: TTakeFields<T, number>,
): Array<T>;
function uniqBy<T extends object>(
    this: Array<T>,
    key: TTakeFields<T, string>,
): Array<T>;
function uniqBy<T, Key>(this: Array<T>, fn: TFn<T, Key>): Array<T>;
function uniqBy<T, Key>(
    this: Array<T>,
    keyOrFn: keyof T | TFn<T, Key>,
): Array<T> {
    return [...this.indexBy(getKeyFn(keyOrFn)).values()];
}

// type-coverage:ignore-next-line
Array.prototype.uniq = uniq;

function uniq<T>(this: Array<T>) {
    return [...new Set(this)];
}

// type-coverage:ignore-next-line
Array.prototype.nonNullable = nonNullable;

function nonNullable<T>(this: Array<T>) {
    return this.filter(
        (i): i is NonNullable<T> => i !== null && i !== undefined,
    );
}

// type-coverage:ignore-next-line
Array.prototype.toSet = toSet;

function toSet<T>(this: Array<T>) {
    return new Set(this);
}

// type-coverage:ignore-next-line
Array.range = range;

function range(from: number, to: number) {
    const result = [];

    if (to<= from) {
        throw new Error('`to` can\'t be less the `from`');
    }

    for (let i = from; i<=to;i++) {
        result.push(i);
    }

    return result;
}

export {};
