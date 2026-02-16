import jwt from "jsonwebtoken";

interface IPayload {
  uid: number;
}

const sign = (payload: IPayload): string | "JWT_SECRET_NOT_FOUND" => {
  if (!process.env.JWT_SECRET) {
    return "JWT_SECRET_NOT_FOUND";
  }
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
};

const verify = (
  token: string,
): IPayload | "JWT_SECRET_NOT_FOUND" | "INVALID_TOKEN" => {
  if (!process.env.JWT_SECRET) {
    return "JWT_SECRET_NOT_FOUND";
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof decoded === "string") {
      return "INVALID_TOKEN";
    }
    return decoded as IPayload;
  } catch (error) {
    return "INVALID_TOKEN";
  }
};

export const JWTService = {
  sign,
  verify,
};
