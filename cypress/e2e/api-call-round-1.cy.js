/// <reference types="cypress" />
const fixtures = require('../fixtures/fixtures')

describe('Testing API expected behavior', () => {
  it('step 1 (body lenght)', () => {

    cy.intercept('/login', (req) => {
      req.headers['x-custom-headers'] = 'added by expando'
      console.log(req)
    })
      .as('headers')

    /*
  cy
    .wait('@headers')
    .then((resp) => {
      console.log(resp)
    })

    */
    cy
      .request({
        method: "GET",
        url: Cypress.env('baseUrl')
      }).then((resp) => {
        expect(resp.body).to.exist
        expect(resp.body).to.have.length(6)
      })
  })

  it('step 2 (status code)', () => {
    cy
      .request({
        method: "GET",
        url: Cypress.env('baseUrl')
      }).then((resp) => {
        console.table(resp.body)
        expect(resp.status).to.be.oneOf(fixtures.code.twoXX)
      })
      
  })
  it('step 3 (query parameter behaviour)', () => {
    cy
      .request({
        method: 'GET',
        url: Cypress.env('baseUrl'),
        qs: {
          q: 'triumph'
        }
      }).then((resp) => {

        expect(resp.body).to.have.length(1)
      })
  })

  it('step 4 (custom headers pump in)', () => {

    cy
      .request({
        method: 'GET',
        url: Cypress.env('baseUrl'),
        headers: {
          "x-custom-headers": 'rock and roll'

        },
      }).then((res) => {
        //console.log(typeof (resp.headers))
        console.log(res.headers)
      })


    // the application makes the call ...
    // confirm the custom header was added
    /*
    cy.wait('@headers')
      .its('request.headers')
      .should('have.property', 'x-custom-headers', 'added by cy.intercept')
*/

  })

})