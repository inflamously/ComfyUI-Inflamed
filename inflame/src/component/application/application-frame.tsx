import {ReactNode} from "react";
import {useComfyuiSocketEventDispatcher} from "../socket/comfyui/comfyui-socket-state.hook.tsx";
import {useDataNodesLoader} from "../nodes/nodes.hooks.tsx";
import {usePromptNodeUpdateHandler} from "../nodes/workflow.hooks.tsx";

/**
 * This main frame of the application that receives all provider stack instances and initializes itself.
 */
const ApplicationFrame = (props: {
    children?: ReactNode,
}) => {
    const {children} = props

    useDataNodesLoader()
    useComfyuiSocketEventDispatcher()
    usePromptNodeUpdateHandler()

    return <>
        {children}
    </>
}

export default ApplicationFrame