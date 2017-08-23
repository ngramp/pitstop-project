import React from 'react';
const PitStop = props => {
  const pitStop = props.pitStop;
  return (
    <div>
      <div>
        {pitStop.vehicleNumber}
      </div>
      <div>
        {pitStop.timeIn}
      </div>
      <div>
        {pitStop.timeOut}
      </div>
    </div>
  );
};

export default PitStop;
