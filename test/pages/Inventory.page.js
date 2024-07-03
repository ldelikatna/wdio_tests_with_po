/* eslint-disable class-methods-use-this */
const { BaseSwagLabPage } = require('./BaseSwagLab.page');

class InventoryPage extends BaseSwagLabPage {
  url = '/inventory.html';

  get headerTitle() { return $('.title'); }

  get inventoryItems() { return $$('.inventory_item'); }

  get inventoryItemNames() { return $$('[data-test="inventory-item-name"]'); }

  get inventoryItemPrices() { return $$('[data-test="inventory-item-price"]'); }

  get addItemToCartBtns() { return $$('[id^="add-to-cart"]'); }

  get sortContainer() { return $('[data-test="product-sort-container"]'); }

  async addItemToCartById(id) {
    await this.addItemToCartBtns[id].click();
  }

  async sortedItemsNames(direction = 'desc') {
    const names = await this.getNames();
    if (direction === 'asc') {
      return names.sort();
    }
    return names.reverse();
  }

  async getNames() {
    const names = [];
    // eslint-disable-next-line no-restricted-syntax
    for await (const item of this.inventoryItemNames) {
      const itemName = await item.getText();
      names.push(itemName);
    }
    return names;
  }

  async sortedItemsPrices(direction = 'desc') {
    const prices = await this.getPrices();
    if (direction === 'asc') {
      return prices.sort(((a, b) => a - b));
    }
    return prices.sort(((a, b) => b - a));
  }

  async getPrices() {
    const prices = [];
    // eslint-disable-next-line no-restricted-syntax
    for await (const item of this.inventoryItemPrices) {
      const itemPrice = await item.getText();
      const price = parseFloat(itemPrice.replace(/[^0-9.-]+/g, ' '));
      prices.push(price);
    }
    return prices;
  }

  async selectSortOption(value) {
    await this.sortContainer.click();
    await this.sortContainer.selectByAttribute('value', value);
  }
}

module.exports = { InventoryPage };
