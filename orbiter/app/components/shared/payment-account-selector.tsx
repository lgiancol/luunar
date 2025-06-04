import type { PaymentAccount } from '~/services/payments/payment-account.model';
import DataSelector from './data-selector';

interface PaymentAccountSelectorProps {
  selectedPaymentAccount?: PaymentAccount;
  paymentAccounts?: PaymentAccount[];
  onSelect?: (pA?: PaymentAccount) => void;
}
export default function PaymentAccountSelector({
  selectedPaymentAccount,
  paymentAccounts,
  onSelect,
}: PaymentAccountSelectorProps) {
  return (
    <DataSelector
      dataId="id"
      dataType="payment accounts"
      recentList={paymentAccounts}
      selectedEntry={selectedPaymentAccount}
      onSelect={onSelect}
    >
      <DataSelector.SelectedItem>
        {(selected: PaymentAccount) => (
          <div className="flex items-baseline gap-1 text-left">
            <p className="font-bold">{selected.name}</p>
            {/* <p className="text-xs text-text-primary-300">({selected.email})</p> */}
          </div>
        )}
      </DataSelector.SelectedItem>

      <DataSelector.Item>{(pA: PaymentAccount) => <div>{pA.name}</div>}</DataSelector.Item>
    </DataSelector>
  );
}
