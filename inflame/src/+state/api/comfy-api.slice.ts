import {ObjectNodesDTO, PromptDTO, PromptResultDTO} from "@inflame/models";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const comfyApiSliceURL = 'http://localhost:8188/'

const comfyApiRtk = createApi({
    reducerPath: 'comfyApi',
    baseQuery: fetchBaseQuery({
        baseUrl: comfyApiSliceURL,
    }),
    endpoints: (builder) => {
        return {
            getObjectInfo: builder.query<ObjectNodesDTO, void>({
                query: () => 'object_info',
            }),
            postPrompt: builder.mutation<PromptResultDTO, PromptDTO>({
                query: (payload) => ({
                    url: 'prompt',
                    method: 'POST',
                    body: payload,
                }),
                transformErrorResponse: (response): unknown => {
                    // PromptNodeErrorsDTO
                    console.log(response)
                    return response
                }
            }),
        }
    }
})

// TODO: One day proper rename / refactor?
export const comfyApi = {
    slice: comfyApiRtk,
    name: comfyApiRtk.reducerPath,
    middleware: comfyApiRtk.middleware,
    url: comfyApiSliceURL,
    GetObjectInfoQuery: comfyApiRtk.endpoints?.getObjectInfo.initiate,
    useGetObjectInfoQuery: comfyApiRtk.useGetObjectInfoQuery,
    usePostPrompt: comfyApiRtk.usePostPromptMutation,
}