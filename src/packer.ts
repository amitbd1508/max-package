import * as fs from 'fs';
import { PackageItem } from './models/package-item';
import { PACKAGE_DATA_FORMAT_REGX } from './util/constant';
import { MaxPacker } from './max-packer';
import { BranchAndBoundStrategy } from './strategies/branch-and-bound.strategy';
import { ApiError } from "./util/error";
import { Data } from "./interface/data";

export class Packer {
  pack(inputFile: string): string {
    const fileContent = fs.readFileSync(inputFile, 'utf8');
    const parsedData = this.parseFileContent(fileContent);

    return this.getResult(parsedData);
  }

  private getResult(parsedData: Data[]) {
    let result = '';
    parsedData.map(data => {
      const bestItems = new MaxPacker(new BranchAndBoundStrategy()).getMaxPackage(
          data.maxCapacity,
          data.packages
      )

      result += this.getFormattedResult(bestItems);

    });

    return result;
  }

  private parseFileContent(input: string): Data[] {
    const data: Data[] = [];

    const lines = input.split('\n');
    lines.map(line => {
      const packageItems: PackageItem[] = [];

      const lineData = line.split(':');

      if (lineData.length !== 2) {
        throw new ApiError('Invalid input!');
      }

      const maxCapacity = parseInt(lineData[0]);
      if (!maxCapacity) {
        throw new ApiError('Invalid weight!');
      }

      const itemData = lineData[1];

      const items = itemData.split(' ');

      items.map(item => {
        let groups = item.match(PACKAGE_DATA_FORMAT_REGX)?.groups;

        if (groups) {
          packageItems.push(
            new PackageItem(+groups.INDEX, +groups.COST, +groups.WEIGHT)
          );
        }
      });
      data.push({ maxCapacity: maxCapacity, packages: packageItems });
    });
    return data;
  }

  private getFormattedResult(bestItems: PackageItem[]): string {
    if(bestItems.length == 0) {
      return '-\n';
    }
    let result = '';

    bestItems.map(item => result += `${item.index} `);
    result += '\n';

    return result;
  }
}
