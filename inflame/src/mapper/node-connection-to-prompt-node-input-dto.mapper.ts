import {
    isConnectionOfBoolean,
    isConnectionOfLink,
    isConnectionOfStateInput,
    isConnectionOfString,
} from '../prompt-nodes/prompt-node-connection.utils.ts'
import { GenericNode, PromptNodeConnection, PromptNodeValueDTO } from '@inflame/models'

export const nodeConnectionToPromptNodeInputDto = (
    node: GenericNode,
    key: string,
    connection: PromptNodeConnection
): [string, PromptNodeValueDTO] | [string, unknown] => {
    let nodeValue: PromptNodeValueDTO = undefined

    if (isConnectionOfLink(connection)) {
        nodeValue = [connection.id, connection.slot]
    }

    if (isConnectionOfStateInput(connection)) {
        return [key, node.state[connection.propertyPath]]
    }

    if (isConnectionOfString(connection)) {
        nodeValue = connection.value
    }

    if (isConnectionOfBoolean(connection)) {
        nodeValue = connection.value
    }

    return [key, nodeValue]
}
