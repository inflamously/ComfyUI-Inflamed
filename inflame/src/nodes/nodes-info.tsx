import {useEffect} from "react";
import {useDispatch} from "react-redux";
import nodesThunk from "../+state/data-nodes/nodes.thunk.ts";
import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import {AppState} from "../+state/inflame-store.ts";

export const useNodesInitializer = () => {
    const dispatch: ThunkDispatch<AppState, never, AnyAction> = useDispatch()

    useEffect(() => {
        dispatch(nodesThunk.queryNodes(false)).then(() => {

        }).catch((e) => {
            throw new Error(e)
        })
    }, [dispatch])
}