import {PromptWorkflowDTO} from "../dto/node.ts";
import {PromptWorkflow} from "../../+state/workflow/nodes/workflow.model.ts";

export const mapWorkflowToDtoMapper = (workflow: PromptWorkflow): PromptWorkflowDTO => {
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