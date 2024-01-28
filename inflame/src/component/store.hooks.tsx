import {useEffect} from "react";
import {
    ActionCreatorArgument,
    EffectListenerArgument,
    subscribeToStoreChange
} from "../+state/inflame-store.listener.ts";

export const useSubscribeStoreChange = <Args, Payload>(props: {
    action: ActionCreatorArgument<Args, Payload>
    listener: EffectListenerArgument<Payload>
}) => {
    const {action, listener} = props
    useEffect(() => {
        subscribeToStoreChange(action, listener);
    }, []);
}