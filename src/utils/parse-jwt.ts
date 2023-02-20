import { UserPayload } from "interfaces/google";

/**
 * Parse & Decode JWT Token
 * @param token JWT Token
 * @returns Parsed Token
 */
export const parseJwt = (token: string): UserPayload => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map((c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
};
