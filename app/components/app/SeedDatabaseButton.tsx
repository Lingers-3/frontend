import { useSeedDatabase } from "~/hooks/use-seed-database";
import { Button } from "~/components/ui/button";

export const SeedDatabaseButton = () => {
  const { seed, isSeeding, progress } = useSeedDatabase();

  return (
    <Button
      onClick={seed}
      disabled={isSeeding}
      variant="outline"
      className="text-md flex items-center px-6 gap-4 py-7 mt-4 cursor-pointer rounded-2xl"
    >
      {isSeeding ? progress : "Seed database [dev]"}
    </Button>
  );
};
