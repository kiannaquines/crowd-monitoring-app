"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { LOGIN_URL } from "@/utils/constants"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import Cookies from "js-cookie"

interface UserLoginFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserLoginForm({ className, ...props }: UserLoginFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(event.target as HTMLFormElement);
    const formParams = new URLSearchParams();
    formParams.append("username", formData.get('username') as string);
    formParams.append("password", formData.get('password') as string);
  
    try {
      const response = await fetch(`${LOGIN_URL}`, {
        method: 'POST',
        body: formParams,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'accept': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
  
        toast({
          title: "Oh no something went wrong.",
          description: errorData.detail,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      } else {
        const successMessage = await response.json();
        Cookies.set(successMessage.token_type, successMessage.access_token);
  
        toast({
          title: "Success",
          description: 'You have successfully logged in.',
          action: <ToastAction altText="OK">OK</ToastAction>,
        });
  
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 3000);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      toast({
        title: "Error",
        description: "Something went wrong while processing the request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setIsLoading(false);
    }
  }
  

  return (
    <div className={cn("grid gap-6 max-h-screen", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label htmlFor="email">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Juan"
              name="username"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="email">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              name="password"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center space-x-2 gap-2 mt-3 mb-3">
            <Checkbox id="terms" checked={true} />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
          <p className="text-center text-sm text-muted-foreground mt-2">
            Not registered?{" "}
            <Link
              href="/auth/register"
              className="underline underline-offset-4 hover:text-primary"
            >
              Sign Up here
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}