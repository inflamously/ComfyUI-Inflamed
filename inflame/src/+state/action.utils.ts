import {createAction} from "@reduxjs/toolkit";

export const createListenerPreparedAction = <
    ActionName extends string,
    Args,
    Payload,
>(
    name: ActionName,
    preparedAction: (...args: Args[]) => { payload: Payload },
) => {
    return createAction(name, preparedAction);
}

