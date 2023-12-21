import {
    BindValueAssigned,
    BindValueLink,
    BindValueStateInput,
    BindValueString,
    PromptNodeConnection
} from "@inflame/models";

export const isConnectionOfLink = (obj: PromptNodeConnection): obj is BindValueAssigned<BindValueLink> => {
    return obj !== undefined && obj !== null && obj.kind === "link";
}

export const isConnectionOfStateInput = (obj: PromptNodeConnection): obj is BindValueAssigned<BindValueStateInput> => {
    return obj != undefined && true && obj.kind === "state";
}

export const isConnectionOfString = (obj: PromptNodeConnection): obj is BindValueAssigned<BindValueString> => {
    return obj?.kind === "string";
}

