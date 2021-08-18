import * as fs from 'fs';
import { PackageItem } from "./models/package-item";
import { PACKAGE_DATA_FORMAT_REGX } from "./util/constant";
import { MaxPacker } from "./max-packer";
import { BranchAndBoundStrategy } from "./strategies/branch-and-bound.strategy";

export class Packer {
    pack(inputFile: string): string {
        const input = fs.readFileSync(inputFile, 'utf8');
        const formattedData = this.parseInputData(input);

        const result: any[][] = [];
        formattedData.map(data => {
            result.push(new MaxPacker(new BranchAndBoundStrategy()).getMaxPackage(data.weight, data.packages));
        });

        return this.getFormattedOutput(result);

    }

    private parseInputData(input: string): Data[] {
        const data: Data[] = [];

        const lines = input.split('\n');
        lines.map(line => {
            const packageItems: PackageItem[] = [];

            const lineData = line.split(':');

            if (lineData.length !== 2) {
                // throw new ApiError('Invalid input!');
            }

            const weight = parseInt(lineData[0]);
            if (!weight) {
                // throw new ApiError('Invalid weight!');
            }

            const itemData = lineData[1];

            const items = itemData.split(' ');

            items.map(item => {
                let groups = item.match(PACKAGE_DATA_FORMAT_REGX)?.groups;

                if (groups) {
                    packageItems.push(new PackageItem(+groups.INDEX, +groups.COST, +groups.WEIGHT));
                }
            })
            data.push({weight: weight, packages: packageItems});

        });
        return data;

    }

    private getFormattedOutput(result: any[][]): string {
        let output = '';
        for(let i =0; i<result.length ; i++) {
            if(result[i].length == 0) {
                output += '-\n';
            } else {
                for(let j = 0; j< result[i].length; j++) {
                    output += `${result[i][j].index} `;
                }
                output += `\n`
            }
        }
        return output;
    }
}

interface Data {
    packages: PackageItem[]
    weight: number;
}





