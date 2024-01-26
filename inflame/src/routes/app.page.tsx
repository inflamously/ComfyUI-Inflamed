import {Box} from "@chakra-ui/react";
import {Outlet} from "react-router-dom";
import NavigationBar from "../component/navigation/navigation.tsx";
import useComfyuiSocket from "../component/socket/comfyui/comfyui-socket.hooks.tsx";
import ApplicationFrame from "../component/application/application-frame.tsx";
import ProviderStack from "../component/application/providers/provider-stack.tsx";

const PageApp = () => {
    const {socketId, socketListener} = useComfyuiSocket()
    return (
        <ProviderStack value={{
            socket: {
                id: socketId,
                listener: socketListener
            }
        }}>
            <ApplicationFrame>
                <Box p={4}>
                    <NavigationBar/>
                    <Outlet/>
                </Box>
            </ApplicationFrame>
        </ProviderStack>
    )
}

export default PageApp
