import {NodeBlock} from "../blocks/node-block.tsx";
import {useTypedGenericPromptNodeFromDataNode} from "../../nodes/nodes.hooks.tsx";
import {NodeDefinitionLoadImage} from "../../../prompt-nodes/load-image/node-definition-load-image.ts";
import {useEffect, useState} from "react";
import {cloneDeep} from "lodash";
import {Text} from "@chakra-ui/react";
import {ResolvedNodeType} from "@inflame/models";

export const LoadImageNodeBlock = () => {
    const typedLoadImageNode = useTypedGenericPromptNodeFromDataNode({
        id: "1",
        classtype: "LoadImage",
        definition: NodeDefinitionLoadImage,
    })

    const [node, setNode] = useState<ResolvedNodeType<typeof NodeDefinitionLoadImage>>()

    useEffect(() => {
        setNode(cloneDeep(typedLoadImageNode))
    }, [typedLoadImageNode, setNode]);

    return node ? <NodeBlock node={node} customProperties={[
        ["Images", {
            type: "select",
            value: node.state?.image?.[0] as unknown as unknown[] ?? []
        }],
        ["Upload", {
            type: "toggle",
            value: node.state?.image?.[0]?.[1] as unknown as boolean ?? false
        }],
    ]}/> : <Text>{"<node-block> load failed"}</Text>
}