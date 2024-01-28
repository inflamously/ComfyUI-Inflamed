export type ImageDTO = {
    image: ReadableStream<Uint8Array> | null,
    url: string
}