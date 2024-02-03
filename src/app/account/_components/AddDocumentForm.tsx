'use client';
import { useGlobalContext } from '@/app/_context/store';
import { addDocument } from '../_functionality/ServerActions';

export default function AddDocumentForm({
  docType,
}: {
  docType: 'MEDICAL' | 'PROOF';
}) {
  const { setHoverContent } = useGlobalContext();
  return (
    <form
      className="standardForm"
      style={{ width: '600px' }}
      action={async (formData: FormData) => {
        await addDocument(formData);
        setHoverContent(null);
      }}
    >
      <h1>Add document</h1>
      <input
        type="text"
        name="description"
        placeholder="Description"
        autoComplete="off"
      />
      <input type="file" name="file" required />
      {docType === 'MEDICAL' ? (
        <input
          type="text"
          name="doc_type"
          defaultValue={docType}
          style={{ display: 'none' }}
        />
      ) : (
        <select
          name="doc_type"
          defaultValue=""
          style={{ padding: '15px' }}
          required
        >
          <option value="" disabled>
            -- Select proof type --
          </option>
          <option value="ID">IIT Bhilai ID</option>
          <option value="AADHAR">Aadhar card</option>
          <option value="GST">GST</option>
          <option value="OTHER">Others</option>
        </select>
      )}
      <input type="submit" value="Submit" />
    </form>
  );
}
