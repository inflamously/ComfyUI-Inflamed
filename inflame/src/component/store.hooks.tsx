import { useEffect } from 'react'
import {
    ActionCreatorArgument,
    EffectListenerArgument,
    subscribeToStoreChange,
} from '../+state/inflame-store.listener.ts'
import { useSelector } from 'react-redux'
import { AppState } from '@inflame/state'
import { isEqual } from 'lodash'

export const useSubscribeStoreChange = <Args, Payload>(props: {
    action: ActionCreatorArgument<Args, Payload>
    listener: EffectListenerArgument<Payload>
}) => {
    const { action, listener } = props
    useEffect(() => {
        subscribeToStoreChange(action, listener)
    }, [action, listener])
}

export const useMemoSelector = <Result extends unknown>(selector: (state: AppState) => Result) => {
    return useSelector((state: AppState) => selector(state), isEqual)
}
