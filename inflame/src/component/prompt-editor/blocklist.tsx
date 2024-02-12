import {ReactNode} from "react";
import {Box} from "@chakra-ui/react";

export const Blocklist = (props: {
    children: ReactNode
}) => {
    const {children} = props
    return <Box>
        {children}
    </Box>
}