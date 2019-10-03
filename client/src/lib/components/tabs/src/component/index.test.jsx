import { DefaultThemeProvider } from '@beans/theme';
import { mount } from 'enzyme';
import React from 'react';
import Tabs from '.';

const HOME = 36;
const END = 35;
const DOWN_ARROW = 40;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

const TAB_1 = 'tab1';
const TAB_2 = 'tab2';
const TAB_3 = 'tab3';

const SECTION_1 = 'section1';
const SECTION_2 = 'section2';
const SECTION_3 = 'section3';

function Test({ disabled, ...otherProps } = {}) {
  return (
    <DefaultThemeProvider globalStyles={{ suppressMultiMountWarning: true }}>
      <Tabs
        tabs={[
          {
            disabled: TAB_1 === disabled,
            id: TAB_1,
            label: 'Section 1',
            panelContent: 'This is section 1...',
            panelID: SECTION_1,
          },
          {
            disabled: TAB_2 === disabled,
            id: TAB_2,
            label: 'Section 2',
            panelContent: 'This is section 2...',
            panelID: SECTION_2,
          },
          {
            disabled: TAB_3 === disabled,
            id: TAB_3,
            label: 'Section 3',
            panelContent: 'This is section 3...',
            panelID: SECTION_3,
          },
        ]}
        {...otherProps}
      />
    </DefaultThemeProvider>
  );
}

function getWrapper(props = {}, mounted) {
  const _mounted = mounted || mount(<Test {...props} />);
  return _mounted.find(Tabs);
}

function keyDownActiveTab({ keyCode, wrapper }) {
  const tabLink = wrapper.find({ 'aria-selected': true }).filter('a');
  const event = { which: keyCode };
  tabLink.simulate('keyDown', event);
}

