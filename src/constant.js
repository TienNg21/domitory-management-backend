import { Sequelize } from "sequelize";
const Op = Sequelize.Op;
export const HttpStatus = {
   OK: 200,
   BAD_REQUEST: 400,
   UNAUTHORIZED: 401,
   INVALID_USERNAME_OR_PASSWORD: 402,
   FORBIDDEN: 403,
   NOT_FOUND: 404,
   UNSUPPORTED_MEDIA_TYPE: 415,
   UNPROCESSABLE_ENTITY: 422,
   ITEM_NOT_FOUND: 444,
   ITEM_ALREADY_EXIST: 445,
   ITEM_IS_USING: 446,
   INTERNAL_SERVER_ERROR: 500,
   OVER_LIMIT: 447,
   ITEM_IS_INVALID: 448,
};

export const MIN_PASSWORD_CHARACTER = 6;
export const UserRole = {
   ADMIN: "admin",
   MANAGER: "manager",
   STUDENT: "student",
};
export const UserStatus = {
   REGISTERING: "registering",
   ACTIVE: "active",
   INACTIVE: "inactive",
};
export const TokenType = {
   REGISTER: "register",
   ACCESS: "access",
   REFRESH: "refresh",
   ACTIVE_EMAIL: "active_email",
   RESET_PASSWORD: "reset_password",
};
export const RequestType = {
   ROOM: "room",
};
export const RequestStatus = {
   PENDING: "pending",
   ACCEPTED: "accepted",
   REJECTED: "rejected",
};
export const ContractStatus = {
   PENDING: "pending",
   INUSE: "inuse",
   CANCELED: "canceled",
   REJECTED: "rejected",
   END: "end",
};
export const softDeleteCondition = {
   deletedAt: {
      [Op.ne]: null,
   },
};
export const ComplainType = {
   INFRASTRUCTURE: "infrastructure",
   SECURITY: "security",
   ENVIRONMENT: "environment",
};
export const ComplainLevel = {
   LOW: "low",
   HIGH: "high",
};
