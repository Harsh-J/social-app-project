import React from 'react';
import { Spinner } from 'reactstrap';


export const Loading = () => {
    return(
        <div className="col-12 loading">
            <Spinner color="dark"  />
            <p className="mt-1">Loading . . .</p>
        </div>
    );
};