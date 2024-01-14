import {extendTheme} from "@chakra-ui/react";
import Popover from './theme/popover.ts'

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
    },
    components: {
        Popover
    }
})

