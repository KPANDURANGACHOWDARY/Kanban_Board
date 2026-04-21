"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { toast } from "react-toastify";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  const handleSignup = (e) => {
    e.preventDefault();
    if (name && email && password) {
      dispatch(signup({ name, email, password }));
      toast.success("Account created successfully! Please login.");
      router.push("/login");
    } else {
      toast.error("Please fill all fields");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Create Account</CardTitle>
          <p className="text-sm text-center text-gray-500 py-2">
            Enter your details to create an account
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Name</label>
              <Input
                type="text"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Email</label>
              <Input
                type="email"
                placeholder="Enter Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Password</label>
              <Input
                type="password"
                placeholder = "Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <Button type="submit" className="w-full">
              Sign up
            </Button>
            <div className="text-center text-sm pt-4">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-4 hover:text-blue-500">
                Log in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
