import {ReactNode} from "react";
import { BlockCard } from "../../layout/block-card";

export const Block = (props: {
    children: ReactNode,
}) => {
    const {children} = props
    return <BlockCard>{children}</BlockCard>
}