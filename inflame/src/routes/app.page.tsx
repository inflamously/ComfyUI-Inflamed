import {Box} from "@chakra-ui/react";
import {Outlet} from "react-router-dom";
import {useDataNodesLoader} from "../component/nodes/nodes-info.tsx";
import NavigationBar from "../component/navigation/navigation.tsx";
import useComfyuiSocket from "../component/socket/comfyui/comfyui-socket.tsx";

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
