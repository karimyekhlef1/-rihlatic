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
import { Luggage, Briefcase } from 'lucide-react';
import Stops from './stops';
import Connections from './connections';

export default function ResultsSidebar() {
  const dispatch = useDispatch();
  const { cabin: cabinBaggage, checked: checkedBaggage } = useSelector(
    (state: RootState) => state.baggage
  );

  return (
    <div className="flex flex-col pt-4">
      <SidebarSection title="Bags">
        <BaggageItem
          icon={<Luggage size={20} className="mr-2" />}
          type="Cabin baggage"
          count={cabinBaggage}
          onIncrement={() => dispatch(incrementCabin())}
          onDecrement={() => dispatch(decrementCabin())}
        />
        <BaggageItem
          icon={<Briefcase size={20} className="mr-2" />}
          type="Checked baggage"
          count={checkedBaggage}
          onIncrement={() => dispatch(incrementChecked())}
          onDecrement={() => dispatch(decrementChecked())}
        />
      </SidebarSection>

      <SidebarSection title="Stops">
        <Stops />
      </SidebarSection>
      <SidebarSection title="Connections">
        <Connections />
      </SidebarSection>
      <SidebarSection title="Carriers" />
      <SidebarSection title="Booking options" />
      <SidebarSection title="Travel hacks" />
      <SidebarSection title="Exclude countries" />
    </div>
  );
}
