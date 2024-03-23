import { Button, Flex } from '@chakra-ui/react'

const NodeDelete = (props: { onDelete?: () => void }) => {
    const { onDelete } = props

    return <Button onClick={onDelete}>X</Button>
}

export const NodeToolbar = (props: { onDelete?: () => void }) => {
    const { onDelete } = props

    return (
        <Flex direction="row" pb={4} justifyContent="flex-end">
            <NodeDelete onDelete={onDelete} />
        </Flex>
    )
}
