import LogoutButton from "./LogoutButton";
import DeleteAccountButton from "./DeleteAccoutButton";
import ChangePasswordButton from "./password";
import { useUser } from "~/hooks/use-user";

export function AccountSettings() {
  const { data: user } = useUser();

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {user?.sub.startsWith("auth0|") && <ChangePasswordButton />}
        <LogoutButton variant="settings" />
      </div>

      <div
        className="pt-4 border-t border-dracula-current-line"
        style={{
          borderTop: "1px solid",
          borderImage:
            "linear-gradient(to right, var(--color-dracula-background), var(--color-dracula-current-line), var(--color-dracula-background)) 1",
        }}
      >
        <p className="text-dracula-red text-sm font-medium mb-3 px-1">
          Danger zone
        </p>
        <DeleteAccountButton />
      </div>
    </div>
  );
}
