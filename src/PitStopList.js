import React from 'react'
import PitStop from "./PitStop";

const PitStopList = (props) => {
    return (
        <div>
            {Object.values(props.pitstops).map(pitstop =>
            <PitStop
                pitstop={pitstop}
            />
            )}
        </div>
    )
};

export default PitStopList