import { useMemo } from 'react';
import type { PaymentAccount, PaymentAccountType } from '~/services/payments/payment-account.model';
import DataSelector from '../data-selector';

type AccountTypeOption = { type: PaymentAccountType };

interface PaymentAccountSelectorProps {
  selectedPaymentAccountType?: PaymentAccountType;
  onSelect?: (pA?: PaymentAccountType) => void;
}
export default function PaymentAccountTypeSelector({
  onSelect,
  selectedPaymentAccountType,
}: PaymentAccountSelectorProps) {
  const accountTypeOptions: AccountTypeOption[] = [{ type: 'card' }, { type: 'bank' }, { type: 'platform' }];
  const selectedOption = useMemo(() => {
    return accountTypeOptions.find((o) => o.type === selectedPaymentAccountType);
  }, [selectedPaymentAccountType]);

  return (
    <DataSelector
      dataId="type"
      dataType="payment account types"
      filteredList={accountTypeOptions}
      selectedEntry={selectedOption}
      onSelect={(opt) => onSelect?.(opt?.type)}
      showAdd={false}
      showSearch={false}
    >
      <DataSelector.SelectedItem>
        {(selected: AccountTypeOption) => (
          <div className="flex items-baseline gap-1 text-left">
            <p className="font-bold">{selected.type}</p>
          </div>
        )}
      </DataSelector.SelectedItem>

      <DataSelector.Item>{(pA: AccountTypeOption) => <div>{pA.type}</div>}</DataSelector.Item>
    </DataSelector>
  );
}
