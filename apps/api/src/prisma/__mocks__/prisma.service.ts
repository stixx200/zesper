export const PrismaService = jest.fn().mockImplementation(() => {
  return {
    query: {
      users: jest.fn(),
      user: jest.fn(),
      foods: jest.fn(),
      menus: jest.fn(),
    },
    exists: {
      User: jest.fn(),
    },
    mutation: {
      createUser: jest.fn(),
      createFood: jest.fn(),
      updateFood: jest.fn(),
      deleteFood: jest.fn(),
      createMenu: jest.fn(),
      updateMenu: jest.fn(),
      deleteMenu: jest.fn(),
    },
  };
});
