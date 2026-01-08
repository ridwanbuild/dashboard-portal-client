"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../uth_client"; 

export default function LoginPage() {
  const router = useRouter();

  const handlerLoginForm = async (e: any) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await authClient.signIn.email(
        {
          email: email,
          password: password,
        },
        {
          onRequest: () => {
            toast.loading("Verifying credentials...");
          },

          onSuccess: () => {
            toast.dismiss();
            toast.success("Successfully logged in!");
            console.log("Logged in successfully");
            router.push("/dashboard");

          },

          onError: (ctx) => {
            toast.dismiss();
            
            toast.error("Invalid email or password");
            console.error("Login Error:", ctx.error.message);
          },




        }
      );
    } catch (err) {
      toast.dismiss();
      toast.error("Something went wrong. Please try again.");
      console.error("Internal Error:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100 items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-lg text-teal-700 font-bold">
            Darkstone Portal
          </CardTitle>

          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>

          <CardAction>
            <Button className="cursor-pointer font-bold" variant="link" asChild>
              <Link href={"/auth/register"}> Sign Up </Link>
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form onSubmit={handlerLoginForm}>
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@example.com"
                  required
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password (Iqama)</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot Iqama number?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  placeholder=" x x x x x x x x "
                  type="password"
                  required
                />
              </div>

              <div className="flex flex-col gap-2 ">
                <Button type="submit" className="w-full cursor-pointer">
                  Login
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter />
      </Card>
    </div>
  );
}
