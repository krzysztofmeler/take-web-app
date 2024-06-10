import { FC } from 'react';
import { Link } from 'react-router-dom';

type StarRatioProps = {
  value: number;
  updateValue: (value: number) => void;
};

const StarRatio: FC<StarRatioProps> = (props: StarRatioProps) => {

  const rates = [1, 2, 3, 4, 5];

  // todo: add common id
  // todo: add value displaying
  return <>
    {rates.map(rate => <label key={rate.toString()}><input type={'radio'} value={rate} onClick={() => props.updateValue(rate)} />{rate.toString()}
    </label>)}
  </>
}

export { StarRatio };
