import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';

import { Bell } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

import { togglePriceAlerts } from '@/lib/store/custom/searchSlices/priceAlertsSlice';

const AlertPrices: React.FC = () => {
  const dispatch = useDispatch();
  const priceAlerts = useSelector((state: RootState) => state.priceAlerts);
  return (
    <div className="flex items-start justify-between py-2">
      <div className="flex flex-col">
        <h2 className="text-md font-semibold text-gray-800">
          Set up price alerts
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Receive alerts when the prices for this route change.
        </p>
      </div>
      <div className="mt-1">
        <Switch
          checked={priceAlerts}
          onCheckedChange={() => dispatch(togglePriceAlerts())}
        />
      </div>
    </div>
  );
};

export default AlertPrices;
