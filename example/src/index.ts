import { Packer } from "@amitbd1508/max-package";

class SampleExample {
    static run() {
        const pack = new Packer();
        const fileData = pack.pack(
            '/Users/amitghosh/Downloads/skeleton_javascript/resources/Packagetest.txt'
        );

        console.log(fileData)
    }
}

SampleExample.run();
