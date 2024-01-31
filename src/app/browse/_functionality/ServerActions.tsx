'use server';
import CatalogueItem from '@/models/CatalogueItem';
import { toJSON } from '@/utils';

export const getAllMedicines = async (): Promise<Array<any>> =>
  toJSON(
    await CatalogueItem.find({})
      .select({
        _id: 1,
        stock_count: 1,
        description: 1,
        title: 1,
        unit_price: 1,
        seller: 1,
        is_prescription_required: 1,
      })
      .lean()
      .exec()
  );

export const findMedicineBySearchTerm = async (
  term: string
): Promise<Array<any>> =>
  toJSON(
    await CatalogueItem.find({ title: { $regex: new RegExp(term, 'gi') } })
      .select({
        _id: 1,
        stock_count: 1,
        description: 1,
        title: 1,
        unit_price: 1,
        seller: 1,
        is_prescription_required: 1,
      })
      .lean()
      .exec()
  );
