import React, { useState } from "react";
import Button from '@beans/button';
import Notification from '@beans/notification';
import { FormHeading, PrimaryWrapper, SecondaryWrapper, FormHeadingWrapper, NotificationStyle } from "../../../common/styles";
import SupplierDetailForm from './Form'
import { SupplierStepThree } from "./styled";
import BackComponent from './BackComponent'

const SupplierForm = ({
  attributeToRulesMapping,
  selectedAttr,
  partnerName,
  handleBackComponent,
  isFormValidationError,
  isFormSubmissionError,
  onSave,
  values,
  errors,
  node,
  cancel,
  isCancelModelOpen,
}) => {
  let currentHeaderName = selectedAttr.name;
  const currentFieldAction = node.fields.find(field => field.key === selectedAttr.key).action;
  let isEditMode = currentFieldAction === 'enabled' && Object.keys(values).length > 0;
  const [isFormLocked, setFormLock] = useState(isEditMode);

  return (
    <SupplierStepThree>
      <BackComponent handleBackComponent={handleBackComponent} selectedAttr={selectedAttr} />
      <PrimaryWrapper>

        <SecondaryWrapper>
          {(isFormSubmissionError || isFormValidationError) &&
            <NotificationStyle>
              <Notification title="We were unable to submit the form" variant="error">
                {isFormSubmissionError && 'Looks like something went wrong. Please try submitting again'}
                {isFormValidationError && 'Please complete the highlighted fields to continue'}
              </Notification>
            </NotificationStyle>
          }
          <FormHeadingWrapper>
            <FormHeading><h1>{`${partnerName} ${currentHeaderName}`}</h1></FormHeading>
            {isFormLocked &&
              <Button variant='secondary'
                onClick={() => setFormLock(false)}
                disabled={isEditMode && !node.attributeRules[node.type][selectedAttr.key].update}
              >
                Edit details
                </Button>
            }
          </FormHeadingWrapper>
          <SupplierDetailForm
            attributeToRulesMapping={attributeToRulesMapping}
            id={selectedAttr.key}
            genericFormData={selectedAttr.attributes}
            key={`selectedAttr-${selectedAttr.id}`}
            onSave={() => { onSave(selectedAttr.key, node) }}
            values={values}
            errors={errors}
            cancel={cancel}
            isCancelModelOpen={isCancelModelOpen}
            isFormLocked={isFormLocked}
            isOnEditMode={isEditMode}
          />
        </SecondaryWrapper>
      </PrimaryWrapper>
    </SupplierStepThree>
  );
}

export default SupplierForm;
