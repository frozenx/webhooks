import styled from 'styled-components'
import { media } from '@beans/foundation';
import { BodyText } from '@beans/typography';


export const CardTopContainer = styled.div`
    label {
        font-size: 24px;
    }
    display: flex;
    ${media.belowTablet`flex-wrap: wrap;`};
`

export const CardBottomContainer = styled.div` 

    width: 100%;
    display: flex;
    margin-top: 8px;
    ${media.belowTablet`flex-wrap: wrap;`};
`
export const StyledLeftSection = styled.div`
    display: inline-block;
    margin-right: 10px;
    margin-bottom: ${props => props.spaceBottom && '20px' };
    label{
        width: 100%;  
    }
    margin-top: 8px;
    min-width: 434px;
    text-wrap: wrap;
    
`
export const StyledRightSection = styled(StyledLeftSection)`
    margin-right: 0px;
    margin-top: 8px;
`
export const StyledBodyText = styled(BodyText)`
    text-wrap: wrap;
`;
