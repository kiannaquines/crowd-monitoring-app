import { Metadata } from "next"
import Link from "next/link"

import { UserLoginForm } from "./auth/component/user-login";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Crowd Monitoring Software with Artificial Intelligence Authentication System",
}

export default function AuthenticationPage() {
  return (
    <>
      <div className="flex items-center justify-center h-screen lg:p-8">
        <div className="flex w-full flex-col justify-start space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-start">
            <h1 className="text-2xl font-semibold tracking-tight">
              TaraLibrary
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign In to get you started
            </p>
          </div>
          <UserLoginForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  )
}
