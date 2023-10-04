const PreviewImageNode = (
    props: {
        src: string,
    }
) => {
    const { src } = props;

    return (
        <>
            <img src={src} alt="Preview image" />
        </>
    )
}

export default PreviewImageNode