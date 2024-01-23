class CypressManager {

    // Browser Actions

    navigateTo(url: string = '') {
        cy.visit(url);
    }

    // Finding Elements

    findElementByText(text: string) {
        cy.contains(text);
    }

    findElement(locator: string, options: object = {}) {
        return cy.get(locator, options);
    }

    findElements(...locators: string[]) {
        locators.forEach(loc => cy.get(loc));
    }

    findChildElement(parent: string, child: string) {
        return this.findElement(parent).find(child);
    }

    // Validation

    private validateElement(locator: string, chainer: string, text: string, options: object = {}) {
        return this.findElement(locator, options).should(chainer, text);
    }

    validateContainText(locator: string, text: string, options: object = {}) {
        return this.validateElement(locator, "contain.text", text, options);
    }

    validateHaveClass(locator: string, text: string, options: object = {}) {
        return this.validateElement(locator, "have.class", text, options);
    }

    validateDoesNotHaveClass(locator: string, text: string, options: object = {}) {
        return this.validateElement(locator, "not.have.class", text, options);
    }
    
    validateTextFromOptions(locator: string, expected: string[]) {
        const options: string[] = [];
        this.findElement(locator).each(($el) => {
            const option: string = $el.text();
            options.push(option);
        }).then(() => {
            cy.wrap(options).as('options')
        });
        
        cy.get('@options').then(options => {
            expect(options).to.deep.eq(expected);
        })
    }
}

export default new CypressManager();