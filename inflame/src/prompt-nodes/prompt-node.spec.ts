import {createPromptNode, PromptNodeFields} from "./prompt-node.ts";
import {BindValueLink} from "./prompt-node-connection-value.model.ts";

type TestNodeInputs = {
    testInput: BindValueLink
}

type TestNodeState = {
    testData: string
}

type TestNodeOutputs = {
    testOutput: BindValueLink
}

type TestNodeStateInputs = never

// TODO: Test some state inputs
const TestNode = (props: PromptNodeFields<TestNodeState>) => {
    const {id} = props

    return createPromptNode<TestNodeState, TestNodeInputs, TestNodeOutputs, TestNodeStateInputs>(
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