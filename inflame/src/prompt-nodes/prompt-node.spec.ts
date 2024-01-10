import {createPromptNode} from "./prompt-node.ts";
import {BindValueLink, NodeTypeDefinition, PromptNodeFields} from "@inflame/models";

type TestNodeTypeDefinition = NodeTypeDefinition<
    {
        testData: string
    },
    {
        testInput: BindValueLink
    },
    {
        testOutput: BindValueLink
    },
    never
>

// TODO: Test some state inputs
const TestNode = (props: PromptNodeFields<TestNodeTypeDefinition["state"]>) => {
    const {id} = props

    return createPromptNode<TestNodeTypeDefinition>(
        {
            id,
            initialState: {
                testData: ""
            }
        },
        "TestNode",
        {
            testInput: null
        },
        {
            testOutput: {
                id,
                kind: "link",
                slot: 0
            }
        }
    )
}

describe('test nodes and their generic functionality', function () {
    it('can retrieve node outputs properly', () => {
        const node = TestNode({
            id: "1",
            initialState: {
                testData: ""
            }
        })

        expect(node.outputs).toEqual({
            testOutput: {
                id: "1",
                kind: "link",
                slot: 0,
            }
        })
    })
});