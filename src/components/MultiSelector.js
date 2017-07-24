// @flow
import React from 'react';
import Option from './Option';

import ratings from '../constants/ratings';

type MultiSelectorProps = {
  selectedRatings: Array<string>,
};

const MultiSelector = ({ selectedRatings }: MultiSelectorProps) =>
  <div>
    {ratings.map(({ title, value }) =>
      <Option
        selectedRatings={selectedRatings}
        title={title}
        value={value}
        key={value}
      />,
    )}
  </div>;

export default MultiSelector;
