import React from "react";
import styled from "styled-components";

import { BidsOrAsks } from ".";

type Props = {
  percentage: number;
  bids: boolean;
};

export const Row: React.FunctionComponent<Props> = props => {
  const TRAsks = styled.tr`
    background: linear-gradient(
      to left,
      rgba(255, 0, 0, 0) ${props.percentage}%,
      rgba(255, 0, 0, 0.75) 100%
    );
  `;

  const TRBids = styled.tr`
    background: linear-gradient(
      to right,
      rgba(255, 0, 0, 0) ${props.percentage}%,
      rgba(255, 0, 0, 0.75) 100%
    );
  `;

  const TR = props.bids ? (
    <TRBids>{props.children}</TRBids>
  ) : (
    <TRAsks>{props.children}</TRAsks>
  );
  return TR;
};

export default Row;
