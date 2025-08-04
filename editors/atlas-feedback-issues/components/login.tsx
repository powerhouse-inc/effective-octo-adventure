import { RenownIcon } from "./renown-icon.js";

interface LoginProps {
  forbidden?: boolean;
}

export function Login({ forbidden = false }: LoginProps) {
  const content = forbidden ? (
    "You don't have the right credentials to get access to this document."
  ) : (
    <>
      <span>Please login with</span>
      <span style={{ position: "relative", bottom: "4px" }}>
        <RenownIcon />
      </span>
      <span>to get access to this document</span>
    </>
  );

  return (
    <div className="flex h-full items-center justify-center justify-items-center gap-x-4 bg-gray-50">
      <div className="rounded-2xl bg-white p-6 drop-shadow-sm">
        <h1 className="text-md flex gap-x-2 font-medium text-gray-900">
          {content}
        </h1>
      </div>
    </div>
  );
}
