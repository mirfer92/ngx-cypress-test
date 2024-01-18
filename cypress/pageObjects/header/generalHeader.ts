import leftMenu from './leftContainer';
import rightMenu from './rightContainer';

class GeneralHeader {
    private leftMenu = leftMenu;
    private rightMenu = rightMenu;

    validateLeftMenu() {
        cy.contains('ngx-admin')
        cy.get(this.leftMenu.accordion_btn);
        cy.get(this.leftMenu.logo);
        cy.get(this.leftMenu.theme_sel);
    }

    validateThemeSelection(option: string) {
        leftMenu.selectTheme(option);
    }

    validateRightMenu() {
        cy.get(this.rightMenu.menu_opt('search'));
        cy.get(this.rightMenu.menu_opt('email'));
        cy.get(this.rightMenu.menu_opt('bell'));
        cy.get(this.rightMenu.menu_user('pic'));
        cy.get(this.rightMenu.menu_user('name')).should("contain.text", "Nick Jones");
    }
}

export default new GeneralHeader();