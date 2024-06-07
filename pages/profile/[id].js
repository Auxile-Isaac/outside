import React from "react";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/dqZQVenHdTT
 */
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <>
      <Card className="mb-4">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage alt="User's name" src="/placeholder-avatar.jpg" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">User's Name</CardTitle>
              <CardDescription className="text-lg text-gray-500">Username</CardDescription>
              <CardDescription className="text-lg text-gray-500">user@example.com</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Link className="font-semibold text-blue-600 hover:underline" href="#">
            Edit Profile
          </Link>
          <div className="space-y-1">
            <Label htmlFor="bio">Bio</Label>
            <p className="text-sm text-gray-600" id="bio">
              This is a user bio. It's a short description about the user.
            </p>
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-wrap gap-2">
        <Button className="py-2 px-4 rounded-full bg-gray-100 text-sm font-medium">
          View Listings <Badge className="ml-2 h-5 w-5">10</Badge>
        </Button>
        <Button className="py-2 px-4 rounded-full bg-gray-100 text-sm font-medium">Create Listing</Button>
        <Button className="py-2 px-4 rounded-full bg-gray-100 text-sm font-medium">
          View Saved <Badge className="ml-2 h-5 w-5">5</Badge>
        </Button>
        <Button className="py-2 px-4 rounded-full bg-gray-100 text-sm font-medium">
          View Bookings <Badge className="ml-2 h-5 w-5">3</Badge>
        </Button>
      </div>
    </>
  )
}

