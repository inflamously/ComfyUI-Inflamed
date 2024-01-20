import {AppState, useAppDispatch} from "@inflame/state";
import {useEffect, useState} from "react";
import {nodesSliceActions} from "../../+state/data-nodes/data-nodes.slice.ts";
import {comfyApi} from "@inflame/state";
import {mapObjectNodesDtoToDataNodeCollection} from "../../mapper/object-dto-to-datanode.mapper.ts";
import {useSelector} from "react-redux";
import {dataNodesSelectors} from "../../+state/data-nodes/data-nodes.selectors.ts";
import {PromptNodeGeneric} from "../../prompt-nodes/generic-node/generic-node.ts";
import {
    comfyuiDataNodeAsGenericPromptNode
} from "../../prompt-nodes/generic-node/comfyui-generic/comfyui-generic-node.utils.ts";

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
        useState<PromptNodeGeneric | undefined>()

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