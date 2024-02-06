import {
    promptsSelectors,
    promptsSliceActions,
    useAppDispatch, AppState
} from "@inflame/state";
import {Prompt} from "@inflame/models";
import {useTypedGenericPromptNodeFromDataNode} from "../nodes/nodes.hooks.tsx";
import {NodeDefinitionLoadImage} from "../../prompt-nodes/load-image/node-definition-load-image.ts";
import {NodeDefinitionPreviewImage} from "../../prompt-nodes/preview-image/node-definition-preview-image.ts";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {cloneDeep, isEqual} from "lodash";
import {findPromptNodeById} from "../../prompt-nodes/prompt-node.utils.ts";

export const useDebugPrompt = (props: {
    promptName: string,
    image: {
        index: number
    }
}): Prompt | undefined => {
    const {promptName, image} = props
    const dispatch = useAppDispatch()
    const prompt = useSelector((state: AppState) => promptsSelectors.selectPromptByName(state, promptName))

    useEffect(() => {
        if (!prompt) {
            dispatch(promptsSliceActions.createPrompt(promptName))
        }
    }, [dispatch, prompt, promptName]);

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

    useEffect(() => {
        // Do not proceed when items given are undefined
        if (!loadImage || !previewImage || !prompt) {
            return;
        }

        // Clone prompt which is readonly
        const newPrompt = cloneDeep(prompt)
        const newLoadImage =
            cloneDeep(findPromptNodeById("1", prompt?.workflow)) as typeof loadImage ?? loadImage
        const newPreviewImage =
            cloneDeep(findPromptNodeById("2", prompt?.workflow)) as typeof previewImage ?? previewImage

        if (newLoadImage && newPreviewImage) {
            if ("inputs" in newPreviewImage && "images" in newPreviewImage.inputs) {
                newPreviewImage.inputs.images = newLoadImage.outputs.IMAGE;
            }

            newLoadImage.inputs.image = {
                kind: "string",
                value: newLoadImage.state.image?.[0]?.[image.index ?? 0] ?? ""
            }

            newLoadImage.inputs.upload = {
                kind: "boolean",
                value: true,
            }
        }

        newPrompt.workflow.nodes = [
            newLoadImage,
            newPreviewImage
        ]

        if (isEqual(prompt, newPrompt)) {
            return;
        }

        dispatch(promptsSliceActions.updatePrompt(newPrompt))
    }, [dispatch, loadImage, previewImage, prompt, image.index]);

    return prompt
}