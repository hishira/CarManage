describe("Main page text", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("One of element should contain text value Welcome", () => {
    cy.get("p").eq(0).should("contain.text", "Welcome");
  });
  it("Should contain two button", () => {
    cy.get("button").should("have.length", 2);
  });
  it("First button should have text value Log in", () => {
    cy.get("button").eq(0).should("contain.text", "Log in");
  });
  it("Second button should have text value sign up", () => {
    cy.get("button").eq(1).should("contain.text", "Sign up");
  });
});
