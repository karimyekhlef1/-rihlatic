import React from 'react';

interface Props {
    data: any;
    setSelected?: (value: string) => void;
}

const SearchSelectComponent: React.FC<Props> = ({ data, setSelected }) => {

    return (
        <select
            name="type"
            defaultValue={data[0]}
            className="block rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 bg-transparent ring-1 ring-inset ring-transparent sm:text-sm sm:leading-6 hover:bg-blue-50"
            onChange={(e) => setSelected && setSelected(e.target.value)}
        >
            {
                data.map((item: any, index: number) => (
                    <option key={index} value={item.value}>{item}</option>
                ))
            }
        </select>
    );
};

export default SearchSelectComponent;