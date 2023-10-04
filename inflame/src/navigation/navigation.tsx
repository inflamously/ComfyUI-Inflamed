import {NavLink} from "react-router-dom";
import {LinkBox} from "@chakra-ui/react";
import "./navigation.css"

const NavigationBarItem = (props: {
    label: string,
    link: string,
}) => {
    const {link, label} = props

    return <li>
        <LinkBox>
            <NavLink to={link} className={({isActive}) => [
                isActive ? "active" : ""
            ].join(" ")}>{label}</NavLink>
        </LinkBox>
    </li>
}

const NavigationBar = () => {
    return <nav>
        <ul>
            <NavigationBarItem label="Home" link="/"/>
            <NavigationBarItem label="Debug" link="debug"/>
        </ul>
    </nav>
}

export default NavigationBar