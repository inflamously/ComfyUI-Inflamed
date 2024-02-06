import {ViewQueryDTO} from "@inflame/models";
import {comfyApi} from "@inflame/state";
import {useEffect, useState} from "react";
import {ImageDTO} from "../../../+models/dto/image.dto.ts";

type FetchViewImageClient = {
    client: Promise<Response>,
    url: string,
}

export const fetchViewImage = (props: ViewQueryDTO): Partial<FetchViewImageClient> => {
    const {filename, type} = props;
    if (!filename || filename.length <= 0 || !type || type.length <= 0) {
        console.warn(`Invalid filename "${filename}" with type "${type}" provided.`)
        return {
            client: undefined,
            url: undefined
        }
    }

    const url = `${comfyApi.url}view?filename=${filename}&type=${type}`
    return {
        client: fetch(url, {
            method: 'GET',
        }),
        url,
    }
}

export const useComfyuiImage = (props: ViewQueryDTO): Partial<ImageDTO> => {
    const {filename, type} = props;

    const [image, setImage] = useState<ReadableStream<Uint8Array> | null>(null)
    const [url, setUrl] = useState<string>("")

    useEffect(() => {
        const {client: fetchedClient, url: fetchedUrl} = fetchViewImage({
            filename,
            type
        })

        fetchedClient?.then((value) => value && setImage(value.body)).catch(() => setImage(null))
        setUrl(fetchedUrl ?? "")
    }, [filename, type]);

    return {image, url}
}