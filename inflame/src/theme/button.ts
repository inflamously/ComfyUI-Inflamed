import {defineStyle, defineStyleConfig} from "@chakra-ui/react";

const menu = defineStyle({
    height: "24px",
    background: "gray.100",
})

export default defineStyleConfig({
    variants: {
        menu
    }
})
