import { PackageItem } from '../models/package-item';

export interface Strategy {
  execute(maxCapacity: number, packageItem: PackageItem[]): PackageItem[];
}
