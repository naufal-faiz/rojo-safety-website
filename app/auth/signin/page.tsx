import SignIn from "@/components/auth/SignIn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login Page - Solid SaaS Boilerplate",

  // other metadata
  description: "This is Login page for Startup Pro"
};

const SigninPage = () => {
  return (
    <>
      <SignIn />
    </>
  );
};

export default SigninPage;
