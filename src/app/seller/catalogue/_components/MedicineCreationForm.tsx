import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { CatalogueItemActions } from '@/models/CatalogueItem';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export default async function MedicineCreationForm() {
  const session = await getServerSession(authOptions);
  return (
    <form
      className="standardForm"
      style={{ backgroundColor: '#0001', border: '3px solid #0003' }}
      action={async (formDate: FormData) => {
        'use server';
        await CatalogueItemActions.create({
          seller_db_id: formDate.get('seller_db_id')?.valueOf() as string,
          title: formDate.get('title')?.valueOf() as string,
          unit_price: formDate.get('unit_price')?.valueOf() as number,
          stock_count: formDate.get('stock_count')?.valueOf() as number,
          description: formDate.get('description')?.valueOf() as string,
          is_prescription_required:
            (formDate.get('is_prescription_required')?.valueOf() as string) ==
            'YES',
        });
        revalidatePath('/');
      }}
    >
      <h1>Add medicine</h1>
      <input
        type="text"
        name="seller_db_id"
        defaultValue={session?.user.custome_data.db_id}
        style={{ display: 'none' }}
      />
      <input type="text" name="title" placeholder="Title" required />
      <textarea name="description" placeholder="Description" />
      <input
        type="number"
        name="unit_price"
        placeholder="Unit price (&#8377;)"
        required
        step={0.01}
        min={0}
      />
      <input
        type="number"
        name="stock_count"
        placeholder="Stock count"
        required
        min={0}
        step={1}
      />
      <select name="is_prescription_required" defaultValue={'YES'}>
        <option value="YES">Prescription required</option>
        <option value="NO">Prescription not required</option>
      </select>
      <div className="resetSubmitDiv">
        <input type="reset" value="Clear" />
        <input type="submit" value="Add medicine" />
      </div>
    </form>
  );
}
