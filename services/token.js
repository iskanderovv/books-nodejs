import jwt from "jsonwebtoken";

const generateJwtToken = (userId, userEmail) => {
  const accessToken = jwt.sign({ userId, userEmail }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
  return accessToken;
};

export { generateJwtToken };
