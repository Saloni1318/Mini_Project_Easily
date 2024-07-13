export default class UserModel {
    constructor(id, name, email, password) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.password = password;
    }
    static addUser(newUser) {
      let user = { id: users.length + 1, ...newUser };
      users.push(user);
      console.log(users);
    }
  
    static isValidUser(email, password) {
      const result = users.find((u) => {
        if (u.email === email && u.password === password) {
          return u;
        }
      });
      console.log(result);
      return result;
    }
  }
  
  const user1 = new UserModel(1, "Saloni", "saloni@gmail.com", "123456");
  let users = [user1];