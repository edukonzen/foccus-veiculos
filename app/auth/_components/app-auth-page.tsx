'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { requestMagicLink } from "./app-actions-auth"
import { useForm } from "react-hook-form"
export function AuthForm() {
  
  const form = useForm()

  const handleSubmit = form.handleSubmit((data) => {
    console.log(data)
  })


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <CardDescription>Enter your email to receive a magic link</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} action={async (formData: FormData) => {
          const result = await requestMagicLink(formData);
          if (result.error) {
            // Handle the error, e.g., display it to the user
            console.error(result.error);
          }
        }}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required {...form.register('email')}/>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              Send Magic Link
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
