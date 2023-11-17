import {PromptNodeDTO, PromptNodeInputsDTO, PromptNodeValueDTO, PromptWorkflowDTO} from "../dto/prompt-node.dto.ts";
import {PromptWorkflow} from "../../+state/prompt-workflow/create-prompt-workflow.ts";
import {PromptNodeConnection} from "../../+state/prompt-nodes/prompt-node-link.ts";

export const nodeConnectionToPromptNodeInputDto = (key: string, connection: PromptNodeConnection) => {
    let nodeValue: PromptNodeValueDTO = undefined

    if (connection?.kind === "link") {
        nodeValue = [connection.id, connection.slot]
    }

    if (connection?.kind === "string") {
        nodeValue = connection.value
    }

    return [key, nodeValue]
}

/**
 * Converts workflow to dto using nodes in their respective order given from .getNodes()
 * @param workflow
 */
export const workflowDtoMapper = (workflow: PromptWorkflow): PromptWorkflowDTO | undefined => {
    if (!workflow) {
        return undefined
    }

    return Object.fromEntries(
        workflow.getNodes().map((node) => {
            const inputs = node.getInputs() ?? {}
            const extraInputs = node.getStateInputs?.();

            let dtoInputs: PromptNodeInputsDTO = Object.fromEntries(
                Object.keys(inputs).map((nodeKey) => nodeConnectionToPromptNodeInputDto(nodeKey, inputs[nodeKey]))
            )

            if (extraInputs) {
                const dtoExtraInputs = Object.fromEntries(
                    Object.keys(extraInputs).map((nodeKey) => nodeConnectionToPromptNodeInputDto(nodeKey, extraInputs[nodeKey]))
                )

                dtoInputs = Object.assign(dtoInputs, dtoExtraInputs)
            }

            return [node.id, {
                inputs: dtoInputs,
                class_type: node.classtype,
            } satisfies PromptNodeDTO]
        })
    )
}