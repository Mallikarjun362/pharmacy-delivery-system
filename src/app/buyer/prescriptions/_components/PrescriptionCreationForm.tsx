'use client';
import { createPrescriptionFormAction } from '../_functionality';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import styles from '../styles.module.css';

export default function PrescriptionCreationForm() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/');
    },
  });
  return (
    <form
      className={`${styles.prescriptionCreationForm}`}
      action={async (formData: FormData) => {
        const fileSizeBytes = (formData.get('image_files') as any)?.size;
        if (fileSizeBytes) {
          const fileSizeMB = fileSizeBytes / 1024 ** 2;
          if (!(fileSizeMB < 3)) {
            return alert('File must be less than 3 MB');
          }
          formData.append(
            'buyer_db_id',
            session?.user?.custome_data?.db_id || ''
          );
          await createPrescriptionFormAction(formData);
        }
      }}
    >
      <input type="text" name="title" placeholder="Title" required />
      <input type="file" name="image_files" accept="image/*" required />
      <input type="submit" value={'Add new prescription'} />
    </form>
  );
}
