// @flow
import React from 'react';
import Link from 'next/link';

type OptionProps = {
  selectedRatings: Array<string>,
  title: string,
  value: string,
};

/* Convert list of values to query string */
export const getQuery = (values: Array<string>) =>
  encodeURI([...values].sort().join(','));

/* Compose list of ratings selected after click of the link */
const composeValues = (
  values: Array<string>,
  currentValue: string,
  isActive: boolean,
): Array<string> =>
  isActive
    ? values.filter(value => value !== currentValue)
    : [...values, currentValue];

const Option = ({ selectedRatings, title, value }: OptionProps) => {
  const isActive = selectedRatings.includes(value);
  const values = composeValues(selectedRatings, value, isActive);
  const rating = getQuery(values);

  return (
    <Link
      href={{
        pathname: '/',
        query: rating && {
          rating,
        },
      }}
    >
      <a className={`rating-link ${isActive ? 'active' : ''}`}>
        {title}
        <style jsx>{`
          .rating-link {
            display: inline-block;
            padding: 8px 12px;
            min-width: 50px;
            font-size: 12px;
            line-height: 14px;
            text-align: center;

            color: #e75637;
            background-color: #fff;

            border: 1px solid #e7e7e7;
            transition: background-color .2s, border-color .2s;

            text-decoration: none;
          }
          .active,
          .rating-link:hover {
            color: #fff;
            background-color: #e75637;
            border-color: #d23a19;
          }
        `}</style>
      </a>
    </Link>
  );
};

export default Option;
