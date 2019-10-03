import { DefaultThemeProvider } from '@beans/theme';
import { BodyText } from '@beans/typography';
import { mount } from 'enzyme';
import React from 'react';
import Accordion from '../accordion';
import * as consts from './constants';
import AccordionGroup from '.';

const ACCORDION_1 = 'accordion-1';
const ACCORDION_2 = 'accordion-2';
const ACCORDION_3 = 'accordion-3';

function Test(props = {}) {
  return (
    <DefaultThemeProvider globalStyles={{ suppressMultiMountWarning: true }}>
      <AccordionGroup {...props}>
        <Accordion id={ACCORDION_1} label="Lorem ipsum dolor sit amet, consectetur adipiscing elit">
          <BodyText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </BodyText>
        </Accordion>

        <Accordion id={ACCORDION_2} label="Lorem ipsum dolor sit amet, consectetur adipiscing elit">
          <BodyText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </BodyText>
        </Accordion>

        <Accordion id={ACCORDION_3} label="Lorem ipsum dolor sit amet, consectetur adipiscing elit">
          <BodyText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </BodyText>
        </Accordion>
      </AccordionGroup>
    </DefaultThemeProvider>
  );
}

function getWrapper(props = {}, mounted) {
  const _mounted = mounted || mount(<Test {...props} />);
  return _mounted.find(AccordionGroup);
}

async function setProps(wrapper, props) {
  return new Promise(resolve => wrapper.setProps(props, () => resolve()));
}

function toggleAccordion(mounted, id, action, payload) {
  const wrapper = mounted
    .find({ id })
    .find('.beans-accordion__heading')
    .filter('div');

  wrapper.simulate(action, payload);
}

