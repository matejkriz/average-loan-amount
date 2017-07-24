// @flow
import React from 'react';
import fetch from 'isomorphic-unfetch';
import api from '../src/constants/api';

import Label from '../src/components/Label';
import MultiSelector from '../src/components/MultiSelector';
import ResponseMessage from '../src/components/ResponseMessage';

import ratings from '../src/constants/ratings';

/* List of available rating values */
const ratingValues = ratings.reduce(
  (values, rating) => [...values, rating.value],
  [],
);

/* Get list of selected ratings from query param */
const getSelectedRatings = (ratingQuery: string): Array<string> => {
  const ratingList = decodeURI(ratingQuery).split(',');
  return ratingList.filter(rating => ratingValues.includes(rating));
};

/* Get encoded rating query string from selected ratings */
const getRatingQuery = (selectedRatings: Array<string>): string =>
  encodeURI(JSON.stringify(selectedRatings));

const calculateAverageByField = (list: Array<any>, field: string) =>
  list.reduce((sum, item) => sum + item[field], 0) / list.length;

/* Fetch all loans and return average loan amount depending on selected ratings */
const getAverageAmount = async (selectedRatings: Array<string>) => {
  const { headers, path } = api;

  const queryString = selectedRatings.length
    ? `?rating__in=${getRatingQuery(selectedRatings)}`
    : '';
  const url = path + queryString;

  const response = await fetch(url, {
    headers,
  });
  const totalCount = await response.headers.get('X-Total');

  const responseComplete = await fetch(url, {
    headers: { ...headers, 'X-Size': totalCount },
  });
  const loans = await responseComplete.json();

  return calculateAverageByField(loans, 'amount');
};

type PageProps = {
  averageAmount: number,
  selectedRatings: Array<string>,
};

const Page = ({ averageAmount, selectedRatings }: PageProps) =>
  <div>
    <Label title="Zobrazit průměrnou výši půjček s ratingem" />
    <MultiSelector selectedRatings={selectedRatings} />
    <ResponseMessage value={averageAmount} />
    <style global jsx>{`
      body {
        font-family: Roboto Slab, serif;
      }
    `}</style>
  </div>;

Page.getInitialProps = async ({ query }) => {
  const selectedRatings = Object.prototype.hasOwnProperty.call(query, 'rating')
    ? getSelectedRatings(query.rating)
    : [];
  const averageAmount = await getAverageAmount(selectedRatings);

  return {
    averageAmount,
    selectedRatings,
  };
};

export default Page;
