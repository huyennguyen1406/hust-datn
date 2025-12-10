import { redirect } from "@tanstack/react-router";
import { isAuthenticated } from "./auth";

export async function requireAuthLoader() {
  if (!isAuthenticated()) {
    throw redirect({ to: "/" });
  }
  return null;
}
