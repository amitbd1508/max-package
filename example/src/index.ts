import { Packer } from '@amitbd1508/max-package';

class SampleExample {
    static run() {
        const pack = new Packer();
        const fileData = pack.readFile(
            '/Users/amitghosh/Downloads/skeleton_javascript/resources/Packagetest.txt'
        );
        const result = pack.getResult(fileData);
        console.log(`Result: ${result}`);
    }
}

SampleExample.run();
