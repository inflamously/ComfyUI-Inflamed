import DebugImagePrompt from "./debug-image-prompt.tsx";
import {Box} from "@chakra-ui/react";
import useComfyuiSocket from "./socket/comfyui-socket.tsx";

const App = () => {
    useComfyuiSocket()

    return (
        <Box>
            <DebugImagePrompt/>
        </Box>
    )
}

export default App
