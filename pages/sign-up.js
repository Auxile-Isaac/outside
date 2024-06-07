import { SignUp } from "@clerk/nextjs";
 
const SignUpPage = () => (
  <SignUp path="/sign-up" routing="path" afterSignInUrl="/sign-in" signInUrl="/sign-in" />
);
export default SignUpPage;