import {PromptNodeConnection} from "./prompt-node-connection.ts";
import {PromptNodeValueDTO} from "../../../api/dto/prompt-node.dto.ts";
import {
    BindValueAssigned,
    BindValueLink,
    BindValueStateInput,
    BindValueString
} from "./prompt-node-connection-value.ts";
import {AbstractPromptNode} from "./prompt-node.ts";

export const isConnectionOfLink = (obj: PromptNodeConnection): obj is BindValueAssigned<BindValueLink> => {
    return obj !== undefined && obj !== null && obj.kind === "link";
}

export const isConnectionOfStateInput = (obj: PromptNodeConnection): obj is BindValueAssigned<BindValueStateInput> => {
    return obj != undefined && obj != null && obj.kind === "state";
}

export const isConnectionOfString = (obj: PromptNodeConnection): obj is BindValueAssigned<BindValueString> => {
    return obj?.kind === "string";
}

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