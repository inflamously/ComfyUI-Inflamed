import { AppState, comfyApi, useAppDispatch } from '@inflame/state'
import { useEffect, useState } from 'react'
import { nodesSliceActions } from '../../+state/data-nodes/data-nodes.slice.ts'
import { mapObjectNodesDtoToDataNodeCollection } from '../../mapper/object-dto-to-datanode.mapper.ts'
import { useSelector } from 'react-redux'
import { dataNodesSelectors } from '../../+state/data-nodes/data-nodes.selectors.ts'
import { mapComfyuiDataNodeAsGenericPromptNode } from '../../prompt-nodes/generic-node/comfyui-generic/comfyui-generic-node.utils.ts'
import { NodeTypeBuilderDefinition, Prompt, ResolvedNodeType } from '@inflame/models'
import {
    castGenericNode,
    typeDataNode,
    untypedDataNode,
} from '../../prompt-nodes/generic-node/generic-node.utils.ts'
import { findPromptNodeById } from '../../prompt-nodes/prompt-workflow.utils.ts'
import { GenericNode } from '@inflame/models'

// TODO: Simplify useTypedGenericPromptNodeFromDataNode
export const useGenericPromptNodeFromDataNode = (props: { id: string; classtype: string }) => {
    const { id, classtype } = props

    const node = useSelector((state: AppState) =>
        dataNodesSelectors.selectDataNode(state, classtype)
    )
    const [typedNode, setTypedNode] = useState<Readonly<GenericNode> | undefined>()

    useEffect(() => {
        if (!node) {
            return
        }

        setTypedNode(
            untypedDataNode({
                id,
                node,
                mapper: mapComfyuiDataNodeAsGenericPromptNode,
            })
        )
    }, [id, node, setTypedNode])

    return typedNode
}

export const useTypedGenericPromptNodeFromDataNode = <T extends NodeTypeBuilderDefinition>(props: {
    id: string
    classtype: string
    definition: T
}): ResolvedNodeType<T> | undefined => {
    const { id, classtype, definition } = props

    const node = useSelector((state: AppState) =>
        dataNodesSelectors.selectDataNode(state, classtype)
    )
    const [typedNode, setTypedNode] = useState<Readonly<ResolvedNodeType<T>> | undefined>()

    useEffect(() => {
        if (!node) {
            return
        }

        setTypedNode(
            typeDataNode({
                id,
                node,
                definition,
                mapper: mapComfyuiDataNodeAsGenericPromptNode,
            })
        )
    }, [definition, id, node, setTypedNode])

    return typedNode
}

export const useDataNodesLoader = () => {
    const dispatch = useAppDispatch()
    const { data, error } = comfyApi.useGetObjectInfoQuery()

    useEffect(() => {
        if (!error) {
            return
        }

        console.error(error)
    }, [error])

    useEffect(() => {
        if (!data) {
            return
        }

        dispatch(
            nodesSliceActions.updateDataNodeCollection(
                mapObjectNodesDtoToDataNodeCollection(data).nodes
            )
        )
    }, [data, dispatch])
}

export const useNodeFromPrompt = <T extends NodeTypeBuilderDefinition>(props: {
    prompt: Prompt | undefined
    nodeId: string
    definition: T
}) => {
    const { prompt, definition, nodeId } = props
    if (!prompt) {
        return undefined
    }
    const node = prompt ? findPromptNodeById(nodeId, prompt.workflow) : undefined
    return node ? castGenericNode(node, definition) : node
}
