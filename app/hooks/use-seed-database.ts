import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  useCreateTag,
  useCreateItemType,
  useCreateItem,
} from "~/modules/inventory/hooks/inventory-hooks";
import {
  useCreateProject,
  useAddPlannedResource,
  useAddReservation,
  useStartProject,
} from "~/modules/projects/hooks/projects-hooks";
import { ResourceType } from "~/modules/projects/services/project/types";

export const useSeedDatabase = () => {
  const queryClient = useQueryClient();
  const [isSeeding, setIsSeeding] = useState(false);
  const [progress, setProgress] = useState("");

  const { mutateAsync: createTag } = useCreateTag();
  const { mutateAsync: createItemType } = useCreateItemType();
  const { mutateAsync: createItem } = useCreateItem();
  const { mutateAsync: createProject } = useCreateProject();
  const { mutateAsync: startProject } = useStartProject();
  const { mutateAsync: addResource } = useAddPlannedResource();
  const { mutateAsync: addReservation } = useAddReservation();

  const seed = async () => {
    try {
      setIsSeeding(true);

      setProgress("Seeding tags...");
      const tagsData = [
        { name: "Тканини", color: "FF5733" },
        { name: "Фурнітура", color: "33FF57" },
        { name: "Інструменти", color: "3357FF" },
        { name: "Преміум", color: "FFD700" },
        { name: "Літо 2025", color: "FF69B4" },
      ];

      const tagMap: Record<string, number> = {};
      for (const t of tagsData) {
        const res = await createTag(t);
        tagMap[t.name] = res.id;
      }

      setProgress("Seeding item types...");
      const typesData = [
        {
          name: "Шовк Італійський",
          unit: "m",
          qty: 10,
          limit: 5,
          tags: ["Тканини", "Преміум", "Літо 2025"],
        },
        {
          name: "Ґудзики (металеві)",
          unit: "pcs",
          qty: 100,
          limit: 20,
          tags: ["Фурнітура"],
        },
        {
          name: "Ножиці кравецькі",
          unit: "pcs",
          qty: 2,
          limit: 1,
          tags: ["Інструменти"],
        },
        {
          name: "Нитки (поліестер)",
          unit: "pcs",
          qty: 10,
          limit: 3,
          tags: ["Фурнітура"],
        },
      ];

      const typeMap: Record<string, number> = {};
      for (const t of typesData) {
        const res = await createItemType({
          name: t.name,
          base_measurement_unit: t.unit,
          display_measurement_unit: t.unit,
          description: "Seeded item type",
          default_quantity: t.qty,
          shortage_threshold: t.limit,
          tag_ids: t.tags.map((tagName) => tagMap[tagName]),
        });
        typeMap[t.name] = res.id;
      }

      setProgress("Seeding inventory...");
      const itemsData = [
        { type: "Шовк Італійський", qty: 12.5, price: 450.0 },
        { type: "Шовк Італійський", qty: 8.0, price: 420.0 },
        { type: "Ґудзики (металеві)", qty: 100, price: 5.5 },
        { type: "Ґудзики (металеві)", qty: 50, price: 6.0 },
        { type: "Ножиці кравецькі", qty: 3, price: 850.0 },
        { type: "Нитки (поліестер)", qty: 20, price: 45.0 },
        { type: "Нитки (поліестер)", qty: 5, price: 40.0 },
      ];

      const itemsCreated = [];
      for (const i of itemsData) {
        const res = await createItem({
          item_type_id: typeMap[i.type],
          quantity: i.qty,
          purchase_price: i.price,
          description: "Seeded item",
          expiration_date: null,
        });
        itemsCreated.push(res);
      }

      setProgress("Seeding Project 1...");

      const project1 = await createProject({
        name: 'Сукня "Вечірня зоря"',
        description: "Індивідуальне замовлення",
        planned_income: 8500.0,
        planned_work_time: 48 * (3600 * 1000 * 1000 * 1000),
        planned_deadline: new Date(Date.now() + 14 * 86400000).toISOString(),
      });

      const p1_spec1 = await addResource({
        id: project1.id,
        payload: {
          item_type_id: typeMap["Шовк Італійський"],
          resource_type: ResourceType.Consumable,
          planned_quantity: 5.0,
        },
      });
      const p1_spec2 = await addResource({
        id: project1.id,
        payload: {
          item_type_id: typeMap["Ножиці кравецькі"],
          resource_type: ResourceType.Consumable,
          planned_quantity: 10.0,
        },
      });
      const p1_spec3 = await addResource({
        id: project1.id,
        payload: {
          item_type_id: typeMap["Нитки (поліестер)"],
          resource_type: ResourceType.Instrument,
          planned_quantity: 1.0,
        },
      });

      await startProject(project1.id);

      await addReservation({
        id: project1.id,
        specId: p1_spec1.id,
        payload: { item_id: itemsCreated[0].id, reserved: 5.0 },
      });
      await addReservation({
        id: project1.id,
        specId: p1_spec3.id,
        payload: { item_id: itemsCreated[5].id, reserved: 1.0 },
      });

      setProgress("Seeding Project 2...");

      await createProject({
        name: 'Табурет "Лофт"',
        description: "Серійне виробництво",
        planned_income: 1200.0,
        planned_work_time: 5 * (3600 * 1000 * 1000 * 1000),
        planned_deadline: new Date(Date.now() + 30 * 86400000).toISOString(),
      });

      await queryClient.invalidateQueries();
      toast.success("Database seeded successfully!");
    } catch (error: any) {
      console.error("Seeding failed:", error);
      const msg =
        error?.response?.data?.message || error.message || "Unknown error";
      toast.error(`Seeding failed: ${msg}`);
    } finally {
      setIsSeeding(false);
      setProgress("");
    }
  };

  return { seed, isSeeding, progress };
};
