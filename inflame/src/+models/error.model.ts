export type ErrorAction = {
    type: string,
    payload?: {
        additionalMessage?: string
    }
};

export type ErrorState = {
    invalid: boolean,
    message: string | null,
    additionalMessage: string | null,
}

export type ErrorMessage = {
    type: string,
    message: string | null
}