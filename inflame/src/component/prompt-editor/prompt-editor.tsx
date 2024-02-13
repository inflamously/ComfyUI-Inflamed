import {Text} from '@chakra-ui/react'
import {Blocklist} from "./blocklist.tsx";
import {LoadImageNodeBlock} from "./examples/load-image-node-block.tsx";

export const PromptEditor = () => {
    return <>
        <Text pb={4}>Under construction</Text>
        <Blocklist>
            <LoadImageNodeBlock />
        </Blocklist>
    </>
}