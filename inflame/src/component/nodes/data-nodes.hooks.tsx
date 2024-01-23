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
import {NodeTypeBuilderDefinition, ResolvedNodeType} from "@inflame/models";
import {typeDataNode} from "../../prompt-nodes/generic-node/generic-node.utils.ts";

export const useSelectDataNode = (name: string) => {
    return useSelector((state: AppState) => dataNodesSelectors.selectDataNode(state, name))
}

export const useTypedGenericPromptNode = <T extends NodeTypeBuilderDefinition>(props: {
    id: string,
    name: string,
    definition: T
}): ResolvedNodeType<T> | undefined => {
    const {
        id,
        name,
        definition
    } = props

    const dataNode = useSelector((state: AppState) => dataNodesSelectors.selectDataNode(state, name))
    const [typedNode, setTypedNode] =
        useState<ResolvedNodeType<T> | undefined>()

    useEffect(() => {
        if (!dataNode) {
            console.warn(`DataNode does not exist ${name}`)
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
        name: string
    }
) => {
    const {
        id,
        name
    } = props

    const dataNode = useSelector((state: AppState) => dataNodesSelectors.selectDataNode(state, name))
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