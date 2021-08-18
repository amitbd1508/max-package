export class PackageItem {
    index: number;
    profit: number;
    weight: number;
    pricePerWeight: number;
    constructor(index: number, profit: number, weight: number) {
        this.index = index;
        this.profit = profit;
        this.weight = weight;
        this.pricePerWeight = this.profit/this.weight;
    }
}
