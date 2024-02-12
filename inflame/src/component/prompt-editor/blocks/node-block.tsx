import {GenericNode} from "../../../prompt-nodes/generic-node/generic-node.ts";
import {Block} from "./block.tsx";
import {Input, List, ListItem, Select, Switch} from "@chakra-ui/react";
import {useMemo} from "react";

type PropertyItem = [string, {
    type: "textbox",
    value: string,
} | {
    type: "textbox",
    value: number,
} | {
    type: "toggle",
    value: boolean,
} | {
    type: "select",
    value: unknown[],
} | undefined]

export const NodePin = (props: {}) => <></>

const mapEntryToProperty = ([label, value]: [string, unknown]): PropertyItem => {
    switch (typeof value) {
        case "string":
            return [label, {
                type: "textbox",
                value
            }]
        case "number":
            return [label, {
                type: "textbox",
                value,
            }]
        case "boolean":
            return [label, {
                type: "toggle",
                value,
            }]
        case "object":
            return [label, Array.isArray(value) ? {
                type: "select",
                value,
            } : undefined] // TODO: ATM no support for objects
        default:
            return [label, undefined]
    }
}

export const NodePropertyBlock = (props: {
    entries: Array<[string, unknown]>
}) => {
    const {entries} = props

    const properties = useMemo(
        () => entries.map((entry) => mapEntryToProperty(entry)
        ), [entries]);

    return <List>
        {
            properties && properties.map(([label, propertyItem], index) => {
                return <ListItem key={index}>
                    {propertyItem?.type === "textbox" && <Input placeholder={label} value={propertyItem?.value}></Input>}
                    {propertyItem?.type === "toggle" &&
                        <Switch placeholder={label} isChecked={propertyItem?.value}></Switch>}
                    {
                        propertyItem?.type === "select" && <Select placeholder={label}>
                            {
                                // TODO: Use case LoadImage / PreviewImage?
                                propertyItem?.value && propertyItem?.value.filter((val) =>
                                    typeof val === "string" || val === "number" || val === "boolean"
                                ).map((value) => {
                                    return <option>{value as string | number | boolean}</option>
                                })
                            }
                        </Select>
                    }
                </ListItem>
            })
        }
    </List>
}

export const NodeBlock = (props: {
    node: GenericNode,
    onChangeProperty?: () => void,
}) => {
    const {node} = props

    return <Block>
        {node?.state && <NodePropertyBlock entries={Object.entries(node.state)}></NodePropertyBlock>}
    </Block>
}