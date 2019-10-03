import styled from 'styled-components'

export const AllInputs = styled.div `
    background-color: #f6f6f6;
    padding:  24px 105px 8px 105px
    margin-bottom: 30px;
    @media (max-width: 756px) {
        padding-left: 63px;
        padding-right: 63px;
     }  
    @media (max-width: 505px) {
         padding-left: 42px;
         padding-right: 42px;
    } 
    @media (max-width: 504px) {
         padding-left: 0px;
         padding-right: 0px;
         background-color: #fff;
         margin-bottom: 0px;
    } 
`;