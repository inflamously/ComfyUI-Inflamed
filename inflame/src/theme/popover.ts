import {createMultiStyleConfigHelpers, defineStyle} from "@chakra-ui/react";
import {popoverAnatomy} from "@chakra-ui/anatomy";

export const {
    definePartsStyle,
    defineMultiStyleConfig,
} = createMultiStyleConfigHelpers(popoverAnatomy.keys)

export default defineMultiStyleConfig({
    sizes: {
        menu: definePartsStyle({
            content: defineStyle({
                width: "12rem"
            })
        })
    }
})