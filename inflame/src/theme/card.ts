import {createMultiStyleConfigHelpers} from "@chakra-ui/react";
import {cardAnatomy} from '@chakra-ui/anatomy'

const {
    definePartsStyle,
    defineMultiStyleConfig,
} = createMultiStyleConfigHelpers(cardAnatomy.keys)

const block = definePartsStyle({
    container: {
        border: "1px solid gray",
        borderRadius: "0",
        padding: "1rem",
        marginBottom: "0.5rem"
    }
})

export default defineMultiStyleConfig({
    variants: {
        block,
    }
})