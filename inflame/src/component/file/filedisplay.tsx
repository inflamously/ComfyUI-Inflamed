import {Box, Image, StyleProps, Text} from "@chakra-ui/react";
import {MIME_TYPE_IMAGE, MIME_TYPES} from "./mimetypes.ts";
import {useCallback, useEffect, useState} from "react";
import {localFileload} from "./fileutils.ts";

type FileReaderMode = "binaryString" | "dataUrl"
type FileReaderResult<T> =
    T extends "binaryString" ? string[] :
        T extends "dataUrl" ? string[] :
            ArrayBuffer[]

const useLocalFilereader = <T extends FileReaderMode>(props: {
    files: FileList | null,
}): FileReaderResult<T> => {
    const {files} = props
    const [loadedFiles, setLoadedFiles] = useState<Array<string | ArrayBuffer | null>>([])

    useEffect(() => {
        // Read files only when available
        if (!files) {
            return () => {
                // Continue nothing to destroy
            }
        }

        // Reset files
        setLoadedFiles([]);

        Promise.allSettled(
            Array.from(files).map(async (f) => await localFileload(f, "dataUrl"))
        ).then((values) => {
            values.forEach((res) => {
                if (res.status === "fulfilled" && res.value !== null) {
                    setLoadedFiles((files) => [...files, res.value])
                } else if (res.status === "rejected") {
                    // TODO: Handle error
                }
            });
        });
    }, [files])

    return loadedFiles as FileReaderResult<T>
}

const FileDisplay = (
    props: {
        files: FileList | null,
    } & StyleProps,
) => {
    const {files, } = props
    const loadedFiles = useLocalFilereader({
        files,
    });

    const fileDisplay = useCallback(() =>
        Array.from(files ?? []).map((f, index) => {
            let component = <Text></Text>

            if ((f.type as MIME_TYPES) === "image/png" || (f.type as MIME_TYPE_IMAGE) === "image/png") {
                component = <Image src={loadedFiles[index]}
                                   width="clamp(64px, 12vw, 128px)"
                                   objectFit="cover"/>
            }

            return <Box
                key={index}
                overflow="hidden"
                flexBasis="clamp(64px, 12vw, 128px)"
                height="clamp(64px, 12vw, 128px)"
            >
                {component && component}
            </Box>
        }), [files, loadedFiles])

    return <Box display="flex"
                gap={2}
                mb={props.mb}>
        {
            files && loadedFiles && fileDisplay()
        }
    </Box>
}

export default FileDisplay