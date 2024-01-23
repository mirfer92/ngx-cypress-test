import { capitalizeFirstLetter } from '../../utils/stringUtils';
import cyp from '../../utils/cypressManager';

class LeftContainer {
    private selectedTheme: string = "Light";

    private logo_ctr = 'div.logo-container';
    accordion_btn = `${this.logo_ctr} a.sidebar-toggle`;
    logo = `${this.logo_ctr} a.logo`;

    public theme_sel = 'nb-select button.select-button';
    private themeOptions_ctr = 'div.cdk-overlay-pane[id^="cdk-overlay-"]';
    private themeOptions = {
        light: 'default',
        dark: 'dark',
        cosmic: 'cosmic',
        corporate: 'corporate'
    }
    private theme_opt = (option: string) =>
        `nb-option.ng-star-inserted[ng-reflect-value='${this.themeOptions[option.toLowerCase()]}']`;

    public selectTheme(option: string) {
        cyp.validateContainText(this.theme_sel, this.selectedTheme).click();
        cyp.findChildElement(this.themeOptions_ctr, this.theme_opt(option)).click();
        cyp.validateContainText(this.theme_sel, capitalizeFirstLetter(option));
        cyp.validateHaveClass('body', `nb-theme-${this.themeOptions[option.toLowerCase()]}`);
        this.selectedTheme = capitalizeFirstLetter(option);
    }

    public clickSideBarToggle() {
        cyp.findElement(this.accordion_btn).click();
    }
}

export default new LeftContainer();