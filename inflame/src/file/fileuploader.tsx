import {Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Text, useBoolean} from "@chakra-ui/react";
import {ChangeEventHandler, useCallback, useReducer, useState} from "react";
import {validateFiles} from "./validators.ts";
import {errorReducer, ErrorStateActionReset} from "../error/error.ts";
import {MIME_TYPES} from "./mimetypes.ts";
import {fileUpload, hasFilelistProperty} from "./fileutils.ts";
import FileDisplay from "./filedisplay.tsx";

const ErrorStateActionFiletypeInvalid = "filetype.invalid"
const ErrorStateActionUploadFailed = "fileupload.failed"

const Fileuploader = (
    props: {
        fileTypes: MIME_TYPES[]
    }
) => {
    const {fileTypes} = props
    const [files, setFiles] = useState<FileList | null>(null)
    const [allowedFiletypes,] = useState<string[]>(fileTypes)
    const [isLoading, {toggle: toggleLoading}] = useBoolean(false)
    const [state, dispatchError] = useReducer(
        errorReducer(
            [
                {
                    type: ErrorStateActionFiletypeInvalid,
                    message: "Invalid filetype for provided file"
                },
                {
                    type: ErrorStateActionUploadFailed,
                    message: "File upload failed"
                }
            ]
        ), {
            invalid: false,
            message: null,
            additionalMessage: null
        })
    const validator = useCallback((filelist: FileList) => validateFiles(allowedFiletypes)(filelist), [allowedFiletypes])

    const handleFileSelect: ChangeEventHandler<HTMLInputElement> = (ev) => {
        if (hasFilelistProperty(ev)) {
            const filelist = ev.target.files as FileList;
            if (validator(filelist)) {
                dispatchError({type: ErrorStateActionReset})
                setFiles(filelist)
            } else {
                dispatchError({type: ErrorStateActionFiletypeInvalid})
            }
        }
    }

    const handleUpload = () => {
        if (files) {
            toggleLoading();
            fileUpload(
                files,
                "http://127.0.0.1:8188/upload/image",
                "image"
            ).then((results) => {
                toggleLoading();
                if (results.every((r) => r.ok)) {
                    dispatchError({
                        type: ErrorStateActionReset
                    })
                    return;
                }
                dispatchError({
                    type: ErrorStateActionUploadFailed,
                    payload: {
                        additionalMessage: results.map((r) => r.statusText).join(", ")
                    }
                })
            })
        }
    }

    return (
        <FormControl mb={4} isInvalid={state.invalid}>
            <Box mb={4}>
                <FormLabel cursor="pointer" htmlFor="fileuploader" m={0} mb={4}
                           onClick={() => dispatchError({type: ErrorStateActionReset})}>
                    <Box p={4} border="2px" borderColor="gray.300">
                        <Text>File Upload</Text>
                    </Box>
                </FormLabel>
                <FileDisplay mb={files ? 4 : 0} files={files ?? null}/>
                <Button
                    isDisabled={!files}
                    isLoading={isLoading}
                    onClick={handleUpload}
                >Upload</Button>
            </Box>
            <FormErrorMessage>{state.message}</FormErrorMessage>
            <Input
                display="none"
                id="fileuploader"
                onChange={handleFileSelect}
                type="file"
                multiple={true}
            />
        </FormControl>
    )
}

export default Fileuploader