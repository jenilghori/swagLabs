class LoginPage{

    get username()
    {
        return $("#user-name")
    }
    get password()
    {
        return $("#password")
    }
    get loginButton()
    {
        return $("#login-button")
    }
    get errorMsg()
    {
        return $("h3[data-test='error']")
    }
    async getErrorMsg()
    {
        return await this.errorMsg.getText()
    }
    async open()
    {
         await browser.url("https://www.saucedemo.com/")
    }
    async login(username,password)
    {
        await this.username.setValue(username)
        await this.password.setValue(password)
        await this.loginButton.click()

    }
    async buttoIsDisplayed(button){
       await $(button).waitForDisplayed({timeout:5000,timeoutMsg:`${button} is not visisble`}).click()
       


    }
  
}
export default new LoginPage()