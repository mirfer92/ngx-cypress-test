const { onDatepickerPage } = require("../../support/page_objects/datepickerPage");
const { onFormLayoutsPage } = require("../../support/page_objects/formLayoutsPage");
const { navigateTo } = require("../../support/page_objects/navigationPage");
const { onSmartTablePage } = require("../../support/page_objects/smartTablePage");

describe('Test using Page Object Model', () => {
    beforeEach('open application', () => {
        cy.openHomePage();
    });

    it('Verify navigation cross the pages', () => {
        navigateTo.formLayoutsPage();
        navigateTo.datePickerPage();
        navigateTo.smartTablePage();
        navigateTo.toasterPage();
        navigateTo.tooltipPage();
    });

    it.only(' should submit Inline and Basic form and select tomorrow date in the calendar', () => {
        navigateTo.formLayoutsPage();
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Artem', 'art.tem@email.test');
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('test@test.com', 'P4a$$Wrd!');
        navigateTo.datePickerPage();
        onDatepickerPage.selectCommonDatepickerDateFromToday(45);
        onDatepickerPage.selectDatePickerWithRangeFromToday(7, 14);
        navigateTo.smartTablePage();
        onSmartTablePage.addNewRowWithFirstAndLastName('Jenny', 'Rivera');
        onSmartTablePage.updateAgeByFirstName('Jenny', 40);
        onSmartTablePage.deleteRowByIndex(1);
    });
})