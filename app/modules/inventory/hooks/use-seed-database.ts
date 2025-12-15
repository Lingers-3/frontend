import { useQueryClient } from "@tanstack/react-query";
import {
  useCreateItem,
  useCreateItemType,
  useCreateTag,
} from "~/modules/inventory/hooks/inventory-hooks";

const formatColor = (color: string) => color.replace("#", "");

export const useSeedDatabase = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: createTagRequest } = useCreateTag();
  const { mutateAsync: createItemTypeRequest } = useCreateItemType();
  const { mutateAsync: createItemRequest } = useCreateItem();

  const safeCall = async <T>(label: string, fn: () => Promise<T>): Promise<T | null> => {
    try {
      console.log(`${label}...`);
      return await fn();
    } catch (err) {
      console.error(`Failed: ${label}`, err);
      return null; 
    }
  };

  const seed = async () => {
    console.log("Starting database seed (Frontend Fix Strategy)...");

    console.log("Creating tags...");

    const tagType1 = await safeCall("Create tag: Perishable", () =>
      createTagRequest({ name: "Perishable", color: formatColor("#ff5555") })
    );

    const tagType2 = await safeCall("Create tag: Refrigerator", () =>
      createTagRequest({ name: "Refrigerator", color: formatColor("#8be9fd") })
    );

    const tagItem1 = await safeCall("Create tag: Discount", () =>
      createTagRequest({ name: "Discount", color: formatColor("#50fa7b") })
    );

    const tagItem2 = await safeCall("Create tag: Imported", () =>
      createTagRequest({ name: "Imported", color: formatColor("#ffb86c") })
    );

    console.log(tagType1, tagType2, tagItem1, tagItem2);

    console.log("Creating item types...");

    const dairyType = await safeCall("Create type: Dairy", () =>
      createItemTypeRequest({
        name: "Dairy Products",
        description: "Fresh milk, cheese, and yogurt",
        base_measurement_unit: "ml",
        display_measurement_unit: "ml",
        default_quantity: 1000,
        shortage_threshold: 5000,
        tag_ids: [tagType1?.id || 1, tagType2?.id || 2].filter(Boolean) as number[],
      })
    );

    const fruitsType = await safeCall("Create type: Fruits", () =>
      createItemTypeRequest({
        name: "Fruits",
        description: "Seasonal and exotic fruits",
        base_measurement_unit: "g",
        display_measurement_unit: "kg",
        default_quantity: 500,
        shortage_threshold: 10000,
        tag_ids: [tagType1?.id || 1].filter(Boolean) as number[],
      })
    );

    const _ = await safeCall("Create type: Vegetables", () =>
      createItemTypeRequest({
        name: "Vegetables",
        description: "Seasonal and exotic vegetables",
        base_measurement_unit: "g",
        display_measurement_unit: "kg",
        default_quantity: 500,
        shortage_threshold: 10000,
        tag_ids: [tagType1?.id || 1].filter(Boolean) as number[],
      })
    );

    console.log("Creating items...");

    const dairyItemsData = [
      { desc: "Milk 2.5%", qty: 10000, price: 40.5 },
      { desc: "Kefir", qty: 5000, price: 35.0 },
      { desc: "Strawberry Yogurt", qty: 2000, price: 25.0 },
      { desc: "Sour Cream", qty: 1500, price: 45.0 },
    ];

    for (const item of dairyItemsData) {
      await safeCall(`Create dairy item: ${item.desc}`, () =>
        createItemRequest({
          item_type_id: dairyType?.id!,
          description: item.desc,
          quantity: item.qty,
          purchase_price: item.price,
          display_measurement_unit: "ml",
          expiration_date: new Date(
            Date.now() + 2 * 24 * 60 * 60 * 1000
          ).toISOString(),
          tag_ids: [tagItem1?.id || 3].filter(Boolean) as number[],
        })
      );
    }

    const fruitsItemsData = [
      { desc: "Bananas", qty: 20000, price: 60.0 },
      { desc: "Golden Apples", qty: 50000, price: 25.0 },
      { desc: "Oranges", qty: 15000, price: 55.0 },
      { desc: "Kiwi", qty: 3000, price: 120.0 },
    ];

    for (const item of fruitsItemsData) {
      await safeCall(`Create fruit item: ${item.desc}`, () =>
        createItemRequest({
          item_type_id: fruitsType?.id!,
          description: item.desc,
          quantity: item.qty,
          purchase_price: item.price,
          display_measurement_unit: "g",
          expiration_date: new Date(
            Date.now() + 10 * 24 * 60 * 60 * 1000
          ).toISOString(),
          tag_ids: [tagItem2?.id || 4].filter(Boolean) as number[],
        })
      );
    }

    console.log("Database seeded successfully (with partial error protection).");
    queryClient.invalidateQueries();
  };

  return { seed };
};