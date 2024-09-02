import TripComponent from '@/app/commonComponents/tripComponent';

export default function PackagesComponent() {
  const fakeList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {fakeList.map((item, index) => (
          <li key={index} className="col-span-1 divide-y">
            <div>
              <TripComponent text="Voyage" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
