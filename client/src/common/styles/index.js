import styled, { css } from 'styled-components';
import Notification from '@beans/notification';
import { RootElement, spinner } from '@beans/foundation';
import { BodyText } from '@beans/typography';
import Checkbox from '@beans/checkbox';

// loader style
export const LoadingContainer = styled.div`
    position: ${props => props.moreEnabled ? 'static' : 'fixed'}
    top: 0;
    height: auto;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`;
export const Spinner = styled.span`
    ${spinner(48)}
`;

// Create Supplier Page
export const PrimaryWrapper = styled.div`
    margin: 0 auto;
    padding: 0px 12px;
    box-sizing: border-box;
    @media (max-width: 1259px){
        width: 100%; 
    }
    @media (min-width: 1260px) {
        width: 1260px;
    }
    @media (min-width: 1512px){
        width: 1512px;
    }
    
`;

export const SecondaryWrapper = styled(RootElement)`
    width: 816px;
    margin: 0 auto;
    box-sizing: border-box;
    @media (max-width: 816px) {
        width: 100%;
    }
    form{
        padding-bottom: 24px;
    }
`;

export const NotificationStyle = styled.div`
    margin-top: 24px;
`

export const FormHeading = styled(RootElement)`
    .input-error {
        color: #cc3333;
    }
    h1,h2 {
        margin: 0 0 19px 0;
        color: #333;
    }
    h1,h2 {
        font-size: 32px;
    }
    h1{
        margin-top: 24px;
    }
    h2{
        font-size: 28px;
    }
    h4 {
        margin: 0 0 20px 0;
        color: #666666;
        font-size: 16px;
        font-weight: normal;
    }
`;
export const TopHeading = styled(RootElement)`
    margin: 30px 0px;
`

export const TabWrapper = styled.div`
    margin: 20px 0px;
    display: inline-block;
    width: 100%;
`;


export const InputType = styled.div`
    margin-bottom: 24px;
    position: relative
        > label{
            padding-bottom: 8px;
            width: 100%;
        }
    select{
        font-style: normal;
    }
    textarea{
        resize: none;
    }  
    input[type=number] {
        -webkit-appearance:none;
        -moz-appearance:none;
        -ms-appearance:none;
        &::-webkit-inner-spin-button, 
        &::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        },
        &::-moz-inner-spin-button, 
        &::-moz-outer-spin-button {
            -moz-appearance: none;
            margin: 0;
        },
        &::-ms-inner-spin-button, 
        &::-ms-outer-spin-button {
            -ms-appearance: none;
            margin: 0;
        }
    }
`;

export const LabelType = styled.div`
    margin-bottom: 20px;
`;

export const AccordionContainer = styled.div`
    background-color: #f6f6f6;
    border-left: 1px solid #cccccc;
    border-right: 1px solid #cccccc;
    border-top: 1px solid #cccccc;
    margin-bottom: 24px;
    margin-top: 30px;

    .accordion-attr-grp{
        border: 0px;    
        border-bottom: 1px solid #ccc;
        .beans-accordion__content{
            padding: 0px;
            border-top: 1px solid #cccccc;
            border-bottom: 1px solid #cccccc;
        }
    }
`;

export const BtnContainer = styled.div`

    button{
        margin-right: 12px;
        
       width: ${props => props.maxWidth && `${props.maxWidth * 10}px`};
       min-width: 92px;

       
    }


    & button > span > span {
        margin: 0;
    }
    
    
   
  

`;

export const RadioBtn = styled.div`
    display: inline-block;
    margin-right: 20px;
    > span{
        line-height: 36px;
        vertical-align: top;
        margin-left: 10px;
    }
    
`;
export const StyledCheckbox = styled.div`
    
    > span{
        line-height: 36px;
        vertical-align: top;
        margin-left: 10px;
    }

`;

export const ErrorMsg = styled(BodyText)`
    margin-top: 5px;
    color: #cc3333;  
`;

export const CenterContainer = styled(RootElement)`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
`;

export const LabelTypeComponent = styled(RootElement)`
    margin-bottom: 8px;
    label {
        > span{
            margin-right: 6px;
        }
        > div{
            display: inline-block;
        }
    }
`;
export const TootTipArea = styled(RootElement)`
    display: inline-block;
    vertical-align: text-bottom;
    > button{
        font-weight: normal;
    }
`;

export const StyleGrayWrapper = styled(RootElement)`

    background-color: #f6f6f6;
    border: solid 1px #e5e5e5;
    padding: 32px 105px 40px 105px;
    margin-bottom: 24px;
    label.site-title{
        font-size: 24px;
    }

    @media (max-width: 756px) {
       padding-left: 63px;
       padding-right: 63px;
    }  
    @media (max-width: 505px) {
        padding-left: 42px;
        padding-right: 42px;
    } 
    @media (max-width: 320px) {
        padding-left: 12px;
        padding-right: 12px;
    }

    & & {
        margin-top: 28px;
        padding: 0px;
        border: none;
        & label.payment-title{
            font-size: 24px;
        }
    }
`
export const FormHeadingWrapper = styled(RootElement)`
    display: flex;
    justify-content: space-between;
    margin-top: 0px;
   margin-bottom: 10px

    & button {
        align-self: center;
    }
}
`
export const CardTopContainer = styled.div`
    margin-bottom: 18px;
    label {
        font-size: 24px;
        margin-right: 20px;
    }
    button{
        float: right;
    }
`

export const CardBottomContainer = styled.div` 
    width: 100%;
`
export const StyledLeftSection = styled.div`
    display: inline-block;
    margin-right: 10px;
    vertical-align: top;
    width: 65%;
    last-child{
        width: auto;
        margin-right: 0px;
    }
    label{
        width: 100%;
        span{
            width: 60%;
            display: inline-block;
            vertical-align: top;
            :last-child{
                width: auto;
            }
        }
    }
`
export const StyledRightSection = styled(StyledLeftSection)`
    margin-right: 0px;
    width: auto;
`
export const IconStyle = styled.div`
    background-color: #fff;
    height: 22px;
    margin-left: 12px;
    width: 22px;
    border-radius: 50%;
    border: 2px solid #00539f;
    display: inline-block;
    text-align: center;
    line-height: 22px;
    svg{
        stroke-width: 2.2px;
    }
`;

export const NotFoundContainer = styled.div`
    margin-bottom: 24px;
    > label{
        font-size: 16px;
        margin-bottom: 18px;
        display: block;
        margin-top: 14px;
    }
`


