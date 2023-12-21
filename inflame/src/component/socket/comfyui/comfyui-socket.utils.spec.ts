import {isSidPresent} from './comfyui-socket.utils';
import {ComfyuiStatusDTO, ComfyuiStatusWithSidDTO} from './dto/comfyui-message.model.ts';

describe('Tests various utils functions', () => {

    test('should return true if sid is present on message', () => {
        expect(
            isSidPresent({
                sid: 'some sid',
            } as ComfyuiStatusWithSidDTO | ComfyuiStatusDTO)
        ).toBe(true);
    });

    test('should return false if sid is not present on message', () => {
        expect(
            isSidPresent({} as ComfyuiStatusWithSidDTO | ComfyuiStatusDTO)
        ).toBe(false);
    });
});