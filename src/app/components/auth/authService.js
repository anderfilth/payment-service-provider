const findUser = User => ({ email, id }) => {
  const where = {};
  if (email) {
    where.email = email;
  }
  if (id) {
    where.id = id;
  }
  return User.findOne({
    where,
  });
};

const storeNewUser = User => ({ name, email, password }) => {
  return User.create({ name, email, password });
};

export default User => ({
  findUser: findUser(User),
  storeNewUser: storeNewUser(User),
});
