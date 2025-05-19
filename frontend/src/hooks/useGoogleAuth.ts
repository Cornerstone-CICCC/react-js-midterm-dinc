import { useState } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "@/stores/useUserStore";

type Params = {
  email: string;
  password: string;
}

export const useGoogleAuth = () => {
  const router = useRouter();
  const { setUser } = useUserStore();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const googleAuth = async (data: Params) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || "Failed to create account");
      }

      localStorage.setItem("token", responseData.token);

      setUser(responseData.user);

      router.push("/");
      return true;

    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    googleAuth,
    loading,
    error,
    setError
  };
}