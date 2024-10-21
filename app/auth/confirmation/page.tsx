"use client";

import { Metadata } from "next";
import React from "react";
import Cookies from "js-cookie";
import { InputOTPForm } from "../component/otp";
import { useRouter } from "next/navigation";

const metadata: Metadata = {
  title: "Authentication",
  description: "Crowd Monitoring Software with Artificial Intelligence Authentication System",
};

export default function AuthenticationPage() {
  const router = useRouter();

  React.useEffect(() => {
    const id = Cookies.get("id");
    
    if (!id) {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen lg:p-8">
      <div className="flex w-full flex-col justify-start space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-start">
          <h1 className="text-2xl font-semibold tracking-tight">TaraLibrary</h1>
        </div>
        <InputOTPForm />
      </div>
    </div>
  );
}
