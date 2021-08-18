import { Packer } from "../src/packer";

describe('packer', () => {
    it('return 133', () => {
        expect(new Packer().pack('/Users/amitghosh/Downloads/skeleton_javascript/resources/PackageTest.txt')).toEqual(133);
    });
});
