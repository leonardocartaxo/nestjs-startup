process.env.JWT_SECRET =
  process.env.JWT_SECRET || `d6e00f955d396ca239875c5de15a58d3`;

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};
