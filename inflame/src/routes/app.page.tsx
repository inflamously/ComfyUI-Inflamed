import {Box} from "@chakra-ui/react";
import useComfyuiSocket from "../socket/comfyui-socket.tsx";
import {Outlet} from "react-router-dom";
import {useNodesInitializer} from "../component/nodes/nodes-info.tsx";
import NavigationBar from "../component/navigation/navigation.tsx";

const PageApp = () => {
    useComfyuiSocket()
    useNodesInitializer()

    return (
        <Box p={4}>
            <NavigationBar />
            <Outlet />
        </Box>
    )
}

export default PageApp
