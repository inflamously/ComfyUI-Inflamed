import {Box} from "@chakra-ui/react";
import {Outlet} from "react-router-dom";
import {useDataNodesLoader} from "../component/nodes/data-nodes.hooks.tsx";
import NavigationBar from "../component/navigation/navigation.tsx";
import useComfyuiSocket from "../component/socket/comfyui/comfyui-socket.hooks.tsx";
import {DataStoreProvider} from "../component/app-providers/data-store.provider.tsx";

const PageApp = () => {
    useComfyuiSocket()
    useDataNodesLoader()

    return (
        <Box p={4}>
            <DataStoreProvider>
                <NavigationBar/>
            </DataStoreProvider>
            <Outlet/>
        </Box>
    )
}

export default PageApp
