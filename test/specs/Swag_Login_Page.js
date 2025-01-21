import LoginPage from '../pageobjects/swag_LoginPage'
import { readFileSync } from 'fs'
const loginData = JSON.parse(readFileSync('test/testData/loginData.json'))

//element 
const ERROR_MSG="Epic sadface: Username and password do not match any user in this service"
const USERNAME_ERROR_MSG="Epic sadface: Password is required"
const PASSWORD_ERROR_MSG="Epic sadface: Username is required"

describe('Swag Lab Login Test', async () => {

    beforeEach(async () => {
        await LoginPage.open()
    })
    it('should login successfully with valid credentials', async () => {

        await LoginPage.login(loginData.valid_User.username, loginData.valid_User.password)
        // Verify successful login
        await expect(browser).toHaveUrl(expect.stringContaining('inventory'))

    })
    it('should show error with invalid credentials', async () => {

        await LoginPage.login(loginData.invalid_User.username, loginData.invalid_User.password)
        //Verify error msg   
        const errorMsg = await LoginPage.getErrorMsg()
        await expect(errorMsg).toContain(ERROR_MSG)

    })
    it('should login only username with valid credentials',async()=>{
        await LoginPage.username.setValue(loginData.valid_User.username)
        await LoginPage.loginButton.click()

         //Verify error msg   
        const errorMsg = await LoginPage.getErrorMsg()
        await expect(errorMsg).toContain(USERNAME_ERROR_MSG)
    })
    it('should login only password with valid credentials',async()=>{
        await LoginPage.password.setValue(loginData.valid_User.password)
        await LoginPage.buttoIsDisplayed("#login-button")
         //Verify error msg   
        const errorMsg = await LoginPage.getErrorMsg()
        await expect(errorMsg).toContain(PASSWORD_ERROR_MSG)
    })


})