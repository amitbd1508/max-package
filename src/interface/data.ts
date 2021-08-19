import { PackageItem } from "../models/package-item";

export interface Data {
    packages: PackageItem[];
    maxCapacity: number;
}
