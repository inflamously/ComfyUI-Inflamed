import {PromptNodeErrorsDTO, PromptNodeResultDTO, PromptWorkflowDTO} from "./dto/node.ts";

type ApiConfig = {
    url: string,
    port: number,
}

type EndpointData<T> = {
    payload: T,
    transformer?: (data: T) => unknown,
    cache?: RequestCache,
}

type ApiResult<T, E> = {
    value: T | null,
    error: E | null,
}

const Api = (options: ApiConfig) => {
    const {
        url,
        port
    } = options

    const endpoint = (name: string) => `${url}:${port}/${name}`

    return {
        postPrompt: async (data: EndpointData<PromptWorkflowDTO>): Promise<ApiResult<PromptNodeResultDTO, PromptNodeErrorsDTO>> => {
            const res = await fetch(endpoint("prompt"), {
                method: "POST",
                cache: data.cache ? data.cache : "no-cache",
                body: JSON.stringify(data.payload)
            })
            const resData = await res.json()
            const newData = data.transformer ? data.transformer(resData) : resData

            return {
                value: res.ok ? newData : null,
                error: !res.ok ? newData : null,
            }
        }
    }
}

export default Api({
    url: "http://127.0.0.1",
    port: 8188
})