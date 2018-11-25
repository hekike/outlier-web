import React from 'react';

export const defaultResolution = 5;

interface IProps {
  onChange: (resolution: number) => void,
  value: number
}

function onChangeFactory(fn: (resolution: number) => void): (
  event: React.FormEvent<HTMLSelectElement>
) => void {
  return (event: React.FormEvent<HTMLSelectElement>) => {
    return fn(Number(event.currentTarget.value));
  }
}

function WorkloadsStatusResolution (props: IProps) {
  const { onChange, value } = props;

  return (
    <select
      value={value}
      onChange={onChangeFactory(onChange)}
      className="form-control form-control-sm">
      <option value="5">1h</option>
      <option value="15">3h</option>
      <option value="30">6h</option>
      <option value="60">12h</option>
    </select>
  );
}

export function getDurationByResolution(resolution: number): number {
  switch(resolution) {
    case 5:
      return 1;
    case 15:
      return 3;
    case 30:
      return 6;
    case 60:
      return 12;
    default:
      throw new Error(`Unsupported resolution: ${resolution}`);
  }
}

export default WorkloadsStatusResolution;
