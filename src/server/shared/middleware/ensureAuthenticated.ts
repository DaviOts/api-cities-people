import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { JWTService } from "../services/index.js";

export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Not authorized",
      },
    });
  }

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer") {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Not authorized",
      },
    });
  }
  if (token === undefined) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Not authorized",
      },
    });
  }

  const jwtData = JWTService.verify(token);
  if (jwtData === "JWT_SECRET_NOT_FOUND") {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: "Error to verify token",
      },
    });
  } else if (jwtData === "INVALID_TOKEN") {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Not authorized",
      },
    });
  }

  req.headers.idUser = jwtData.uid.toString();
  return next();
};
