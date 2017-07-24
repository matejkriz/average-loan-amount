// @flow
import React from 'react';

type ResponseMessageProps = {
  value: number,
};

const printValue = (value: number): string => value.toFixed(0).toString();

const ResponseMessage = ({ value }: ResponseMessageProps) =>
  <p>
    {`Průměrná výše půjček se zvoleným ratingem je ${printValue(value)} Kč`};
  </p>;

export default ResponseMessage;
