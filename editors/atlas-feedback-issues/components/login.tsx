import { useCallback } from "react";
import { RenownIcon } from "./renown-icon.js";

interface LoginProps {
  forbidden?: boolean;
}

export function Login({ forbidden = false }: LoginProps) {
  const handleLogin = useCallback(() => {
    console.log("login");
  }, []);

  const content = forbidden ? "You don't have the right credentials to get access to this document." : (
    <>
      <span>Please login with</span>
      <span style={{ position: "relative", bottom: "4px" }}>
        <RenownIcon />
      </span>
      <span>to get access to this document</span>
    </>
  );
    
  return (
    <div className="bg-gray-50 flex justify-center gap-x-4 items-center justify-items-center h-full">
      <div className="bg-white rounded-2xl drop-shadow-sm p-6">
        <h1 className="text-md text-gray-900 font-medium flex gap-x-2">
          {content}
        </h1>
      </div>
    </div>
  );
}
