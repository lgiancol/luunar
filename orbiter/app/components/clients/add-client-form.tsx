import { useState } from 'react';
import { addClient } from '~/services/clients/clients.service';
import { Button } from '../ui/button';
import InputText from '../ui/input-text';
import InputTextarea from '../ui/input-textarea';
import Panel from '../ui/panel';

interface AddClientFormProps {}
export default function AddClientForm({}: AddClientFormProps) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [organizationId, setOrganizationId] = useState('test-organization');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await addClient({ name, email, phone, notes, organization_id: organizationId });
      console.log(result);
    } catch (err) {
      console.error('AddClient failed:', err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <h2 className="text-surface-text-500 text-xl font-semibold">Add Client</h2>

          {/* <Panel>
          </Panel> */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-surface-text-500 mb-1 block text-sm font-medium" htmlFor="name">
                    Name
                  </label>
                  <InputText id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="flex-1">
                  <label className="text-surface-text-500 mb-1 block text-sm font-medium" htmlFor="email">
                    Email
                  </label>
                  <InputText id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>

              <div className="w-max">
                <label className="text-surface-text-500 mb-1 block text-sm font-medium" htmlFor="organizationId">
                  Organization
                </label>
                <InputText
                  id="organizationId"
                  type="text"
                  value={organizationId}
                  onChange={(e) => setOrganizationId(e.target.value)}
                />
              </div>

              <div className="w-sm">
                <label className="text-surface-text-500 mb-1 block text-sm font-medium" htmlFor="phone">
                  Phone
                </label>
                <InputText id="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div>
                <label className="text-surface-text-500 mb-1 block text-sm font-medium" htmlFor="notes">
                  Notes
                </label>
                <InputTextarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>
            </div>

          <div className="flex justify-end">
            <div className="w-max">
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
