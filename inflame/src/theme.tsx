import {extendTheme} from "@chakra-ui/react";
import Popover from './theme/popover.ts'
import Button from './theme/button.ts'
import Card from "./theme/card.ts";
import Accordion from './theme/accordion.ts';

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
        Popover,
        Button,
        Card,
        Accordion,
    }
})

