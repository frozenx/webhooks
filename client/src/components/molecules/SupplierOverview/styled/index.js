import styled, { css } from 'styled-components'
import { RootElement, media } from '@beans/foundation';

export const HeaderOverview = styled.div`
    background-color: #f6f6f6;
    padding: 28px 12px 16px 12px;
    border: solid 1px #e5e5e5;
    label.supplier-title{
        font-size: 20px;
        margin-bottom: 20px;
        
    }
    
    ul{
       
    }
`;
export const SupplierStepTwo = styled.div`
`

export const ListWrapper = styled.div` 
    
    ul{
        margin: 0
        padding: 0;
        ${props => !props.showBorderTop && css`border-top: 1px solid #ccc;`}    
        > li{
            width: 100%;
            display: inline-block;
            padding-bottom: 10px;
            border-bottom: 1px solid #ccc;
            padding-top: 10px;
            > a {
                display:inline-block;
                > span{
                    vertical-align: top;
                }
                &:last-child{
                    float: right;
                }
            }
        }
    }
`;
export const HeaderListWrapper = styled.div`
    margin-bottom: 24px;
    position: relative;
    .loader{
        background-color: transparent;
        position: static;
        > div{
            width: 6em;
            height: 6em;
        }
    }
`
export const SiteListWrapper = styled.div`
    label.site-title {
        margin-bottom: 20px;
    }
    label.payment-title {
        margin-bottom: 20px;
    }
`;

export const AddDetailsWrapper = styled(RootElement)`
    > a{
        width:100%;
    }
    margin-top:11px;
`;


export const StyledList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    margin: auto 24px auto 24px;
    ${media.belowDesktop`
        flex-basis: 50%;
    `}
    margin:0
    padding:0
    li {
        width: 25%;
        display: inline-block;
        margin-bottom: 20px;
        label{
            width: 100%;
        }                  
        @media (max-width: 1007px) {
            width: 50%;
        }  
        @media (max-width: 505px) {
            width: 100%;
        }       
    }
`;

export const SupplierOverviewContainer = styled.section`
    margin: 34px 12px 34px 12px;
    
`;
