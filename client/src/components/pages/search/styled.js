import styled from 'styled-components';
import { RootElement, media } from '@beans/foundation';


export const SearchContainer = styled(RootElement)`
    background-color: #f6f6f6;
    padding: 24px 105px 32px 105px;
    border: 1px solid #e5e5e5;
    &:first-child {
        margin-bottom: 24px;
    } 
     ${media.tabletOnly`
        padding-left: 63px;
        padding-right: 63px;
    `}
     ${media.mobileLargeOnly`
        padding-left: 40px;
        padding-right: 40px;
    `}
     ${media.mobileOnly`
        padding-left: 12px;
        padding-right: 12px;
    `}
`;

export const SearchWithName = styled(RootElement)`
    .search-label{
        display: inline-block;
    }
    input {
        width: 554px;
        margin-right: 10px;
    }
    @media (max-width: 816px) {
        .search-label{
            width: 83%;
        }
        input {
            width: 98%;
        }
    }
`;

export const SearchWithNumber = styled(RootElement)`
    .search-label{
        display: inline-block;
    }
    input {
        width: 239px;
        margin-right: 10px;
    }
    @media (max-width: 816px) {
        .search-label{
            width: 83%;
            display: inline-block;
        }
        input {
            width: 98%;
        }
    }
`;

export const SearchIconContainer = styled(RootElement)`
    display: inline-block;
    position: absolute;
    top: 27px;
    &.search-number{
        left: 249px;
    }
    @media (max-width: 816px) {
        &.search-number{
            left: auto;
        }
    }
`;
