import {useEffect} from "react";
import {subscribeToStoreChange} from "../+state/inflame-store.listener.ts";
export const useSubscribeStoreChange = (props: {
    action: Parameters<typeof subscribeToStoreChange>[0]
    listener: Parameters<typeof subscribeToStoreChange>[1]
}) => {
    const {action, listener} = props
    useEffect(() => {
        subscribeToStoreChange(action, listener);
    }, []);
}