describe("Login page test", () => {
  before(async () => {
    await cy.adduser();
  });
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.clearCookies();
    cy.clearLocalStorage();
  });
  it("Should containt title Login", () => {
    cy.get("p").eq(0).should("contain.text", "Login");
  });
  it("Site should containt 2 input fields", () => {
    cy.get("input").should("have.length", 2);
  });
  it("First of them should be email", () => {
    cy.get("input").eq(0).should("have.attr", "type").should("eq", "email");
  });
  it("Second of input should by password type", () => {
    cy.get("input").eq(1).should("have.attr", "type").should("eq", "password");
  });
  it("Site should contain login button", () => {
    cy.get("button").should("have.length", 1);
  });
  it("Button text should be Login", () => {
    cy.get("button").eq(0).should("contain.text", "Login");
  });
  it("We cannot login with wrong email", () => {
    cy.get("input").eq(0).type("123");
    cy.get("input").eq(1).type("123123");
    cy.get("button").click();
    cy.get("input:invalid").should("have.length", 1);
    cy.get(`[data-tetsid="Message_container"]`).should("have.length", 1);
    cy.get(`[data-tetsid="Message_container"]`)
      .eq(0)
      .should("have.css", "display", "none");
  });
  it("If we pass wrong email or password, message appear", () => {
    cy.get("input").eq(0).type("123@123.com");
    cy.get("input").eq(1).type("123123");
    cy.get("button").click();
    cy.get(`[data-tetsid="Message_container"]`).should("have.length", 1);
    cy.get(`[data-tetsid="Message_container"]`)
      .eq(0)
      .should("have.css", "display", "block");
  });
  it("Message contain", () => {
    cy.get("input").eq(0).type("123@123.com");
    cy.get("input").eq(1).type("123123");
    cy.get("button").click();
    cy.get(`[data-tetsid="Message_container"]`)
      .eq(0)
      .should("contain.text", "Wrong email or password");
  });
  it("After successfull login user doesn't see any message", () => {
    cy.get("input").eq(0).type("uniwersalnytest@uniwersalnytest.com");
    cy.get("input").eq(1).type("123456#");
    cy.get("button").click();
    cy.get(`[data-tetsid="Message_container"]`).should("have.length", 1);
    cy.get(`[data-tetsid="Message_container"]`)
      .eq(0)
      .should("have.css", "display", "none");
  });
  it("Before login none of cookies are set", () => {
    cy.getCookies().should("have.length", 0);
  });
  it("After successfull login cookie will be set", () => {
    cy.get("input").eq(0).type("uniwersalnytest@uniwersalnytest.com");
    cy.get("input").eq(1).type("123456#");
    cy.get("button").click();
    cy.wait(2000);
    cy.getCookies().should("have.length", 2);
  });
  it("After successfull login cookie will have access token", () => {
    cy.get("input").eq(0).type("uniwersalnytest@uniwersalnytest.com");
    cy.get("input").eq(1).type("123456#");
    cy.get("button").click();
    cy.wait(2000);
    cy.getCookies().should("have.length", 2);
    cy.getCookies().then((cookies) => {
      expect(cookies[0]).to.have.property("name").eq("accessToken");
    });
  });
  it("After successfull login cookie will have refresh token", () => {
    cy.get("input").eq(0).type("uniwersalnytest@uniwersalnytest.com");
    cy.get("input").eq(1).type("123456#");
    cy.get("button").click();
    cy.wait(2000);
    cy.getCookies().then((cookies) => {
      expect(cookies[1]).to.have.property("name").eq("refreshToken");
    });
  });
  it("before login localstorage should be empty", () => {
    expect(localStorage.getItem("useractive")).to.be.null;
  });
  it("After successfull login localstorage should be set", () => {
    cy.get("input").eq(0).type("uniwersalnytest@uniwersalnytest.com");
    cy.get("input").eq(1).type("123456#");
    cy.get("button").click();
    cy.wait(2000).should(() => {
      expect(localStorage.getItem("useractive")).to.be.eq("true");
    });
  });
  after(async () => {
    await cy.removeuser();
  });
});
