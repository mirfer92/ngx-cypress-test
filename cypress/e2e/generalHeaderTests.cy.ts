import generalHeader from '../pageObjects/header/generalHeader';

describe('template spec', () => {
  it('Validate Header Elements', () => {
    cy.visit('');
    generalHeader.validateLeftMenu();
    generalHeader.validateRightMenu();
  })

  it('Validate Theme Selection', () => {
    cy.visit('');
    generalHeader.validateThemeSelection('cosmic');
    generalHeader.validateThemeSelection('corporate');
    generalHeader.validateThemeSelection('light');
    generalHeader.validateThemeSelection('dark');
  })
});