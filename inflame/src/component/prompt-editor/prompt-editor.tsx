import {Text} from '@chakra-ui/react'
import {Blocklist} from "./blocklist.tsx";
import {NodeBlock} from "./blocks/node-block.tsx";
import {PromptSelector} from "./prompt-selector.tsx";
import {useCallback, useState} from "react";
import {Prompt, PromptNodeConnection} from "@inflame/models";
import {Blockgroups} from "./blockgroups.tsx";
import {GenericNode} from "../../prompt-nodes/generic-node/generic-node.ts";

export const PromptEditor = () => {

    // const previewImage = useTypedGenericPromptNodeFromDataNode({
    //     id: "2",
    //     classtype: "PreviewImage",
    //     definition: NodeDefinitionPreviewImage
    // })

    const [prompt, setPrompt] = useState<Prompt | undefined>()

    const handlePinConnection = useCallback((pin: PromptNodeConnection, sourceNode: GenericNode) => {
        console.log(pin, sourceNode)
    }, [prompt])

    return <>
        <Text pb={4}>Under construction</Text>
        <PromptSelector onPromptSelection={setPrompt}/>
        <Blockgroups>
            <Blocklist>
                {
                    prompt && prompt?.workflow?.nodes?.map((node, index) => {
                        return <NodeBlock
                            key={index}
                            node={node}
                            onPinClick={handlePinConnection}
                        />
                    })
                }
                {/*<LoadImageNodeBlock />*/}
                {/*{*/}
                {/*    previewImage && <NodeBlock node={previewImage} />*/}
                {/*}*/}
            </Blocklist>
        </Blockgroups>
    </>
}