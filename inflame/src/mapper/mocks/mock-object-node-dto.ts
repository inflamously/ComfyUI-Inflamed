import {ObjectNodeDTO} from "@inflame/models";

export const MOCK_OBJECT_NODE_DTO: ObjectNodeDTO = {
    input: {
        required: {
            model: [
                "MODEL"
            ],
            scheduler: [
                [
                    "normal",
                    "karras",
                    "exponential",
                    "sgm_uniform",
                    "simple",
                    "ddim_uniform"
                ]
            ],
            steps: [
                "INT",
                {
                    default: 20,
                    min: 1,
                    max: 10000
                }
            ]
        }
    },
    output: [
        "SIGMAS"
    ],
    output_is_list: [
        false
    ],
    output_name: [
        "SIGMAS"
    ],
    name: "BasicScheduler",
    display_name: "BasicScheduler",
    description: "",
    category: "sampling/custom_sampling",
    output_node: false
}

export const RESULT_MOCK_DATA_NODE = {
    BasicScheduler: {
        category: "sampling/custom_sampling",
        dependent: false,
        description: "",
        input: {
            required: {
                model: [
                    "MODEL"
                ],
                scheduler: [
                    [
                        "normal",
                        "karras",
                        "exponential",
                        "sgm_uniform",
                        "simple",
                        "ddim_uniform"
                    ]
                ],
                steps: [
                    "INT",
                    {
                        default: 20,
                        max: 10000,
                        min: 1
                    }
                ]
            }
        },
        label: "BasicScheduler",
        name: "BasicScheduler",
        output: [
            {
                label: "SIGMAS",
                type: "SIGMAS"
            }
        ]
    }
}
export const RESULT_MOCK_ABSTRACT_PROMPT_NODE = RESULT_MOCK_DATA_NODE["BasicScheduler"]