describe('Tabs component', () => {
  let instance, wrapper;

  describe('when the tabs are changed programmatically', () => {
    beforeAll(() => {
      const mounted = mount(<Test activeTabID={TAB_1} />);
      wrapper = getWrapper(undefined, mounted);
      mounted.setProps({ activeTabID: TAB_2 });
      instance = wrapper.instance();
    });

    it('then the active tab shoud change to the user selection', () => {
      expect(instance.props.activeTabID).toBe(TAB_2);
    });
  });

  describe('when the tabs are changed programmatically to the already active tab', () => {
    beforeAll(() => {
      const mounted = mount(<Test activeTabID={TAB_2} />);
      wrapper = getWrapper(undefined, mounted);
      mounted.setProps({ activeTabID: TAB_2 });
      instance = wrapper.instance();
    });

    it('then the active tab should remain the same', () => {
      expect(instance.props.activeTabID).toBe(TAB_2);
    });
  });

  describe('when a user changes tab by clicking an inactive tab', () => {
    describe('when no additional props are passed in', () => {
      let spy;

      beforeAll(() => {
        wrapper = getWrapper({ activeTabID: TAB_1 });
        instance = wrapper.instance();
        spy = jest.spyOn(instance, '_changeTab');
        const tabLink = wrapper.find({ id: TAB_2 }).filter('a');
        const event = { currentTarget: { id: TAB_2 } };
        tabLink.simulate('click', event);
      });

      it('then the onChange method should get executed with the correct argument', () => {
        expect(spy).toHaveBeenCalledWith({
          disabled: false,
          id: TAB_2,
          label: 'Section 2',
          panelContent: 'This is section 2...',
          panelID: SECTION_2,
        });
      });
    });

    describe('when onChange is passed in as a prop', () => {
      const onChange = jest.fn();

      beforeAll(() => {
        wrapper = getWrapper({ activeTabID: TAB_1, onChange });
        instance = wrapper.instance();
        const tabLink = wrapper.find({ id: TAB_2 }).filter('a');
        const event = { currentTarget: { id: TAB_2 } };
        tabLink.simulate('click', event);
      });

      it('then the onChange handler should get executed with the correct arguments', () => {
        expect(onChange).toHaveBeenCalledWith({
          nextTab: {
            disabled: false,
            id: TAB_2,
            label: 'Section 2',
            panelContent: 'This is section 2...',
            panelID: SECTION_2,
          },
          prevTab: {
            disabled: false,
            id: TAB_1,
            label: 'Section 1',
            panelContent: 'This is section 1...',
            panelID: SECTION_1,
          },
        });
      });
    });
  });

  describe('when a user changes tab using the keyboard', () => {
    let focusOnPanelSpy;
    let changeTabSpy;

    describe('when a user presses an invalid key', () => {
      beforeAll(() => {
        wrapper = getWrapper({ activeTabID: TAB_1 });
        instance = wrapper.instance();
        focusOnPanelSpy = jest.spyOn(instance, '_focusOnPanel');
        changeTabSpy = jest.spyOn(instance, '_changeTab');
        keyDownActiveTab({ keyCode: 23, wrapper });
      });

      it('then neither the onChange nor focusOnPanel methods should get executed', () => {
        expect(focusOnPanelSpy).not.toHaveBeenCalled();
        expect(changeTabSpy).not.toHaveBeenCalled();
      });
    });

    describe('when a user presses the home key', () => {
      describe('when the first tab is not disabled', () => {
        beforeAll(() => {
          wrapper = getWrapper({ activeTabID: TAB_3 });
          instance = wrapper.instance();
          changeTabSpy = jest.spyOn(instance, '_changeTab');
          keyDownActiveTab({ keyCode: RIGHT_ARROW, wrapper });
          keyDownActiveTab({ keyCode: HOME, wrapper });
        });

        it('then the onChange method should get executed with the correct argument', () => {
          expect(changeTabSpy).toHaveBeenCalledWith({
            disabled: false,
            id: TAB_1,
            label: 'Section 1',
            panelContent: 'This is section 1...',
            panelID: SECTION_1,
          });
        });
      });

      describe('when the first tab is disabled', () => {
        beforeAll(() => {
          wrapper = getWrapper({ activeTabID: TAB_3, disabled: TAB_1 });
          instance = wrapper.instance();
          changeTabSpy = jest.spyOn(instance, '_changeTab');
          keyDownActiveTab({ keyCode: HOME, wrapper });
        });

        it('then the onChange method should get executed with the correct argument', () => {
          expect(changeTabSpy).toHaveBeenCalledWith({
            disabled: false,
            id: TAB_2,
            label: 'Section 2',
            panelContent: 'This is section 2...',
            panelID: SECTION_2,
          });
        });
      });
    });

    describe('when a user presses the end key', () => {
      describe('when the last tab is not disabled', () => {
        beforeAll(() => {
          wrapper = getWrapper({ activeTabID: TAB_1 });
          instance = wrapper.instance();
          changeTabSpy = jest.spyOn(instance, '_changeTab');
          keyDownActiveTab({ keyCode: END, wrapper });
        });

        it('then the onChange method should get executed with the correct argument', () => {
          expect(changeTabSpy).toHaveBeenCalledWith({
            disabled: false,
            id: TAB_3,
            label: 'Section 3',
            panelContent: 'This is section 3...',
            panelID: SECTION_3,
          });
        });
      });

      describe('when the last tab is disabled', () => {
        beforeAll(() => {
          wrapper = getWrapper({ activeTabID: TAB_1, disabled: TAB_3 });
          instance = wrapper.instance();
          changeTabSpy = jest.spyOn(instance, '_changeTab');
          keyDownActiveTab({ keyCode: END, wrapper });
        });

        it('then the onChange method should get executed with the correct argument', () => {
          expect(changeTabSpy).toHaveBeenCalledWith({
            disabled: false,
            id: TAB_2,
            label: 'Section 2',
            panelContent: 'This is section 2...',
            panelID: SECTION_2,
          });
        });
      });
    });

    describe('when a user presses the left arrow key', () => {
      describe('when there is no tab to change to', () => {
        beforeAll(() => {
          wrapper = getWrapper({ activeTabID: TAB_1 });
          instance = wrapper.instance();
          changeTabSpy = jest.spyOn(instance, '_changeTab');
          keyDownActiveTab({ keyCode: LEFT_ARROW, wrapper });
        });

        it('then the onChange method should not get executed', () => {
          expect(changeTabSpy).not.toHaveBeenCalled();
        });
      });
    });

    describe('when a user presses the right arrow key', () => {
      describe('when there is a tab to change to', () => {
        beforeAll(() => {
          wrapper = getWrapper({ activeTabID: TAB_1 });
          instance = wrapper.instance();
          changeTabSpy = jest.spyOn(instance, '_changeTab');
          keyDownActiveTab({ keyCode: RIGHT_ARROW, wrapper });
        });

        it('then the onChange method should get executed with the correct argument', () => {
          expect(changeTabSpy).toHaveBeenCalledWith({
            disabled: false,
            id: TAB_2,
            label: 'Section 2',
            panelContent: 'This is section 2...',
            panelID: SECTION_2,
          });
        });
      });

      describe('when the next tab to the right is disabled', () => {
        beforeAll(() => {
          wrapper = getWrapper({ activeTabID: TAB_2, disabled: TAB_3 });
          instance = wrapper.instance();
          changeTabSpy = jest.spyOn(instance, '_changeTab');
          keyDownActiveTab({ keyCode: RIGHT_ARROW, wrapper });
        });

        it('then the onChange method should not get executed', () => {
          expect(changeTabSpy).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('when a user focuses on the active tab panel using the keyboard', () => {
    const currentFocus = jest.fn();
    let focusOnPanelSpy;

    beforeAll(() => {
      wrapper = getWrapper({ activeTabID: TAB_1 });
      instance = wrapper.instance();
      focusOnPanelSpy = jest.spyOn(instance, '_focusOnPanel');
      instance._panelRefs[SECTION_1] = { current: { focus: currentFocus } };
      keyDownActiveTab({ keyCode: DOWN_ARROW, wrapper });
    });

    it('then the focusOnPanel method should get executed', () => {
      expect(focusOnPanelSpy).toHaveBeenCalled();
    });
  });
});
