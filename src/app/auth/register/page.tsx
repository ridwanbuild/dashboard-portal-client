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
import { authClient } from "../uth_client"; // স্পেলিং চেক করুন: auth_client কি না?

export default function RegisterPage() {
  const router = useRouter();

  const handlerLoginForm = async (e: any) => {
    e.preventDefault();

    // ইনপুট ফিল্ড থেকে ডাটা সংগ্রহ
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Better Auth signUp কল
    await authClient.signUp.email(
      {
        email: email,       // হার্ডকোডেড ভ্যালুর বদলে ইনপুট ভ্যালু ব্যবহার করা হলো
        password: password, 
        name: name,
      },
      {
        // রিকোয়েস্ট শুরু হওয়ার সময় (ঐচ্ছিক)
        onRequest: () => {
          toast.loading("Registering your account...");
        },
        onSuccess: (ctx) => {
          toast.dismiss(); // লোডিং টোস্ট সরানো
          toast.success("Sign up successful!");
          
          // সফল হলে লগইন পেজে পাঠানো
          router.push("/auth/login");
        },
        onError: (ctx) => {
          toast.dismiss();
          toast.error(ctx.error.message || "Invalid information");
          console.log("Auth Error:", ctx.error.message);
        },
      }
    );
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
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name" // name প্রপার্টিটি Better Auth এর জন্য প্রয়োজন
                  type="text"
                  placeholder="Enter your name"
                  required
                />
              </div>

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
                <Label htmlFor="password">Password (Iqama)</Label>
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
                  Sign Up
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