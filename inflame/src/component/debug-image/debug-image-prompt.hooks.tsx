import {useState} from "react";
import {useSelector} from "react-redux";
import {AppState, promptsSelectors, useAppDispatch} from "@inflame/state";
import {promptsThunk} from "@inflame/state";
import {Prompt} from "@inflame/models";
import {useTypedGenericPromptNode} from "../nodes/data-nodes.hooks.tsx";
import {NodeDefinitionLoadImage} from "../../prompt-nodes/load-image/node-definition-load-image.ts";
import {NodeDefinitionPreviewImage} from "../../prompt-nodes/preview-image/node-definition-preview-image.ts";
import {usePromptNodeUpdate} from "../nodes/workflow.hooks.tsx";
import {filterToExistingNodes} from "../../prompt-nodes/prompt-node.utils.ts";

export const useDebugPrompt = (): Prompt | undefined => {
    const [promptId] = useState<string>("debug-prompt")
    const prompt = useSelector((state: AppState) => promptsSelectors.selectPromptByClientId(state, promptId))
    const dispatch = useAppDispatch();

    const loadImage = useTypedGenericPromptNode({
        id: "1",
        classtype: "LoadImage",
        definition: NodeDefinitionLoadImage,
    })

    const previewImage = useTypedGenericPromptNode({
        id: "2",
        classtype: "PreviewImage",
        definition: NodeDefinitionPreviewImage,
    })

    if (loadImage && previewImage && (!prompt || prompt?.workflow?.nodes?.length <= 0)) {
        if ("images" in previewImage?.inputs) {
            previewImage.inputs.images = loadImage?.outputs?.IMAGE
        }

        loadImage.inputs.image = {
            kind: "string",
            value: loadImage.state.image?.[0]?.[0] ?? ""
        }
        loadImage.inputs.upload = {
            kind: "boolean",
            value: true,
        }

        dispatch(
            promptsThunk.createPromptWithWorkflow({
                clientId: promptId,
                nodes: [
                    loadImage,
                    previewImage,
                ]
            })
        )
    }

    usePromptNodeUpdate({
        onUpdate: (source, target) => {
            filterToExistingNodes({
                source,
                target,
            }).forEach((node) => {
                console.log("Node data received", node)
            })
        }
    })

    // useEffect(() => {
    //     if (!prompt) {
    //         return;
    //     }
    //
    //     const [previewImageNode] = findAbstractPromptNodeByClass("PreviewImage", prompt.workflow)
    //     if (previewImageNode) {
    //         const previewImage = castGenericNode(
    //             previewImageNode,
    //             NodeDefinitionPreviewImage
    //         )
    //         console.log("PreviewImage", previewImage)
    //     }
    // }, [prompt]);

    return prompt
}