import { expect as expectchai } from 'chai';

class InveteoryPage {

    get items() {
        
        return $$('.inventory_item');
    }
    get itemName() {
        return '.inventory_item_name'
    }
    get itemPrice() {
        return '.inventory_item_price'
    }
    get sortDropdown() {
        return $('.product_sort_container')
    }
    get addToCart(){
        return $$('.btn_inventory');
    }
    get cardIcon(){
        return $('.shopping_cart_badge')
    }
    get removeItem()
    {
        return $$('//button[text()="Remove"]')
    }
    async itemsDisplayed() {
        const items = await this.items;
        expectchai(items.length).to.be.above(0, "No items found on the inventory page")
    }
    async itemsNameDisplayed() {

        const items = await this.items
        for (const item of items) {
            const itemNames = await item.$(this.itemName)
            expectchai(await itemNames.isDisplayed()).to.be.true
        }
    }
    async itemsPriceDisplayed() {
        const items = await this.items
        for (const item of items) {
        
            const itemPrices = await item.$(this.itemPrice)
            expectchai(await itemPrices.isDisplayed()).to.be.true
        }
    }
    async filterPriceLowToHigh()
    {
        const sortDropdown = this.sortDropdown;
        await sortDropdown.waitForDisplayed({ timeout: 5000 });
        await sortDropdown.selectByVisibleText('Price (low to high)');

        const prices = await $$(this.itemPrice);
        const priceValues = await prices.map(async (price) => parseFloat((await price.getText()).replace('$','')))
        const sortedPrices = [...priceValues].sort((a, b) => a - b);
        expectchai(priceValues).to.eql(sortedPrices, 'Items are not sorted by price (low to high)')
    }
    async filterPriceHighToLow()
    {
        const sortDropdown = this.sortDropdown;
        await sortDropdown.waitForDisplayed({ timeout: 5000 });
        await sortDropdown.selectByVisibleText('Price (high to low)');

        const prices = await $$(this.itemPrice);
        const priceValues = await prices.map(async (price) => parseFloat((await price.getText()).replace('$','')))
        const sortedPrices = [...priceValues].sort((a, b) => b - a);
        expectchai(priceValues).to.eql(sortedPrices, 'Items are not sorted by price (high to low)')
    }
    async filterNameAtoZ()
    {
        const sortDropdown = this.sortDropdown;
        await sortDropdown.waitForDisplayed({ timeout: 5000 });
        await sortDropdown.selectByVisibleText('Name (A to Z)');

        const item = await $$(this.itemName);
        const itemNames = await item.map(async (price) => parseFloat((await price.getText())))
        const sortedNames = [...itemNames].sort();
        expectchai(itemNames).to.eql(sortedNames, 'Items are not sorted by Name (A to Z)')
    }
    async filterNameZtoA()
    {
        const sortDropdown = this.sortDropdown;
        await sortDropdown.waitForDisplayed({ timeout: 5000 });
        await sortDropdown.selectByVisibleText('Name (Z to A)');

        const item = await $$(this.itemName);
        const itemNames = await item.map(async (price) => parseFloat((await price.getText())))
        const sortedNames = [...itemNames].reverse();
        expectchai(itemNames).to.eql(sortedNames, 'Items are not sorted by Name (Z to A)')
    }
    async addToCartProduct(product)
    {
        await $("//div[text()='"+product+"']/../../../div[2]//button[text()='Add to cart']").click()
    }
    async verifyCartBadge()
    {
        const cardIcon=this.cardIcon
        const removeItem=this.removeItem
        const removeItemCount=await removeItem.map(async(id)=>await id.getAttribute('id')).length
        await cardIcon.waitForDisplayed({ timeout: 5000 })
        expectchai( await cardIcon.getText()).to.equal(removeItemCount.toString(),'Items are not Add to Cart')
        
    }
}
export default new InveteoryPage()