import Jwt from "jsonwebtoken";
import ErrorResponse from "../utils/ErrorResponse.js";
import { HttpStatus } from "../constant.js";

export const auth = async (req, res, next) => {
   try {
      let token;
      if (
         req.headers.authorization &&
         req.headers.authorization.split(" ")[0] == "Bearer"
      ) {
         token = req.headers.authorization.split(" ")[1];
      }
      if (!token)
         return res
            .status(HttpStatus.UNAUTHORIZED)
            .json(new ErrorResponse(HttpStatus.UNAUTHORIZED, "Unauthorized"));
      Jwt.verify(token, process.env.JWT_SECRET_TOKEN, (error, authData) => {
         if (error) {
            return res
               .status(HttpStatus.UNAUTHORIZED)
               .json(
                  new ErrorResponse(HttpStatus.UNAUTHORIZED, "Unauthorized")
               );
         } else {
            req.user = authData;
            next();
         }
      });
   } catch (error) {
      return res
         .status(HttpStatus.UNAUTHORIZED)
         .json(new ErrorResponse(HttpStatus.UNAUTHORIZED, "Unauthorized"));
   }
};
