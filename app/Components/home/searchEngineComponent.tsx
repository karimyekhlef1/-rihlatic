import { Empty, Select, Spin } from 'antd';
import debounce from 'debounce';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import a from '../../util/Api';
// import './style.css';
// import useTranslate from '@kiwicom/orbit-components/lib/hooks/useTranslate';
import axios from 'axios';

const { Option } = Select

const AutoCompleteDestinations = ({
  endPoint,
  initialSearch = ' ',
  getDataOnMount = false,
  labelColumn = 'name',
  valueColumn = 'id',
  removeSelected = false,
  selectedItems = [],
  onSelectItem,
  disabled = false,
  isCurrency = false,
  ...props
}: any) => {
  const [lastFetchId, setLastFetchId] = useState(0);
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [currentValue, setCurrentValue] = useState([]);
  // const translate = useTranslate();

  const filteredOptions = data.filter((o: any) => {
    return !selectedItems.includes(o.value as never);
  });

  const dataSource = removeSelected ? filteredOptions : data

  const handleFetchData = (searchTerm: any) => {
    setLastFetchId(lastFetchId + 1);
    const fetchId = lastFetchId;
    // Reset State
    setData([]);
    setFetching(true);

    // Fetch Countries
    const url = '${endPoint}?filter[search]=${searchTerm}';
    axios.get(url)
      .then((body) => {
        if (fetchId !== lastFetchId) {
          // for fetch callback order
          return;
        }
        // eslint-disable-next-line no-shadow
        const data = body.data.data.map((apiData: any) => ({
          value: apiData[valueColumn],
          // text: isCurrency ? ${apiData[labelColumn]} ${apiData.name} : ${apiData[labelColumn]},
        }));
        setData(data)
        setFetching(false)
      })
      .catch((err) => {
        setFetching(false)
      })
  }
  const handleFetchRemoteData = debounce(handleFetchData, 800)

  // eslint-disable-next-line react/prop-types
  const { value, onChange } = props

  useEffect(() => {
    if (getDataOnMount) {
      setCurrentValue(selectedItems)
      handleFetchData(initialSearch)
    }
  }, [])

  return (
    <Select
      disabled={disabled}
      defaultValue={1}
      // autoComplete="dontshow"
      value={value || []}
      // value={currentValue || []}
      labelInValue
      showSearch
      showArrow
      notFoundContent={
        fetching ? (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        ) : (
          <Empty />
        )
      }
      filterOption={false}
      onSearch={handleFetchRemoteData}
      onSelect={(selectedValue: any, event: any) => {
        onChange(selectedValue, event)
        onSelectItem(selectedValue)
      }}
      style={{ width: '100%' }}
      className="ant-select-selector ant-select-selection-placeholder"
      placeholder={"Select Destination"}
    >
      {dataSource.map((d: any) => (
        <Option key={d.value} value={d.value}>
          {d.text}
        </Option>
      ))}
    </Select>
  )
}

export default AutoCompleteDestinations

AutoCompleteDestinations.propTypes = {
  endPoint: PropTypes.string.isRequired,
  initialSearch: PropTypes.string,
  labelColumn: PropTypes.string,
  valueColumn: PropTypes.string,
  getDataOnMount: PropTypes.bool,
  removeSelected: PropTypes.bool,
  disabled: PropTypes.bool,
  selectedItems: PropTypes.array,
  onSelectItem: PropTypes.func,
}

AutoCompleteDestinations.defaultProps = {
  onSelectItem: () => {},
  initialSearch: ' ',
  labelColumn: 'name',
  valueColumn: 'id',
  getDataOnMount: true,
  removeSelected: false,
  selectedItems: [],
  disabled: false,
}