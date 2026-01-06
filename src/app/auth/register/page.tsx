import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function RegisterPage() {



  return (
    <div className="flex min-h-screen bg-slate-100 items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>

          <CardTitle className="text-lg font-semibold">Darkstone Portal</CardTitle>

          <CardDescription>
            Register your account
          </CardDescription>

          <CardAction >
            <Button className="cursor-pointer" variant="link"> <Link href={"/auth/login"}> Sign Up </Link> </Button>
          </CardAction>

        </CardHeader>

        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  required
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Iqama</Label>
                </div>
                <Input id="password" placeholder="x x x x x x x x" type="password" required />

              </div>
            </div>
          </form>

        </CardContent>

        <CardFooter className="flex-col gap-2">

          <Button  type="submit" className="w-full cursor-pointer">
            Login
          </Button>

          <Button  variant="outline" className="w-full cursor-pointer">
            Register with Iqama Number
          </Button>

        </CardFooter>


      </Card>
    </div>
  )
}
