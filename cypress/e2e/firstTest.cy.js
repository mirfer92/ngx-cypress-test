/// <reference types="cypress"/>

const exp = require("constants");

describe('First test suite', () => {
    it('first test', ()=> {
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click(); // contains(): find by HTML text
        cy.contains('Sign in');
        cy.contains('[status="warning"]', 'Sign in');
        cy.contains('nb-card', 'Horizontal form').find('button'); //find(): find child elements by locator
        cy.contains('nb-card', 'Horizontal form').contains('Sign in');
        cy.contains('nb-card', 'Horizontal form').get('button'); // get(): find elements on the page by locator globally.
        
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in') // assertion
            .parents('form')
            .click(); // navigate throug relative elements
    });

    it('save subject of the command', () => {
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        /* cannot do things like this.
        const usingTheGrid = cy.contains('nb-card', 'Using the Grid');
        usingTheGrid.find('[for="inputEmail1"]').should('contain', 'Email');
        usingTheGrid.find('[for="inputPassword2"]').should('contain', 'Password');*/

        cy.contains('nb-card', 'Using the Grid').as('usingTheGrid'); // cypress alias
        cy.get('@usingTheGrid').find('[for="inputEmail1"]').should('contain', 'Email');
        cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('contain', 'Password');

        cy.contains('nb-card', 'Using the Grid').then( usingTheGridForm => { // Using then() which creates JQuery object;
            cy.wrap(usingTheGridForm).find('[for="inputEmail1"]').should('contain', 'Email'); // their elements can be accessible using wrap()
            cy.wrap(usingTheGridForm).find('[for="inputPassword2"]').should('contain', 'Password');
        })
    });

    it('extract text', () => {
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        // 1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address');

        // 2
        cy.get('[for="exampleInputEmail1"]').then( label => {
            const labelText = label.text();
            expect(labelText).to.equal('Email address');
            cy.wrap(labelText).should('contain', 'Email address');
        });

        // 3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
            expect(text).to.eq("Email address");
        });
        cy.get('[for="exampleInputEmail1"]').invoke('text').as('labelText').should('contain', 'Email address');

        // 4 invoke attribute
        cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then(classValue => {
            expect(classValue).to.eql("label");
        });

        // 5 invoke property
        cy.get('#exampleInputEmail1').type('test@test.com'); // types text into an element
        cy.get('#exampleInputEmail1').invoke('prop', 'value').should('contain', 'test@test.com').then(property => {
            expect(property).to.equal('test@test.com');
        })
    })

    it('radio button', () => {
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
            cy.wrap(radioButtons).eq(0).check({force: true}).should('be.checked'); // eq selects an specific checkbox by index
            cy.wrap(radioButtons).eq(1).check({force: true}).should('be.checked');
            cy.wrap(radioButtons).eq(0).should('not.be.checked');
            cy.wrap(radioButtons).eq(2).should('be.disabled');
        })
    });

    it('checkboxes', () => {
        cy.visit('/');
        cy.contains('Modal & Overlays').click();
        cy.contains('Toastr').click();

        cy.get('[type="checkbox"]').check({force: true}); // clicks only if it's not checked -- since eq is not applyied, this line and the next one will check/uncheck all checkboxes
        cy.get('[type="checkbox"]').uncheck({force: true}); // clicks only if it's checked
        cy.get('[type="checkbox"]').eq(1).click({force: true}); // clicks no matter if it's checked or unchecked
    });

    it('datepicker', () => {
        function selectDayFromCurrent(daysFromToday) {
            let date = new Date();
            date.setDate(date.getDate() + daysFromToday);
            let futureDay = date.getDate();
            let futureMonth = date.toLocaleDateString('en-US', {month: 'short'});
            let futureYear = date.getFullYear();
            let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`;
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
                if(!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)) {
                    cy.get('[data-name="chevron-right"]').click();
                    selectDayFromCurrent(daysFromToday);
                } else {
                    cy.get('.day-cell').not('.bounding-month').contains(futureDay).click();
                }
            })
            return dateToAssert;
        };

        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Datepicker').click();
        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click();
            const dateToAssert = selectDayFromCurrent(508);
            cy.wrap(input).invoke('prop', 'value').should('contain', dateToAssert);
            cy.wrap(input).should('have.value', dateToAssert);
        });
    });

    it('List and Drowdowns', () => {
        cy.visit('/');

        // 1
        cy.get('nav nb-select').click();
        cy.get('.options-list').contains('Dark').click();
        cy.get('nav nb-select').should('contain', 'Dark');

        // 2
        cy.get('nav nb-select').then( dropdown => {
            cy.wrap(dropdown).click();
            cy.get('.options-list nb-option').each((listItem, index) => { // each() iterates across all items
                const itemText = listItem.text().trim();
                cy.wrap(listItem).click();
                cy.wrap(dropdown).should('contain', itemText);
                if( index < 3 ) {
                    cy.wrap(dropdown).click();
                }
            })
        });
    })

    it('Web Tables', () => {
        cy.visit('/');
        cy.contains('Tables & Data').click();
        cy.contains('Smart Table').click();

        //1 Get row by Text --> contains('tr', 'text')
        cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click();
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('35');
            cy.wrap(tableRow).find('.nb-checkmark').click();
            cy.wrap(tableRow).find('td').eq(6).should('contain', '35');
        })

        // 2. Get row by index
        cy.get('thead').find('.nb-plus').click();
        cy.get('thead').find('tr').eq(2).then(row => {
            cy.wrap(row).find('[placeholder="First Name"]').type('Alex');
            cy.wrap(row).find('[placeholder="Last Name"]').type('Campbell');
            cy.wrap(row).find('.nb-checkmark').click();
        });
        cy.get('tbody tr').first().find('td').then(col => {
            cy.wrap(col).eq(2).should('contain', 'Alex');
            cy.wrap(col).eq(3).should('contain', 'Campbell');
        })


        // 3. Get each row validation
        const ages = [20, 30, 40, 200];
        cy.wrap(ages).each(age => {
            cy.get('thead').find('[placeholder="Age"]').clear().type(age); // using the Column-Filter functionality
            cy.wait(500);
            cy.get('tbody tr').each(row => {
                if (age == 200) {
                    cy.wrap(row).should('contain', 'No data found')
                } else {
                    cy.wrap(row).find('td').eq(6).should('contain', age);
                }
            });
        });
    });
    
    it('Tooltips', () => {
        cy.visit('/');
        cy.contains('Modal & Overlays').click();
        cy.contains('Tooltip').click();

        // Tooltip
        cy.contains('nb-card', 'Colored Tooltip').contains('Default').click(); // The tooltip is visible in the DOM when a box is clicked
        cy.get('nb-tooltip').should('contain', 'This is a tooltip');
    });

    it('Dialog Box (alerts)', () => {
        cy.visit('/');
        cy.contains('Tables & Data').click();
        cy.contains('Smart Table').click();

        cy.get('tbody tr').first().find('.nb-trash').click();

        // 1. The problem is that the text only can be asserted when the window:confirm is triggered
        // But, if the event window:confirm is not triggered at all, the test should pass without problems, which is a false negative.
        /*cy.on('window:confirm', (confirm) => { // also can be accessed by 'window:alert'
            expect(confirm).to.eq('Are you sure you want to delete?');
        })*/

        // 2. The stub is an object which is saving the window:confirm dialog box
        // When the stub is trying to run getCall method, and since it's calledWith the text;
        // then, the test should fail when the dialog box is not triggered.
        /* const stub = cy.stub();
        cy.on('window:confirm', stub);
        cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
            expect(stub.getCall(0).to.be.calledWith('Are you sure you want to delete?'));
        }) */

        // This select "Confirm" and "Cancel"
        cy.on('window:confirm', () => true); // Confirm
        cy.on('window:confirm', () => false); // Cancel
    });
});

/**
 * IMPORTANT THINGS ABOUT CYPRESS ASSERTIONS
 * - Assertions are retried by default, 4 seconds after the first assertion fails.
 * - Each method to find eelements by locator or text; perform assertions behind the scenes.
 * - Actions like click or type, perform assertions to be interactable before perform the action.
 * - should method can chain more than one assertions with the .and() method. Really big list of validations to be performed.
 * - expect method is useful into the then() method - this method is used as chai and chaiJquery libraries. all in the cypress documentation
 */