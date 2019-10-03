import styled from 'styled-components'

export const SupplierDetailsContainer = styled.div`
    background-color: #f6f6f6;
    border:1px solid #ccc;
    margin-top:30px;
    padding: 30px 20px 20px 20px;
`;

export const SupplierHeader = styled.div`
    margin-bottom: 20px;
    > h2{
        display:inline;
        font-size: 20px;
        margin-right: 10px;
    }
    button{
        margin-right: 10px;
    }
    > div{
        color: #007eb3;
        display: inline;
        margin-left: 10px;
        font-size: 16px;
        font-weight: 600;       
    }
`;

export const SupplierInfo = styled.div`
    display: inline-block;
    margin-bottom: 15px;
    width: 50%;
    font-size: 16px;
    > label{
        width: 48%;
        color: #282c34;
        font-weight: bold;
        vertical-align: top;
    }
    > span{
        color: #999;
        text-overflow: ellipsis;
        width: 200px;
        overflow: hidden;
        white-space: nowrap;
        cursor: pointer;
    }
    > div{
        cursor: pointer;
        width: 40%;
        display: inline-block;
    }
`;
