import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';

import { Bell } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

import { togglePriceAlerts } from '@/lib/store/searchSlices/priceAlertsSlice';

const AlertPrices: React.FC = () => {
  const dispatch = useDispatch();
  const priceAlerts = useSelector((state: RootState) => state.priceAlerts);
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center">
        <Bell className="mr-2 h-4 w-4" />
        <span className="text-sm font-medium">Set up price alerts</span>
      </div>
      <Switch
        checked={priceAlerts}
        onCheckedChange={() => dispatch(togglePriceAlerts())}
      />
    </div>
  );
};

export default AlertPrices;
