import {Box} from "@chakra-ui/react";
import useComfyuiSocket from "../socket/comfyui-socket.tsx";
import {useNodesInitializer} from "../nodes/nodes-info.tsx";
import {Outlet} from "react-router-dom";
import NavigationBar from "../navigation/navigation.tsx";

const App = () => {
    useComfyuiSocket()
    useNodesInitializer()

    return (
        <Box p={4}>
            <NavigationBar />
            <Outlet />
        </Box>
    )
}

export default App