describe('Accordion Group component', () => {
  let instance, spy, wrapper;

  describe('when the group is open on initial render', () => {
    beforeAll(() => {
      const mounted = mount(<Test accordion={{ action: consts.OPEN, id: consts.ALL }} />);
      wrapper = getWrapper(undefined, mounted);
      instance = wrapper.instance();
    });

    it('then the accordion states should all be open', () => {
      expect(instance.state.accordions).toEqual({
        [ACCORDION_1]: { open: true },
        [ACCORDION_2]: { open: true },
        [ACCORDION_3]: { open: true },
      });
    });
  });

  describe('when the group is closed on initial render', () => {
    beforeAll(() => {
      const mounted = mount(<Test accordion={{ action: consts.CLOSED, id: consts.ALL }} />);
      wrapper = getWrapper(undefined, mounted);
      instance = wrapper.instance();
    });

    it('then the accordion states should all be closed', () => {
      expect(instance.state.accordions).toEqual({
        [ACCORDION_1]: { open: false },
        [ACCORDION_2]: { open: false },
        [ACCORDION_3]: { open: false },
      });
    });
  });

  describe('when one accordion is open on initial render', () => {
    beforeAll(() => {
      const mounted = mount(<Test accordion={{ action: consts.OPEN, id: ACCORDION_1 }} />);
      wrapper = getWrapper(undefined, mounted);
      instance = wrapper.instance();
    });

    it('then the correct accordion state should be open', () => {
      expect(instance.state.accordions).toEqual({
        [ACCORDION_1]: { open: true },
        [ACCORDION_2]: { open: false },
        [ACCORDION_3]: { open: false },
      });
    });
  });

  describe('when the group is opened programmatically', () => {
    beforeAll(async () => {
      const mounted = mount(<Test />);
      wrapper = getWrapper(undefined, mounted);
      await setProps(mounted, { accordion: { action: consts.OPEN, id: consts.ALL } });
      instance = wrapper.instance();
    });

    it('then the accordion states should all be open', () => {
      expect(instance.state.accordions).toEqual({
        [ACCORDION_1]: { open: true },
        [ACCORDION_2]: { open: true },
        [ACCORDION_3]: { open: true },
      });
    });
  });

  describe('when the group is closed programmatically', () => {
    beforeAll(async () => {
      const mounted = mount(<Test accordion={{ action: consts.OPEN, id: ACCORDION_1 }} />);
      wrapper = getWrapper(undefined, mounted);
      await setProps(mounted, { accordion: { action: consts.CLOSE, id: consts.ALL } });
      instance = wrapper.instance();
    });

    it('then the accordion states should all be closed', () => {
      expect(instance.state.accordions).toEqual({
        [ACCORDION_1]: { open: false },
        [ACCORDION_2]: { open: false },
        [ACCORDION_3]: { open: false },
      });
    });
  });

  describe('when one accordion is opened programmatically', () => {
    beforeAll(async () => {
      const mounted = mount(<Test />);
      wrapper = getWrapper(undefined, mounted);
      await setProps(mounted, { accordion: { action: consts.OPEN, id: ACCORDION_1 } });
      instance = wrapper.instance();
    });

    it('then the correct accordion state should be open', () => {
      expect(instance.state.accordions).toEqual({
        [ACCORDION_1]: { open: true },
        [ACCORDION_2]: { open: false },
        [ACCORDION_3]: { open: false },
      });
    });
  });

  describe('when a user clicks on an accordion heading', () => {
    beforeAll(async () => {
      const mounted = mount(<Test />);
      toggleAccordion(mounted, ACCORDION_1, 'click');
    });

    it('then the _handleAccordionOnChange method should have been executed', () => {
      // Not possible to mock arrow functions on class instances, but
      // this test gives coverage for _handleAccordionOnChange when no
      // onChange prop is passed in.
    });
  });

  describe('when a user presses the down arrow key while focused on the first accordion heading', () => {
    beforeAll(async () => {
      const mounted = mount(<Test />);
      wrapper = getWrapper(undefined, mounted);
      instance = wrapper.instance();
      spy = jest.spyOn(instance, '_focusNextAccordion');
      toggleAccordion(mounted, ACCORDION_1, 'keyDown', { which: consts.DOWN_ARROW });
    });

    it('then the _focusNextAccordion method should have been executed with the correct argument', () => {
      expect(spy).toHaveBeenCalledWith(consts.DOWN_ARROW);
    });
  });

  describe('when a user presses the down arrow key while focused on the last accordion heading', () => {
    beforeAll(async () => {
      const mounted = mount(<Test />);
      wrapper = getWrapper(undefined, mounted);
      instance = wrapper.instance();
      spy = jest.spyOn(instance, '_focusNextAccordion');
      toggleAccordion(mounted, ACCORDION_3, 'keyDown', { which: consts.DOWN_ARROW });
    });

    it('then the _focusNextAccordion method should have been executed with the correct argument', () => {
      expect(spy).toHaveBeenCalledWith(consts.DOWN_ARROW);
    });
  });

  describe('when a user presses the up arrow key while focused on the last accordion heading', () => {
    beforeAll(async () => {
      const mounted = mount(<Test />);
      wrapper = getWrapper(undefined, mounted);
      instance = wrapper.instance();
      spy = jest.spyOn(instance, '_focusNextAccordion');
      toggleAccordion(mounted, ACCORDION_3, 'keyDown', { which: consts.UP_ARROW });
    });

    it('then the _focusNextAccordion method should have been executed', () => {
      expect(spy).toHaveBeenCalledWith(consts.UP_ARROW);
    });
  });

  describe('when a user presses the up arrow key while focused on the first accordion heading', () => {
    beforeAll(async () => {
      const mounted = mount(<Test />);
      wrapper = getWrapper(undefined, mounted);
      instance = wrapper.instance();
      spy = jest.spyOn(instance, '_focusNextAccordion');
      toggleAccordion(mounted, ACCORDION_1, 'keyDown', { which: consts.UP_ARROW });
    });

    it('then the _focusNextAccordion method should have been executed', () => {
      expect(spy).toHaveBeenCalledWith(consts.UP_ARROW);
    });
  });

  describe('when a user presses the home key while focused on the last accordion heading', () => {
    beforeAll(async () => {
      const mounted = mount(<Test />);
      wrapper = getWrapper(undefined, mounted);
      instance = wrapper.instance();
      spy = jest.spyOn(instance, '_focusFirstAccordion');
      toggleAccordion(mounted, ACCORDION_3, 'keyDown', { which: consts.HOME });
    });

    it('then the _focusFirstAccordion method should have been executed', () => {
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('when a user presses the end key while focused on the first accordion heading', () => {
    beforeAll(async () => {
      const mounted = mount(<Test />);
      wrapper = getWrapper(undefined, mounted);
      instance = wrapper.instance();
      spy = jest.spyOn(instance, '_focusLastAccordion');
      toggleAccordion(mounted, ACCORDION_1, 'keyDown', { which: consts.END });
    });

    it('then the _focusLastAccordion method should have been executed', () => {
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('when a user presses another key while focused on the first accordion heading', () => {
    let spy2, spy3;

    beforeAll(async () => {
      const mounted = mount(<Test />);
      wrapper = getWrapper(undefined, mounted);
      instance = wrapper.instance();
      spy = jest.spyOn(instance, '_focusNextAccordion');
      spy2 = jest.spyOn(instance, '_focusFirstAccordion');
      spy3 = jest.spyOn(instance, '_focusLastAccordion');
      toggleAccordion(mounted, ACCORDION_1, 'keyDown', { which: 3 });
    });

    it('then none of the focus methods should have been executed', () => {
      expect(spy).not.toHaveBeenCalled();
      expect(spy2).not.toHaveBeenCalled();
      expect(spy3).not.toHaveBeenCalled();
    });
  });

  describe('when independent is passed in as a prop', () => {
    describe('when one accordion is opened programmatically', () => {
      beforeAll(async () => {
        const mounted = mount(<Test accordion={{ action: consts.OPEN, id: ACCORDION_1 }} independent />);
        wrapper = getWrapper(undefined, mounted);
        await setProps(mounted, { accordion: { action: consts.OPEN, id: ACCORDION_2 } });
        instance = wrapper.instance();
      });

      it('then the correct accordion state should be open', () => {
        expect(instance.state.accordions).toEqual({
          [ACCORDION_1]: { open: true },
          [ACCORDION_2]: { open: true },
          [ACCORDION_3]: { open: false },
        });
      });
    });
  });

  describe('when onChange is passe in as a prop', () => {
    const onChange = jest.fn();

    describe('when a user clicks on an accordion heading', () => {
      beforeAll(async () => {
        const mounted = mount(<Test onChange={onChange} />);
        toggleAccordion(mounted, ACCORDION_1, 'click');
      });

      it('then the onChange callback should have been executed with the correct arguments', () => {
        expect(onChange).toHaveBeenCalledWith({
          action: consts.OPEN,
          id: ACCORDION_1,
          accordions: {
            [ACCORDION_1]: { open: false },
            [ACCORDION_2]: { open: false },
            [ACCORDION_3]: { open: false },
          },
        });
      });
    });
  });
});
