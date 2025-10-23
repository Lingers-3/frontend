import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { auth, type User } from "~/services/auth";

export default function Page() {
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const result = await auth.me();

      if (result.ok) {
        alert(JSON.stringify(result.value));
        setUser(result.value);
      } else {
        alert(JSON.stringify(result.error));
        setError(result.error.message);
      }
    })();
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen flex-col gap-4">
        <p>Authentication failed: {error}</p>
        <button
          onClick={() =>
            (window.location.href =
              "https://pocketeer-api.linerds.us/api/auth/login")
          }
        >
          Try again
        </button>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex justify-center items-start h-screen flex-col gap-4">
        <h1>Profile</h1>
        <div>
          <img src={user.picture} alt={user.name} />
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Email Verified: {user.email_verified ? "Yes" : "No"}</p>
          <p>Nickname: @{user.nickname}</p>
        </div>

        <Button
          onClick={() => {
            auth.logout();
          }}
        >
          Logout
        </Button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <p>Verifying authentication...</p>
    </div>
  );
}
