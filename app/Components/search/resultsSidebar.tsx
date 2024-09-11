import { RootState } from '@/lib/store/store';
import { useSelector, useDispatch } from 'react-redux';

import {
  incrementCabin,
  decrementCabin,
  incrementChecked,
  decrementChecked,
} from '@/lib/store/searchSlices/baggageSlice';

import BaggageItem from './baggageItem';
import SidebarSection from './sidebarSection';
import AlertPrices from './alertPrices';

export default function ResultsSidebar() {
  const dispatch = useDispatch();
  const priceAlerts = useSelector((state: RootState) => state.priceAlerts);
  const { cabin: cabinBaggage, checked: checkedBaggage } = useSelector(
    (state: RootState) => state.baggage
  );

  return (
    <div className="w-64 p-4">
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
