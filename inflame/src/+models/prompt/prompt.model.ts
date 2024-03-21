import { NodeTypeDefinition } from './prompt-node-definition.model.ts'
import { PromptNodeConnection } from './prompt-node-connection.model.ts'

export type Prompt = {
    name: string
    remoteId?: string
    workflow: PromptWorkflow
}

export type PromptWorkflow = {
    nodes: GenericNode[]
}

export type GenericNode = Omit<
    NodeTypeDefinition<
        Record<string, unknown>,
        Record<string, PromptNodeConnection>,
        Record<string, PromptNodeConnection>,
        Record<string, never>
    >,
    'stateInputs'
> & {
    id: string
    classtype: string
}
