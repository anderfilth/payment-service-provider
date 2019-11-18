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

const store = User => ({ name, email, password }) => {
  return User.create({ name, email, password });
};

const update = User => async ({ data: { name, email, password }, id }) => {
  let user = await User.findByPk(id);
  user = await user.update({ name, email, password });
  return user;
};

export default User => ({
  findUser: findUser(User),
  store: store(User),
  update: update(User),
});
