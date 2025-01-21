
import LoginPage from '../pageobjects/swag_LoginPage'
import { readFileSync } from 'fs'
const loginData = JSON.parse(readFileSync('test/testData/loginData.json'))

describe('Swag Lab Invetory Test',async()=>{

    beforeEach(async()=>{

        await LoginPage.open()
        await LoginPage.login(loginData.valid_User.username,loginData.valid_User.password)
        await expect(browser).toHaveUrl(expect.stringContaining('inventory'))

    })

    it('',async()=>{

    })
})