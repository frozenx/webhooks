import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import config from '../../../config';
import { FormHeading, CenterContainer } from "../../../common/styles";
import i18Data from "../../../languagepack/index";
import { NotFoundContainer, ErrorContainer } from "./styled";
import { BodyText } from '@beans/typography';
import Button from '@beans/button';

const notFound = ({ statusCode }) => {
  return (
    <Fragment>
      <NotFoundContainer>
        <CenterContainer>
          <FormHeading>
            {statusCode === 403 ? (
              <Fragment>
                <h2>{i18Data.globalErrorMessage[403].title}</h2>
                <BodyText>{i18Data.globalErrorMessage[403].body}</BodyText>
              </Fragment>
            ) : (
                <ErrorContainer>
                  <h2>{i18Data.globalErrorMessage[404].title}</h2>
                  <BodyText>{i18Data.globalErrorMessage[404].body}</BodyText>
                  <Link to={config.rootPath}><Button>Go to homepage</Button></Link>
                </ErrorContainer>
              )}
          </FormHeading>
        </CenterContainer>
      </NotFoundContainer>
    </Fragment>
  );
};

export default notFound;
