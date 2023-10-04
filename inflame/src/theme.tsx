import {extendTheme} from "@chakra-ui/react";

export const theme = extendTheme({
    styles: {
        global: {
            body: {
                padding: "1rem"
            },
            ul: {
                listStyle: "none"
            },
            li: {
                listStyle: "none"
            },
        }
    }
})