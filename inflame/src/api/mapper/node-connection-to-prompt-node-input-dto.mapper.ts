import {AbstractPromptNode} from "../../prompt-nodes/prompt-node.ts";
import {PromptNodeConnection} from "../../prompt-nodes/prompt-node-connection.ts";
import {PromptNodeValueDTO} from "../dto/prompt-node.dto.ts";
import {
    isConnectionOfLink,
    isConnectionOfStateInput,
    isConnectionOfString
} from "../../prompt-nodes/prompt-node-connection.utils.ts";

export const nodeConnectionToPromptNodeInputDto = (node: AbstractPromptNode, key: string, connection: PromptNodeConnection): [string, PromptNodeValueDTO] | [string, unknown] => {
    let nodeValue: PromptNodeValueDTO = undefined

    if (isConnectionOfLink(connection)) {
        nodeValue = [connection.id, connection.slot]
    }

    if (isConnectionOfStateInput(connection)) {
        return [key, node.state[connection.propertyPath]];
    }

    if (isConnectionOfString(connection)) {
        nodeValue = connection.value
    }

    return [key, nodeValue]
}