import { AbstractDataNode } from '@inflame/models'

describe('tests for various utilities on generic prompt nodes', () => {
    // TODO: Define which of these required -> inputs should make a promptnode (What to map?)

    it.skip('should cast a generic prompt node to a specific type', () => {
        const dataNode: AbstractDataNode = {
            name: 'BasicScheduler',
            description: '',
            category: 'sampling/custom_sampling/schedulers',
            label: 'BasicScheduler',
            input: {
                required: {
                    model: ['MODEL'],
                    scheduler: [
                        [
                            'normal',
                            'karras',
                            'exponential',
                            'sgm_uniform',
                            'simple',
                            'ddim_uniform',
                        ],
                    ],
                    steps: [
                        'INT',
                        {
                            default: 20,
                            min: 1,
                            max: 10000,
                        },
                    ],
                    denoise: [
                        'FLOAT',
                        {
                            default: 1,
                            min: 0,
                            max: 1,
                            step: 0.01,
                        },
                    ],
                },
            },
            dependent: false,
            output: [
                {
                    type: 'SIGMAS',
                    label: 'SIGMAS',
                },
            ],
        }

        // const castedNode = typeDataNode({
        //     id: "1",
        //     node: dataNode,
        //     mapper: mapComfyuiDataNodeAsGenericPromptNode,
        //     definition: {
        //         state: {
        //             steps: {
        //                 value: "int",
        //                 options: {
        //                     min: "number",
        //                     max: "number",
        //                     default: "number",
        //                 }
        //             },
        //             denoise: {
        //                 value: "float",
        //                 options: {
        //                     min: "number",
        //                     max: "number",
        //                     default: "number",
        //                     step: "number",
        //                 }
        //             },
        //             scheduler: "array",
        //         },
        //         inputs: {
        //             model: "link",
        //             scheduler: "link",
        //             steps: "link",
        //             denoise: "link"
        //         },
        //         outputs: {
        //             SIGMAS: "link"
        //         },
        //         stateInputs: undefined,
        //     }
        // })
        //
        // expect(castedNode?.id).toEqual("1")
        // expect(castedNode?.classtype).toEqual("BasicScheduler")
        // expect(castedNode?.inputs?.model).toEqual(undefined)
        // expect(castedNode?.inputs?.steps).toEqual(undefined)
        // expect(castedNode?.inputs?.scheduler).toEqual(undefined)
        // expect(castedNode?.inputs?.denoise).toEqual(undefined)
        // expect(castedNode?.state.denoise?.value).toEqual(undefined)
        // expect(castedNode?.state.denoise?.options?.default).toEqual(undefined)
        // expect(castedNode?.state.denoise?.options?.min).toEqual(undefined)
        // expect(castedNode?.state.denoise?.options?.max).toEqual(undefined)
        // expect(castedNode?.state.denoise?.options?.step).toEqual(undefined)
        // expect(castedNode?.state.scheduler).toEqual(["normal", "karras", "exponential", "sgm_uniform", "simple", "ddim_uniform"])
        // expect(castedNode?.state.steps?.value).toEqual(undefined)
        // expect(castedNode?.state.steps?.options?.max).toEqual(undefined)
        // expect(castedNode?.state.steps?.options?.min).toEqual(undefined)
        // expect(castedNode?.state.steps?.options?.default).toEqual(undefined)
        // expect(castedNode?.outputs.SIGMAS?.slot).toEqual(undefined)
        // expect(castedNode?.outputs.SIGMAS?.id).toEqual(undefined)
        // expect(castedNode?.outputs.SIGMAS?.kind).toEqual(undefined)
    })
})
