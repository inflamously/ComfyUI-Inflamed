import {Card} from "@chakra-ui/react";
import {ReactNode} from "react";

export const Block = (props: {
    children: ReactNode,
}) => {
    const {children} = props
    return <Card
        p={4}
        colorScheme="gray"
        variant="outline"
    >
        {children}
    </Card>
}