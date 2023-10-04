import {PromptNodeDTO, PromptNodeInputsDTO, PromptNodeValueDTO, PromptWorkflowDTO} from "../dto/prompt-node.dto.ts";
import {PromptWorkflow} from "../../+state/prompt-workflow/create-prompt-workflow.ts";

export const workflowDtoMapper = (workflow: PromptWorkflow): PromptWorkflowDTO | undefined => {
    if (!workflow) {
        return undefined
    }

    workflow.getNodes().map((node) => {
        const inputs = node.getInputs() ?? {}

        const dtoInputs: PromptNodeInputsDTO = {
            ...Object.keys(inputs).map((nodeKey) => {
                    const nodeLink = inputs[nodeKey]
                    let nodeValue: PromptNodeValueDTO = undefined

                    if (nodeLink?.kind === "link") {
                        nodeValue = [nodeLink.id, nodeLink.slot]
                    }

                    if (nodeLink?.kind === "string") {
                        nodeValue = nodeLink.value
                    }

                    return {
                        [nodeKey]: nodeValue
                    }
                }
            )
        }

        return [node.id, {
            inputs: dtoInputs,
            class_type: node.classtype,
        } as PromptNodeDTO]
    })

    const dto: PromptWorkflowDTO = {}

    // Object.keys(workflow).forEach(key => {
    //     const node = workflow[key]
    //     Object.assign(dto, {
    //         inputs: node.inputs,
    //         class_type: node.classType
    //     } as PromptNodeDTO)
    // })

    return dto
}