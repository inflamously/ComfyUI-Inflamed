import structuredClone from "@ungap/structured-clone";
import {Mutable} from "@inflame/models";

export const sortObjectByItsProperties = <Any>(obj: Record<string, Any>) => {
    const entries = Object.entries(obj);
    entries.sort((a, b) => a[0].localeCompare(b[0]))
    return Object.fromEntries(entries);
}

export const sameKeys = <T extends Record<string, unknown>>(a: T, b: T): boolean => {
    if (typeof a !== "object" || typeof b !== "object") {
        return false;
    }

    const keysA = Object.keys(a)
    const keysB = Object.keys(b)

    if (!keysA || !keysB || keysA.length !== keysB.length) {
        return false;
    }

    for (let i = 0; i < keysA.length; i++) {
        const keyA = keysA[i]
        const keyB = keysB[i]
        const isChildObjectA = typeof a[keyA] === "object"
        const isChildObjectB = typeof b[keyB] === "object"

        if (isChildObjectA && isChildObjectB) {
            return sameKeys(a[keyA] as Record<string, unknown>, b[keyB] as Record<string, unknown>)
        } else if (isChildObjectA && !isChildObjectB || !isChildObjectA && isChildObjectB) {
            return false
        } else if (keysA[i] !== keysB[i]) {
            return false;
        }
    }

    return true;
}

export const updateObject = <T extends Record<string, unknown>>(object: T, update: (newObject: Mutable<T>) => void) => {
    const newObject = structuredClone(object)
    update(newObject)
    return newObject
}