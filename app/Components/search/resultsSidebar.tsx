import { useSelector, useDispatch } from 'react-redux';

import { Switch } from '@/components/ui/switch';

import { RootState } from '@/lib/store/store';
import { togglePriceAlerts } from '@/lib/store/searchSlices/priceAlertsSlice';
import {
  incrementCabin,
  decrementCabin,
  incrementChecked,
  decrementChecked,
} from '@/lib/store/searchSlices/baggageSlice';

import BaggageItem from './baggageItem';
import { Bell } from 'lucide-react';
import SidebarSection from './sidebarSection';

export default function ResultsSidebar() {
  const dispatch = useDispatch();
  const priceAlerts = useSelector((state: RootState) => state.priceAlerts);
  const { cabin: cabinBaggage, checked: checkedBaggage } = useSelector(
    (state: RootState) => state.baggage
  );

  return (
    <div className="w-64 p-4">
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

      <SidebarSection title="Bags">
        <BaggageItem
          type="Cabin baggage"
          count={cabinBaggage}
          onIncrement={() => dispatch(incrementCabin())}
          onDecrement={() => dispatch(decrementCabin())}
        />
        <BaggageItem
          type="Checked baggage"
          count={checkedBaggage}
          onIncrement={() => dispatch(incrementChecked())}
          onDecrement={() => dispatch(decrementChecked())}
        />
      </SidebarSection>

      <SidebarSection title="Stops" />
      <SidebarSection title="Connections" />
      <SidebarSection title="Carriers" />
      <SidebarSection title="Booking options" />
      <SidebarSection title="Travel hacks" />
      <SidebarSection title="Exclude countries" />
      <SidebarSection title="Times" />
    </div>
  );
}
