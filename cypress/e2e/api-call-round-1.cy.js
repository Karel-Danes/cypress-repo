/// <reference types="cypress" />

describe('Testing API expected beavior',() => {
  it('step 1 (body lenght)', () => {
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
        expect(resp.status).to.eq(100)
      })
  })
})