function selectGroupMenuItem (groupName) {
    cy.contains('a', groupName).then(menu => {
        cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then( data_name => {
            if (data_name.includes('left')) {
                cy.wrap(menu).click();
            }
        });
    });
}

export class NavigationPage {
    formLayoutsPage() {
        selectGroupMenuItem('Forms');
        cy.contains('Form Layouts').click();
    }

    datePickerPage() {
        selectGroupMenuItem('Forms');
        cy.contains('Datepicker').click();
    }

    toasterPage() {
        selectGroupMenuItem('Modal & Overlays');
        cy.contains('Toastr').click();
    }

    smartTablePage() {
        selectGroupMenuItem('Tables & Data');
        cy.contains('Smart Table').click();
    }

    tooltipPage() {
        selectGroupMenuItem('Modal & Overlays');
        cy.contains('Tooltip').click();
    }
}

export const navigateTo = new NavigationPage();