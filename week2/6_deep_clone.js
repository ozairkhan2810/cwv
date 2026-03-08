function deepClone(obj, map = new WeakMap()) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (map.has(obj)) {
        return map.get(obj);
    }

    const result = Array.isArray(obj) ? [] : {};

    map.set(obj, result);

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key] = deepClone(obj[key], map);
        }
    }
    return result;
}

const original = {
    a: 1,
    b: { c: 2 },
    d: [11, 7],
};
original.self = original; // Circular reference!
const copy = deepClone(original);
console.log(copy !== original); // true
console.log(copy.b !== original.b); // true
console.log(copy.self === copy); // true (circularity preserved)