import {PromptNodeConnection} from "./prompt-node-connection.ts";
import {
    BindValueAssigned,
    BindValueLink,
    BindValueStateInput,
    BindValueString
} from "./prompt-node-connection-value.ts";

export const isConnectionOfLink = (obj: PromptNodeConnection): obj is BindValueAssigned<BindValueLink> => {
    return obj !== undefined && obj !== null && obj.kind === "link";
}

export const isConnectionOfStateInput = (obj: PromptNodeConnection): obj is BindValueAssigned<BindValueStateInput> => {
    return obj != undefined && obj != null && obj.kind === "state";
}

export const isConnectionOfString = (obj: PromptNodeConnection): obj is BindValueAssigned<BindValueString> => {
    return obj?.kind === "string";
}

