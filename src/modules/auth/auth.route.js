import { Router } from "express";
import validate from "../../middlewares/validate.js";
import authValidator from "./auth.validator.js";
import authController from "./auth.controller.js";

const router = Router();

/**
 * Student route
 */
router.post(
   "/register",
   validate(authValidator.register),
   authController.register
);
router.post(
   "/send-verification-email",
   validate(authValidator.sendVerificationEmail),
   authController.sendVerificationEmail
);
router.post(
   "/verify-email",
   validate(authValidator.verifyEmail),
   authController.verifyEmail
);
// Use for both admin and student
router.post(
   "/login",
   validate(authValidator.login),
   authController.login
);
router.post(
   "/refresh-token",
   validate(authValidator.refreshTokens),
   authController.refreshTokens
);
// router.post('/forgot-password', validate(authValidator.forgotPassword), authController);
// router.post('/reset-password', validate(authValidator.resetPassword), authController.resetPassword);

export default router;
