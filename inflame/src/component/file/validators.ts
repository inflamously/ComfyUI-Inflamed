export const validateFiles = (
    allowedFiletypes: string[]
) => (
    filelist: FileList
) => {
    return Array.from(filelist).some((file) => allowedFiletypes.some((allowedType) => file.type === allowedType))
}