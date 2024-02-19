import {GenericNode} from "../../../prompt-nodes/generic-node/generic-node.ts";
import {Block} from "./block.tsx";
import { NodePinBlock } from "./node-pin-block.tsx";
import {NodePropertyBlock, PropertyItem} from "./node-property-block.tsx";


export const NodeBlock = (props: {
    node: GenericNode,
    customProperties?: PropertyItem[],
    onChangeProperty?: () => void,
}) => {
    return <Block>
        <NodePinBlock />
        {props.node?.state && <NodePropertyBlock
            entries={Object.entries(props.node.state)}
            customProperties={props.customProperties}/>}
        <NodePinBlock />
    </Block>
}