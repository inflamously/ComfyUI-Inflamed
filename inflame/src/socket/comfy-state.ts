export type ComfyuiSocketStateViewModel = {
    clientId: string
}

export type ComfyuiEventPropertyPromptId = {
    prompt_id: string
};

export type ComfyuiEventPropertyNode = {
    node: string
}

export type ComfyuiEventExecuted = {
    output: Record<string, unknown>
} & ComfyuiEventPropertyPromptId;

export type ComfyuiEventStatus = {
    sid: string,
    status: {
        exec_info: number
    }
}

export enum WS_COMFYUI_STATE {
    STATUS = "status", // Information about prompting and queue of prompts [prompt1, prompt2...]
    EXECUTED = "executed" // Result of prompt at @xy node
}