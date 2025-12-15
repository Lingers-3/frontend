import { useState } from "react";
import { SearchIcon } from "lucide-react";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "~/components/ui/empty";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "~/components/ui/input-group";
import { Kbd } from "~/components/ui/kbd";
import { useNavigate } from "react-router";

export default function ItemsIndex() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim() !== "") {
      navigate(`/${query}`);
    }
  };

  return (
    <Empty className="flex-1">
      <EmptyHeader>
        <EmptyTitle>Items page is under development.</EmptyTitle>
        <EmptyDescription>
          The page you&apos;re looking for is currently under development. Try
          searching for what you need below.
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <InputGroup className="sm:w-3/4">
          <InputGroupInput
            placeholder="Try searching for pages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>

          <InputGroupAddon align="inline-end">
            <Kbd className="bg-dracula-background">/</Kbd>
          </InputGroupAddon>
        </InputGroup>

        <EmptyDescription>
          Need help? <a href="">Contact support</a>
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  );
}
