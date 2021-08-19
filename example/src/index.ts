import { Packer } from "@amitbd1508/max-package";

class SampleExample {
    static run() {
        const packer = new Packer();
        const fileData = packer.pack(
            '/Users/amitghosh/Downloads/skeleton_javascript/resources/Packagetest.txt'
        );

        console.log(fileData)
    }
}

SampleExample.run();
