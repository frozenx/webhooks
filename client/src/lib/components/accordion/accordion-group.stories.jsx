import { StoryContainer } from '@beans/storybook-addon-theme';
import { BodyText } from '@beans/typography';
import { storiesOf } from '@storybook/react';
import React from 'react';
import * as consts from './components/accordion-group/constants';
import { Accordion, AccordionGroup } from '.';

/* eslint-disable react/prop-types */

class AccordionGroupContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { openAccordion: props.accordion };
    this._onChange = this._onChange.bind(this);
  }

  render() {
    const { children } = this.props;
    const { openAccordion } = this.state;

    return React.cloneElement(children, {
      accordion: openAccordion,
      children: React.Children.map(children.props.children, child =>
        React.cloneElement(child, {
          icon: this._getIcon(child.props),
        })),
      onChange: this._onChange,
    });
  }

  _getIcon(childProps) {
    const { closeIcon, independent, openIcon } = this.props;
    const { accordions, openAccordion } = this.state;
    if (!openAccordion) return openIcon;

    if (openAccordion.id === consts.ALL) {
      if (openAccordion.action === consts.CLOSE) return openIcon;
      if (openAccordion.action === consts.OPEN) return closeIcon;
    }

    if (childProps.id === openAccordion.id) {
      return openAccordion.action === consts.OPEN ? closeIcon : openIcon;
    }

    if (!independent) return openIcon;
    return accordions[childProps.id].open ? closeIcon : openIcon;
  }

  _onChange({ action, id, accordions }) {
    this.setState({ accordions, openAccordion: { action, id } });
  }
}

/* eslint-enable */

const fixedStories = storiesOf('Molecules/Accordions/Accordion group/Fixed', module);

const content = {
  bodyTextShort: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
    olore magna aliqua.`,
  bodyTextMedium: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
    ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
    nulla pariatur.`,
  bodyTextLong: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
    ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
    nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
    anim id est laborum.`,
  label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
};

fixedStories.add('Default', () => (
  <StoryContainer marginEnds>
    <AccordionGroupContainer>
      <AccordionGroup>
        <Accordion id="accordion-1" label={content.label}>
          <BodyText>{content.bodyTextShort}</BodyText>
        </Accordion>
        <Accordion id="accordion-2" label={content.label}>
          <BodyText>{content.bodyTextMedium}</BodyText>
        </Accordion>
        <Accordion id="accordion-3" label={content.label}>
          <BodyText>{content.bodyTextLong}</BodyText>
        </Accordion>
      </AccordionGroup>
    </AccordionGroupContainer>
  </StoryContainer>
));

fixedStories.add('Open', () => (
  <StoryContainer marginEnds>
    <AccordionGroupContainer accordion={{ action: consts.OPEN, id: 'accordion-1' }}>
      <AccordionGroup>
        <Accordion id="accordion-1" label={content.label}>
          <BodyText>{content.bodyTextShort}</BodyText>
        </Accordion>
        <Accordion id="accordion-2" label={content.label}>
          <BodyText>{content.bodyTextMedium}</BodyText>
        </Accordion>
        <Accordion id="accordion-3" label={content.label}>
          <BodyText>{content.bodyTextLong}</BodyText>
        </Accordion>
      </AccordionGroup>
    </AccordionGroupContainer>
  </StoryContainer>
));

fixedStories.add('Custom icons', () => (
  <StoryContainer marginEnds>
    <AccordionGroupContainer closeIcon="remove" openIcon="add">
      <AccordionGroup>
        <Accordion id="accordion-1" label={content.label}>
          <BodyText>{content.bodyTextShort}</BodyText>
        </Accordion>
        <Accordion id="accordion-2" label={content.label}>
          <BodyText>{content.bodyTextMedium}</BodyText>
        </Accordion>
        <Accordion id="accordion-3" label={content.label}>
          <BodyText>{content.bodyTextLong}</BodyText>
        </Accordion>
      </AccordionGroup>
    </AccordionGroupContainer>
  </StoryContainer>
));

const independentStories = storiesOf('Molecules/Accordions/Accordion group/Independent', module);

independentStories.add('Default', () => (
  <StoryContainer marginEnds>
    <AccordionGroupContainer>
      <AccordionGroup independent>
        <Accordion id="accordion-1" label={content.label}>
          <BodyText>{content.bodyTextShort}</BodyText>
        </Accordion>
        <Accordion id="accordion-2" label={content.label}>
          <BodyText>{content.bodyTextMedium}</BodyText>
        </Accordion>
        <Accordion id="accordion-3" label={content.label}>
          <BodyText>{content.bodyTextLong}</BodyText>
        </Accordion>
      </AccordionGroup>
    </AccordionGroupContainer>
  </StoryContainer>
));

independentStories.add('Open', () => (
  <StoryContainer marginEnds>
    <AccordionGroupContainer accordion={{ action: consts.OPEN, id: consts.ALL }}>
      <AccordionGroup independent>
        <Accordion id="accordion-1" label={content.label}>
          <BodyText>{content.bodyTextShort}</BodyText>
        </Accordion>
        <Accordion id="accordion-2" label={content.label}>
          <BodyText>{content.bodyTextMedium}</BodyText>
        </Accordion>
        <Accordion id="accordion-3" label={content.label}>
          <BodyText>{content.bodyTextLong}</BodyText>
        </Accordion>
      </AccordionGroup>
    </AccordionGroupContainer>
  </StoryContainer>
));
