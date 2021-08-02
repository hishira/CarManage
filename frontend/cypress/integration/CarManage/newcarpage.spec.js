describe("New car page", () => {
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
    cy.get("button").eq(-1).click();
  });
  it("Page must contain title Add new car", () => {
    cy.get("button").eq(-1).click();
    cy.get("p").eq(0).should("contain.text", "Add new car");
  });
  it("Page must contain 5 input", () => {
    cy.get("button").eq(-1).click();
    cy.get("input").should("have.length", 5);
  });
  it("First of them should be text", () => {
    cy.get("input").eq(0).should("have.attr", "type").should("eq", "text");
  });
  it("Second of input should by text", () => {
    cy.get("input").eq(1).should("have.attr", "type").should("eq", "text");
  });
  it("Third of input should by number", () => {
    cy.get("input").eq(2).should("have.attr", "type").should("eq", "number");
  });
  it("Four of input should by date type", () => {
    cy.get("input").eq(3).should("have.attr", "type").should("eq", "date");
  });
  it("Five of input should by number", () => {
    cy.get("input").eq(4).should("have.attr", "type").should("eq", "number");
  });
  it("With wrong car year, we cannot add new car", () => {
    cy.get("input").eq(0).type("Ford");
    cy.get("input").eq(1).type("Mustang");
    cy.get("input").eq(2).type(1890);
    cy.get("input").eq(3).type("2009-12-12");
    cy.get("input").eq(4).type(200);
    cy.get("button").eq(1).click();
    cy.get("input:invalid").should("have.length", 1);
  });
  it("With actual run less than 0, we cannot add new car", () => {
    cy.get("input").eq(0).type("Ford");
    cy.get("input").eq(1).type("Mustang");
    cy.get("input").eq(2).type(1920);
    cy.get("input").eq(3).type("2009-12-12");
    cy.get("input").eq(4).type(-200);
    cy.get("button").eq(1).click();
    cy.get("input:invalid").should("have.length", 1);
  });
  it("With date less than 1970 or now, we cannot add new car", () => {
    cy.get("input").eq(0).type("Ford");
    cy.get("input").eq(1).type("Mustang");
    cy.get("input").eq(2).type(1920);
    cy.get("input").eq(3).type("2022-12-12");
    cy.get("input").eq(4).type(200);
    cy.get("button").eq(1).click();
    cy.get(`[data-tetsid="Message_container"]`).should("have.length", 1);
    cy.get(`[data-tetsid="Message_container"]`)
      .eq(0)
      .should("have.css", "display", "block");
  });
  it("Message contain", () => {
    cy.get("input").eq(0).type("Ford");
    cy.get("input").eq(1).type("Mustang");
    cy.get("input").eq(2).type(1920);
    cy.get("input").eq(3).type("2022-12-12");
    cy.get("input").eq(4).type(200);
    cy.get("button").eq(1).click();
    cy.get(`[data-tetsid="Message_container"]`).should("have.length", 1);
    cy.get(`[data-tetsid="Message_container"]`)
      .eq(0)
      .should(
        "contain.text",
        "Invalid intro date into company, must be bettwen 1970 and now"
      );
  });
  it("For date less than 1970, we cannot add car", () => {
    cy.get("input").eq(0).type("Ford");
    cy.get("input").eq(1).type("Mustang");
    cy.get("input").eq(2).type(1920);
    cy.get("input").eq(3).type("1969-12-12");
    cy.get("input").eq(4).type(200);
    cy.get("button").eq(1).click();
    cy.get(`[data-tetsid="Message_container"]`).should("have.length", 1);
    cy.get(`[data-tetsid="Message_container"]`)
      .eq(0)
      .should(
        "contain.text",
        "Invalid intro date into company, must be bettwen 1970 and now"
      );
  });

  it("With every data ok, we can now add new car", () => {
    cy.get("input").eq(0).type("Ford");
    cy.get("input").eq(1).type("Mustang");
    cy.get("input").eq(2).type(1920);
    cy.get("input").eq(3).type("1979-12-12");
    cy.get("input").eq(4).type(200);
    cy.get("button").eq(1).click();
    cy.get(`[data-tetsid="Message_container"]`).should("have.length", 1);
    cy.get(`[data-tetsid="Message_container"]`)
      .eq(0)
      .should("contain.text", "New car added");
  });
  after(async () => {
    await cy.removeuser();
  });
});
