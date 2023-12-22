import {ViewQueryDTO} from "@inflame/models";
import {comfyApi} from "@inflame/state";
import {useEffect, useState} from "react";

export const fetchViewImage = (props: ViewQueryDTO): [Promise<Response>, string] => {
    const {filename, type} = props;
    const url = `${comfyApi.url}view?filename=${filename}&type=${type}`
    return [
        fetch(url, {
            method: 'GET',
        }),
        url
    ]
}

export const useGetViewImage = (props: ViewQueryDTO): [ReadableStream<Uint8Array> | null, string] => {
    const {filename, type} = props;
    const [image, setImage] = useState<ReadableStream<Uint8Array> | null>(null)
    const [url, setUrl] = useState<string>(`${comfyApi.url}view?filename=${filename}&type=${type}`)

    useEffect(() => {
        const [fetcher, url] = fetchViewImage(props)
        setUrl(url);
        fetcher.then((response) => {
            if (!response?.ok) {
                return;
            }
            setImage(response.body)
        }).catch((error) => {
            console.error(error)
            setImage(null);
        })
    }, [filename, type]);

    return [image, url]
}