import {PromptNodeDTO, PromptNodeInputsDTO, PromptNodeValueDTO, PromptWorkflowDTO} from "../dto/prompt-node.dto.ts";
import {PromptWorkflow} from "../../+state/prompt-workflow/create-prompt-workflow.ts";

export const workflowDtoMapper = (workflow: PromptWorkflow): PromptWorkflowDTO | undefined => {
    if (!workflow) {
        return undefined
    }

    return Object.fromEntries(
        workflow.getNodes().map((node) => {
            const inputs = node.getInputs() ?? {}

            const dtoInputs: PromptNodeInputsDTO = Object.fromEntries(
                Object.keys(inputs).map((nodeKey) => {
                        const nodeLink = inputs[nodeKey]
                        let nodeValue: PromptNodeValueDTO = undefined

                        if (nodeLink?.kind === "link") {
                            nodeValue = [nodeLink.id, nodeLink.slot]
                        }

                        if (nodeLink?.kind === "string") {
                            nodeValue = nodeLink.value
                        }

                        return [nodeKey, nodeValue]
                    }
                )
            )


            return [node.id, {
                inputs: dtoInputs,
                class_type: node.classtype,
            } satisfies PromptNodeDTO]
        })
    )
}