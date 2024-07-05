const { pages } = require('../pages/Pages');
const users = require('../data/users');

async function verifyNameSorting(order, option) {
    const sortedNames = await pages.inventoryPage.sortedItemsNames(order);
    await pages.inventoryPage.selectSortOption(option);
    const expectedNamesOrder = await pages.inventoryPage.getNames(order);
    expect(JSON.stringify(sortedNames) === JSON.stringify(expectedNamesOrder)).toBe(true);
}

async function verifyPriceSorting(order, option) {
    const sortedPrices = await pages.inventoryPage.sortedItemsPrices(order);
    await pages.inventoryPage.selectSortOption(option);
    const expectedPricesOrder = await pages.inventoryPage.getPrices(order);
    expect(JSON.stringify(sortedPrices) === JSON.stringify(expectedPricesOrder)).toBe(true);
}

describe('My First Test', () => {
    beforeEach(async () => {
        await pages.loginPage.navigate();
        await pages.loginPage.performLogin(users.standardUser.username, users.standardUser.password);
        await expect(pages.inventoryPage.headerTitle).toBeExisting();
        await expect(pages.inventoryPage.headerTitle).toBeExisting();
    });

    it('Sort by Name (A to Z)', async () => {
        await verifyNameSorting('asc', 'az');
    });

    it('Sort by Name (Z to A)', async () => {
        await verifyNameSorting('desc', 'za');
    });

    it('Sort by Price (low to high)', async () => {
        await verifyPriceSorting('asc', 'lohi');
    });

    it('Sort by Price (high to low)', async () => {
        await verifyPriceSorting('desc', 'hilo');
    });
});
