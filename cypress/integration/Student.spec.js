/// <reference types="cypress" />

describe('user student E2E', () =>{
    beforeEach(()=>{
        cy.visit('/')
    })

    it('Load pddl', ()=>{
        cy.get('button')

    })

    it('Build from problem',()=>{
        cy.contains('from problem').parent().parent().parent().find('[type=button]').click()
    
    })
})
