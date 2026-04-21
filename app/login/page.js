"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { toast } from "react-toastify";

export default function LoginPage() {
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

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    
    // Simulate checking if login was successful
    setTimeout(() => {
      const isAuth = JSON.parse(localStorage.getItem("currentUser"));
      if (isAuth) {
        toast.success("Welcome back!");
        router.push("/dashboard");
      } else {
        toast.error("Invalid credentials");
      }
    }, 100);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <p className="text-sm text-center text-gray-500 py-2">
            Enter your credentials to access your dashboard
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
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
                placeholder ="Enter Your Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <div className="text-center text-sm pt-4">
              Don't have an account?{" "}
              <Link href="/signup" className="underline underline-offset-4 hover:text-blue-500">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
