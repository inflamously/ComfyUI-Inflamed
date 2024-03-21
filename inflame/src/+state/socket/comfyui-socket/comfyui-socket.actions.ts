import { createListenerPreparedAction } from '../../action-listener.ts'
import {
    ComfyuiExecutedDTO,
    ComfyuiExecutingDTO,
    ComfyuiExecutionCachedDTO,
    ComfyuiExecutionStartDTO,
    ComfyuiStatusDTO,
    ComfyuiStatusWithSidDTO,
} from '@inflame/models'

const executionCached = createListenerPreparedAction(
    'comfyuiSocket/executionCached',
    (payload: ComfyuiExecutionCachedDTO) => {
        return {
            payload,
        }
    }
)

const executionStart = createListenerPreparedAction(
    `comfyuiSocket/executionStart`,
    (payload: ComfyuiExecutionStartDTO) => {
        return {
            payload,
        }
    }
)

const executing = createListenerPreparedAction(
    'comfyuiSocket/executing',
    (payload: ComfyuiExecutingDTO) => {
        return {
            payload,
        }
    }
)

const executed = createListenerPreparedAction(
    'comfyuiSocket/executed',
    (payload: ComfyuiExecutedDTO) => {
        return {
            payload,
        }
    }
)

const statusEvent = createListenerPreparedAction(
    'comfyuiSocket/statusEvent',
    (payload: ComfyuiStatusWithSidDTO | ComfyuiStatusDTO) => {
        return {
            payload,
        }
    }
)

export const comfyuiSocketActions = {
    statusEvent,
    executionStart,
    executionCached,
    executing,
    executed,
}
