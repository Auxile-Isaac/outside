import React from "react";
import { SignIn } from "@clerk/nextjs";
 
const SignInPage = () => (
  <SignIn path="/sign-in" routing="path" afterSignInUrl="/" signUpUrl="/sign-up" />
);
 
export default SignInPage;