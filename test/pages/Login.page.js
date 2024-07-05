const { BasePage } = require('./Base.page');

class LoginPage extends BasePage {
    get userName() { return $('#user-name'); }

    get password() { return $('#password'); }

    get loginBtn() { return $('#login-button'); }

    async performLogin(username, password) {
        await this.userName.setValue(username);
        await this.password.setValue(password);
        await this.loginBtn.click();
    }
}

module.exports = { LoginPage };
