/// <reference types="cypress" />
const fixtures = require('../fixtures/fixtures')
let responseBodyLength;

describe('Testing API expected behavior', () => {
  it('step 1 (body length)', () => {

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
    /*
    cy.wait('@headers')
      .its('request.headers')
      .should('have.property', 'x-custom-headers', 'added by cy.intercept')
*/

  })
  it('step 5 (custom body pumping in)', () => {
    cy
      .request({
        method: 'POST',
        url: Cypress.env('baseUrl'),
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          'newKey': 'newValue'
        }
      })

    cy
      .request({
        method: 'GET',
        url: Cypress.env('baseUrl'),
      }).then((resp) => {
        console.table(resp.body)
      })
  })


  it('step 6 (custom body erasing)', () => {

    cy
    .request({
      method: 'DELETE',
      url: `https://boostbrothers-bikes-api.herokuapp.com/motorcycles/7`,
    })

/*
    cy
      .request({
        method: 'GET',
        url: Cypress.env('baseUrl'),
      }).then((resp) => {
        if (resp.body.length > 6) {
          for (let i = 7; i < resp.body.length; i++) {


            cy
              .request({
                method: 'DELETE',
                url: `https://boostbrothers-bikes-api.herokuapp.com/motorcycles/${i}`,
              })

          }
        }
      })
      */
  })
})