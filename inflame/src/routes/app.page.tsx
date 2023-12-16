import {Box} from "@chakra-ui/react";
import useComfyuiSocket from "../socket/comfyui/comfyui-socket.tsx";
import {Outlet} from "react-router-dom";
import {useDataNodesLoader} from "../component/nodes/nodes-info.tsx";
import NavigationBar from "../component/navigation/navigation.tsx";

const PageApp = () => {
    useComfyuiSocket()
    useDataNodesLoader()

    return (
        <Box p={4}>
            <NavigationBar />
            <Outlet />
        </Box>
    )
}

export default PageApp
