// eslint-disable-next-line import/no-extraneous-dependencies
const { pages } = require('../pages/Pages');

describe('My First Test', () => {
  beforeEach(async () => {
    await pages.loginPage.navigate();
    await pages.loginPage.performLogin('standard_user', 'secret_sauce');
    await expect(pages.inventoryPage.headerTitle).toBeExisting();
    await expect(pages.inventoryPage.headerTitle).toBeExisting();
  });
  it('Verify items sorting by Name (A to Z)', async () => {
    const sortedAZBefore = await pages.inventoryPage.sortedItemsNames('asc');
    await pages.inventoryPage.selectSortOption('az');
    const sortedAZAfter = await pages.inventoryPage.getNames('asc');
    await expect(JSON.stringify(sortedAZBefore) === JSON.stringify(sortedAZAfter)).toBe(true);
  });

  it('Verify items sorting by Name (Z to A)', async () => {
    const sortedAZBefore = await pages.inventoryPage.sortedItemsNames();
    await pages.inventoryPage.selectSortOption('za');
    const sortedAZAfter = await pages.inventoryPage.getNames();
    await expect(JSON.stringify(sortedAZBefore) === JSON.stringify(sortedAZAfter)).toBe(true);
  });

  it('Verify items sorting by Price (low to high)', async () => {
    const sortedLowHighBefore = await pages.inventoryPage.sortedItemsPrices('asc');
    await pages.inventoryPage.selectSortOption('lohi');
    const sortedLowHighAfter = await pages.inventoryPage.getPrices();
    await expect(JSON.stringify(sortedLowHighBefore) === JSON.stringify(sortedLowHighAfter)).toBe(true);
  });

  it('Verify items sorting by Price (high to low)', async () => {
    const sortedHighLowBefore = await pages.inventoryPage.sortedItemsPrices();
    await pages.inventoryPage.selectSortOption('hilo');
    const sortedHighLowAfter = await pages.inventoryPage.getPrices();
    await expect(JSON.stringify(sortedHighLowBefore) === JSON.stringify(sortedHighLowAfter)).toBe(true);
  });
});
