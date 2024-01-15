import {NavLink} from "react-router-dom";
import {
    Box,
    Button,
    LinkBox,
    List,
    ListItem,
    Popover,
    PopoverArrow, PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Portal
} from "@chakra-ui/react";
import {HamburgerIcon} from '@chakra-ui/icons'
import "./navigation.css"
import {useCallback, useContext} from "react";
import {DataStoreContext} from "../data-store/data-store.hooks.tsx";

const NavigationBarItem = (props: {
    label: string,
    link: string,
}) => {
    const {link, label} = props

    return <ListItem>
        <LinkBox>
            <NavLink to={link} className={({isActive}) => [
                isActive ? "active" : ""
            ].join(" ")}>{label}</NavLink>
        </LinkBox>
    </ListItem>
}

const NavigationHeaderMenuItem = (props: {
    label: string,
    action?: () => void
}) => {
    const {label, action} = props
    const actionHandler = useCallback(() => action?.(), [action])

    return <ListItem>
        <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
        >
            {label}
            {
                action &&
                <Button variant="menu" onClick={actionHandler}>Run</Button>
            }
        </Box>
    </ListItem>
}

const NavigationHeaderMenu = () => {
    const dataStore = useContext(DataStoreContext)
    const clearHandler = useCallback(() => {
        dataStore?.clear()
    }, [dataStore])

    return <Popover
        size="menu"
        offset={[-70, 10]}
        lazyBehavior={"unmount"}
    >
        <PopoverTrigger>
            <Button h={8}><HamburgerIcon/></Button>
        </PopoverTrigger>
        <Portal>
            <PopoverContent>
                <PopoverArrow/>
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
}

const NavigationHeader = () => {
    return <>
        <List
            pb={4}
            display="flex"
            flexDir="row"
            alignItems="center"
            justifyContent="space-between"
            columnGap={4}
        >
            <ListItem>Logo</ListItem>
            <ListItem>
                <NavigationHeaderMenu/>
            </ListItem>
        </List>
    </>
}

const NavigationBar = () => {
    return <nav>
        <NavigationHeader></NavigationHeader>
        <List pb={4}>
            <NavigationBarItem label="Home" link="/"/>
            <NavigationBarItem label="Debug" link="debug"/>
        </List>
    </nav>
}

export default NavigationBar