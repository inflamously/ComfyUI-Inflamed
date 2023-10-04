import {Box, Button, Textarea} from "@chakra-ui/react";
import {ChangeEvent, useCallback, useState} from "react";
import * as testPrompt from './prompting/test-prompt-minified.json'
import Fileuploader from "./file/fileuploader.tsx";
import Api from "./api/api.ts";
import {socketStateSelectors} from "./+state/socket/socket-selectors.ts";
import {useSelector} from "react-redux";
import {SOCKET_MAIN} from "./+state/socket/socket-names.ts";
import {InflameStoreState} from "./+state/inflame-store.ts";

const DebugImagePrompt = () => {
    const socketState = useSelector((state: InflameStoreState) => socketStateSelectors.selectById(state, SOCKET_MAIN))
    const [prompt, setPrompt] = useState(JSON.parse(JSON.stringify(testPrompt)))

    const handleInvokePrompt = useCallback(async () => {
        prompt.client_id = socketState?.clientId
        const result = await Api.postPrompt({
            payload: prompt,
        })
        console.log(result.error);
    }, [socketState, prompt])

    const handlePromptChange = (value: ChangeEvent<HTMLTextAreaElement>) => {
        if (value?.target?.value) {
            setPrompt(JSON.parse(value.target.value));
        }
    }

    return (
        <Box p={4}>
            <Fileuploader fileTypes={[
                "image/jpeg", "image/png"
            ]}/>
            <Textarea
                mb={4}
                defaultValue={JSON.stringify(testPrompt, null, 4)}
                onChange={handlePromptChange}
                height="256"
            />
            <Button onClick={handleInvokePrompt}>Invoke</Button>
        </Box>
    )
}

export default DebugImagePrompt;