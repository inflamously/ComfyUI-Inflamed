export const ErrorStateActionReset = "_state.reset"

export const errorReducer = (
    errorMessages: Array<ErrorMessage>
) => (
    state: ErrorState,
    action: ErrorAction
): ErrorState => {
    const {type, payload} = action
    if (type === ErrorStateActionReset) {
        return {
            invalid: false,
            message: null,
            additionalMessage: null
        }
    } else if (type) {
        const errorMessage = errorMessages
            .find((e) => e.type === type);
        if (!errorMessage) {
            return state;
        }
        return {
            ...state,
            invalid: true,
            message: errorMessage.message,
            additionalMessage: payload?.additionalMessage ?? null,
        }
    }
    return state;
}