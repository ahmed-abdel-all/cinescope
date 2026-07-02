const USERS_KEY = "users";

const getUsers = () => {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const authService = {
  register(user) {
    const users = getUsers();

    const exists = users.find(
      (u) => u.email === user.email
    );

    if (exists) {
      throw new Error("Email already exists");
    }

    users.push(user);

    saveUsers(users);

    return user;
  },

  login(email, password) {
    const users = getUsers();

    const user = users.find(
      (u) =>
        u.email === email &&
        u.password === password
    );

    if (!user) {
      throw new Error("Invalid email or password");
    }

    return user;
  },
};