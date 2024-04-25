### API Declaration

| Key                                                          | Desc                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| client_id                                                    | Websocket Communication ID for ComfyUI Server to push invoke & processing data |
| prompt                                                       | ComfyUI workflow which gets validated upon request and processed if valid, some nodes send an "executed" Websocket event which upon listening spits output data the be parsed / download for client (eg. Images) |
| prompt -> "<ID>"                                             | Each prompt node has an unique ID which autoincrements upon creation in the ComfyUI Editor |
| inputs                                                       | Inputs which are implemented in each specific node class     |
| class_type                                                   | The nodes class which is the same name as in python script defined |
| node property with array: (eg. "model": ["4", 0]) in Node's input | This is the link from given Node (eg. KSampler -> inputs -> model) to the dependent Nodes output.<br />Array [0] represents linked Node to be retrieving data from<br />Array [1] represnets the Dataslot from linked Node<br />(eg. "model": ["4", 0] -> Node with ID "4" -> inputs -> ckpt_name) |

```json
{
    "client_id": "3afec3cdae084211a0fc37a54898f066",
    "prompt": {
        "3": {
            "inputs": {
                "seed": 81342415954818,
                "steps": 40,
                "cfg": 8,
                "sampler_name": "dpmpp_3m_sde_gpu",
                "scheduler": "karras",
                "denoise": 1,
                "model": [
                    "4",
                    0
                ],
                "positive": [
                    "6",
                    0
                ],
                "negative": [
                    "7",
                    0
                ],
                "latent_image": [
                    "5",
                    0
                ]
            },
            "class_type": "KSampler"
        },
        "4": {
            "inputs": {
                "ckpt_name": "anythingfurry_1.safetensors"
            },
            "class_type": "CheckpointLoaderSimple"
        },
        "5": {
            "inputs": {
                "width": 768,
                "height": 768,
                "batch_size": 1
            },
            "class_type": "EmptyLatentImage"
        },
        "6": {
            "inputs": {
                "text": "beautiful scenery nature glass bottle landscape, , purple galaxy bottle,",
                "clip": [
                    "4",
                    1
                ]
            },
            "class_type": "CLIPTextEncode"
        },
        "7": {
            "inputs": {
                "text": "text, watermark",
                "clip": [
                    "4",
                    1
                ]
            },
            "class_type": "CLIPTextEncode"
        },
        "8": {
            "inputs": {
                "samples": [
                    "3",
                    0
                ],
                "vae": [
                    "4",
                    2
                ]
            },
            "class_type": "VAEDecode"
        },
        "9": {
            "inputs": {
                "filename_prefix": "ComfyUI",
                "images": [
                    "8",
                    0
                ]
            },
            "class_type": "SaveImage"
        }
    },
}
```

---

#### Object Info

