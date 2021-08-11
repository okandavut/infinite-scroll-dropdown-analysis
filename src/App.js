import React, { useState } from "react";

import { AsyncPaginate } from "react-select-async-paginate";


const defaultAdditional = {
  page: 1
};

const options = [
    {value:"1", label: "Subject 1", category: "General"},
    {value:"2",  label: "Subject 2", category: "General" },
    {value:"3",  label: "Subject 3", category: "General" },
    {value:"4",  label: "Subject 4" , category: "Personal"},
    {value:"5",  label: "Subject 5" , category: "Personal"},
    {value:"6",  label: "Subject 6", category: "Personal" },
    {value:"7",  label: "Subject 7", category: "Personal" },
    {value:"8",  label: "Subject 8" , category: "Enterprise"},
    {value:"9",  label: "Subject 9" , category: "Enterprise"},
    {value:"10",  label: "Subject 10" , category: "Enterprise"},
    {value:"11",  label: "Subject 11" , category: "Enterprise"},
    {value:"12",  label: "Subject 12" , category: "Enterprise"},
    {value:"13",  label: "Subject 13" , category: "Enterprise"},
    {value:"14",  label: "Subject 14" , category: "Enterprise"},
    {value:"15",  label: "Subject 15" , category: "Personal"},
    {value:"17",  label: "Subject 16" , category: "Personal"},
    {value:"18",  label: "Subject 17" , category: "Personal"},
    {value:"19",  label: "Subject 18" , category: "Personal"},
    {value:"20",  label: "Subject 19" , category: "Windows"},
    {value:"21",  label: "Subject 20" , category: "Windows"},
    {value:"22",  label: "Subject 21" , category: "Windows"},
    {value:"23",  label: "Subject 22" , category: "Windows"},
    {value:"24",  label: "Subject 23" , category: "Windows"},
  ];

  const sleep = ms =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, ms);
    });

  const optionsPerPage = 5;

  const loadOptions = async (search, page) => {
    await sleep(500);

    let filteredOptions;
    if (!search) {
      filteredOptions = options;
    } else {
      const searchLower = search.toLowerCase();

      filteredOptions = options.filter(({ label }) =>
        label.toLowerCase().includes(searchLower)
      );
    }

    const hasMore = Math.ceil(filteredOptions.length / optionsPerPage) > page;
    const slicedOptions = filteredOptions.slice(
      (page - 1) * optionsPerPage,
      page * optionsPerPage
    );

    const mapTypeToIndex = new Map();

    const result = [];

    slicedOptions.forEach(option => {
      const type = option.category;

      if (mapTypeToIndex.has(type)) {
        const index = mapTypeToIndex.get(type);

        result[index].options.push(option);
      } else {
        const index = result.length;

        mapTypeToIndex.set(type, index);

        result.push({
          label: `${type}`,
          options: [option]
        });
      }

    });

    return {
      options: result,
      hasMore
    };
  };

const loadPageOptions = async (q, prevOptions, { page }) => {
  const { options, hasMore } = await loadOptions(q, page);

  return {
    options,
    hasMore,

    additional: {
      page: page + 1
    }
  };
};

const App = () => {
  const [value, onChange] = useState(null);

  const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor:'#70c8ff',
    color: 'white',
    fontSize:15,
    justifyContent: 'space-between',
  };
  const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: 'black',
    display: 'inline-block',
    textAlign:'center',
    fontSize: 15,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
  };

  const formatGroupLabel = data => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );
  return (
    <div>

      <div style={{ margin: "50px" }}>
        <h1>react-select-async-paginate</h1>
        <h2>Request by page number</h2>
        <AsyncPaginate
          additional={defaultAdditional}
          value={value}
          isMulti
          loadOptions={loadPageOptions}
          closeMenuOnSelect={false}
          onChange={onChange}
          formatGroupLabel={formatGroupLabel}
        />
      </div>
    </div>
  );
};

export default App;
