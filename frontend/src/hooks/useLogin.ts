import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useUserStore from "@/stores/useUserStore";

interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useUserStore();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (data: LoginCredentials) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:4500/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || "Failed to log in");
      }

      localStorage.setItem("token", responseData.token);

      setUser(responseData.user);

      const callbackUrl = searchParams.get('callbackUrl') || '/';
      router.push(callbackUrl);

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
    login,
    loading,
    error,
    setError,
  };
}
