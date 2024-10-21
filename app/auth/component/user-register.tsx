"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { REGISTER_URL } from "@/utils/constants"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import Cookies from "js-cookie"

interface UserRegisterFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserRegisterForm({ className, ...props }: UserRegisterFormProps) {

  const { toast } = useToast()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [email, setEmail] = React.useState<string>("")
  const [username, setUsername] = React.useState<string>("")
  const [firstname, setFirstname] = React.useState<string>("")
  const [lastname, setLastname] = React.useState<string>("")
  const [password, setPassword] = React.useState<string>("")
  const [confirmPassword, setConfirmPassword] = React.useState<string>("")

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    const formData = {
      email: email,
      username: username,
      first_name: firstname,
      last_name: lastname,
      password: password,
      confirm_password: confirmPassword,
    }

    const response = await fetch(`${REGISTER_URL}`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      }
    })


    if (!response.ok) {
      const errorData = await response.json();
      toast({
        variant: "destructive",
        title: "Oh no something went wrong.",
        description: errorData.detail,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }

    if (response.status === 200) {
      const successMessage = await response.json();

      Cookies.set("id", successMessage.user.id);

      toast({
        title: "Success",
        description: successMessage.message,
        action: <ToastAction altText="OK">OK</ToastAction>,
      })

      setTimeout(function(){
        window.location.href = "/auth/confirmation";
      },3000);

    }


    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className={cn("grid gap-6 max-h-screen", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-1">
          <div className="grid gap-2 mb-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2 mb-1">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="John"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="grid gap-2 mb-1">
            <Label htmlFor="firstname">Firstname</Label>
            <Input
              id="firstname"
              placeholder="John"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className="grid gap-2 mb-1">
            <Label htmlFor="lastname">Lastname</Label>
            <Input
              id="lastname"
              placeholder="Doe"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div className="grid gap-2 mb-1">
            <Label htmlFor="password">Password</Label>
            <div className="flex gap-2">
              <Input
                id="password"
                placeholder="Password"
                type="password"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1"
              />
              <Input
                id="confirm-password"
                placeholder="Confirm Password"
                type="password"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                disabled={isLoading}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2 gap-2 mt-3 mb-3">
            <Checkbox id="terms" checked={true} />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Sign Up
          </Button>
          <p className="text-center text-sm text-muted-foreground mt-2">
            Already registered?{" "}
            <Link href="/" className="underline underline-offset-4 hover:text-primary">
              Sign In here
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}
