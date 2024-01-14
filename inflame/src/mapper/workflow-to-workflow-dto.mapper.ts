import {nodeConnectionToPromptNodeInputDto} from "./node-connection-to-prompt-node-input-dto.mapper.ts";
import {PromptNodeDTO, PromptNodeInputsDTO, PromptWorkflow, PromptWorkflowDTO} from "@inflame/models";
import {unsetInputsValidator} from "./validators/nodes.validators.ts";

/**
 * Converts workflow to dto using nodes in their respective order given from .getNodes()
 * @param workflow
 */
export const workflowToWorkflowDtoMapper = (workflow: PromptWorkflow): PromptWorkflowDTO => {
    if (!workflow) {
        return {}
    }

    return Object.fromEntries(
        workflow.nodes.map((node) => {
            // TODO: Evaluate if syntax is preferred?
            if (!unsetInputsValidator(node)) {
                throw new Error(`Unused inputs detected at node type "${node.classtype}" !`);
            }

            const inputs = node.inputs ?? {} // In case of undefined just use empty array.

            const dtoInputs: PromptNodeInputsDTO = Object.fromEntries(
                Object.keys(inputs).map((nodeKey) => nodeConnectionToPromptNodeInputDto(node, nodeKey, inputs[nodeKey]))
            )
            
            return [node.id, {
                inputs: dtoInputs,
                class_type: node.classtype,
            } satisfies PromptNodeDTO]
        })
    )
}