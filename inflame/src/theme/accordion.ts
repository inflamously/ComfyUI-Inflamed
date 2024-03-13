import {accordionAnatomy} from '@chakra-ui/anatomy'
import {createMultiStyleConfigHelpers} from '@chakra-ui/react'

const {definePartsStyle, defineMultiStyleConfig} =
    createMultiStyleConfigHelpers(accordionAnatomy.keys)

const inflame = definePartsStyle({
    container: {
        border: '1px solid',
        marginBottom: "0.5rem",
        _last: {
            marginBottom: 0,
        },
    },
    panel: {
        // Let's also provide dark mode alternatives
        _dark: {},
    },
    icon: {
        border: '1px solid',
        borderColor: 'gray.200',
        background: 'gray.200',
        borderRadius: 'full',
        color: 'gray.500',

        _dark: {
            borderColor: 'gray.600',
            background: 'gray.600',
            color: 'gray.400',
        },
    },
})

export default defineMultiStyleConfig({
    variants: {inflame},
})