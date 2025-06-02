import { useState } from 'react';
import Button from '../ui/button';

interface AddExpenseFormProps {}
export default function AddExpenseForm({}: AddExpenseFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submit expense');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className="mb-4 text-center text-xl font-semibold text-surface-text-500">Add Expense</h2>
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-surface-text-500" htmlFor="email">
            Client
          </label>
        </div>

        <div className="flex justify-end">
          <div className="w-max">
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
