import {FormControl, FormLabel, Input, List, ListItem, Select, Switch} from "@chakra-ui/react";
import {useMemo} from "react";

export type PropertyItem = [string, {
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

export const NodePropertyItemTextbox = (props: {
    label: string,
    value: string | number
}) => <FormControl>
    <FormLabel htmlFor={props.label}>{props.label}</FormLabel>
    <Input id={props.label} defaultValue={props.value}></Input>
</FormControl>

export const NodePropertyItemToggle = (props: {
    label: string,
    value: boolean
}) => <FormControl>
    <FormLabel htmlFor={props.label}>{props.label}</FormLabel>
    <Switch id={props.label} defaultChecked={props.value}></Switch>
</FormControl>

export const NodePropertyItemSelect = (props: {
    label: string,
    value: unknown[]
}) => <FormControl>
    <FormLabel htmlFor={props.label}>{props.label}</FormLabel>
    <Select id={props.label}>
        {
            Array.isArray(props.value) && props.value?.filter((val) => typeof val === "string" || val === "number" || val === "boolean")
                .map((value, index) => {
                    return <option key={index}>{value as string | number | boolean}</option>
                })
        }
    </Select>
</FormControl>


export const NodePropertyItem = (props: {
    type: string | undefined,
    label: string,
    value: unknown,
}) => props.type && <ListItem p={4}>
    {props.type === "textbox" &&
        <NodePropertyItemTextbox label={props.label} value={props.value as string | number}></NodePropertyItemTextbox>}
    {props.type === "toggle" &&
        <NodePropertyItemToggle label={props.label} value={props.value as boolean}></NodePropertyItemToggle>}
    {props.type === "select" &&
        <NodePropertyItemSelect label={props.label} value={props.value as unknown[]}></NodePropertyItemSelect>}
</ListItem>

export const NodePropertyBlock = (props: {
    entries: Array<[string, unknown]>,
    customProperties?: PropertyItem[],
}) => {
    const properties = useMemo(
        () => props.entries.map(mapEntryToProperty), [props.entries]);

    return <List>
        {
            !props.customProperties && properties?.map(
                ([label, propertyItem], index) =>
                    <NodePropertyItem
                        key={index}
                        type={propertyItem?.type}
                        label={label}
                        value={propertyItem?.value}></NodePropertyItem>)
        }
        {
            props.customProperties?.map(
                ([label, propertyItem], index) =>
                    <NodePropertyItem
                        key={index}
                        type={propertyItem?.type}
                        label={label}
                        value={propertyItem?.value}></NodePropertyItem>)
        }
    </List>
}