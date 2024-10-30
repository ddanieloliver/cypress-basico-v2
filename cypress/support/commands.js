Cypress.Commands.add('fillMandatoryFieldsAndSubimit',function(){
        cy.get('#firstName').type('Daniel')
        cy.get('#lastName').type('Oliveira')
        cy.get('#email').type('emai@email.com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
})