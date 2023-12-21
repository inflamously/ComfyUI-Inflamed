import {ObjectNodesDTO, PromptDTO, PromptResultDTO} from "@inflame/models";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"; // https://redux-toolkit.js.org/rtk-query/usage-with-typescript#createapi -> The React-specific entry point for RTK Query...

const comfyApiRtk = createApi({
    reducerPath: 'comfyApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8188/",
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

export const comfyApi = {
    reducer: comfyApiRtk.reducer,
    name: comfyApiRtk.reducerPath,
    middleware: comfyApiRtk.middleware,
    GetObjectInfoQuery: comfyApiRtk.endpoints?.getObjectInfo.initiate,
    useGetObjectInfoQuery: comfyApiRtk.useGetObjectInfoQuery,
    usePostPrompt: comfyApiRtk.usePostPromptMutation,
}