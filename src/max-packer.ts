import { Strategy } from './interface/strategy';
import { PackageItem } from './models/package-item';

export class MaxPacker {
  strategy: Strategy;

  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  getMaxPackage(
    maxCapacity: number,
    packageItem: PackageItem[]
  ): PackageItem[] {
    return this.strategy.execute(maxCapacity, packageItem);
  }
}
