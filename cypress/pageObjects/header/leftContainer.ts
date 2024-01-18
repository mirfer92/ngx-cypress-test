import { capitalizeFirstLetter } from '../../utils/stringUtils';

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
        cy.get(this.theme_sel).should("contain.text", this.selectedTheme).click();
        cy.get(this.themeOptions_ctr).find(this.theme_opt(option)).click();
        cy.get(this.theme_sel).should("contain.text", capitalizeFirstLetter(option));
        cy.get('body').should("have.class", `nb-theme-${this.themeOptions[option.toLowerCase()]}`);
        this.selectedTheme = capitalizeFirstLetter(option);
    }
}

export default new LeftContainer();