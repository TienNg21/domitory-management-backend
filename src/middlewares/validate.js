import ErrorResponse from "../utils/ErrorResponse.js";
import { HttpStatus } from "../constant.js";

const validate = (schema) => (req, res, next) => {
   try {
      let result;
      if (schema.params) {
         result = schema.params.validate(req.params);
         if (result.error) {
            return next(
               new ErrorResponse(HttpStatus.BAD_REQUEST, result.error.details)
            );
         }
      }

      /**
       * fix bug khi api chỉ có parameters validation
       * Author VDTIEN(27/11/2022);
       */
      if (schema.body) {
         result = schema.body.validate(req.body);
         if (result.error) {
            return res
               .status(HttpStatus.BAD_REQUEST)
               .send(
                  new ErrorResponse(
                     HttpStatus.BAD_REQUEST,
                     result.error.details
                  )
               );
         }
      }
      if (schema.query) {
         result = schema.query.validate(req.query);
         if (result.error) {
            return res
               .status(HttpStatus.BAD_REQUEST)
               .send(
                  new ErrorResponse(
                     HttpStatus.BAD_REQUEST,
                     result.error.details
                  )
               );
         }
      }
      next();
   } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(
         new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
      );
   }
};

export default validate;
