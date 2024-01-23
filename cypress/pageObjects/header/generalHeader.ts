import leftMenu from './leftContainer';
import rightMenu from './rightContainer';
import cyp from '../../utils/cypressManager';

class GeneralHeader {
    private leftMenu = leftMenu;
    private rightMenu = rightMenu;

    validateLeftMenu() {
        cyp.findElementByText('ngx-admin');
        cyp.findElements(this.leftMenu.accordion_btn, this.leftMenu.logo, this.leftMenu.theme_sel);
    }

    validateThemeSelection(option: string) {
        leftMenu.selectTheme(option);
    }

    validateRightMenu() {
        const options = this.rightMenu.menu_opt;
        const user = this.rightMenu.menu_user;
        cyp.findElements(options('search'), options('email'), options('bell'), user('pic'));
        cyp.validateContainText(user('name'), "Nick Jones");
    }

    toggleSideBar() {
        leftMenu.clickSideBarToggle();
    }
}

export default new GeneralHeader();