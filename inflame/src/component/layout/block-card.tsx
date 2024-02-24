import {ReactNode} from "react";
import {Card} from "@chakra-ui/react";

export const BlockCard = (props: {
    children: ReactNode,
}) => {
    const {children} = props
    return <Card
        colorScheme="gray"
        variant="block"
    >
        {children}
    </Card>
}