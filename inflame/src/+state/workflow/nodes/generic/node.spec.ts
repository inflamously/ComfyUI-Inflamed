import {PromptNode, PromptNodeFields, PromptNodeLink} from "./node.ts";

type TestNodeState = {
    testData: string
}

const TestNode = (props: PromptNodeFields<TestNodeState>) => {
    return PromptNode<
        {
            testOutput: PromptNodeLink
        },
        TestNodeState,
        {
            testInput: PromptNodeLink
        }
    >(
        {
            id: props.id,
            initialState: {
                testData: ""
            }
        },
        "TestNode",
        {
            testOutput: {}
        }
    )
}

describe('test nodes and their generic functionality', function () {
    it('can retrieve node outputs properly', () => {
        const node = TestNode({
            id: "1"
        })

        expect(node.getOutputs()).toEqual({
            testOutput: {
                id: "1",
                slot: 0,
            }
        })
    })
});