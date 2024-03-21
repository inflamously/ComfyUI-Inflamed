import { useCallback, useContext } from 'react'
import { DataStoreContext } from '../data-store/data-store.hooks.tsx'
import {
    Box,
    Button,
    List,
    ListItem,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Portal,
    useDisclosure,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'

const NavigationHeaderMenuItem = (props: { label: string; action?: () => void }) => {
    const { label, action } = props
    const actionHandler = useCallback(() => action?.(), [action])

    return (
        <ListItem>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                {label}
                {action && (
                    <Button variant="menu" onClick={actionHandler}>
                        Run
                    </Button>
                )}
            </Box>
        </ListItem>
    )
}

const NavigationHeaderMenu = () => {
    const dataStore = useContext(DataStoreContext)
    const { isOpen, onToggle: Toggle, onClose: Close } = useDisclosure()

    const clearHandler = useCallback(() => {
        dataStore?.clear()
        Close()
    }, [Close, dataStore])

    return (
        <Popover
            size="menu"
            offset={[-70, 10]}
            lazyBehavior={'unmount'}
            isOpen={isOpen}
            onClose={Close}
        >
            <PopoverTrigger>
                <Button h={8} onClick={Toggle}>
                    <HamburgerIcon />
                </Button>
            </PopoverTrigger>
            <Portal>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverBody>
                        <List>
                            <NavigationHeaderMenuItem
                                label="Clear Storage"
                                action={clearHandler}
                            ></NavigationHeaderMenuItem>
                        </List>
                    </PopoverBody>
                </PopoverContent>
            </Portal>
        </Popover>
    )
}

export default NavigationHeaderMenu
