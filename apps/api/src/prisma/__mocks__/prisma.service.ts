export const PrismaService = jest.fn().mockImplementation(() => {
  return {
    query: {
      users: jest.fn(),
    },
    exists: {
      User: jest.fn(),
    },
    mutation: {
      createUser: jest.fn(),
    },
  };
});
