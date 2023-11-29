import Api from "../../api/api.ts";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {nodesSliceActions} from "./data-nodes.slice.ts";
import {mapObjectNodesDtoToDataNodeCollection} from "../../api/mapper/object-dto-to-datanode.mapper.ts";
import {dataNodesSelectors} from "./data-nodes.selectors.ts";
import {AppState} from "../inflame-store.ts";

const queryDataNodes = createAsyncThunk<
    void,
    boolean,
    {
        state: AppState,
    }
>(
    'dataNodes/queryDataNodes',
    async (refresh, {
        dispatch, getState, rejectWithValue
    }) => {
        const result = await Api.getObjectInfo({
            transformer: (data) => {
                return mapObjectNodesDtoToDataNodeCollection(data)
            }
        })

        if (result.error) {
            console.error(result.error)
            return rejectWithValue(null);
        }

        const currentNodes = dataNodesSelectors.selectNodes(getState())

        if (result.value) {
            if (refresh || Object.keys(currentNodes).length >= 0) {
                dispatch(nodesSliceActions.updateDataNodeCollection(result.value.nodes))
            }
        } else {
            throw new Error("API /object_info failed to provide any nodes")
        }
    }
)

// const queryDataNodes = (refresh: boolean) => {
//     return async (dispatch: Dispatch, getState: () => AppState) => {
//         const result = await Api.getObjectInfo({
//             transformer: (data) => {
//                 return mapObjectNodesDtoToDataNodeCollection(data)
//             }
//         })
//
//         if (result.error) {
//             console.error(result.error)
//             return;
//         }
//
//         const currentNodes = dataNodesSelectors.selectNodes(getState())
//
//         if (result.value) {
//             if (refresh || Object.keys(currentNodes).length >= 0) {
//                 dispatch(nodesSliceActions.updateDataNodeCollection(result.value.nodes))
//             }
//         } else {
//             throw new Error("API /object_info failed to provide any nodes")
//         }
//     }
// }

export const dataNodesThunk = {
    queryDataNodes
}