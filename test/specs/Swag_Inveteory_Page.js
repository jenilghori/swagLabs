import InveteoryPage from '../pageobjects/swag_InveteoryPage.js'
import LoginPage from '../pageobjects/swag_LoginPage'
import { readFileSync } from 'fs'
const loginData = JSON.parse(readFileSync('test/testData/loginData.json'))
const products =JSON.parse(readFileSync('test/testData/product.json'))

describe('Swag Lab Invetory Test',async()=>{

    beforeEach(async()=>{

        await LoginPage.open()
        await LoginPage.login(loginData.valid_User.username,loginData.valid_User.password)
        await expect(browser).toHaveUrl(expect.stringContaining('inventory'))

    })
    it('should display all items on the inventory page', async () => {
        await InveteoryPage.itemsDisplayed()
        await InveteoryPage.itemsNameDisplayed()
        await InveteoryPage.itemsPriceDisplayed()
    })
    it('should sort items by price or name', async () => {
        await InveteoryPage.filterPriceLowToHigh()
        await InveteoryPage.filterPriceHighToLow()
        await InveteoryPage.filterNameAtoZ()
        await InveteoryPage.filterNameZtoA()
    });
    it('should allow adding items to the cart', async () => {
        await InveteoryPage.addToCartProduct(products.product[1])
        await InveteoryPage.addToCartProduct(products.product[3])
        await InveteoryPage.verifyCartBadge()
    });
})