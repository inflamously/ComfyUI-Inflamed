import {Text} from '@chakra-ui/react'
import {Blocklist} from "./blocklist.tsx";
import {NodeBlock} from "./blocks/node-block.tsx";
import {PromptSelector} from "./prompt-selector.tsx";
import {useState} from "react";
import {Prompt} from "@inflame/models";

export const PromptEditor = () => {

    // const previewImage = useTypedGenericPromptNodeFromDataNode({
    //     id: "2",
    //     classtype: "PreviewImage",
    //     definition: NodeDefinitionPreviewImage
    // })

    const [prompt, setPrompt] = useState<Prompt | undefined>()

    return <>
        <Text pb={4}>Under construction</Text>
        <PromptSelector onPromptSelection={setPrompt}/>
        <Blocklist>
            {
                prompt && prompt?.workflow?.nodes?.map((node, index) => {
                    return <NodeBlock key={index} node={node} />
                })
            }
            {/*<LoadImageNodeBlock />*/}
            {/*{*/}
            {/*    previewImage && <NodeBlock node={previewImage} />*/}
            {/*}*/}
        </Blocklist>
    </>
}