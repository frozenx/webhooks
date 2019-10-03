import { StoryContainer } from '@beans/storybook-addon-theme';
import { BodyText } from '@beans/typography';
import { storiesOf } from '@storybook/react';
import React from 'react';
import * as consts from './components/accordion-group/constants';
import { Accordion } from '.';

/* eslint-disable react/prop-types */

class AccordionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: props.open };
    this._onChange = this._onChange.bind(this);
  }

  render() {
    const { children, closeIcon, openIcon } = this.props;
    const { open } = this.state;

    return React.cloneElement(children, {
      icon: open ? closeIcon : openIcon,
      onChange: this._onChange,
      open,
    });
  }

  _onChange({ action }) {
    this.setState({ open: action === consts.OPEN });
  }
}

/* eslint-enable */

const stories = storiesOf('Molecules/Accordions/Accordion', module);

const content = {
  bodyText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
    est laborum.`,
  label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
};

stories.add('Primary', () => (
  <StoryContainer marginEnds>
    <AccordionContainer>
      <Accordion id="accordion-1" label={content.label}>
        <BodyText>{content.bodyText}</BodyText>
      </Accordion>
    </AccordionContainer>
  </StoryContainer>
));

stories.add('Secondary', () => (
  <StoryContainer marginEnds>
    <AccordionContainer>
      <Accordion id="accordion-1" label={content.label} variant="secondary">
        <BodyText>{content.bodyText}</BodyText>
      </Accordion>
    </AccordionContainer>
  </StoryContainer>
));

stories.add('Open', () => (
  <StoryContainer marginEnds>
    <AccordionContainer open>
      <Accordion id="accordion-2" label={content.label}>
        <BodyText>{content.bodyText}</BodyText>
      </Accordion>
    </AccordionContainer>
  </StoryContainer>
));

stories.add('Flush', () => (
  <StoryContainer marginEnds>
    <AccordionContainer>
      <Accordion flush id="accordion-3" label={content.label} open>
        <BodyText>{content.bodyText}</BodyText>
      </Accordion>
    </AccordionContainer>
  </StoryContainer>
));

stories.add('Full width', () => (
  <StoryContainer marginEnds>
    <AccordionContainer>
      <Accordion fullWidth id="accordion-4" label={content.label}>
        <BodyText>{content.bodyText}</BodyText>
      </Accordion>
    </AccordionContainer>
  </StoryContainer>
));

stories.add('Flush full width', () => (
  <StoryContainer marginEnds>
    <AccordionContainer>
      <Accordion flush fullWidth id="accordion-5" label={content.label}>
        <BodyText>{content.bodyText}</BodyText>
      </Accordion>
    </AccordionContainer>
  </StoryContainer>
));

stories.add('No content padding', () => (
  <StoryContainer marginEnds>
    <AccordionContainer>
      <Accordion contentPadding={false} id="accordion-6" label={content.label}>
        <BodyText style={{ backgroundColor: '#f6f6f6', padding: '12px' }}>{content.bodyText} </BodyText>
      </Accordion>
    </AccordionContainer>
  </StoryContainer>
));

stories.add('De-emphasized', () => (
  <StoryContainer marginEnds>
    <AccordionContainer>
      <Accordion emphasized={false} id="accordion-7" label={content.label}>
        <BodyText>{content.bodyText}</BodyText>
      </Accordion>
    </AccordionContainer>
  </StoryContainer>
));

stories.add('Custom icon', () => (
  <StoryContainer marginEnds>
    <AccordionContainer closeIcon="remove" openIcon="add">
      <Accordion id="accordion-8" label={content.label}>
        <BodyText>{content.bodyText}</BodyText>
      </Accordion>
    </AccordionContainer>
  </StoryContainer>
));
