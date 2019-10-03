import React from 'react';
import { StyleGrayWrapper as GreyBackgroundContainer } from '../../../common/styles';


const Card = ({ children }) => {
    return (
        <GreyBackgroundContainer>
            {children}
        </GreyBackgroundContainer>
    )
}


export default Card;
