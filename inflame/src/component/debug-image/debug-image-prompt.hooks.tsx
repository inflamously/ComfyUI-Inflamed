import {
    promptsSelectors,
    promptsSliceActions,
    useAppDispatch,
} from "@inflame/state";
import {Prompt} from "@inflame/models";
import {useTypedGenericPromptNodeFromDataNode} from "../nodes/nodes.hooks.tsx";
import {NodeDefinitionLoadImage} from "../../prompt-nodes/load-image/node-definition-load-image.ts";
import {NodeDefinitionPreviewImage} from "../../prompt-nodes/preview-image/node-definition-preview-image.ts";
import {useEffect} from "react";
import {cloneDeep} from "lodash";
import {findPromptNodeById} from "../../prompt-nodes/prompt-node.utils.ts";
import {useMemoSelector} from "../store.hooks.tsx";

export const useDebugPrompt = (props: {
    promptName: string,
    image: {
        index: number
    }
}): Prompt | undefined => {
    const {promptName, image} = props
    const dispatch = useAppDispatch()
    const prompt = useMemoSelector((state) => promptsSelectors.selectPromptByName(state, promptName))

    if (!prompt) {
        dispatch(promptsSliceActions.createPrompt(promptName))
    }

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
        // Clone prompt which is readonly
        const newPrompt = cloneDeep(prompt)
        const newLoadImage =
            cloneDeep(findPromptNodeById("1", prompt?.workflow)) as typeof loadImage ?? loadImage
        const newPreviewImage =
            cloneDeep(findPromptNodeById("2", prompt?.workflow)) as typeof previewImage ?? previewImage

        if ([newLoadImage, newPreviewImage].every(node => node)) {
            if ("inputs" in newPreviewImage! && "images" in newPreviewImage.inputs) {
                newPreviewImage.inputs.images = newLoadImage!.outputs.IMAGE;
            }

            newLoadImage!.inputs.image = {
                kind: "string",
                value: newLoadImage!.state.image?.[0]?.[image.index ?? 0] ?? ""
            }

            newLoadImage!.inputs.upload = {
                kind: "boolean",
                value: true,
            }

            newPrompt.workflow.nodes = [
                newLoadImage!,
                newPreviewImage!
            ]

            dispatch(promptsSliceActions.updatePrompt(newPrompt))
        }
    }, [loadImage, previewImage, dispatch, prompt, image.index]);

    return prompt
}