import { NewUserWithCar } from "../../src/utils/user.util";
import { Delete } from "../../src/utils/user.util";
Cypress.Commands.add("adduser", async () => {
  const response = await NewUserWithCar({
    fullname: "Jan Kowalski",
    email: "uniwersalnytest@uniwersalnytest.com",
    password: "123456#",
  });
});
Cypress.Commands.add("removefromsign",async()=>{
    const response = await Delete({
        email: "ko@ko.com",
      }); 
})
Cypress.Commands.add("removeuser", async () => {
  const response = await Delete({
    email: "uniwersalnytest@uniwersalnytest.com",
  });
});
