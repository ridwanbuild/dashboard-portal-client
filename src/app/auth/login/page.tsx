"use client"

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

export default function LoginPage() {
  const router = useRouter();

  const handlerLoginForm = (e: any) => {
    e.preventDefault();

    // ইনপুট ফিল্ড থেকে ডাটা সংগ্রহ
    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log("Login details:", { email, password });

    // সফল হলে ড্যাশবোর্ডে নিয়ে যাবে
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen bg-slate-100 items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Darkstone Portal
          </CardTitle>

          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>

          <CardAction>
            <Button className="cursor-pointer" variant="link" asChild>
              <Link href={"/auth/register"}> Sign Up </Link>
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form onSubmit={handlerLoginForm}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email" // এটি ডাটা ধরার জন্য অবশ্যই লাগবে
                  type="email"
                  placeholder="email@example.com"
                  required
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Iqama</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your Iqama number?
                  </a>
                </div>
                <Input
                  id="password"
                  name="password" // এটি ডাটা ধরার জন্য অবশ্যই লাগবে
                  placeholder=" x x x x x x x x "
                  type="password"
                  required
                />
              </div>

              {/* Login Button এখন ফর্মের ভেতরেই আছে যাতে লজিক কাজ করে */}
              <div className="flex flex-col gap-2 mt-2">
                <Button type="submit" className="w-full cursor-pointer">
                  Login
                </Button>

                {/* <Button variant="outline" type="button" className="w-full cursor-pointer">
                  Login with Iqama Number
                </Button> */}
                
              </div>
            </div>
          </form>
        </CardContent>


        {/* CardFooter এখন খালি রাখা হয়েছে ডিজাইন বজায় রাখতে */}
        <CardFooter />
      </Card>
    </div>
  );
}