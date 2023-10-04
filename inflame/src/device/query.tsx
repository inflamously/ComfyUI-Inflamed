import {useMediaQuery} from "@chakra-ui/react";

export const useMediaDesktop = () => {
    const [isDesktop] = useMediaQuery([
        "(min-width: 768px)"
    ]);

    return isDesktop
}