import Link from '@beans/link';
import { COMPONENT_CONTAINER, StoryContainer } from '@beans/storybook-addon-theme';
import { BodyText, SectionTitle } from '@beans/typography';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Tabs from '.';

/* eslint-disable react/prop-types */

class TabsContainer extends React.Component {
  static displayName = COMPONENT_CONTAINER;

  constructor(props) {
    super(props);
    this.state = { activeTabID: props.activeTabID };
    this._onChange = this._onChange.bind(this);
  }

  render() {
    const { children } = this.props;
    const { activeTabID } = this.state;

    return React.cloneElement(children, {
      activeTabID,
      onChange: this._onChange,
    });
  }

  _onChange({ nextTab }) {
    this.setState({ activeTabID: nextTab.id });
  }
}

/* eslint-enable react/prop-types */

const stories = storiesOf('Molecules/Tabs', module);

stories.add('Default', () => (
  <StoryContainer marginEnds>
    <TabsContainer activeTabID="tab1-1">
      <Tabs
        tabs={[
          {
            id: 'tab1-1',
            label: 'Section 1 really, really, really long label',
            panelContent: (
              <div>
                <SectionTitle margin>Section 1</SectionTitle>
                <BodyText margin>
                  This is section 1 body text with a <Link href="https://www.tesco.com/">link</Link> ...
                </BodyText>
              </div>
            ),
            panelID: 'section1-1',
          },
          {
            id: 'tab2-1',
            label: 'Section 2 long label',
            panelContent: (
              <div>
                <SectionTitle margin>Section 2</SectionTitle>
                <BodyText margin>
                  This is section 2 body text with a <Link href="https://www.tesco.com/">link</Link> ...
                </BodyText>
              </div>
            ),
            panelID: 'section2-1',
          },
          {
            id: 'tab3-1',
            label: 'Section 3 long label',
            panelContent: (
              <div>
                <SectionTitle margin>Section 3</SectionTitle>
                <BodyText margin>
                  This is section 3 body text with a <Link href="https://www.tesco.com/">link</Link> ...
                </BodyText>
              </div>
            ),
            panelID: 'section3-1',
          },
        ]}
      />
    </TabsContainer>
  </StoryContainer>
));

stories.add('Disabled tab', () => (
  <StoryContainer marginEnds>
    <TabsContainer activeTabID="tab1-4">
      <Tabs
        tabs={[
          {
            id: 'tab1-4',
            label: 'Section 1',
            panelContent: (
              <div>
                <SectionTitle margin>Section 1</SectionTitle>
                <BodyText margin>
                  This is section 1 body text with a <Link href="https://www.tesco.com/">link</Link> ...
                </BodyText>
              </div>
            ),
            panelID: 'section1-4',
          },
          {
            disabled: true,
            id: 'tab2-4',
            label: 'Section 2',
            panelContent: (
              <div>
                <SectionTitle margin>Section 2</SectionTitle>
                <BodyText margin>
                  This is section 2 body text with a <Link href="https://www.tesco.com/">link</Link> ...
                </BodyText>
              </div>
            ),
            panelID: 'section2-4',
          },
          {
            id: 'tab3-4',
            label: 'Section 3',
            panelContent: (
              <div>
                <SectionTitle margin>Section 3</SectionTitle>
                <BodyText margin>
                  This is section 3 body text with a <Link href="https://www.tesco.com/">link</Link> ...
                </BodyText>
              </div>
            ),
            panelID: 'section3-4',
          },
        ]}
      />
    </TabsContainer>
  </StoryContainer>
));

stories.add('Scrollable tabs', () => (
  <StoryContainer marginEnds>
    <TabsContainer activeTabID="tab4-5">
      <Tabs
        tabs={[
          {
            id: 'tab1-5',
            label: 'Section 1',
            panelContent: (
              <div>
                <SectionTitle margin>Section 1</SectionTitle>
                <BodyText margin>
                  This is section 1 body text with a <Link href="https://www.tesco.com/">link</Link> ...
                </BodyText>
              </div>
            ),
            panelID: 'section1-5',
          },
          {
            id: 'tab2-5',
            label: 'Section 2',
            panelContent: (
              <div>
                <SectionTitle margin>Section 2</SectionTitle>
                <BodyText margin>
                  This is section 2 body text with a <Link href="https://www.tesco.com/">link</Link> ...
                </BodyText>
              </div>
            ),
            panelID: 'section2-5',
          },
          {
            id: 'tab3-5',
            label: 'Section 3',
            panelContent: (
              <div>
                <SectionTitle margin>Section 3</SectionTitle>
                <BodyText margin>
                  This is section 3 body text with a <Link href="https://www.tesco.com/">link</Link> ...
                </BodyText>
              </div>
            ),
            panelID: 'section3-5',
          },
          {
            id: 'tab4-5',
            label: 'Section 4',
            panelContent: (
              <div>
                <SectionTitle margin>Section 4</SectionTitle>
                <BodyText margin>
                  This is section 4 body text with a <Link href="https://www.tesco.com/">link</Link> ...
                </BodyText>
              </div>
            ),
            panelID: 'section4-5',
          },
          {
            id: 'tab5-5',
            label: 'Section 5',
            panelContent: (
              <div>
                <SectionTitle margin>Section 5</SectionTitle>
                <BodyText margin>
                  This is section 5 body text with a <Link href="https://www.tesco.com/">link</Link> ...
                </BodyText>
              </div>
            ),
            panelID: 'section5-5',
          },
          {
            id: 'tab6-5',
            label: 'Section 6',
            panelContent: (
              <div>
                <SectionTitle margin>Section 6</SectionTitle>
                <BodyText margin>
                  This is section 6 body text with a <Link href="https://www.tesco.com/">link</Link> ...
                </BodyText>
              </div>
            ),
            panelID: 'section6-5',
          },
        ]}
      />
    </TabsContainer>
  </StoryContainer>
));
