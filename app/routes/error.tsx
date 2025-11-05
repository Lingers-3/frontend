import { Link, useSearchParams } from "react-router";
import type { Route } from "./+types/error";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Error occurred" }];
}

export default function Error() {
  const [searchParams] = useSearchParams();
  const message =
    searchParams.get("message") || "An unknown error has occurred.";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-dracula-background">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-dracula-current-line">
          <svg
            className="w-12 h-12 text-dracula-red"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="text-5xl font-bold mb-4 text-dracula-foreground">
          Error Occurred
        </h1>

        <div className="rounded-3xl p-6 my-8 bg-dracula-current-line">
          <p className="text-lg text-dracula-text-secondary">{message}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="cursor-pointer px-6 py-3 rounded-xl font-semibold transition-all hover:opacity-90 bg-dracula-purple/70 text-white"
          >
            Go home
          </Link>
        </div>

        <p className="mt-8 text-sm text-dracula-comment">
          If this problem persists, please contact support
        </p>
      </div>
    </div>
  );
}