````json
{
    "KSampler": {
        "input": {
            "required": {
                "model": [
                    "MODEL"
                ],
                "seed": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 18446744073709551615
                    }
                ],
                "steps": [
                    "INT",
                    {
                        "default": 20,
                        "min": 1,
                        "max": 10000
                    }
                ],
                "cfg": [
                    "FLOAT",
                    {
                        "default": 8.0,
                        "min": 0.0,
                        "max": 100.0,
                        "step": 0.5,
                        "round": 0.01
                    }
                ],
                "sampler_name": [
                    [
                        "euler",
                        "euler_ancestral",
                        "heun",
                        "dpm_2",
                        "dpm_2_ancestral",
                        "lms",
                        "dpm_fast",
                        "dpm_adaptive",
                        "dpmpp_2s_ancestral",
                        "dpmpp_sde",
                        "dpmpp_sde_gpu",
                        "dpmpp_2m",
                        "dpmpp_2m_sde",
                        "dpmpp_2m_sde_gpu",
                        "dpmpp_3m_sde",
                        "dpmpp_3m_sde_gpu",
                        "ddpm",
                        "ddim",
                        "uni_pc",
                        "uni_pc_bh2"
                    ]
                ],
                "scheduler": [
                    [
                        "normal",
                        "karras",
                        "exponential",
                        "sgm_uniform",
                        "simple",
                        "ddim_uniform"
                    ]
                ],
                "positive": [
                    "CONDITIONING"
                ],
                "negative": [
                    "CONDITIONING"
                ],
                "latent_image": [
                    "LATENT"
                ],
                "denoise": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": 0.0,
                        "max": 1.0,
                        "step": 0.01
                    }
                ]
            }
        },
        "output": [
            "LATENT"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "LATENT"
        ],
        "name": "KSampler",
        "display_name": "KSampler",
        "description": "",
        "category": "sampling",
        "output_node": false
    },
    "CheckpointLoaderSimple": {
        "input": {
            "required": {
                "ckpt_name": [
                    [
                        "anythingfurry_1.safetensors",
                        "bb95FurryMix_v100.safetensors",
                        "bb95FurryMix_v110.safetensors",
                        "bb95FurryMix_v80.safetensors",
                        "indigoFurryMix_v45Hybrid.safetensors",
                        "pirsusEpicRealism_v21.safetensors",
                        "pirsusEpicRealism_v25.safetensors",
                        "r34zoroj-step00001300.safetensors",
                        "sd_xl_base_1.0.safetensors",
                        "sd_xl_base_1.0_0.9vae.safetensors",
                        "sd_xl_refiner_1.0.safetensors",
                        "yiffymix_V33.safetensors"
                    ]
                ]
            }
        },
        "output": [
            "MODEL",
            "CLIP",
            "VAE"
        ],
        "output_is_list": [
            false,
            false,
            false
        ],
        "output_name": [
            "MODEL",
            "CLIP",
            "VAE"
        ],
        "name": "CheckpointLoaderSimple",
        "display_name": "Load Checkpoint",
        "description": "",
        "category": "loaders",
        "output_node": false
    },
    "CLIPTextEncode": {
        "input": {
            "required": {
                "text": [
                    "STRING",
                    {
                        "multiline": true
                    }
                ],
                "clip": [
                    "CLIP"
                ]
            }
        },
        "output": [
            "CONDITIONING"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "CONDITIONING"
        ],
        "name": "CLIPTextEncode",
        "display_name": "CLIP Text Encode (Prompt)",
        "description": "",
        "category": "conditioning",
        "output_node": false
    },
    "CLIPSetLastLayer": {
        "input": {
            "required": {
                "clip": [
                    "CLIP"
                ],
                "stop_at_clip_layer": [
                    "INT",
                    {
                        "default": -1,
                        "min": -24,
                        "max": -1,
                        "step": 1
                    }
                ]
            }
        },
        "output": [
            "CLIP"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "CLIP"
        ],
        "name": "CLIPSetLastLayer",
        "display_name": "CLIP Set Last Layer",
        "description": "",
        "category": "conditioning",
        "output_node": false
    },
    "VAEDecode": {
        "input": {
            "required": {
                "samples": [
                    "LATENT"
                ],
                "vae": [
                    "VAE"
                ]
            }
        },
        "output": [
            "IMAGE"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "IMAGE"
        ],
        "name": "VAEDecode",
        "display_name": "VAE Decode",
        "description": "",
        "category": "latent",
        "output_node": false
    },
    "VAEEncode": {
        "input": {
            "required": {
                "pixels": [
                    "IMAGE"
                ],
                "vae": [
                    "VAE"
                ]
            }
        },
        "output": [
            "LATENT"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "LATENT"
        ],
        "name": "VAEEncode",
        "display_name": "VAE Encode",
        "description": "",
        "category": "latent",
        "output_node": false
    },
    "VAEEncodeForInpaint": {
        "input": {
            "required": {
                "pixels": [
                    "IMAGE"
                ],
                "vae": [
                    "VAE"
                ],
                "mask": [
                    "MASK"
                ],
                "grow_mask_by": [
                    "INT",
                    {
                        "default": 6,
                        "min": 0,
                        "max": 64,
                        "step": 1
                    }
                ]
            }
        },
        "output": [
            "LATENT"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "LATENT"
        ],
        "name": "VAEEncodeForInpaint",
        "display_name": "VAE Encode (for Inpainting)",
        "description": "",
        "category": "latent/inpaint",
        "output_node": false
    },
    "VAELoader": {
        "input": {
            "required": {
                "vae_name": [
                    [
                        "vae-ft-mse-840000-ema-pruned.safetensors"
                    ]
                ]
            }
        },
        "output": [
            "VAE"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "VAE"
        ],
        "name": "VAELoader",
        "display_name": "Load VAE",
        "description": "",
        "category": "loaders",
        "output_node": false
    },
    "EmptyLatentImage": {
        "input": {
            "required": {
                "width": [
                    "INT",
                    {
                        "default": 512,
                        "min": 16,
                        "max": 8192,
                        "step": 8
                    }
                ],
                "height": [
                    "INT",
                    {
                        "default": 512,
                        "min": 16,
                        "max": 8192,
                        "step": 8
                    }
                ],
                "batch_size": [
                    "INT",
                    {
                        "default": 1,
                        "min": 1,
                        "max": 4096
                    }
                ]
            }
        },
        "output": [
            "LATENT"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "LATENT"
        ],
        "name": "EmptyLatentImage",
        "display_name": "Empty Latent Image",
        "description": "",
        "category": "latent",
        "output_node": false
    },
    "LatentUpscale": {
        "input": {
            "required": {
                "samples": [
                    "LATENT"
                ],
                "upscale_method": [
                    [
                        "nearest-exact",
                        "bilinear",
                        "area",
                        "bicubic",
                        "bislerp"
                    ]
                ],
                "width": [
                    "INT",
                    {
                        "default": 512,
                        "min": 0,
                        "max": 8192,
                        "step": 8
                    }
                ],
                "height": [
                    "INT",
                    {
                        "default": 512,
                        "min": 0,
                        "max": 8192,
                        "step": 8
                    }
                ],
                "crop": [
                    [
                        "disabled",
                        "center"
                    ]
                ]
            }
        },
        "output": [
            "LATENT"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "LATENT"
        ],
        "name": "LatentUpscale",
        "display_name": "Upscale Latent",
        "description": "",
        "category": "latent",
        "output_node": false
    },
    "LatentUpscaleBy": {
        "input": {
            "required": {
                "samples": [
                    "LATENT"
                ],
                "upscale_method": [
                    [
                        "nearest-exact",
                        "bilinear",
                        "area",
                        "bicubic",
                        "bislerp"
                    ]
                ],
                "scale_by": [
                    "FLOAT",
                    {
                        "default": 1.5,
                        "min": 0.01,
                        "max": 8.0,
                        "step": 0.01
                    }
                ]
            }
        },
        "output": [
            "LATENT"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "LATENT"
        ],
        "name": "LatentUpscaleBy",
        "display_name": "Upscale Latent By",
        "description": "",
        "category": "latent",
        "output_node": false
    },
    "LatentFromBatch": {
        "input": {
            "required": {
                "samples": [
                    "LATENT"
                ],
                "batch_index": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 63
                    }
                ],
                "length": [
                    "INT",
                    {
                        "default": 1,
                        "min": 1,
                        "max": 64
                    }
                ]
            }
        },
        "output": [
            "LATENT"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "LATENT"
        ],
        "name": "LatentFromBatch",
        "display_name": "Latent From Batch",
        "description": "",
        "category": "latent/batch",
        "output_node": false
    },
    "RepeatLatentBatch": {
        "input": {
            "required": {
                "samples": [
                    "LATENT"
                ],
                "amount": [
                    "INT",
                    {
                        "default": 1,
                        "min": 1,
                        "max": 64
                    }
                ]
            }
        },
        "output": [
            "LATENT"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "LATENT"
        ],
        "name": "RepeatLatentBatch",
        "display_name": "Repeat Latent Batch",
        "description": "",
        "category": "latent/batch",
        "output_node": false
    },
    "SaveImage": {
        "input": {
            "required": {
                "images": [
                    "IMAGE"
                ],
                "filename_prefix": [
                    "STRING",
                    {
                        "default": "ComfyUI"
                    }
                ]
            },
            "hidden": {
                "prompt": "PROMPT",
                "extra_pnginfo": "EXTRA_PNGINFO"
            }
        },
        "output": [],
        "output_is_list": [],
        "output_name": [],
        "name": "SaveImage",
        "display_name": "Save Image",
        "description": "",
        "category": "image",
        "output_node": true
    },
    "PreviewImage": {
        "input": {
            "required": {
                "images": [
                    "IMAGE"
                ]
            },
            "hidden": {
                "prompt": "PROMPT",
                "extra_pnginfo": "EXTRA_PNGINFO"
            }
        },
        "output": [],
        "output_is_list": [],
        "output_name": [],
        "name": "PreviewImage",
        "display_name": "Preview Image",
        "description": "",
        "category": "image",
        "output_node": true
    },
    "LoadImage": {
        "input": {
            "required": {
                "image": [
                    [
                        "00168-674399093.png",
                        "00171-3553370909.png",
                        "example.png"
                    ],
                    {
                        "image_upload": true
                    }
                ]
            }
        },
        "output": [
            "IMAGE",
            "MASK"
        ],
        "output_is_list": [
            false,
            false
        ],
        "output_name": [
            "IMAGE",
            "MASK"
        ],
        "name": "LoadImage",
        "display_name": "Load Image",
        "description": "",
        "category": "image",
        "output_node": false
    },
    "LoadImageMask": {
        "input": {
            "required": {
                "image": [
                    [
                        "00168-674399093.png",
                        "00171-3553370909.png",
                        "example.png"
                    ],
                    {
                        "image_upload": true
                    }
                ],
                "channel": [
                    [
                        "alpha",
                        "red",
                        "green",
                        "blue"
                    ]
                ]
            }
        },
        "output": [
            "MASK"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "MASK"
        ],
        "name": "LoadImageMask",
        "display_name": "Load Image (as Mask)",
        "description": "",
        "category": "mask",
        "output_node": false
    },
    "ImageScale": {
        "input": {
            "required": {
                "image": [
                    "IMAGE"
                ],
                "upscale_method": [
                    [
                        "nearest-exact",
                        "bilinear",
                        "area",
                        "bicubic",
                        "lanczos"
                    ]
                ],
                "width": [
                    "INT",
                    {
                        "default": 512,
                        "min": 0,
                        "max": 8192,
                        "step": 1
                    }
                ],
                "height": [
                    "INT",
                    {
                        "default": 512,
                        "min": 0,
                        "max": 8192,
                        "step": 1
                    }
                ],
                "crop": [
                    [
                        "disabled",
                        "center"
                    ]
                ]
            }
        },
        "output": [
            "IMAGE"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "IMAGE"
        ],
        "name": "ImageScale",
        "display_name": "Upscale Image",
        "description": "",
        "category": "image/upscaling",
        "output_node": false
    },
    "ImageScaleBy": {
        "input": {
            "required": {
                "image": [
                    "IMAGE"
                ],
                "upscale_method": [
                    [
                        "nearest-exact",
                        "bilinear",
                        "area",
                        "bicubic",
                        "lanczos"
                    ]
                ],
                "scale_by": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": 0.01,
                        "max": 8.0,
                        "step": 0.01
                    }
                ]
            }
        },
        "output": [
            "IMAGE"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "IMAGE"
        ],
        "name": "ImageScaleBy",
        "display_name": "Upscale Image By",
        "description": "",
        "category": "image/upscaling",
        "output_node": false
    },
    "ImageInvert": {
        "input": {
            "required": {
                "image": [
                    "IMAGE"
                ]
            }
        },
        "output": [
            "IMAGE"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "IMAGE"
        ],
        "name": "ImageInvert",
        "display_name": "Invert Image",
        "description": "",
        "category": "image",
        "output_node": false
    },
    "ImageBatch": {
        "input": {
            "required": {
                "image1": [
                    "IMAGE"
                ],
                "image2": [
                    "IMAGE"
                ]
            }
        },
        "output": [
            "IMAGE"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "IMAGE"
        ],
        "name": "ImageBatch",
        "display_name": "Batch Images",
        "description": "",
        "category": "image",
        "output_node": false
    },
    "ImagePadForOutpaint": {
        "input": {
            "required": {
                "image": [
                    "IMAGE"
                ],
                "left": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 8192,
                        "step": 8
                    }
                ],
                "top": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 8192,
                        "step": 8
                    }
                ],
                "right": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 8192,
                        "step": 8
                    }
                ],
                "bottom": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 8192,
                        "step": 8
                    }
                ],
                "feathering": [
                    "INT",
                    {
                        "default": 40,
                        "min": 0,
                        "max": 8192,
                        "step": 1
                    }
                ]
            }
        },
        "output": [
            "IMAGE",
            "MASK"
        ],
        "output_is_list": [
            false,
            false
        ],
        "output_name": [
            "IMAGE",
            "MASK"
        ],
        "name": "ImagePadForOutpaint",
        "display_name": "Pad Image for Outpainting",
        "description": "",
        "category": "image",
        "output_node": false
    },
    "EmptyImage": {
        "input": {
            "required": {
                "width": [
                    "INT",
                    {
                        "default": 512,
                        "min": 1,
                        "max": 8192,
                        "step": 1
                    }
                ],
                "height": [
                    "INT",
                    {
                        "default": 512,
                        "min": 1,
                        "max": 8192,
                        "step": 1
                    }
                ],
                "batch_size": [
                    "INT",
                    {
                        "default": 1,
                        "min": 1,
                        "max": 4096
                    }
                ],
                "color": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 16777215,
                        "step": 1,
                        "display": "color"
                    }
                ]
            }
        },
        "output": [
            "IMAGE"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "IMAGE"
        ],
        "name": "EmptyImage",
        "display_name": "EmptyImage",
        "description": "",
        "category": "image",
        "output_node": false
    },
    "ConditioningAverage": {
        "input": {
            "required": {
                "conditioning_to": [
                    "CONDITIONING"
                ],
                "conditioning_from": [
                    "CONDITIONING"
                ],
                "conditioning_to_strength": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": 0.0,
                        "max": 1.0,
                        "step": 0.01
                    }
                ]
            }
        },
        "output": [
            "CONDITIONING"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "CONDITIONING"
        ],
        "name": "ConditioningAverage",
        "display_name": "ConditioningAverage",
        "description": "",
        "category": "conditioning",
        "output_node": false
    },
    "ConditioningCombine": {
        "input": {
            "required": {
                "conditioning_1": [
                    "CONDITIONING"
                ],
                "conditioning_2": [
                    "CONDITIONING"
                ]
            }
        },
        "output": [
            "CONDITIONING"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "CONDITIONING"
        ],
        "name": "ConditioningCombine",
        "display_name": "Conditioning (Combine)",
        "description": "",
        "category": "conditioning",
        "output_node": false
    },
    "ConditioningConcat": {
        "input": {
            "required": {
                "conditioning_to": [
                    "CONDITIONING"
                ],
                "conditioning_from": [
                    "CONDITIONING"
                ]
            }
        },
        "output": [
            "CONDITIONING"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "CONDITIONING"
        ],
        "name": "ConditioningConcat",
        "display_name": "Conditioning (Concat)",
        "description": "",
        "category": "conditioning",
        "output_node": false
    },
    "ConditioningSetArea": {
        "input": {
            "required": {
                "conditioning": [
                    "CONDITIONING"
                ],
                "width": [
                    "INT",
                    {
                        "default": 64,
                        "min": 64,
                        "max": 8192,
                        "step": 8
                    }
                ],
                "height": [
                    "INT",
                    {
                        "default": 64,
                        "min": 64,
                        "max": 8192,
                        "step": 8
                    }
                ],
                "x": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 8192,
                        "step": 8
                    }
                ],
                "y": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 8192,
                        "step": 8
                    }
                ],
                "strength": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": 0.0,
                        "max": 10.0,
                        "step": 0.01
                    }
                ]
            }
        },
        "output": [
            "CONDITIONING"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "CONDITIONING"
        ],
        "name": "ConditioningSetArea",
        "display_name": "Conditioning (Set Area)",
        "description": "",
        "category": "conditioning",
        "output_node": false
    },
    "ConditioningSetAreaPercentage": {
        "input": {
            "required": {
                "conditioning": [
                    "CONDITIONING"
                ],
                "width": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": 0,
                        "max": 1.0,
                        "step": 0.01
                    }
                ],
                "height": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": 0,
                        "max": 1.0,
                        "step": 0.01
                    }
                ],
                "x": [
                    "FLOAT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 1.0,
                        "step": 0.01
                    }
                ],
                "y": [
                    "FLOAT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 1.0,
                        "step": 0.01
                    }
                ],
                "strength": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": 0.0,
                        "max": 10.0,
                        "step": 0.01
                    }
                ]
            }
        },
        "output": [
            "CONDITIONING"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "CONDITIONING"
        ],
        "name": "ConditioningSetAreaPercentage",
        "display_name": "Conditioning (Set Area with Percentage)",
        "description": "",
        "category": "conditioning",
        "output_node": false
    },
    "ConditioningSetMask": {
        "input": {
            "required": {
                "conditioning": [
                    "CONDITIONING"
                ],
                "mask": [
                    "MASK"
                ],
                "strength": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": 0.0,
                        "max": 10.0,
                        "step": 0.01
                    }
                ],
                "set_cond_area": [
                    [
                        "default",
                        "mask bounds"
                    ]
                ]
            }
        },
        "output": [
            "CONDITIONING"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "CONDITIONING"
        ],
        "name": "ConditioningSetMask",
        "display_name": "Conditioning (Set Mask)",
        "description": "",
        "category": "conditioning",
        "output_node": false
    },
    "KSamplerAdvanced": {
        "input": {
            "required": {
                "model": [
                    "MODEL"
                ],
                "add_noise": [
                    [
                        "enable",
                        "disable"
                    ]
                ],
                "noise_seed": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 18446744073709551615
                    }
                ],
                "steps": [
                    "INT",
                    {
                        "default": 20,
                        "min": 1,
                        "max": 10000
                    }
                ],
                "cfg": [
                    "FLOAT",
                    {
                        "default": 8.0,
                        "min": 0.0,
                        "max": 100.0,
                        "step": 0.5,
                        "round": 0.01
                    }
                ],
                "sampler_name": [
                    [
                        "euler",
                        "euler_ancestral",
                        "heun",
                        "dpm_2",
                        "dpm_2_ancestral",
                        "lms",
                        "dpm_fast",
                        "dpm_adaptive",
                        "dpmpp_2s_ancestral",
                        "dpmpp_sde",
                        "dpmpp_sde_gpu",
                        "dpmpp_2m",
                        "dpmpp_2m_sde",
                        "dpmpp_2m_sde_gpu",
                        "dpmpp_3m_sde",
                        "dpmpp_3m_sde_gpu",
                        "ddpm",
                        "ddim",
                        "uni_pc",
                        "uni_pc_bh2"
                    ]
                ],
                "scheduler": [
                    [
                        "normal",
                        "karras",
                        "exponential",
                        "sgm_uniform",
                        "simple",
                        "ddim_uniform"
                    ]
                ],
                "positive": [
                    "CONDITIONING"
                ],
                "negative": [
                    "CONDITIONING"
                ],
                "latent_image": [
                    "LATENT"
                ],
                "start_at_step": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 10000
                    }
                ],
                "end_at_step": [
                    "INT",
                    {
                        "default": 10000,
                        "min": 0,
                        "max": 10000
                    }
                ],
                "return_with_leftover_noise": [
                    [
                        "disable",
                        "enable"
                    ]
                ]
            }
        },
        "output": [
            "LATENT"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "LATENT"
        ],
        "name": "KSamplerAdvanced",
        "display_name": "KSampler (Advanced)",
        "description": "",
        "category": "sampling",
        "output_node": false
    },
    "SetLatentNoiseMask": {
        "input": {
            "required": {
                "samples": [
                    "LATENT"
                ],
                "mask": [
                    "MASK"
                ]
            }
        },
        "output": [
            "LATENT"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "LATENT"
        ],
        "name": "SetLatentNoiseMask",
        "display_name": "Set Latent Noise Mask",
        "description": "",
        "category": "latent/inpaint",
        "output_node": false
    },
    "LatentComposite": {
        "input": {
            "required": {
                "samples_to": [
                    "LATENT"
                ],
                "samples_from": [
                    "LATENT"
                ],
                "x": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 8192,
                        "step": 8
                    }
                ],
                "y": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 8192,
                        "step": 8
                    }
                ],
                "feather": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 8192,
                        "step": 8
                    }
                ]
            }
        },
        "output": [
            "LATENT"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "LATENT"
        ],
        "name": "LatentComposite",
        "display_name": "Latent Composite",
        "description": "",
        "category": "latent",
        "output_node": false
    },
    "LatentBlend": {
        "input": {
            "required": {
                "samples1": [
                    "LATENT"
                ],
                "samples2": [
                    "LATENT"
                ],
                "blend_factor": [
                    "FLOAT",
                    {
                        "default": 0.5,
                        "min": 0,
                        "max": 1,
                        "step": 0.01
                    }
                ]
            }
        },
        "output": [
            "LATENT"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "LATENT"
        ],
        "name": "LatentBlend",
        "display_name": "Latent Blend",
        "description": "",
        "category": "_for_testing",
        "output_node": false
    },
    "LatentRotate": {
        "input": {
            "required": {
                "samples": [
                    "LATENT"
                ],
                "rotation": [
                    [
                        "none",
                        "90 degrees",
                        "180 degrees",
                        "270 degrees"
                    ]
                ]
            }
        },
        "output": [
            "LATENT"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "LATENT"
        ],
        "name": "LatentRotate",
        "display_name": "Rotate Latent",
        "description": "",
        "category": "latent/transform",
        "output_node": false
    },
    "LatentFlip": {
        "input": {
            "required": {
                "samples": [
                    "LATENT"
                ],
                "flip_method": [
                    [
                        "x-axis: vertically",
                        "y-axis: horizontally"
                    ]
                ]
            }
        },
        "output": [
            "LATENT"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "LATENT"
        ],
        "name": "LatentFlip",
        "display_name": "Flip Latent",
        "description": "",
        "category": "latent/transform",
        "output_node": false
    },
    "LatentCrop": {
        "input": {
            "required": {
                "samples": [
                    "LATENT"
                ],
                "width": [
                    "INT",
                    {
                        "default": 512,
                        "min": 64,
                        "max": 8192,
                        "step": 8
                    }
                ],
                "height": [
                    "INT",
                    {
                        "default": 512,
                        "min": 64,
                        "max": 8192,
                        "step": 8
                    }
                ],
                "x": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 8192,
                        "step": 8
                    }
                ],
                "y": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 8192,
                        "step": 8
                    }
                ]
            }
        },
        "output": [
            "LATENT"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "LATENT"
        ],
        "name": "LatentCrop",
        "display_name": "Crop Latent",
        "description": "",
        "category": "latent/transform",
        "output_node": false
    },
    "LoraLoader": {
        "input": {
            "required": {
                "model": [
                    "MODEL"
                ],
                "clip": [
                    "CLIP"
                ],
                "lora_name": [
                    [
                        "r34monster_loha_v5-step00000800.safetensors",
                        "r34monster_loha_v5-step00001300.safetensors",
                        "r34monster_v4-step00001800.safetensors",
                        "r34monster_v8-step00001400.safetensors",
                        "r34monster_v8-step00001800.safetensors",
                        "r34monster_v8-step00003500.safetensors",
                        "r34monster_v9-step00003500.safetensors"
                    ]
                ],
                "strength_model": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": -20.0,
                        "max": 20.0,
                        "step": 0.01
                    }
                ],
                "strength_clip": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": -20.0,
                        "max": 20.0,
                        "step": 0.01
                    }
                ]
            }
        },
        "output": [
            "MODEL",
            "CLIP"
        ],
        "output_is_list": [
            false,
            false
        ],
        "output_name": [
            "MODEL",
            "CLIP"
        ],
        "name": "LoraLoader",
        "display_name": "Load LoRA",
        "description": "",
        "category": "loaders",
        "output_node": false
    },
    "CLIPLoader": {
        "input": {
            "required": {
                "clip_name": [
                    []
                ]
            }
        },
        "output": [
            "CLIP"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "CLIP"
        ],
        "name": "CLIPLoader",
        "display_name": "Load CLIP",
        "description": "",
        "category": "advanced/loaders",
        "output_node": false
    },
    "UNETLoader": {
        "input": {
            "required": {
                "unet_name": [
                    []
                ]
            }
        },
        "output": [
            "MODEL"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "MODEL"
        ],
        "name": "UNETLoader",
        "display_name": "UNETLoader",
        "description": "",
        "category": "advanced/loaders",
        "output_node": false
    },
    "DualCLIPLoader": {
        "input": {
            "required": {
                "clip_name1": [
                    []
                ],
                "clip_name2": [
                    []
                ]
            }
        },
        "output": [
            "CLIP"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "CLIP"
        ],
        "name": "DualCLIPLoader",
        "display_name": "DualCLIPLoader",
        "description": "",
        "category": "advanced/loaders",
        "output_node": false
    },
    "CLIPVisionEncode": {
        "input": {
            "required": {
                "clip_vision": [
                    "CLIP_VISION"
                ],
                "image": [
                    "IMAGE"
                ]
            }
        },
        "output": [
            "CLIP_VISION_OUTPUT"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "CLIP_VISION_OUTPUT"
        ],
        "name": "CLIPVisionEncode",
        "display_name": "CLIP Vision Encode",
        "description": "",
        "category": "conditioning",
        "output_node": false
    },
    "StyleModelApply": {
        "input": {
            "required": {
                "conditioning": [
                    "CONDITIONING"
                ],
                "style_model": [
                    "STYLE_MODEL"
                ],
                "clip_vision_output": [
                    "CLIP_VISION_OUTPUT"
                ]
            }
        },
        "output": [
            "CONDITIONING"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "CONDITIONING"
        ],
        "name": "StyleModelApply",
        "display_name": "Apply Style Model",
        "description": "",
        "category": "conditioning/style_model",
        "output_node": false
    },
    "unCLIPConditioning": {
        "input": {
            "required": {
                "conditioning": [
                    "CONDITIONING"
                ],
                "clip_vision_output": [
                    "CLIP_VISION_OUTPUT"
                ],
                "strength": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": -10.0,
                        "max": 10.0,
                        "step": 0.01
                    }
                ],
                "noise_augmentation": [
                    "FLOAT",
                    {
                        "default": 0.0,
                        "min": 0.0,
                        "max": 1.0,
                        "step": 0.01
                    }
                ]
            }
        },
        "output": [
            "CONDITIONING"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "CONDITIONING"
        ],
        "name": "unCLIPConditioning",
        "display_name": "unCLIPConditioning",
        "description": "",
        "category": "conditioning",
        "output_node": false
    },
    "ControlNetApply": {
        "input": {
            "required": {
                "conditioning": [
                    "CONDITIONING"
                ],
                "control_net": [
                    "CONTROL_NET"
                ],
                "image": [
                    "IMAGE"
                ],
                "strength": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": 0.0,
                        "max": 10.0,
                        "step": 0.01
                    }
                ]
            }
        },
        "output": [
            "CONDITIONING"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "CONDITIONING"
        ],
        "name": "ControlNetApply",
        "display_name": "Apply ControlNet",
        "description": "",
        "category": "conditioning",
        "output_node": false
    },
    "ControlNetApplyAdvanced": {
        "input": {
            "required": {
                "positive": [
                    "CONDITIONING"
                ],
                "negative": [
                    "CONDITIONING"
                ],
                "control_net": [
                    "CONTROL_NET"
                ],
                "image": [
                    "IMAGE"
                ],
                "strength": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": 0.0,
                        "max": 10.0,
                        "step": 0.01
                    }
                ],
                "start_percent": [
                    "FLOAT",
                    {
                        "default": 0.0,
                        "min": 0.0,
                        "max": 1.0,
                        "step": 0.001
                    }
                ],
                "end_percent": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": 0.0,
                        "max": 1.0,
                        "step": 0.001
                    }
                ]
            }
        },
        "output": [
            "CONDITIONING",
            "CONDITIONING"
        ],
        "output_is_list": [
            false,
            false
        ],
        "output_name": [
            "positive",
            "negative"
        ],
        "name": "ControlNetApplyAdvanced",
        "display_name": "Apply ControlNet (Advanced)",
        "description": "",
        "category": "conditioning",
        "output_node": false
    },
    "ControlNetLoader": {
        "input": {
            "required": {
                "control_net_name": [
                    [
                        "control_lora_rank128_v11f1p_sd15_depth_fp16.safetensors",
                        "control_v11f1p_sd15_depth.pth"
                    ]
                ]
            }
        },
        "output": [
            "CONTROL_NET"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "CONTROL_NET"
        ],
        "name": "ControlNetLoader",
        "display_name": "Load ControlNet Model",
        "description": "",
        "category": "loaders",
        "output_node": false
    },
    "DiffControlNetLoader": {
        "input": {
            "required": {
                "model": [
                    "MODEL"
                ],
                "control_net_name": [
                    [
                        "control_lora_rank128_v11f1p_sd15_depth_fp16.safetensors",
                        "control_v11f1p_sd15_depth.pth"
                    ]
                ]
            }
        },
        "output": [
            "CONTROL_NET"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "CONTROL_NET"
        ],
        "name": "DiffControlNetLoader",
        "display_name": "Load ControlNet Model (diff)",
        "description": "",
        "category": "loaders",
        "output_node": false
    },
    "StyleModelLoader": {
        "input": {
            "required": {
                "style_model_name": [
                    []
                ]
            }
        },
        "output": [
            "STYLE_MODEL"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "STYLE_MODEL"
        ],
        "name": "StyleModelLoader",
        "display_name": "Load Style Model",
        "description": "",
        "category": "loaders",
        "output_node": false
    },
    "CLIPVisionLoader": {
        "input": {
            "required": {
                "clip_name": [
                    []
                ]
            }
        },
        "output": [
            "CLIP_VISION"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "CLIP_VISION"
        ],
        "name": "CLIPVisionLoader",
        "display_name": "Load CLIP Vision",
        "description": "",
        "category": "loaders",
        "output_node": false
    },
    "VAEDecodeTiled": {
        "input": {
            "required": {
                "samples": [
                    "LATENT"
                ],
                "vae": [
                    "VAE"
                ],
                "tile_size": [
                    "INT",
                    {
                        "default": 512,
                        "min": 320,
                        "max": 4096,
                        "step": 64
                    }
                ]
            }
        },
        "output": [
            "IMAGE"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "IMAGE"
        ],
        "name": "VAEDecodeTiled",
        "display_name": "VAE Decode (Tiled)",
        "description": "",
        "category": "_for_testing",
        "output_node": false
    },
    "VAEEncodeTiled": {
        "input": {
            "required": {
                "pixels": [
                    "IMAGE"
                ],
                "vae": [
                    "VAE"
                ],
                "tile_size": [
                    "INT",
                    {
                        "default": 512,
                        "min": 320,
                        "max": 4096,
                        "step": 64
                    }
                ]
            }
        },
        "output": [
            "LATENT"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "LATENT"
        ],
        "name": "VAEEncodeTiled",
        "display_name": "VAE Encode (Tiled)",
        "description": "",
        "category": "_for_testing",
        "output_node": false
    },
    "unCLIPCheckpointLoader": {
        "input": {
            "required": {
                "ckpt_name": [
                    [
                        "anythingfurry_1.safetensors",
                        "bb95FurryMix_v100.safetensors",
                        "bb95FurryMix_v110.safetensors",
                        "bb95FurryMix_v80.safetensors",
                        "indigoFurryMix_v45Hybrid.safetensors",
                        "pirsusEpicRealism_v21.safetensors",
                        "pirsusEpicRealism_v25.safetensors",
                        "r34zoroj-step00001300.safetensors",
                        "sd_xl_base_1.0.safetensors",
                        "sd_xl_base_1.0_0.9vae.safetensors",
                        "sd_xl_refiner_1.0.safetensors",
                        "yiffymix_V33.safetensors"
                    ]
                ]
            }
        },
        "output": [
            "MODEL",
            "CLIP",
            "VAE",
            "CLIP_VISION"
        ],
        "output_is_list": [
            false,
            false,
            false,
            false
        ],
        "output_name": [
            "MODEL",
            "CLIP",
            "VAE",
            "CLIP_VISION"
        ],
        "name": "unCLIPCheckpointLoader",
        "display_name": "unCLIPCheckpointLoader",
        "description": "",
        "category": "loaders",
        "output_node": false
    },
    "GLIGENLoader": {
        "input": {
            "required": {
                "gligen_name": [
                    []
                ]
            }
        },
        "output": [
            "GLIGEN"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "GLIGEN"
        ],
        "name": "GLIGENLoader",
        "display_name": "GLIGENLoader",
        "description": "",
        "category": "loaders",
        "output_node": false
    },
    "GLIGENTextBoxApply": {
        "input": {
            "required": {
                "conditioning_to": [
                    "CONDITIONING"
                ],
                "clip": [
                    "CLIP"
                ],
                "gligen_textbox_model": [
                    "GLIGEN"
                ],
                "text": [
                    "STRING",
                    {
                        "multiline": true
                    }
                ],
                "width": [
                    "INT",
                    {
                        "default": 64,
                        "min": 8,
                        "max": 8192,
                        "step": 8
                    }
                ],
                "height": [
                    "INT",
                    {
                        "default": 64,
                        "min": 8,
                        "max": 8192,
                        "step": 8
                    }
                ],
                "x": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 8192,
                        "step": 8
                    }
                ],
                "y": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 8192,
                        "step": 8
                    }
                ]
            }
        },
        "output": [
            "CONDITIONING"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "CONDITIONING"
        ],
        "name": "GLIGENTextBoxApply",
        "display_name": "GLIGENTextBoxApply",
        "description": "",
        "category": "conditioning/gligen",
        "output_node": false
    },
    "CheckpointLoader": {
        "input": {
            "required": {
                "config_name": [
                    [
                        "anything_v3.yaml",
                        "v1-inference.yaml",
                        "v1-inference_clip_skip_2.yaml",
                        "v1-inference_clip_skip_2_fp16.yaml",
                        "v1-inference_fp16.yaml",
                        "v1-inpainting-inference.yaml",
                        "v2-inference-v.yaml",
                        "v2-inference-v_fp32.yaml",
                        "v2-inference.yaml",
                        "v2-inference_fp32.yaml",
                        "v2-inpainting-inference.yaml"
                    ]
                ],
                "ckpt_name": [
                    [
                        "anythingfurry_1.safetensors",
                        "bb95FurryMix_v100.safetensors",
                        "bb95FurryMix_v110.safetensors",
                        "bb95FurryMix_v80.safetensors",
                        "indigoFurryMix_v45Hybrid.safetensors",
                        "pirsusEpicRealism_v21.safetensors",
                        "pirsusEpicRealism_v25.safetensors",
                        "r34zoroj-step00001300.safetensors",
                        "sd_xl_base_1.0.safetensors",
                        "sd_xl_base_1.0_0.9vae.safetensors",
                        "sd_xl_refiner_1.0.safetensors",
                        "yiffymix_V33.safetensors"
                    ]
                ]
            }
        },
        "output": [
            "MODEL",
            "CLIP",
            "VAE"
        ],
        "output_is_list": [
            false,
            false,
            false
        ],
        "output_name": [
            "MODEL",
            "CLIP",
            "VAE"
        ],
        "name": "CheckpointLoader",
        "display_name": "Load Checkpoint (With Config)",
        "description": "",
        "category": "advanced/loaders",
        "output_node": false
    },
    "DiffusersLoader": {
        "input": {
            "required": {
                "model_path": [
                    []
                ]
            }
        },
        "output": [
            "MODEL",
            "CLIP",
            "VAE"
        ],
        "output_is_list": [
            false,
            false,
            false
        ],
        "output_name": [
            "MODEL",
            "CLIP",
            "VAE"
        ],
        "name": "DiffusersLoader",
        "display_name": "DiffusersLoader",
        "description": "",
        "category": "advanced/loaders/deprecated",
        "output_node": false
    },
    "LoadLatent": {
        "input": {
            "required": {
                "latent": [
                    []
                ]
            }
        },
        "output": [
            "LATENT"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "LATENT"
        ],
        "name": "LoadLatent",
        "display_name": "LoadLatent",
        "description": "",
        "category": "_for_testing",
        "output_node": false
    },
    "SaveLatent": {
        "input": {
            "required": {
                "samples": [
                    "LATENT"
                ],
                "filename_prefix": [
                    "STRING",
                    {
                        "default": "latents/ComfyUI"
                    }
                ]
            },
            "hidden": {
                "prompt": "PROMPT",
                "extra_pnginfo": "EXTRA_PNGINFO"
            }
        },
        "output": [],
        "output_is_list": [],
        "output_name": [],
        "name": "SaveLatent",
        "display_name": "SaveLatent",
        "description": "",
        "category": "_for_testing",
        "output_node": true
    },
    "ConditioningZeroOut": {
        "input": {
            "required": {
                "conditioning": [
                    "CONDITIONING"
                ]
            }
        },
        "output": [
            "CONDITIONING"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "CONDITIONING"
        ],
        "name": "ConditioningZeroOut",
        "display_name": "ConditioningZeroOut",
        "description": "",
        "category": "advanced/conditioning",
        "output_node": false
    },
    "ConditioningSetTimestepRange": {
        "input": {
            "required": {
                "conditioning": [
                    "CONDITIONING"
                ],
                "start": [
                    "FLOAT",
                    {
                        "default": 0.0,
                        "min": 0.0,
                        "max": 1.0,
                        "step": 0.001
                    }
                ],
                "end": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": 0.0,
                        "max": 1.0,
                        "step": 0.001
                    }
                ]
            }
        },
        "output": [
            "CONDITIONING"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "CONDITIONING"
        ],
        "name": "ConditioningSetTimestepRange",
        "display_name": "ConditioningSetTimestepRange",
        "description": "",
        "category": "advanced/conditioning",
        "output_node": false
    },
    "LatentAdd": {
        "input": {
            "required": {
                "samples1": [
                    "LATENT"
                ],
                "samples2": [
                    "LATENT"
                ]
            }
        },
        "output": [
            "LATENT"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "LATENT"
        ],
        "name": "LatentAdd",
        "display_name": "LatentAdd",
        "description": "",
        "category": "latent/advanced",
        "output_node": false
    },
    "LatentSubtract": {
        "input": {
            "required": {
                "samples1": [
                    "LATENT"
                ],
                "samples2": [
                    "LATENT"
                ]
            }
        },
        "output": [
            "LATENT"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "LATENT"
        ],
        "name": "LatentSubtract",
        "display_name": "LatentSubtract",
        "description": "",
        "category": "latent/advanced",
        "output_node": false
    },
    "LatentMultiply": {
        "input": {
            "required": {
                "samples": [
                    "LATENT"
                ],
                "multiplier": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": -10.0,
                        "max": 10.0,
                        "step": 0.01
                    }
                ]
            }
        },
        "output": [
            "LATENT"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "LATENT"
        ],
        "name": "LatentMultiply",
        "display_name": "LatentMultiply",
        "description": "",
        "category": "latent/advanced",
        "output_node": false
    },
    "HypernetworkLoader": {
        "input": {
            "required": {
                "model": [
                    "MODEL"
                ],
                "hypernetwork_name": [
                    []
                ],
                "strength": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": -10.0,
                        "max": 10.0,
                        "step": 0.01
                    }
                ]
            }
        },
        "output": [
            "MODEL"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "MODEL"
        ],
        "name": "HypernetworkLoader",
        "display_name": "HypernetworkLoader",
        "description": "",
        "category": "loaders",
        "output_node": false
    },
    "UpscaleModelLoader": {
        "input": {
            "required": {
                "model_name": [
                    []
                ]
            }
        },
        "output": [
            "UPSCALE_MODEL"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "UPSCALE_MODEL"
        ],
        "name": "UpscaleModelLoader",
        "display_name": "Load Upscale Model",
        "description": "",
        "category": "loaders",
        "output_node": false
    },
    "ImageUpscaleWithModel": {
        "input": {
            "required": {
                "upscale_model": [
                    "UPSCALE_MODEL"
                ],
                "image": [
                    "IMAGE"
                ]
            }
        },
        "output": [
            "IMAGE"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "IMAGE"
        ],
        "name": "ImageUpscaleWithModel",
        "display_name": "Upscale Image (using Model)",
        "description": "",
        "category": "image/upscaling",
        "output_node": false
    },
    "ImageBlend": {
        "input": {
            "required": {
                "image1": [
                    "IMAGE"
                ],
                "image2": [
                    "IMAGE"
                ],
                "blend_factor": [
                    "FLOAT",
                    {
                        "default": 0.5,
                        "min": 0.0,
                        "max": 1.0,
                        "step": 0.01
                    }
                ],
                "blend_mode": [
                    [
                        "normal",
                        "multiply",
                        "screen",
                        "overlay",
                        "soft_light"
                    ]
                ]
            }
        },
        "output": [
            "IMAGE"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "IMAGE"
        ],
        "name": "ImageBlend",
        "display_name": "ImageBlend",
        "description": "",
        "category": "image/postprocessing",
        "output_node": false
    },
    "ImageBlur": {
        "input": {
            "required": {
                "image": [
                    "IMAGE"
                ],
                "blur_radius": [
                    "INT",
                    {
                        "default": 1,
                        "min": 1,
                        "max": 31,
                        "step": 1
                    }
                ],
                "sigma": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": 0.1,
                        "max": 10.0,
                        "step": 0.1
                    }
                ]
            }
        },
        "output": [
            "IMAGE"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "IMAGE"
        ],
        "name": "ImageBlur",
        "display_name": "ImageBlur",
        "description": "",
        "category": "image/postprocessing",
        "output_node": false
    },
    "ImageQuantize": {
        "input": {
            "required": {
                "image": [
                    "IMAGE"
                ],
                "colors": [
                    "INT",
                    {
                        "default": 256,
                        "min": 1,
                        "max": 256,
                        "step": 1
                    }
                ],
                "dither": [
                    [
                        "none",
                        "floyd-steinberg"
                    ]
                ]
            }
        },
        "output": [
            "IMAGE"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "IMAGE"
        ],
        "name": "ImageQuantize",
        "display_name": "ImageQuantize",
        "description": "",
        "category": "image/postprocessing",
        "output_node": false
    },
    "ImageSharpen": {
        "input": {
            "required": {
                "image": [
                    "IMAGE"
                ],
                "sharpen_radius": [
                    "INT",
                    {
                        "default": 1,
                        "min": 1,
                        "max": 31,
                        "step": 1
                    }
                ],
                "sigma": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": 0.1,
                        "max": 10.0,
                        "step": 0.1
                    }
                ],
                "alpha": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": 0.0,
                        "max": 5.0,
                        "step": 0.1
                    }
                ]
            }
        },
        "output": [
            "IMAGE"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "IMAGE"
        ],
        "name": "ImageSharpen",
        "display_name": "ImageSharpen",
        "description": "",
        "category": "image/postprocessing",
        "output_node": false
    },
    "ImageScaleToTotalPixels": {
        "input": {
            "required": {
                "image": [
                    "IMAGE"
                ],
                "upscale_method": [
                    [
                        "nearest-exact",
                        "bilinear",
                        "area",
                        "bicubic",
                        "lanczos"
                    ]
                ],
                "megapixels": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": 0.01,
                        "max": 16.0,
                        "step": 0.01
                    }
                ]
            }
        },
        "output": [
            "IMAGE"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "IMAGE"
        ],
        "name": "ImageScaleToTotalPixels",
        "display_name": "ImageScaleToTotalPixels",
        "description": "",
        "category": "image/upscaling",
        "output_node": false
    },
    "LatentCompositeMasked": {
        "input": {
            "required": {
                "destination": [
                    "LATENT"
                ],
                "source": [
                    "LATENT"
                ],
                "x": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 8192,
                        "step": 8
                    }
                ],
                "y": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 8192,
                        "step": 8
                    }
                ],
                "resize_source": [
                    "BOOLEAN",
                    {
                        "default": false
                    }
                ]
            },
            "optional": {
                "mask": [
                    "MASK"
                ]
            }
        },
        "output": [
            "LATENT"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "LATENT"
        ],
        "name": "LatentCompositeMasked",
        "display_name": "LatentCompositeMasked",
        "description": "",
        "category": "latent",
        "output_node": false
    },
    "ImageCompositeMasked": {
        "input": {
            "required": {
                "destination": [
                    "IMAGE"
                ],
                "source": [
                    "IMAGE"
                ],
                "x": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 8192,
                        "step": 1
                    }
                ],
                "y": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 8192,
                        "step": 1
                    }
                ],
                "resize_source": [
                    "BOOLEAN",
                    {
                        "default": false
                    }
                ]
            },
            "optional": {
                "mask": [
                    "MASK"
                ]
            }
        },
        "output": [
            "IMAGE"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "IMAGE"
        ],
        "name": "ImageCompositeMasked",
        "display_name": "ImageCompositeMasked",
        "description": "",
        "category": "image",
        "output_node": false
    },
    "MaskToImage": {
        "input": {
            "required": {
                "mask": [
                    "MASK"
                ]
            }
        },
        "output": [
            "IMAGE"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "IMAGE"
        ],
        "name": "MaskToImage",
        "display_name": "Convert Mask to Image",
        "description": "",
        "category": "mask",
        "output_node": false
    },
    "ImageToMask": {
        "input": {
            "required": {
                "image": [
                    "IMAGE"
                ],
                "channel": [
                    [
                        "red",
                        "green",
                        "blue",
                        "alpha"
                    ]
                ]
            }
        },
        "output": [
            "MASK"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "MASK"
        ],
        "name": "ImageToMask",
        "display_name": "Convert Image to Mask",
        "description": "",
        "category": "mask",
        "output_node": false
    },
    "ImageColorToMask": {
        "input": {
            "required": {
                "image": [
                    "IMAGE"
                ],
                "color": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 16777215,
                        "step": 1,
                        "display": "color"
                    }
                ]
            }
        },
        "output": [
            "MASK"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "MASK"
        ],
        "name": "ImageColorToMask",
        "display_name": "ImageColorToMask",
        "description": "",
        "category": "mask",
        "output_node": false
    },
    "SolidMask": {
        "input": {
            "required": {
                "value": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": 0.0,
                        "max": 1.0,
                        "step": 0.01
                    }
                ],
                "width": [
                    "INT",
                    {
                        "default": 512,
                        "min": 1,
                        "max": 8192,
                        "step": 1
                    }
                ],
                "height": [
                    "INT",
                    {
                        "default": 512,
                        "min": 1,
                        "max": 8192,
                        "step": 1
                    }
                ]
            }
        },
        "output": [
            "MASK"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "MASK"
        ],
        "name": "SolidMask",
        "display_name": "SolidMask",
        "description": "",
        "category": "mask",
        "output_node": false
    },
    "InvertMask": {
        "input": {
            "required": {
                "mask": [
                    "MASK"
                ]
            }
        },
        "output": [
            "MASK"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "MASK"
        ],
        "name": "InvertMask",
        "display_name": "InvertMask",
        "description": "",
        "category": "mask",
        "output_node": false
    },
    "CropMask": {
        "input": {
            "required": {
                "mask": [
                    "MASK"
                ],
                "x": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 8192,
                        "step": 1
                    }
                ],
                "y": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 8192,
                        "step": 1
                    }
                ],
                "width": [
                    "INT",
                    {
                        "default": 512,
                        "min": 1,
                        "max": 8192,
                        "step": 1
                    }
                ],
                "height": [
                    "INT",
                    {
                        "default": 512,
                        "min": 1,
                        "max": 8192,
                        "step": 1
                    }
                ]
            }
        },
        "output": [
            "MASK"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "MASK"
        ],
        "name": "CropMask",
        "display_name": "CropMask",
        "description": "",
        "category": "mask",
        "output_node": false
    },
    "MaskComposite": {
        "input": {
            "required": {
                "destination": [
                    "MASK"
                ],
                "source": [
                    "MASK"
                ],
                "x": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 8192,
                        "step": 1
                    }
                ],
                "y": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 8192,
                        "step": 1
                    }
                ],
                "operation": [
                    [
                        "multiply",
                        "add",
                        "subtract",
                        "and",
                        "or",
                        "xor"
                    ]
                ]
            }
        },
        "output": [
            "MASK"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "MASK"
        ],
        "name": "MaskComposite",
        "display_name": "MaskComposite",
        "description": "",
        "category": "mask",
        "output_node": false
    },
    "FeatherMask": {
        "input": {
            "required": {
                "mask": [
                    "MASK"
                ],
                "left": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 8192,
                        "step": 1
                    }
                ],
                "top": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 8192,
                        "step": 1
                    }
                ],
                "right": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 8192,
                        "step": 1
                    }
                ],
                "bottom": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 8192,
                        "step": 1
                    }
                ]
            }
        },
        "output": [
            "MASK"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "MASK"
        ],
        "name": "FeatherMask",
        "display_name": "FeatherMask",
        "description": "",
        "category": "mask",
        "output_node": false
    },
    "GrowMask": {
        "input": {
            "required": {
                "mask": [
                    "MASK"
                ],
                "expand": [
                    "INT",
                    {
                        "default": 0,
                        "min": -8192,
                        "max": 8192,
                        "step": 1
                    }
                ],
                "tapered_corners": [
                    "BOOLEAN",
                    {
                        "default": true
                    }
                ]
            }
        },
        "output": [
            "MASK"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "MASK"
        ],
        "name": "GrowMask",
        "display_name": "GrowMask",
        "description": "",
        "category": "mask",
        "output_node": false
    },
    "PorterDuffImageComposite": {
        "input": {
            "required": {
                "source": [
                    "IMAGE"
                ],
                "source_alpha": [
                    "MASK"
                ],
                "destination": [
                    "IMAGE"
                ],
                "destination_alpha": [
                    "MASK"
                ],
                "mode": [
                    [
                        "ADD",
                        "CLEAR",
                        "DARKEN",
                        "DST",
                        "DST_ATOP",
                        "DST_IN",
                        "DST_OUT",
                        "DST_OVER",
                        "LIGHTEN",
                        "MULTIPLY",
                        "OVERLAY",
                        "SCREEN",
                        "SRC",
                        "SRC_ATOP",
                        "SRC_IN",
                        "SRC_OUT",
                        "SRC_OVER",
                        "XOR"
                    ],
                    {
                        "default": "DST"
                    }
                ]
            }
        },
        "output": [
            "IMAGE",
            "MASK"
        ],
        "output_is_list": [
            false,
            false
        ],
        "output_name": [
            "IMAGE",
            "MASK"
        ],
        "name": "PorterDuffImageComposite",
        "display_name": "Porter-Duff Image Composite",
        "description": "",
        "category": "mask/compositing",
        "output_node": false
    },
    "SplitImageWithAlpha": {
        "input": {
            "required": {
                "image": [
                    "IMAGE"
                ]
            }
        },
        "output": [
            "IMAGE",
            "MASK"
        ],
        "output_is_list": [
            false,
            false
        ],
        "output_name": [
            "IMAGE",
            "MASK"
        ],
        "name": "SplitImageWithAlpha",
        "display_name": "Split Image with Alpha",
        "description": "",
        "category": "mask/compositing",
        "output_node": false
    },
    "JoinImageWithAlpha": {
        "input": {
            "required": {
                "image": [
                    "IMAGE"
                ],
                "alpha": [
                    "MASK"
                ]
            }
        },
        "output": [
            "IMAGE"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "IMAGE"
        ],
        "name": "JoinImageWithAlpha",
        "display_name": "Join Image with Alpha",
        "description": "",
        "category": "mask/compositing",
        "output_node": false
    },
    "RebatchLatents": {
        "input": {
            "required": {
                "latents": [
                    "LATENT"
                ],
                "batch_size": [
                    "INT",
                    {
                        "default": 1,
                        "min": 1,
                        "max": 64
                    }
                ]
            }
        },
        "output": [
            "LATENT"
        ],
        "output_is_list": [
            true
        ],
        "output_name": [
            "LATENT"
        ],
        "name": "RebatchLatents",
        "display_name": "Rebatch Latents",
        "description": "",
        "category": "latent/batch",
        "output_node": false
    },
    "ModelMergeSimple": {
        "input": {
            "required": {
                "model1": [
                    "MODEL"
                ],
                "model2": [
                    "MODEL"
                ],
                "ratio": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": 0.0,
                        "max": 1.0,
                        "step": 0.01
                    }
                ]
            }
        },
        "output": [
            "MODEL"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "MODEL"
        ],
        "name": "ModelMergeSimple",
        "display_name": "ModelMergeSimple",
        "description": "",
        "category": "advanced/model_merging",
        "output_node": false
    },
    "ModelMergeBlocks": {
        "input": {
            "required": {
                "model1": [
                    "MODEL"
                ],
                "model2": [
                    "MODEL"
                ],
                "input": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": 0.0,
                        "max": 1.0,
                        "step": 0.01
                    }
                ],
                "middle": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": 0.0,
                        "max": 1.0,
                        "step": 0.01
                    }
                ],
                "out": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": 0.0,
                        "max": 1.0,
                        "step": 0.01
                    }
                ]
            }
        },
        "output": [
            "MODEL"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "MODEL"
        ],
        "name": "ModelMergeBlocks",
        "display_name": "ModelMergeBlocks",
        "description": "",
        "category": "advanced/model_merging",
        "output_node": false
    },
    "ModelMergeSubtract": {
        "input": {
            "required": {
                "model1": [
                    "MODEL"
                ],
                "model2": [
                    "MODEL"
                ],
                "multiplier": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": -10.0,
                        "max": 10.0,
                        "step": 0.01
                    }
                ]
            }
        },
        "output": [
            "MODEL"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "MODEL"
        ],
        "name": "ModelMergeSubtract",
        "display_name": "ModelMergeSubtract",
        "description": "",
        "category": "advanced/model_merging",
        "output_node": false
    },
    "ModelMergeAdd": {
        "input": {
            "required": {
                "model1": [
                    "MODEL"
                ],
                "model2": [
                    "MODEL"
                ]
            }
        },
        "output": [
            "MODEL"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "MODEL"
        ],
        "name": "ModelMergeAdd",
        "display_name": "ModelMergeAdd",
        "description": "",
        "category": "advanced/model_merging",
        "output_node": false
    },
    "CheckpointSave": {
        "input": {
            "required": {
                "model": [
                    "MODEL"
                ],
                "clip": [
                    "CLIP"
                ],
                "vae": [
                    "VAE"
                ],
                "filename_prefix": [
                    "STRING",
                    {
                        "default": "checkpoints/ComfyUI"
                    }
                ]
            },
            "hidden": {
                "prompt": "PROMPT",
                "extra_pnginfo": "EXTRA_PNGINFO"
            }
        },
        "output": [],
        "output_is_list": [],
        "output_name": [],
        "name": "CheckpointSave",
        "display_name": "CheckpointSave",
        "description": "",
        "category": "advanced/model_merging",
        "output_node": true
    },
    "CLIPMergeSimple": {
        "input": {
            "required": {
                "clip1": [
                    "CLIP"
                ],
                "clip2": [
                    "CLIP"
                ],
                "ratio": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": 0.0,
                        "max": 1.0,
                        "step": 0.01
                    }
                ]
            }
        },
        "output": [
            "CLIP"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "CLIP"
        ],
        "name": "CLIPMergeSimple",
        "display_name": "CLIPMergeSimple",
        "description": "",
        "category": "advanced/model_merging",
        "output_node": false
    },
    "TomePatchModel": {
        "input": {
            "required": {
                "model": [
                    "MODEL"
                ],
                "ratio": [
                    "FLOAT",
                    {
                        "default": 0.3,
                        "min": 0.0,
                        "max": 1.0,
                        "step": 0.01
                    }
                ]
            }
        },
        "output": [
            "MODEL"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "MODEL"
        ],
        "name": "TomePatchModel",
        "display_name": "TomePatchModel",
        "description": "",
        "category": "_for_testing",
        "output_node": false
    },
    "CLIPTextEncodeSDXLRefiner": {
        "input": {
            "required": {
                "ascore": [
                    "FLOAT",
                    {
                        "default": 6.0,
                        "min": 0.0,
                        "max": 1000.0,
                        "step": 0.01
                    }
                ],
                "width": [
                    "INT",
                    {
                        "default": 1024.0,
                        "min": 0,
                        "max": 8192
                    }
                ],
                "height": [
                    "INT",
                    {
                        "default": 1024.0,
                        "min": 0,
                        "max": 8192
                    }
                ],
                "text": [
                    "STRING",
                    {
                        "multiline": true
                    }
                ],
                "clip": [
                    "CLIP"
                ]
            }
        },
        "output": [
            "CONDITIONING"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "CONDITIONING"
        ],
        "name": "CLIPTextEncodeSDXLRefiner",
        "display_name": "CLIPTextEncodeSDXLRefiner",
        "description": "",
        "category": "advanced/conditioning",
        "output_node": false
    },
    "CLIPTextEncodeSDXL": {
        "input": {
            "required": {
                "width": [
                    "INT",
                    {
                        "default": 1024.0,
                        "min": 0,
                        "max": 8192
                    }
                ],
                "height": [
                    "INT",
                    {
                        "default": 1024.0,
                        "min": 0,
                        "max": 8192
                    }
                ],
                "crop_w": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 8192
                    }
                ],
                "crop_h": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 8192
                    }
                ],
                "target_width": [
                    "INT",
                    {
                        "default": 1024.0,
                        "min": 0,
                        "max": 8192
                    }
                ],
                "target_height": [
                    "INT",
                    {
                        "default": 1024.0,
                        "min": 0,
                        "max": 8192
                    }
                ],
                "text_g": [
                    "STRING",
                    {
                        "multiline": true,
                        "default": "CLIP_G"
                    }
                ],
                "clip": [
                    "CLIP"
                ],
                "text_l": [
                    "STRING",
                    {
                        "multiline": true,
                        "default": "CLIP_L"
                    }
                ]
            }
        },
        "output": [
            "CONDITIONING"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "CONDITIONING"
        ],
        "name": "CLIPTextEncodeSDXL",
        "display_name": "CLIPTextEncodeSDXL",
        "description": "",
        "category": "advanced/conditioning",
        "output_node": false
    },
    "Canny": {
        "input": {
            "required": {
                "image": [
                    "IMAGE"
                ],
                "low_threshold": [
                    "FLOAT",
                    {
                        "default": 0.4,
                        "min": 0.01,
                        "max": 0.99,
                        "step": 0.01
                    }
                ],
                "high_threshold": [
                    "FLOAT",
                    {
                        "default": 0.8,
                        "min": 0.01,
                        "max": 0.99,
                        "step": 0.01
                    }
                ]
            }
        },
        "output": [
            "IMAGE"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "IMAGE"
        ],
        "name": "Canny",
        "display_name": "Canny",
        "description": "",
        "category": "image/preprocessors",
        "output_node": false
    },
    "FreeU": {
        "input": {
            "required": {
                "model": [
                    "MODEL"
                ],
                "b1": [
                    "FLOAT",
                    {
                        "default": 1.1,
                        "min": 0.0,
                        "max": 10.0,
                        "step": 0.01
                    }
                ],
                "b2": [
                    "FLOAT",
                    {
                        "default": 1.2,
                        "min": 0.0,
                        "max": 10.0,
                        "step": 0.01
                    }
                ],
                "s1": [
                    "FLOAT",
                    {
                        "default": 0.9,
                        "min": 0.0,
                        "max": 10.0,
                        "step": 0.01
                    }
                ],
                "s2": [
                    "FLOAT",
                    {
                        "default": 0.2,
                        "min": 0.0,
                        "max": 10.0,
                        "step": 0.01
                    }
                ]
            }
        },
        "output": [
            "MODEL"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "MODEL"
        ],
        "name": "FreeU",
        "display_name": "FreeU",
        "description": "",
        "category": "_for_testing",
        "output_node": false
    },
    "SamplerCustom": {
        "input": {
            "required": {
                "model": [
                    "MODEL"
                ],
                "add_noise": [
                    "BOOLEAN",
                    {
                        "default": true
                    }
                ],
                "noise_seed": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 18446744073709551615
                    }
                ],
                "cfg": [
                    "FLOAT",
                    {
                        "default": 8.0,
                        "min": 0.0,
                        "max": 100.0,
                        "step": 0.5,
                        "round": 0.01
                    }
                ],
                "positive": [
                    "CONDITIONING"
                ],
                "negative": [
                    "CONDITIONING"
                ],
                "sampler": [
                    "SAMPLER"
                ],
                "sigmas": [
                    "SIGMAS"
                ],
                "latent_image": [
                    "LATENT"
                ]
            }
        },
        "output": [
            "LATENT",
            "LATENT"
        ],
        "output_is_list": [
            false,
            false
        ],
        "output_name": [
            "output",
            "denoised_output"
        ],
        "name": "SamplerCustom",
        "display_name": "SamplerCustom",
        "description": "",
        "category": "sampling/custom_sampling",
        "output_node": false
    },
    "KarrasScheduler": {
        "input": {
            "required": {
                "steps": [
                    "INT",
                    {
                        "default": 20,
                        "min": 1,
                        "max": 10000
                    }
                ],
                "sigma_max": [
                    "FLOAT",
                    {
                        "default": 14.614642,
                        "min": 0.0,
                        "max": 1000.0,
                        "step": 0.01,
                        "round": false
                    }
                ],
                "sigma_min": [
                    "FLOAT",
                    {
                        "default": 0.0291675,
                        "min": 0.0,
                        "max": 1000.0,
                        "step": 0.01,
                        "round": false
                    }
                ],
                "rho": [
                    "FLOAT",
                    {
                        "default": 7.0,
                        "min": 0.0,
                        "max": 100.0,
                        "step": 0.01,
                        "round": false
                    }
                ]
            }
        },
        "output": [
            "SIGMAS"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "SIGMAS"
        ],
        "name": "KarrasScheduler",
        "display_name": "KarrasScheduler",
        "description": "",
        "category": "sampling/custom_sampling",
        "output_node": false
    },
    "ExponentialScheduler": {
        "input": {
            "required": {
                "steps": [
                    "INT",
                    {
                        "default": 20,
                        "min": 1,
                        "max": 10000
                    }
                ],
                "sigma_max": [
                    "FLOAT",
                    {
                        "default": 14.614642,
                        "min": 0.0,
                        "max": 1000.0,
                        "step": 0.01,
                        "round": false
                    }
                ],
                "sigma_min": [
                    "FLOAT",
                    {
                        "default": 0.0291675,
                        "min": 0.0,
                        "max": 1000.0,
                        "step": 0.01,
                        "round": false
                    }
                ]
            }
        },
        "output": [
            "SIGMAS"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "SIGMAS"
        ],
        "name": "ExponentialScheduler",
        "display_name": "ExponentialScheduler",
        "description": "",
        "category": "sampling/custom_sampling",
        "output_node": false
    },
    "PolyexponentialScheduler": {
        "input": {
            "required": {
                "steps": [
                    "INT",
                    {
                        "default": 20,
                        "min": 1,
                        "max": 10000
                    }
                ],
                "sigma_max": [
                    "FLOAT",
                    {
                        "default": 14.614642,
                        "min": 0.0,
                        "max": 1000.0,
                        "step": 0.01,
                        "round": false
                    }
                ],
                "sigma_min": [
                    "FLOAT",
                    {
                        "default": 0.0291675,
                        "min": 0.0,
                        "max": 1000.0,
                        "step": 0.01,
                        "round": false
                    }
                ],
                "rho": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": 0.0,
                        "max": 100.0,
                        "step": 0.01,
                        "round": false
                    }
                ]
            }
        },
        "output": [
            "SIGMAS"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "SIGMAS"
        ],
        "name": "PolyexponentialScheduler",
        "display_name": "PolyexponentialScheduler",
        "description": "",
        "category": "sampling/custom_sampling",
        "output_node": false
    },
    "VPScheduler": {
        "input": {
            "required": {
                "steps": [
                    "INT",
                    {
                        "default": 20,
                        "min": 1,
                        "max": 10000
                    }
                ],
                "beta_d": [
                    "FLOAT",
                    {
                        "default": 19.9,
                        "min": 0.0,
                        "max": 1000.0,
                        "step": 0.01,
                        "round": false
                    }
                ],
                "beta_min": [
                    "FLOAT",
                    {
                        "default": 0.1,
                        "min": 0.0,
                        "max": 1000.0,
                        "step": 0.01,
                        "round": false
                    }
                ],
                "eps_s": [
                    "FLOAT",
                    {
                        "default": 0.001,
                        "min": 0.0,
                        "max": 1.0,
                        "step": 0.0001,
                        "round": false
                    }
                ]
            }
        },
        "output": [
            "SIGMAS"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "SIGMAS"
        ],
        "name": "VPScheduler",
        "display_name": "VPScheduler",
        "description": "",
        "category": "sampling/custom_sampling",
        "output_node": false
    },
    "KSamplerSelect": {
        "input": {
            "required": {
                "sampler_name": [
                    [
                        "euler",
                        "euler_ancestral",
                        "heun",
                        "dpm_2",
                        "dpm_2_ancestral",
                        "lms",
                        "dpm_fast",
                        "dpm_adaptive",
                        "dpmpp_2s_ancestral",
                        "dpmpp_sde",
                        "dpmpp_sde_gpu",
                        "dpmpp_2m",
                        "dpmpp_2m_sde",
                        "dpmpp_2m_sde_gpu",
                        "dpmpp_3m_sde",
                        "dpmpp_3m_sde_gpu",
                        "ddpm",
                        "ddim",
                        "uni_pc",
                        "uni_pc_bh2"
                    ]
                ]
            }
        },
        "output": [
            "SAMPLER"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "SAMPLER"
        ],
        "name": "KSamplerSelect",
        "display_name": "KSamplerSelect",
        "description": "",
        "category": "sampling/custom_sampling",
        "output_node": false
    },
    "SamplerDPMPP_2M_SDE": {
        "input": {
            "required": {
                "solver_type": [
                    [
                        "midpoint",
                        "heun"
                    ]
                ],
                "eta": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": 0.0,
                        "max": 100.0,
                        "step": 0.01,
                        "round": false
                    }
                ],
                "s_noise": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": 0.0,
                        "max": 100.0,
                        "step": 0.01,
                        "round": false
                    }
                ],
                "noise_device": [
                    [
                        "gpu",
                        "cpu"
                    ]
                ]
            }
        },
        "output": [
            "SAMPLER"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "SAMPLER"
        ],
        "name": "SamplerDPMPP_2M_SDE",
        "display_name": "SamplerDPMPP_2M_SDE",
        "description": "",
        "category": "sampling/custom_sampling",
        "output_node": false
    },
    "SamplerDPMPP_SDE": {
        "input": {
            "required": {
                "eta": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": 0.0,
                        "max": 100.0,
                        "step": 0.01,
                        "round": false
                    }
                ],
                "s_noise": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": 0.0,
                        "max": 100.0,
                        "step": 0.01,
                        "round": false
                    }
                ],
                "r": [
                    "FLOAT",
                    {
                        "default": 0.5,
                        "min": 0.0,
                        "max": 100.0,
                        "step": 0.01,
                        "round": false
                    }
                ],
                "noise_device": [
                    [
                        "gpu",
                        "cpu"
                    ]
                ]
            }
        },
        "output": [
            "SAMPLER"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "SAMPLER"
        ],
        "name": "SamplerDPMPP_SDE",
        "display_name": "SamplerDPMPP_SDE",
        "description": "",
        "category": "sampling/custom_sampling",
        "output_node": false
    },
    "BasicScheduler": {
        "input": {
            "required": {
                "model": [
                    "MODEL"
                ],
                "scheduler": [
                    [
                        "normal",
                        "karras",
                        "exponential",
                        "sgm_uniform",
                        "simple",
                        "ddim_uniform"
                    ]
                ],
                "steps": [
                    "INT",
                    {
                        "default": 20,
                        "min": 1,
                        "max": 10000
                    }
                ]
            }
        },
        "output": [
            "SIGMAS"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "SIGMAS"
        ],
        "name": "BasicScheduler",
        "display_name": "BasicScheduler",
        "description": "",
        "category": "sampling/custom_sampling",
        "output_node": false
    },
    "SplitSigmas": {
        "input": {
            "required": {
                "sigmas": [
                    "SIGMAS"
                ],
                "step": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 10000
                    }
                ]
            }
        },
        "output": [
            "SIGMAS",
            "SIGMAS"
        ],
        "output_is_list": [
            false,
            false
        ],
        "output_name": [
            "SIGMAS",
            "SIGMAS"
        ],
        "name": "SplitSigmas",
        "display_name": "SplitSigmas",
        "description": "",
        "category": "sampling/custom_sampling",
        "output_node": false
    },
    "ClipInterrogator": {
        "input": {
            "required": {
                "image": [
                    "IMAGE"
                ],
                "clip": [
                    "CLIP"
                ],
                "model_name": [
                    [
                        "ViT-L-14/openai"
                    ]
                ]
            }
        },
        "output": [
            "CONDITIONING"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "CONDITIONING"
        ],
        "name": "ClipInterrogator",
        "display_name": "ClipInterrogator",
        "description": "",
        "category": "inflamously",
        "output_node": true
    },
    "DebugCond": {
        "input": {
            "required": {
                "clip": [
                    "CLIP"
                ],
                "cond_input": [
                    "CONDITIONING"
                ]
            }
        },
        "output": [
            "CONDITIONING",
            "IMAGE"
        ],
        "output_is_list": [
            false,
            false
        ],
        "output_name": [
            "CONDITIONING",
            "IMAGE"
        ],
        "name": "DebugCond",
        "display_name": "DebugCond",
        "description": "",
        "category": "inflamously",
        "output_node": true
    },
    "DebugLatent": {
        "input": {
            "required": {
                "latent": [
                    "LATENT"
                ]
            }
        },
        "output": [
            "LATENT",
            "LATENT"
        ],
        "output_is_list": [
            false,
            false
        ],
        "output_name": [
            "LATENT",
            "LATENT"
        ],
        "name": "DebugLatent",
        "display_name": "DebugLatent",
        "description": "",
        "category": "inflamously",
        "output_node": true
    },
    "DebugModel": {
        "input": {
            "required": {
                "model_input": [
                    "MODEL"
                ]
            }
        },
        "output": [],
        "output_is_list": [],
        "output_name": [],
        "name": "DebugModel",
        "display_name": "DebugModel",
        "description": "",
        "category": "inflamously",
        "output_node": true
    },
    "DebugNode": {
        "input": {
            "required": {
                "cond_input": [
                    "CONDITIONING"
                ],
                "text": [
                    "STRING",
                    {
                        "default": ""
                    }
                ]
            }
        },
        "output": [],
        "output_is_list": [],
        "output_name": [],
        "name": "DebugNode",
        "display_name": "DebugNode",
        "description": "",
        "category": "inflamously",
        "output_node": true
    },
    "ImageCrop": {
        "input": {
            "required": {
                "vae": [
                    "VAE"
                ],
                "latent": [
                    "LATENT"
                ],
                "center_x": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 4096,
                        "step": 16
                    }
                ],
                "center_y": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 4096,
                        "step": 16
                    }
                ],
                "pixelradius": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 4096,
                        "step": 16
                    }
                ]
            }
        },
        "output": [
            "LATENT",
            "IMAGE"
        ],
        "output_is_list": [
            false,
            false
        ],
        "output_name": [
            "LATENT",
            "IMAGE"
        ],
        "name": "ImageCrop",
        "display_name": "ImageCrop",
        "description": "",
        "category": "inflamously",
        "output_node": true
    },
    "ImageFX": {
        "input": {
            "required": {
                "vae": [
                    "VAE"
                ],
                "latent": [
                    "LATENT"
                ]
            }
        },
        "output": [
            "LATENT",
            "IMAGE"
        ],
        "output_is_list": [
            false,
            false
        ],
        "output_name": [
            "LATENT",
            "IMAGE"
        ],
        "name": "ImageFX",
        "display_name": "ImageFX",
        "description": "",
        "category": "inflamously",
        "output_node": true
    },
    "TestGenerator": {
        "input": {
            "required": {
                "clip": [
                    "CLIP"
                ]
            },
            "hidden": {
                "testId": [
                    "STRING"
                ]
            }
        },
        "output": [
            "CONDITIONING"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "CONDITIONING"
        ],
        "name": "TestGenerator",
        "display_name": "TestGenerator",
        "description": "",
        "category": "inflamously",
        "output_node": true
    },
    "TestNode": {
        "input": {
            "required": {
                "clip": [
                    "CLIP"
                ],
                "image": [
                    "IMAGE"
                ],
                "int_field": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 4096,
                        "step": 64,
                        "display": "number"
                    }
                ],
                "float_field": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": 0.0,
                        "max": 10.0,
                        "step": 0.01,
                        "display": "number"
                    }
                ],
                "print_to_screen": [
                    [
                        "enable",
                        "disable"
                    ]
                ],
                "string_field": [
                    "STRING",
                    {
                        "multiline": false,
                        "default": "dong!"
                    }
                ]
            }
        },
        "output": [
            "CONDITIONING"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "CONDITIONING"
        ],
        "name": "TestNode",
        "display_name": "TestNode",
        "description": "",
        "category": "inflamously",
        "output_node": false
    },
    "TestNode2": {
        "input": {
            "required": {
                "clip": [
                    "CLIP"
                ],
                "image": [
                    "IMAGE"
                ],
                "int_field": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 4096,
                        "step": 64,
                        "display": "number"
                    }
                ],
                "float_field": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": 0.0,
                        "max": 10.0,
                        "step": 0.01,
                        "display": "number"
                    }
                ],
                "print_to_screen": [
                    [
                        "enable",
                        "disable"
                    ]
                ],
                "string_field": [
                    "STRING",
                    {
                        "multiline": false,
                        "default": "dong!"
                    }
                ]
            }
        },
        "output": [
            "CONDITIONING"
        ],
        "output_is_list": [
            false
        ],
        "output_name": [
            "CONDITIONING"
        ],
        "name": "TestNode2",
        "display_name": "TestNode2",
        "description": "",
        "category": "inflamously",
        "output_node": false
    },
    "TestSampler": {
        "input": {
            "required": {
                "model": [
                    "MODEL"
                ],
                "seed": [
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 18446744073709551615
                    }
                ],
                "steps": [
                    "INT",
                    {
                        "default": 20,
                        "min": 1,
                        "max": 10000
                    }
                ],
                "cfg": [
                    "FLOAT",
                    {
                        "default": 8.0,
                        "min": 0.0,
                        "max": 100.0
                    }
                ],
                "sampler_name": [
                    [
                        "euler",
                        "euler_ancestral",
                        "heun",
                        "dpm_2",
                        "dpm_2_ancestral",
                        "lms",
                        "dpm_fast",
                        "dpm_adaptive",
                        "dpmpp_2s_ancestral",
                        "dpmpp_sde",
                        "dpmpp_sde_gpu",
                        "dpmpp_2m",
                        "dpmpp_2m_sde",
                        "dpmpp_2m_sde_gpu",
                        "dpmpp_3m_sde",
                        "dpmpp_3m_sde_gpu",
                        "ddim",
                        "uni_pc",
                        "uni_pc_bh2"
                    ]
                ],
                "scheduler": [
                    [
                        "normal",
                        "karras",
                        "exponential",
                        "sgm_uniform",
                        "simple",
                        "ddim_uniform"
                    ]
                ],
                "positive": [
                    "CONDITIONING"
                ],
                "negative": [
                    "CONDITIONING"
                ],
                "latent_image": [
                    "LATENT"
                ],
                "denoise": [
                    "FLOAT",
                    {
                        "default": 1.0,
                        "min": 0.0,
                        "max": 1.0,
                        "step": 0.01
                    }
                ],
                "mixture": [
                    "FLOAT",
                    {
                        "default": 0.5,
                        "min": 0.0,
                        "max": 1.0,
                        "step": 0.1
                    }
                ]
            }
        },
        "output": [
            "LATENT",
            "LATENT",
            "LATENT"
        ],
        "output_is_list": [
            false,
            false,
            false
        ],
        "output_name": [
            "LATENT",
            "LATENT",
            "LATENT"
        ],
        "name": "TestSampler",
        "display_name": "TestSampler",
        "description": "",
        "category": "inflamously",
        "output_node": false
    }
}
````

