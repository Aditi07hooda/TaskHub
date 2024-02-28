import { atom } from "recoil";

export const isAuthenticatedUser = atom({
  key: "isAuthenticated",
  default: false,
});
