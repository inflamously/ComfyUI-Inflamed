// import {
//     createListenerMiddleware,
//     Dispatch,
//     Middleware,
//     UnknownAction
// } from "@reduxjs/toolkit";
//
// const dataStoreListenerMiddleware = createListenerMiddleware();
//
// const saveStore = (action, api) => {
//
// }
//
// const loadStore = () => {};
//
// export const registerDataStoreTrigger = (actionCreator: UnknownAction) => {
//     dataStoreListenerMiddleware.startListening({
//         actionCreator: actionCreator,
//         effect: saveStore
//     })
// }
//
// const DATA_STORE_CONFIG = {
//     name: "inflame-data-store",
//     data: {}
// }
//
// export const dataStoreMiddleware: () => Middleware<{}, any, Dispatch<UnknownAction>> = () => {
//     const {name, data} = DATA_STORE_CONFIG
//
//     if (!localStorage.getItem(name)) {
//         localStorage.setItem(name, JSON.stringify(data))
//     }
//
//     console.log(JSON.parse(localStorage.getItem(name) ?? ''))
//
//     return store => next => action => {
//         console.log('Middleware triggered:', store, action);
//         next(action); // Pass the action to the next middleware or reducer
//     };
// }