import {useAppDispatch} from "../../+state/inflame-store.ts";
import {useEffect} from "react";
import {comfyApi} from "../../api/comfy.api.ts";
import {mapObjectNodesDtoToDataNodeCollection} from "../../api/mapper/object-dto-to-datanode.mapper.ts";
import {nodesSliceActions} from "../../+state/data-nodes/data-nodes.slice.ts";

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