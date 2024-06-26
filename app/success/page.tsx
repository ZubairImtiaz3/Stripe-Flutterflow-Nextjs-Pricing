"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Success = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex justify-center items-center h-[100vh]">
      Payment Successful! Redirecting to home...
    </div>
  );
};

export default Success;
