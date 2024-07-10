'use client';

import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Page() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <h2 className="text-3xl font-bold text-white mb-6">Sign Up</h2>
      <SignUp
        appearance={{
          baseTheme: resolvedTheme === 'dark' ? dark : undefined,
          elements: {
            formButtonPrimary:
              "bg-red-600 hover:bg-red-700 text-white",
            footerActionLink:
              "text-red-600 hover:text-red-700",
            card: "bg-transparent",
            headerTitle: "text-white text-2xl",
            headerSubtitle: "text-gray-400",
            formFieldLabel: "text-gray-300",
            formFieldInput: "bg-gray-700 text-white border-gray-600",
            dividerLine: "bg-gray-600",
            dividerText: "text-gray-400",
            formFieldAction: "text-red-600 hover:text-red-700",
            formFieldErrorText: "text-red-400",
            identityPreviewText: "text-gray-300",
            identityPreviewEditButton: "text-red-600 hover:text-red-700",
          },
        }}
      />
    </>
  );
}
