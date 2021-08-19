import { PackageItem } from './package-item';

export class TreeNode {
  level: number;
  profit: number;
  weight: number;
  items: PackageItem[];
  bound: number = 0;

  constructor(level: number, weight: number, profit: number) {
    this.level = level;
    this.profit = profit;
    this.weight = weight;
    this.items = [];
  }
}
