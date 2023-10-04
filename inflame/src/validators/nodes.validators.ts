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
    const validator = () => {
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

    return validator();
}