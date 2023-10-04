import Api from "../../api/api.ts";
import {Dispatch} from "@reduxjs/toolkit";
import {nodesSlice} from "./nodes.slice.ts";
import {AppState} from "../inflame-store.ts";
import {selectDataNodes} from "./nodes.selectors.ts";
import {mapObjectNodesDtoToDataNodeCollection} from "../../api/mapper/object-dto-to-datanode.mapper.ts";

const nodesThunk = () => {

    // TODO: Use refresh to reload nodes
    const queryNodes = (refresh: boolean) => async (dispatch: Dispatch, getState: () => AppState) => {
        const result = await Api.getObjectInfo({
            transformer: (data) => {
                return mapObjectNodesDtoToDataNodeCollection(data)
            }
        })

        if (result.error) {
            console.error(result.error)
            return;
        }

        const currentNodes = selectDataNodes(getState())

        if (result.value) {
            if (refresh || Object.keys(currentNodes).length >= 0) {
                dispatch(nodesSlice.actions.updateDataNodeCollection(result.value.nodes))
            }
        } else {
            throw new Error("API /object_info failed to provide any nodes")
        }
    }

    return {
        queryNodes
    }
}

export default nodesThunk()