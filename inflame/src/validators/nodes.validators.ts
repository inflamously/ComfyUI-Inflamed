/**
 * Allow any Object with the indexed name structure containing name or Array with name structure
 */
type NoEqualNamesValidatorNameProperty = {
    name: string
}

type NoEqualNamesValidatorInput = {
    [name: string]: NoEqualNamesValidatorNameProperty
} | Array<NoEqualNamesValidatorNameProperty>

export const noEqualNamesValidator = (input: NoEqualNamesValidatorInput) => {
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

// TODO: Test
// export const noUnusedInputsValidator = (input: {
//     classtype: string,
//     getInputs: () => Record<string, unknown> | undefined
// }) => {
//     const validator = () => {
//         const inputs = input.getInputs();
//         // We skip undefined since it is allowed.
//         if (!inputs) {
//             return true;
//         }
//         const keys = Object.keys(inputs);
//         // Case keys exists we need to have inputs set.
//         return keys && keys.length > 0 ? keys.every((key) => inputs[key] !== undefined) : true;
//     }
//
//     if (!validator()) {
//         throw new Error(`Unused inputs detected at node type "${input.classtype}" !`);
//     }
// }