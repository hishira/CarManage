describe("User car test", () => {
  before(async () => {
    await cy.adduser();
  });
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.get("input").eq(0).clear();
    cy.get("input").eq(1).clear();
    cy.get("input").eq(0).type("uniwersalnytest@uniwersalnytest.com");
    cy.get("input").eq(1).type("123456#");
    cy.get("button").click();
    cy.wait(2000);
  });
  it("Should contain title Your cars", () => {
    cy.get("p").eq(0).should("contain.text", "Your cars");
  });
  it("Site should containt default 2 button", () => {
    cy.get("button").should("have.length.at.least", 2);
  });
  it("First button must have text Logout", () => {
    cy.get("button").eq(0).should("have.text", "Logout");
  });
  it("Last button musthave text Add new car", () => {
    cy.get("button").eq(-1).should("have.text", "Add new car");
  });
  it("After logout, cookies must be clear out", () => {
    cy.get("button").eq(0).click();
    cy.getCookies().should("have.length", 0);
  });
  after(async () => {
    await cy.removeuser();
  });
});
