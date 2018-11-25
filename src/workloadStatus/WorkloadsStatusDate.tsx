import moment from 'moment';
import React from 'react';

interface IProps {
  onChange: (date: Date) => void,
  value: Date
}

function onChangeFactory(fn: (date: Date) => void): (
  event: React.FormEvent<HTMLInputElement>
) => void {
  return (event: React.FormEvent<HTMLInputElement>) => {
    return fn(new Date(event.currentTarget.value));
  }
}

function WorkloadsStatusDate (props: IProps) {
  const { onChange, value } = props;
  const valueStr = moment(value).format('YYYY-MM-DDTHH:mm');

  return (
    <input
      className="form-control form-control-sm"
      type="datetime-local"
      value={valueStr}
      onChange={onChangeFactory(onChange)}
    />
  );
}

export default WorkloadsStatusDate;
