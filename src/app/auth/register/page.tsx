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

export default function RegisterPage() {
  const router = useRouter();

  const handlerLoginForm = (e: any) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    toast.success("You're registered successfully! Please sign in to continue.");
    console.log("register details:", { email, password });

    router.push("/auth/login");
    
    
  };

  return (
    <div className="flex min-h-screen bg-slate-100 items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-lg text-teal-700 font-bold">
            Darkstone Portal
          </CardTitle>

          <CardDescription>
            Create your account by filling in the details below
          </CardDescription>

          <CardAction>
            <Button className="cursor-pointer font-bold" variant="link" asChild>
              <Link href={"/auth/login"}> Sign in </Link>
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
                  <Label htmlFor="password">Iqama</Label>
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
                  Sing Up
                </Button>

                {/* <Button variant="outline" type="button" className="w-full cursor-pointer">
                  Login with Iqama Number
                </Button> */}

              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter />
      </Card>
    </div>
  );
}
