import {PromptNodeDTO, PromptNodeInputsDTO, PromptNodeValueDTO, PromptWorkflowDTO} from "../dto/prompt-node.dto.ts";
import {PromptNodeConnection} from "../../+state/prompt/prompt-nodes/prompt-node-connection.ts";
import {PromptWorkflow} from "../../+state/prompt/prompt-workflow/create-prompt-workflow.ts";
import {unsetInputsValidator} from "../../validators/nodes.validators.ts";

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
export const workflowToWorkflowDtoMapper = (workflow: PromptWorkflow): PromptWorkflowDTO => {
    if (!workflow) {
        return {}
    }

    return Object.fromEntries(
        workflow.getNodes().map((node) => {
            // TODO: Evaluate if syntax is preferred?
            if (!unsetInputsValidator(node)) {
                throw new Error(`Unused inputs detected at node type "${node.classtype}" !`);
            }

            const inputs = node.getInputs() ?? {} // In case of undefined just use empty array.
            const stateInputs = node.getStateInputs?.();

            let dtoInputs: PromptNodeInputsDTO = Object.fromEntries(
                Object.keys(inputs).map((nodeKey) => nodeConnectionToPromptNodeInputDto(nodeKey, inputs[nodeKey]))
            )

            if (stateInputs) {
                const dtoStateInputs = Object.fromEntries(
                    Object.keys(stateInputs).map((nodeKey) => nodeConnectionToPromptNodeInputDto(nodeKey, stateInputs[nodeKey]))
                )

                dtoInputs = Object.assign(dtoInputs, dtoStateInputs)
            }

            return [node.id, {
                inputs: dtoInputs,
                class_type: node.classtype,
            } satisfies PromptNodeDTO]
        })
    )
}