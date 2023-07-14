import React from 'react';
import { DatePickerInput, DateValue } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import { fetchNui } from '../../../utils/fetchNui';
import { Criminal } from '../../../typings';

interface Props {
  charges: Criminal['charges'];
  reportId: number;
  index: number;
  onChange: (val: DateValue) => void;
}

const WarrantExpiry: React.FC<Props> = ({ charges, reportId, index, onChange }) => {
  const [expiry, setExpiry] = React.useState<Date | null>(null);

  React.useEffect(() => {
    if (charges.length === 0) return;
    fetchNui<number>('getRecommendedWarrantExpiry', charges).then((resp) => {
      setExpiry(new Date(resp));
    });
  }, [charges]);

  return (
    <DatePickerInput
      icon={<IconCalendar size={20} />}
      label="Warrant expiration date"
      placeholder="12/03/2023"
      weekendDays={[]}
      value={expiry}
      onChange={(val) => {
        setExpiry(val);
        onChange(val);
      }}
    />
  );
};

export default WarrantExpiry;
