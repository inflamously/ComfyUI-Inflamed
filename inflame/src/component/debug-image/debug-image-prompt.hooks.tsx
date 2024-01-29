import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {AppState, promptsSelectors, promptsSliceActions, useAppDispatch} from "@inflame/state";
import {Prompt} from "@inflame/models";
import {useTypedGenericPromptNodeFromDataNode} from "../nodes/nodes.hooks.tsx";
import {NodeDefinitionLoadImage} from "../../prompt-nodes/load-image/node-definition-load-image.ts";
import {NodeDefinitionPreviewImage} from "../../prompt-nodes/preview-image/node-definition-preview-image.ts";

export const useDebugPrompt = (props: {
    image: {
        index: number
    }
}): Prompt | undefined => {
    const {image} = props
    const [promptName] = useState<string>("debug-prompt")
    const prompt = useSelector((state: AppState) => promptsSelectors.selectPromptByClientId(state, promptName))
    const dispatch = useAppDispatch();

    const loadImage = useTypedGenericPromptNodeFromDataNode({
        id: "1",
        classtype: "LoadImage",
        definition: NodeDefinitionLoadImage,
    })

    const previewImage = useTypedGenericPromptNodeFromDataNode({
        id: "2",
        classtype: "PreviewImage",
        definition: NodeDefinitionPreviewImage,
    })

    if (!prompt) {
        dispatch(promptsSliceActions.createPrompt(promptName))
    }

    useEffect(() => {
        if (!prompt || prompt?.workflow?.nodes.length > 0 || !loadImage || !previewImage) {
            return;
        }

        if ("images" in previewImage?.inputs) {
            previewImage.inputs.images = loadImage?.outputs?.IMAGE
        }

        loadImage.inputs.image = {
            kind: "string",
            value: loadImage.state.image?.[0]?.[image.index ?? 0] ?? ""
        }
        loadImage.inputs.upload = {
            kind: "boolean",
            value: true,
        }

        dispatch(promptsSliceActions.updatePromptNodes({
            nodes: [
                loadImage,
                previewImage
            ],
            clientId: promptName,
        }))
    }, [dispatch, loadImage, previewImage, prompt]);

    return prompt
}