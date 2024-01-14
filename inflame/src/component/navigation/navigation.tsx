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
                <Popover
                    size="menu"
                    offset={[-60, 10]}
                    lazyBehavior={"unmount"}
                >
                    <PopoverTrigger>
                        <Button h={8}></Button>
                    </PopoverTrigger>
                    <Portal>
                        <PopoverContent>
                            <PopoverArrow/>
                            <PopoverBody>
                                <Box>
                                    <HamburgerIcon></HamburgerIcon>
                                </Box>
                            </PopoverBody>
                        </PopoverContent>
                    </Portal>
                </Popover>
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