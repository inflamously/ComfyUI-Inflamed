import {PromptDTO, PromptNodeResultDTO} from "./dto/prompt-node.dto.ts";
import {PromptNodeErrorsDTO} from "./dto/error.dto.ts";
import {ObjectNodesDTO} from "./dto/object-node.dto.ts";

// TODO: Use redux toolkit to map api

type ApiConfig = {
    url: string,
    port: number,
}

type EndpointData<Request, Dto, Transformer> = {
    payload: Request,
    transformer?: (data: Dto) => Transformer,
}

type EndpointDataNoPayload<Request, Dto, Transformer> = Omit<EndpointData<Request, Dto, Transformer>, "payload">

/**
 * Generic api result data
 */
type ApiResult<Result, Error> = {
    value: Result | null,
    error: Error | null,
}

const transformResponse = async <
    Dto,
    SuccessResult,
    ErrorResult
>(
    data: { transformer?: (data: Dto) => unknown },
    res: Response
): Promise<ApiResult<SuccessResult, ErrorResult>> => {
    const json = await res.json()
    const result = data.transformer !== undefined ? data.transformer(json) : json
    return {
        value: res.ok ? result : null,
        error: !res.ok ? result : null,
    }
}

const Api = (options: ApiConfig) => {
    const {
        url,
        port
    } = options

    const endpoint = (name: string) => `${url}:${port}/${name}`

    const postPrompt = async <Transform = never>(
        data: EndpointData<PromptDTO, unknown, Transform>
    ): Promise<ApiResult<PromptNodeResultDTO, PromptNodeErrorsDTO>> => {
        const res = await fetch(endpoint("prompt"), {
            method: "POST",
            cache: "no-cache",
            body: JSON.stringify(data.payload)
        })
        return transformResponse(data, res)
    }

    const getObjectInfo = async <Transform = never>(
        data: EndpointDataNoPayload<void, ObjectNodesDTO, Transform>,
    ): Promise<ApiResult<[Transform] extends [never] ? ObjectNodesDTO : Transform, unknown>> => {
        const res = await fetch(endpoint("object_info"), {
            method: "GET",
        })
        return transformResponse(data, res);
    }

    return {
        postPrompt,
        getObjectInfo,
    }
}

export default Api({
    url: "http://127.0.0.1",
    port: 8188
})