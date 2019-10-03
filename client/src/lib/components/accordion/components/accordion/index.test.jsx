import { DefaultThemeProvider } from '@beans/theme';
import { BodyText } from '@beans/typography';
import { mount } from 'enzyme';
import React from 'react';
import * as consts from './constants';
import Accordion from '.';

const ACCORDION_ID = 'accordion-1';

function Test(props = {}) {
  return (
    <DefaultThemeProvider globalStyles={{ suppressMultiMountWarning: true }}>
      <Accordion id={ACCORDION_ID} label="Lorem ipsum dolor sit amet, consectetur adipiscing elit" {...props}>
        <BodyText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </BodyText>
      </Accordion>
    </DefaultThemeProvider>
  );
}

function getWrapper(props = {}, mounted) {
  const _mounted = mounted || mount(<Test {...props} />);
  return _mounted.find(Accordion).children();
}

async function setProps(wrapper, props) {
  return new Promise(resolve => wrapper.setProps(props, () => resolve()));
}

function toggleAccordion(mounted, action, payload) {
  const wrapper = mounted.find('.beans-accordion__heading').filter('div');
  wrapper.simulate(action, payload);
}

describe('Accordion component', () => {
  let instance, spy, wrapper;

  describe('when the accordion is open on initial render', () => {
    beforeAll(() => {
      const mounted = mount(<Test open />);
      wrapper = getWrapper(undefined, mounted);
      instance = wrapper.instance();
    });

    it('then the accordion animation state should be open', () => {
      expect(instance.state.animation).toBe(consts.OPEN);
    });
  });

  describe('when the accordion is closed on initial render', () => {
    beforeAll(() => {
      const mounted = mount(<Test />);
      wrapper = getWrapper(undefined, mounted);
      instance = wrapper.instance();
    });

    it('then the accordion animation state should be closed', () => {
      expect(instance.state.animation).toBe(consts.CLOSED);
    });
  });

  describe('when the accordion is opened programmatically', () => {
    beforeAll(async () => {
      const mounted = mount(<Test />);
      wrapper = getWrapper(undefined, mounted);
      await setProps(mounted, { open: true });
      instance = wrapper.instance();
    });

    it('then the accordion animation state should be opening', () => {
      expect(instance.state.animation).toBe(consts.OPENING);
    });
  });

  describe('when the accordion is closed programmatically', () => {
    beforeAll(async () => {
      const mounted = mount(<Test open />);
      wrapper = getWrapper(undefined, mounted);
      await setProps(mounted, { open: false });
      instance = wrapper.instance();
    });

    it('then the accordion animation state should be closing', () => {
      expect(instance.state.animation).toBe(consts.CLOSING);
    });
  });

  describe('when the accordion is opened programmatically while it is open', () => {
    beforeAll(async () => {
      const mounted = mount(<Test open />);
      wrapper = getWrapper(undefined, mounted);
      await setProps(mounted, { open: true });
      instance = wrapper.instance();
    });

    it('then the accordion animation state should remain open', () => {
      expect(instance.state.animation).toBe(consts.OPEN);
    });
  });

  describe('when the user clicks on the heading', () => {
    beforeAll(async () => {
      const mounted = mount(<Test />);
      toggleAccordion(mounted, 'click');
    });

    it('then the _handleHeadingOnClick method should have been executed', () => {
      // Not possible to mock arrow functions on class instances, but
      // this test gives coverage for _handleHeadingOnClick when no
      // onChange prop is passed in.
    });
  });

  describe('when a user presses the enter key while focused on the heading', () => {
    beforeAll(async () => {
      const mounted = mount(<Test />);
      wrapper = getWrapper(undefined, mounted);
      instance = wrapper.instance();
      spy = jest.spyOn(instance, '_toggleAccordion');
      toggleAccordion(mounted, 'keyDown', { which: consts.ENTER });
    });

    it('then the _toggleAccordion method should have been executed', () => {
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('when a user presses the space key while focused on the heading', () => {
    beforeAll(async () => {
      const mounted = mount(<Test />);
      wrapper = getWrapper(undefined, mounted);
      instance = wrapper.instance();
      spy = jest.spyOn(instance, '_toggleAccordion');
      toggleAccordion(mounted, 'keyDown', { which: consts.SPACE });
    });

    it('then the _toggleAccordion method should have been executed', () => {
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('when a user presses any other key while focused on the heading', () => {
    beforeAll(async () => {
      const mounted = mount(<Test />);
      wrapper = getWrapper(undefined, mounted);
      instance = wrapper.instance();
      spy = jest.spyOn(instance, '_toggleAccordion');
      toggleAccordion(mounted, 'keyDown', { which: 12 });
    });

    it('then the _toggleAccordion method should not have been executed', () => {
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('when the accordion is opening and the animation ends', () => {
    beforeAll(async () => {
      const mounted = mount(<Test />);
      wrapper = getWrapper(undefined, mounted);
      await setProps(mounted, { open: true });
      instance = wrapper.instance();
      instance._handleContainerOnAnimationEnd();
    });

    it('then the accordion animation state should be open', () => {
      expect(instance.state.animation).toBe(consts.OPEN);
    });
  });

  describe('when the accordion is closing and the animation ends', () => {
    beforeAll(async () => {
      const mounted = mount(<Test open />);
      wrapper = getWrapper(undefined, mounted);
      await setProps(mounted, { open: false });
      instance = wrapper.instance();
      instance._handleContainerOnAnimationEnd();
    });

    it('then the accordion animation state should be closed', () => {
      expect(instance.state.animation).toBe(consts.CLOSED);
    });
  });

  describe('when onChange is passed in as a prop', () => {
    const onChange = jest.fn();

    describe('when a user clicks on the heading when the accordion is closed', () => {
      beforeAll(() => {
        const mounted = mount(<Test onChange={onChange} />);
        wrapper = getWrapper(undefined, mounted);
        instance = wrapper.instance();
        toggleAccordion(mounted, 'click');
      });

      it('then the onChange handler should get executed with the correct arguments', () => {
        expect(onChange).toHaveBeenCalledWith({ action: consts.OPEN, id: ACCORDION_ID });
      });
    });

    describe('when a user clicks on the heading when the accordion is open', () => {
      beforeAll(() => {
        const mounted = mount(<Test onChange={onChange} open />);
        wrapper = getWrapper(undefined, mounted);
        instance = wrapper.instance();
        toggleAccordion(mounted, 'click');
      });

      it('then the onChange handler should get executed with the correct arguments', () => {
        expect(onChange).toHaveBeenCalledWith({ action: consts.CLOSE, id: ACCORDION_ID });
      });
    });

    describe('when a user presses the enter key while focused on the heading when the accordion is open', () => {
      beforeAll(async () => {
        const mounted = mount(<Test onChange={onChange} />);
        wrapper = getWrapper(undefined, mounted);
        instance = wrapper.instance();
        toggleAccordion(mounted, 'keyDown', { which: consts.ENTER });
      });

      it('then the onChange handler should get executed with the correct arguments', () => {
        expect(onChange).toHaveBeenCalledWith({ action: consts.CLOSE, id: ACCORDION_ID });
      });
    });

    describe('when a user presses the space key while focused on the heading when the accordion is open', () => {
      beforeAll(async () => {
        const mounted = mount(<Test onChange={onChange} open />);
        wrapper = getWrapper(undefined, mounted);
        instance = wrapper.instance();
        toggleAccordion(mounted, 'keyDown', { which: consts.SPACE });
      });

      it('then the onChange handler should get executed with the correct arguments', () => {
        expect(onChange).toHaveBeenCalledWith({ action: consts.OPEN, id: ACCORDION_ID });
      });
    });
  });

  describe('when onKeyDown is passed in as a prop', () => {
    const onKeyDown = jest.fn();

    describe('when a user presses a key while focused on the heading', () => {
      beforeAll(async () => {
        const mounted = mount(<Test onKeyDown={onKeyDown} />);
        wrapper = getWrapper(undefined, mounted);
        instance = wrapper.instance();
        toggleAccordion(mounted, 'keyDown', { which: 5 });
      });

      it('then the onKeyDown handler should get executed', () => {
        expect(onKeyDown).toHaveBeenCalled();
      });
    });
  });

  describe('when domRef is passed in as a prop', () => {
    const domRef = jest.fn();

    beforeAll(async () => {
      mount(<Test domRef={domRef} />);
    });

    it('then the domRef callback should get executed', () => {
      expect(domRef).toHaveBeenCalled();
    });
  });
});
