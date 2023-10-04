import {PromptNodeTypeCreator, PromptNodeFields, PromptNodeLink} from "./prompt-node.ts";

type TestNodeInputs = {
    testInput: PromptNodeLink
}

type TestNodeState = {
    testData: string
}

type TestNodeOutputs = {
    testOutput: PromptNodeLink
}

const TestNode = (props: PromptNodeFields<TestNodeState>) => {
    const { id } = props

    return PromptNodeTypeCreator<TestNodeState, TestNodeInputs, TestNodeOutputs>(
        {
            id,
            initialState: {
                testData: ""
            }
        },
        "TestNode",
        undefined,
        {
            testOutput: {
                id,
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

        expect(node.getOutputs()).toEqual({
            testOutput: {
                id: "1",
                slot: 0,
            }
        })
    })
});