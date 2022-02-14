import React from 'react'
import data from '../data/form.json';

function ScholarshipFormFormat() {
  alert(data.name)

  alert("X")
  const listItems = data.map(item =>
    <div>
      {data}
      {item}
      <a>{item.name}</a>
      <a>{item.age}</a>
    </div>
  );
  

  return (
    <div>
      TEST
        { listItems }
    </div>
  );
}

export default ScholarshipFormFormat;