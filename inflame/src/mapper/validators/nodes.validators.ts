export const noEqualNamesValidator = (input: {
    [name: string]: { name: string }
} | Array<{ name: string }>): boolean => {
    const names: string[] = []

    for (const [key, value] of Object.entries(input)) {
        if (names.includes(key) || names.includes(value.name)) {
            return false;
        }

        names.push(key)
        names.push(value.name)
    }

    return true;
}

export const unsetInputsValidator = (input: {
    inputs: Record<string, unknown> | undefined
}): boolean => {
    const validator = () => {
        const inputs = input.inputs;
        // We skip undefined since it is allowed.
        if (inputs === undefined) {
            return true;
        }
        const keys = Object.keys(inputs);
        // Case keys exists we need to have inputs set.
        return keys && keys.length > 0 ? keys.every((key) => inputs[key] !== null) : true;
    }

    return validator()
}