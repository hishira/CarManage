describe("Signup page test", () => {
  before(async () => {
    await cy.adduser();
  });
  beforeEach(() => {
    cy.visit("http://localhost:3000/signup");
    cy.clearCookies();
    cy.clearLocalStorage();
  });
  it("Site should contain title Sign up", () => {
    cy.get("p").eq(0).should("contain.text", "Sign Up");
  });
  it("Site should containt 3 input fields", () => {
    cy.get("input").should("have.length", 3);
  });
  it("First of them should be text", () => {
    cy.get("input").eq(0).should("have.attr", "type").should("eq", "text");
  });
  it("Second of input should by email type", () => {
    cy.get("input").eq(1).should("have.attr", "type").should("eq", "email");
  });
  it("Last input should be password type", () => {
    cy.get("input").eq(2).should("have.attr", "type").should("eq", "password");
  });
  it("Site should contain sign up button", () => {
    cy.get("button").should("have.length", 1);
  });
  it("Button text should be Login", () => {
    cy.get("button").eq(0).should("contain.text", "Sign up");
  });
  it("We cannot sign up with wrong email", () => {
    cy.get("input").eq(0).type("Jan Kowalski");
    cy.get("input").eq(1).type("123");
    cy.get("input").eq(2).type("123123");
    cy.get("button").click();
    cy.get("input:invalid").should("have.length", 1);
  });
  it("If we pass wrong password, to short, message appear", () => {
    cy.get("input").eq(0).type("Jan Kowalski");
    cy.get("input").eq(1).type("123@123.com");
    cy.get("input").eq(2).type("123");
    cy.get("button").click();
    cy.get(`[data-tetsid="Message_container"]`).should("have.length", 1);
    cy.get(`[data-tetsid="Message_container"]`)
      .eq(0)
      .should("have.css", "display", "block");
  });
  it("Message will be Password to short ", () => {
    cy.get("input").eq(0).type("Jan Kowalski");
    cy.get("input").eq(1).type("123@123.com");
    cy.get("input").eq(2).type("123");
    cy.get("button").click();
    cy.get(`[data-tetsid="Message_container"]`).should("have.length", 1);
    cy.get(`[data-tetsid="Message_container"]`)
      .eq(0)
      .should("contain.text", "Password to short, min 6 characters");
  });
  it("Password must contain special character", () => {
    cy.get("input").eq(0).type("Jan Kowalski");
    cy.get("input").eq(1).type("123@123.com");
    cy.get("input").eq(2).type("123123");
    cy.get("button").click();
    cy.get(`[data-tetsid="Message_container"]`).should("have.length", 1);
    cy.get(`[data-tetsid="Message_container"]`)
      .eq(0)
      .should(
        "contain.text",
        "Password must containt at last one number or special character"
      );
  });
  it("Cannot create user with email that exists in database", () => {
    cy.get("input").eq(0).type("Jan Kowalski");
    cy.get("input").eq(1).type("uniwersalnytest@uniwersalnytest.com");
    cy.get("input").eq(2).type("123123#");
    cy.get("button").click();
    cy.get(`[data-tetsid="Message_container"]`).should("have.length", 1);
    cy.get(`[data-tetsid="Message_container"]`)
      .eq(0)
      .should("have.css", "display", "block");
  });
  it("Before sign up none of cookies are set", () => {
    cy.getCookies().should("have.length", 0);
  });
  it("Before sign up localstorage should be empty", () => {
    expect(localStorage.getItem("useractive")).to.be.null;
  });
  it("After successfull signup cookie will be set", () => {
    cy.get("input").eq(0).type("Jan Kowalski");
    cy.get("input").eq(1).type("ko@ko.com");
    cy.get("input").eq(2).type("123456#");
    cy.get("button").click();
    cy.get(`[data-tetsid="Message_container"]`).should("have.length", 1);
    cy.get(`[data-tetsid="Message_container"]`)
      .eq(0)
      .should("have.css", "display", "block");
    cy.wait(4000);
    cy.getCookies().should("have.length", 2);
    cy.getCookies().then((cookies) => {
      expect(cookies[0]).to.have.property("name").eq("accessToken");
    });
  });
  after(async () => {
    await cy.removeuser();
    await cy.removefromsign();
  });
});
