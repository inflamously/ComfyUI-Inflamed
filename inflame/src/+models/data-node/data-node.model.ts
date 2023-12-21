type DataNodeInputInfo<InputModel> = {
    required: {
        [key in keyof InputModel]: InputModel[key]
    }
}

type DataNodeOutputInfo = {
    label: string
    type: string // TODO: Fix with typescript typing
}

export type AbstractDataNode = Omit<DataNode<unknown>, "input"> & {
    input: {
        required: Record<string, unknown>
    },
}

export type DataNode<InputModel> = {
    name: string,
    label: string,
    description: string,
    category: string // TODO: Further split up?
    dependent: boolean, // If the node requires other nodes to be processed before it can fulfill its own purpose
    input: DataNodeInputInfo<InputModel>
    output: DataNodeOutputInfo[]
}

export type DataNodeLink = {
    input: {
        name: string,
        index: number
    }
}