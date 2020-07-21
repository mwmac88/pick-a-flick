import React from 'react';
import styled from 'styled-components';

const StarRatingSpan = styled.span<{ ratingValue: number }>`
  --star-size: 30px;
  --star-color: #fff;
  --star-background: #ed8936;
  --rating: ${(props) => props.ratingValue};
  --percent: calc(var(--rating) / 10 * 100%);

  display: inline-block;
  font-size: var(--star-size);
  font-family: Times;
  line-height: 1;

  &::before {
    content: '★★★★★';
    letter-spacing: 5px;
    background: linear-gradient(
      90deg,
      var(--star-background) var(--percent),
      var(--star-color) var(--percent)
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

interface Props {
  rating: number;
}

const StarRating: React.FC<Props> = ({ rating }) => {
  return (
    <StarRatingSpan
      ratingValue={rating}
      aria-label={`Flick rating is ${rating} out of 10`}
    />
  );
};

export default StarRating;
