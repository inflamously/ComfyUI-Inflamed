import {RouteObject} from "react-router-dom";
import {createContext} from "react";
import {Routing} from "./router.tsx";

type Routes = (string | undefined)[]

export const routerPaths = () => {
    const paths: (string | undefined)[] = []

    const queryPaths = (routes: RouteObject[], path: string) => {
        routes.forEach(route => {
            const fullpath = `${path}${route.path}`
            paths.push(fullpath)
            if (route.children && route.children.length > 0) {
                queryPaths(route.children, fullpath)
            }
        })
    }

    queryPaths(Routing.routes, "")

    return paths
}

export const RoutePathsContext = createContext<Routes | undefined>(undefined)