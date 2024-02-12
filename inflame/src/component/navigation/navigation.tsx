import {NavLink} from "react-router-dom";
import {
    LinkBox,
    List,
    ListItem,
} from "@chakra-ui/react";
import "./navigation.css"
import NavigationHeaderMenu from "./navigation-menu.tsx";

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
            <NavigationBarItem label="Prompt Editor" link="editor"/>
        </List>
    </nav>
}

export default NavigationBar