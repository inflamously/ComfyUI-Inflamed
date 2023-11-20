import {PromptNodeTypeCreator, PromptNodeFields} from "./prompt-node.ts";
import {BindValueLink} from "./prompt-node-connection-value.ts";

type TestNodeInputs = {
    testInput: BindValueLink
}

type TestNodeState = {
    testData: string
}

type TestNodeOutputs = {
    testOutput: BindValueLink
}

const TestNode = (props: PromptNodeFields<TestNodeState>) => {
    const {id} = props

    return PromptNodeTypeCreator<TestNodeState, TestNodeInputs, TestNodeOutputs>(
        {
            id,
            initialState: {
                testData: ""
            }
        },
        "TestNode",
        {
            outputs: {
                testOutput: {
                    id,
                    kind: "link",
                    slot: 0
                }
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
                kind: "link",
                slot: 0,
            }
        })
    })
});