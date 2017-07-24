// @flow
import React from 'react';

type LabelProps = {
  title: string,
};

const Label = ({ title }: LabelProps) =>
  <h1 className="label">
    {title}
    <style jsx>{`
      .label {
        font-size: 1rem;
      }
    `}</style>
  </h1>;

export default Label;
