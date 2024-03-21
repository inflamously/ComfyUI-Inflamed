// Assuming we have access to these functions and objects
import { createListenerPreparedAction } from './action-listener.ts'

describe('createListenerAction', () => {
    test('should generate an action with given payload', () => {
        const mockActionName = 'mockAction'
        const mockPayload = { test: 'testing payload' }

        const mockPrepareAction = () => {
            return { payload: mockPayload }
        }

        const resultAction = createListenerPreparedAction(mockActionName, mockPrepareAction)
        expect(resultAction()).toHaveProperty('payload', mockPayload)
    })
})
