type EventWithFileList = {
    target: {
        files: FileList
    }
}

export const hasFilelistProperty = (v: unknown): v is EventWithFileList => {
    return typeof v === "object" && v !== null && (v as EventWithFileList).target.files !== undefined
}

export const isFileList = (v: unknown): v is FileList => {
    return (v as FileList).item !== undefined && (v as FileList).length !== undefined
}

export const fileUpload = async (files: File | FileList, url: string, key: string): Promise<Response[]> => {
    const filesToUpload = isFileList(files) ? Array.from(files) : [files]
    const results = []

    for (const file of filesToUpload) {
        const formData = new FormData();
        formData.set(key, file)
        const res = await fetch(url, {
            method: "POST",
            body: formData
        })
        results.push(res);
    }
    return results;
}

export function localFileload(
    file: File,
    readAs: "binaryString" | "dataUrl" | "text" | "arrayBuffer"
): Promise<string | ArrayBuffer | null> {
    return new Promise((res, rej) => {
        const reader = new FileReader()

        const clearFileEvents = () => {
            reader.removeEventListener("error", handleFileEventError);
            reader.removeEventListener("load", handleFileEventDone);
            reader.removeEventListener("abort", handleFileEventAbort);
        }

        const handleFileEventDone = (ev: ProgressEvent<FileReader>) => {
            if (!ev.target) {
                clearFileEvents()
                rej(null);
            }

            if (ev.target?.readyState === FileReader.DONE) {
                clearFileEvents()
                res(ev.target?.result)
            }
        }

        const handleFileEventError = (ev: ProgressEvent<FileReader>) => {
            clearFileEvents()
            rej(ev.target?.error)
        }

        const handleFileEventAbort = () => {
            clearFileEvents()
            rej(null)
        }

        reader.addEventListener("error", handleFileEventError)
        reader.addEventListener("load", handleFileEventDone)
        reader.addEventListener("abort", handleFileEventAbort)

        readAs === "dataUrl" && reader.readAsDataURL(file)
        readAs === "binaryString" && reader.readAsBinaryString(file)
        readAs === "text" && reader.readAsText(file)
        readAs === "arrayBuffer" && reader.readAsArrayBuffer(file)
    })
}