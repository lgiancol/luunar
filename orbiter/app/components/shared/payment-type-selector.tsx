import { PaymentType } from '~/services/payments/payment.model';
import DataSelector from './data-selector';
import { useMemo, useState } from 'react';

interface PaymentTypeOption {
  label: string;
  paymentType: PaymentType;
}
const paymentTypeOptions: PaymentTypeOption[] = [
  { label: 'Paid by', paymentType: PaymentType.incoming },
  { label: 'Sent to ', paymentType: PaymentType.outgoing },
];
interface PaymentTypeSelectorProps {
  selectedPaymentType?: PaymentType;
  onPaymentTypeSelect?: (pA: PaymentType) => void;
}
export default function PaymentTypeSelector({ selectedPaymentType, onPaymentTypeSelect }: PaymentTypeSelectorProps) {
  const selectedPaymentTypeOption = useMemo(() => {
    return paymentTypeOptions.find((pto) => pto.paymentType === selectedPaymentType);
  }, [selectedPaymentType]);
  return (
    <DataSelector
      dataType="payment types"
      dataId="paymentType"
      filteredList={paymentTypeOptions}
      selectedEntry={selectedPaymentTypeOption}
      onSelect={(paymentTypeOption) => {
        if (paymentTypeOption && onPaymentTypeSelect) {
          onPaymentTypeSelect(paymentTypeOption.paymentType);
        }
      }}
      showAdd={false}
      showSearch={false}
    >
      <DataSelector.SelectedItem>
        {(selectedPaymentType: PaymentTypeOption) => (
          <div className="flex items-baseline gap-1 text-left">
            <p>{selectedPaymentType.label}</p>
          </div>
        )}
      </DataSelector.SelectedItem>

      <DataSelector.Item>{(paymentType: PaymentTypeOption) => <div>{paymentType.label}</div>}</DataSelector.Item>
    </DataSelector>
  );
}
