// Importing required modules and the function to be tested.
import { isMessageEvent } from './websocket.utils';
import { describe, expect, it } from '@jest/globals';

// Start of test block
describe('Tests for various websocket utilities', () => {

    // Test case 1: object is of `MessageEvent` type and data is string
    it('should return true when the input object is of type MessageEvent and has data attribute of type string', () => {
        expect(isMessageEvent({ data: "Test String", type: "test" })).toBe(true);
    });

    // Test case 2: object is not of `MessageEvent` type
    it('should return false when the input object is not of type MessageEvent', () => {
        const obj = { data: "Test String" };
        expect(isMessageEvent(obj)).toBe(false);
    });

    // Test case 3: object is of `MessageEvent` type but data is not string
    it('should return false when the input object is of type MessageEvent but has data attribute not of type string', () => {
        expect(isMessageEvent({ data: 123 })).toBe(false);
    });
});