import { Strategy } from '../interface/strategy';
import { PackageItem } from '../models/package-item';
import { TreeNode } from '../models/tree-node';
import PriorityQueue from 'priorityqueue';

export class BranchAndBoundStrategy implements Strategy {
  execute(maxCapacity: number, packageItems: PackageItem[]): PackageItem[] {
    let bestItems: PackageItem[] = [];
    let maxProfit = 0;
    const totalPackage = packageItems.length;

    const compare = (a: number, b: number) => (a > b ? 1 : a < b ? -1 : 0);
    const comparator = (a: TreeNode, b: TreeNode) => {
      const x = compare(a.bound, b.bound);
      const y = compare(a.bound, b.bound);
      return x ? x : y;
    };

    packageItems.sort(
      (x: PackageItem, y: PackageItem) => y.pricePerWeight - x.pricePerWeight
    );

    const priorityQueue = new PriorityQueue({ comparator });

    let node = new TreeNode(-1, 0, 0);
    node.bound = this.getBound(node, maxCapacity, packageItems);

    priorityQueue.push(node);

    while (priorityQueue.length !== 0) {
      node = priorityQueue.pop();

      if (node.bound > maxProfit) {
        if (node.level == totalPackage - 1) {
          continue;
        }

        const currentLevel = node.level + 1;
        const currentProfit = node.profit + packageItems[currentLevel].profit;
        const currentWeight = node.weight + packageItems[currentLevel].weight;

        const leftNode = new TreeNode(
          currentLevel,
          currentWeight,
          currentProfit
        );
        leftNode.items = [...node.items];
        leftNode.items.push(packageItems[leftNode.level]);

        if (leftNode.weight <= maxCapacity && leftNode.profit > maxProfit) {
          maxProfit = leftNode.profit;
          bestItems = [...leftNode.items];
        }

        leftNode.bound = this.getBound(
          leftNode,
          maxCapacity,
          packageItems
        );

        if (leftNode.bound > maxProfit) {
          priorityQueue.push(leftNode);
        }

        const rightNode = new TreeNode(
          leftNode.level,
          node.weight,
          node.profit
        );
        rightNode.bound = this.getBound(
          rightNode,
          maxCapacity,
          packageItems
        );
        rightNode.items = [...node.items];

        if (rightNode.bound > maxProfit) {
          priorityQueue.push(rightNode);
        }
      }
    }
    return bestItems;
  }

  private getBound(
    node: TreeNode,
    capacity: number,
    packageItems: PackageItem[]
  ): number {
    const totalPackage = packageItems.length;

    if (node.weight > capacity) {
      return 0;
    }

    let result = node.profit;
    let j = node.level + 1;
    let totalWeight = node.weight;
    while (
      j < totalPackage &&
      totalWeight + packageItems[j].weight <= capacity
    ) {
      totalWeight = totalWeight + packageItems[j].weight;
      result = result + packageItems[j].profit;
      j++;
    }
    if (j < totalPackage) {
      result += (capacity - totalWeight) * packageItems[j].pricePerWeight;
    }

    return result;
  }
}
