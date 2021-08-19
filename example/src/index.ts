import { Packer } from "../../src/packer";

class SampleExample {
    static run() {
        const packer = new Packer();
        const fileData = packer.pack(
            'Enter file path'
        );

        console.log(fileData)
    }
}

SampleExample.run();
