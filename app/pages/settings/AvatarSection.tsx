import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import type { User } from "~/services/auth";

export default function AvatarSection({ user }: { user: User }) {
  return (
    <div className="flex flex-col items-center mb-8 pt-8">
    <Avatar className="h-24 w-24 mb-4">
      <AvatarImage
        src={user?.picture}
        alt={user?.name}
        referrerPolicy="no-referrer"
      />
      <AvatarFallback className="bg-dracula-purple text-dracula-foreground text-2xl">
        {user?.name?.charAt(0) || "U"}
      </AvatarFallback>
    </Avatar>
    <h1 className="text-2xl font-semibold text-dracula-text-primary mb-1">
      {user?.name}
    </h1>
    <p className="text-dracula-text-secondary text-sm mb-1">
      {user?.email}
    </p>
    <p className="text-dracula-comment text-xs">@{user?.nickname}</p>
  </div>
  );
}