import {Text} from '@chakra-ui/react'
import {NodeBlock} from "./blocks/node-block.tsx";
import {useTypedGenericPromptNodeFromDataNode} from "../nodes/nodes.hooks.tsx";
import {NodeDefinitionLoadImage} from "../../prompt-nodes/load-image/node-definition-load-image.ts";
import {Blocklist} from "./blocklist.tsx";
import {useEffect, useState} from "react";
import {cloneDeep} from "lodash";
import {GenericNode} from "../../prompt-nodes/generic-node/generic-node.ts";

export const PromptEditor = (props: {}) => {
    const typedLoadImageNode = useTypedGenericPromptNodeFromDataNode({
        id: "1",
        classtype: "LoadImage",
        definition: NodeDefinitionLoadImage,
    })

    const [node, setNode] = useState<GenericNode>()

    useEffect(() => {
        setNode(cloneDeep(typedLoadImageNode))
    }, [typedLoadImageNode, setNode]);

    return <>
        <Text pb={4}>Under construction</Text>
        <Blocklist>
            {
                node ?
                    <NodeBlock node={node}></NodeBlock> :
                    <Text>{"<node-block load failed"}</Text>
            }
        </Blocklist>
    </>
}