/// <reference types="cypress" />
import 'cypress-file-upload';

describe('user student E2E', () =>{
    beforeEach(()=>{
        cy.visit('/')
    })


    it('Build from problem',()=>{
        //go to pageONe
        cy.contains('from problem').parent().parent().parent().find('[type=button]').click()
        //test to upload file click with no file
        cy.contains('Upload Files').click()
        cy.contains("Some files are missing").should("be.visible")
        cy.contains("Some files are missing").parent().find('button').click()
        //Upload files
        cy.fixture('./demoData/Blockworld_domain_normal.pddl').then(fileContent => {
            cy.contains('Domain File').parent().parent().parent().find('input[type="file"]').attachFile({
                fileContent: fileContent.toString(),
                fileName: 'Blockworld_domain_normal.pddl',
                mimeType: 'file'
            });
        });
        cy.fixture('./demoData/Blockworld_problem_normal.pddl').then(fileContent => {
            cy.contains('Problem File').parent().parent().parent().find('input[type="file"]').attachFile({
                fileContent: fileContent.toString(),
                fileName: 'Blockworld_problem_normal.pddl',
                mimeType: 'file'
            });
        });
        cy.fixture('./demoData/Blocksworld_AP.pddl').then(fileContent => {
            cy.contains('Animation File').parent().parent().parent().find('input[type="file"]').attachFile({
                fileContent: fileContent.toString(),
                fileName: 'Blocksworld_AP.pddl',
                mimeType: 'file'
            });
        });
        //check messages
        cy.contains("File Blocksworld_AP.pddl successfully added.").should("be.visible")
        //Load next file
        cy.contains('Upload Files').click()
        cy.wait(5000)

        cy.get('canvas').should("be.visible")
    })
})
