import React from 'react';

import {
    LoadingContainer,
    Spinner
} from '../../../common/styles'

const Loader = props => {
    return (
        <LoadingContainer {...props}>
            <Spinner></Spinner>
        </LoadingContainer>


    )
}

export default Loader