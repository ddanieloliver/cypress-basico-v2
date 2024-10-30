// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html');
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia formulário', function(){
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste. '
        
        cy.get('#firstName').type('Daniel')
        cy.get('#lastName').type('Oliveira')
        cy.get('#email').type('emai@email.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Daniel')
        cy.get('#lastName').type('Oliveira')
        cy.get('#email').type('emai@email,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('Campo telefone continua vazio quando preenchido com valor não-numerico', function(){
        cy.get('#phone').type('abc').should('have.value', '')
    })
   it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
    cy.get('#firstName').type('Daniel')
    cy.get('#lastName').type('Oliveira')
    cy.get('#email').type('emai@email.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
   })
   it('preenche e limpa os campos nome, sobrenome, email e telefone',function(){
    cy.get('#firstName').type('Daniel').should('have.value', 'Daniel').clear().should('have.value', '')
    cy.get('#lastName').type('Oliveira').should('have.value', 'Oliveira').clear().should('have.value', '')
    cy.get('#email').type('email@email.com').should('have.value', 'email@email.com').clear().should('have.value', '')
    cy.get('#open-text-area').type('teste').should('have.value', 'teste').clear().should('have.value', '')
    cy.get('#phone').type('12345').should('have.value', '12345').clear().should('have.value', '')

   })
   it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
   })
   it('envia o formuário com sucesso usando um comando customizado', function(){
    cy.fillMandatoryFieldsAndSubimit()
    cy.get('.success').should('be.visible')
    
   })
  })

  