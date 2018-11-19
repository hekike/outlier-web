
import React from 'react';

export const defaultResolution = 5;

interface IProps {
  onChange: (event: React.FormEvent<HTMLSelectElement>) => void,
  value: number
}

function WorkloadsStatusResolution (props: IProps) {
  const { onChange, value } = props;

  return (
    <form>
      <div className="form-row">
        <div className="col col-1">
          <select
            value={value}
            onChange={onChange}
            className="custom-select">
            <option value="5">1h</option>
            <option value="15">3h</option>
            <option value="30">6h</option>
            <option value="60">12h</option>
          </select>
        </div>
      </div>
    </form>
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
