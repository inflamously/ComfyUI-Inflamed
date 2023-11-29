import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import {dataNodesThunk} from "../../+state/data-nodes/data-nodes.thunk.ts";
import {AppState} from "../../+state/inflame-store.ts";

export const useDataNodesLoader = () => {
    const dispatch: ThunkDispatch<AppState, never, AnyAction> = useDispatch()

    useEffect(() => {
        dispatch(dataNodesThunk.queryDataNodes(false))
            .catch((e) => {
                throw new Error(e)
            })
    }, [dispatch])
}