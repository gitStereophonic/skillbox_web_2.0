import React from 'react';

function Sort(props) {
  return (
    <div>
      <input
        id="sort-trigger"
        type="checkbox"
        name="isAsc"
        checked={props.isAsc}
        onChange={props.onChangeHandler}
      >
      </input>
      <label
        className="sort-trigger"
        for="sort-trigger">
      </label>
    </div>
  );
}

export default Sort;
