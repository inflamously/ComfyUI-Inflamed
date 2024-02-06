import {AppState, useAppDispatch} from "@inflame/state";
import {useEffect, useState} from "react";
import {nodesSliceActions} from "../../+state/data-nodes/data-nodes.slice.ts";
import {comfyApi} from "@inflame/state";
import {mapObjectNodesDtoToDataNodeCollection} from "../../mapper/object-dto-to-datanode.mapper.ts";
import {useSelector} from "react-redux";
import {dataNodesSelectors} from "../../+state/data-nodes/data-nodes.selectors.ts";
import {GenericNode} from "../../prompt-nodes/generic-node/generic-node.ts";
import {
    comfyuiDataNodeAsGenericPromptNode
} from "../../prompt-nodes/generic-node/comfyui-generic/comfyui-generic-node.utils.ts";
import {NodeTypeBuilderDefinition, Prompt, ResolvedNodeType} from "@inflame/models";
import {castGenericNode, typeDataNode} from "../../prompt-nodes/generic-node/generic-node.utils.ts";
import {findPromptNodeById} from "../../prompt-nodes/prompt-node.utils.ts";

export const useTypedGenericPromptNodeFromDataNode = <T extends NodeTypeBuilderDefinition>(props: {
    id: string,
    classtype: string,
    definition: T
}): ResolvedNodeType<T> | undefined => {
    const {
        id,
        classtype,
        definition
    } = props

    const dataNode = useSelector((state: AppState) => dataNodesSelectors.selectDataNode(state, classtype))
    const [typedNode, setTypedNode] =
        useState<ResolvedNodeType<T> | undefined>()

    useEffect(() => {
        if (!dataNode) {
            return;
        }

        setTypedNode(
            typeDataNode({
                id,
                node: dataNode,
                mapper: comfyuiDataNodeAsGenericPromptNode,
                definition,
            })
        )
    }, [id, dataNode, setTypedNode]);

    return typedNode
}

export const useGenericPromptNode = (
    props: {
        id: string,
        classtype: string
    }
) => {
    const {
        id,
        classtype
    } = props

    const dataNode = useSelector((state: AppState) => dataNodesSelectors.selectDataNode(state, classtype))
    const [genericPromptNode, setGenericPromptNode] =
        useState<GenericNode | undefined>()

    useEffect(() => {
        if (!dataNode) {
            return;
        }

        setGenericPromptNode(
            comfyuiDataNodeAsGenericPromptNode(
                id,
                dataNode
            )
        )
    }, [id, dataNode, setGenericPromptNode]);

    return genericPromptNode
}

export const useDataNodesLoader = () => {
    const dispatch = useAppDispatch()
    const {data, error} = comfyApi.useGetObjectInfoQuery()

    useEffect(() => {
        if (error) {
            console.error(error) // TODO: Handle error
            return
        }

        if (data) {
            dispatch(
                nodesSliceActions.updateDataNodeCollection(
                    mapObjectNodesDtoToDataNodeCollection(data).nodes
                )
            )
        }
    }, [dispatch, data, error])
}

export const useNodeFromPrompt = <T extends NodeTypeBuilderDefinition>(props: {
    prompt: Prompt,
    id: string,
    definition: T,
}) => {
    const {prompt, definition, id} = props
    if (!prompt) {
        return undefined
    }
    const node = findPromptNodeById(id, prompt.workflow)
    return node ? castGenericNode(node, definition) : node
}