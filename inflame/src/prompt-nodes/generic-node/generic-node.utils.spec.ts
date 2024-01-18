import {typeMapGenericPromptNode} from "./generic-node.utils.ts";
import {AbstractDataNode} from "@inflame/models";

describe("tests for various utilities on generic prompt nodes", () => {
    it('should cast a generic prompt node to a specific type', () => {
        const dataNode: AbstractDataNode = {
            name: 'BasicScheduler',
            description: '',
            category: 'sampling/custom_sampling/schedulers',
            label: 'BasicScheduler',
            input: {
                required: {
                    model: [
                        'MODEL'
                    ],
                    scheduler: [
                        [
                            'normal',
                            'karras',
                            'exponential',
                            'sgm_uniform',
                            'simple',
                            'ddim_uniform'
                        ]
                    ],
                    steps: [
                        'INT',
                        {
                            'default': 20,
                            min: 1,
                            max: 10000
                        }
                    ],
                    denoise: [
                        'FLOAT',
                        {
                            'default': 1,
                            min: 0,
                            max: 1,
                            step: 0.01
                        }
                    ]
                }
            },
            dependent: false,
            output: [
                {
                    type: 'SIGMAS',
                    label: 'SIGMAS'
                }
            ]
        }

        const castedNode = typeMapGenericPromptNode("1", dataNode, {
            state: {
                steps: "int",
                denoise: "float",
                scheduler: "array",
            },
            inputs: {
                model: "link",
                scheduler: "string",
                steps: "link",
                denoise: "link"
            },
            outputs: {
                SIGMAS: "link"
            },
            stateInputs: undefined,
        })

        expect(castedNode?.id).toEqual("1")
        expect(castedNode?.classtype).toEqual("BasicScheduler")
        expect(castedNode?.inputs?.model).toEqual(undefined)
        expect(castedNode?.inputs?.steps).toEqual(undefined)
        expect(castedNode?.inputs?.scheduler).toEqual(undefined)
        expect(castedNode?.inputs?.denoise).toEqual(undefined)
        expect(castedNode?.state.denoise?.default).toEqual(undefined)
        expect(castedNode?.state.denoise?.min).toEqual(undefined)
        expect(castedNode?.state.denoise?.max).toEqual(undefined)
        expect(castedNode?.state.denoise?.step).toEqual(undefined)
        expect(castedNode?.state.scheduler).toEqual( ["normal", "karras", "exponential", "sgm_uniform", "simple", "ddim_uniform"])
        expect(castedNode?.state.steps?.max).toEqual(undefined)
        expect(castedNode?.state.steps?.min).toEqual(undefined)
        expect(castedNode?.state.steps?.default).toEqual(undefined)
        expect(castedNode?.outputs.SIGMAS?.slot).toEqual(undefined)
        expect(castedNode?.outputs.SIGMAS?.id).toEqual(undefined)
        expect(castedNode?.outputs.SIGMAS?.kind).toEqual(undefined)
    })
})