'use server'
import CatalogItem, { CatalogItemActions } from "@/models/CatalogItem"
import { revalidatePath } from "next/cache";

export const getMedicinesByMe = async ({ seller_db_id }: { seller_db_id: string }): Promise<Array<any>> => JSON.parse(JSON.stringify(await CatalogItem
    .find({ seller: seller_db_id })
    .select({ stock_count: 1, description: 1, title: 1, unit_price: 1, _id: 1, is_prescription_required: 1 })
    .lean()
    .exec()));

export const deleteMedicine = async ({ item_db_id }: { item_db_id: string }) => {
    await CatalogItemActions.delete(item_db_id)
    revalidatePath("/")
};