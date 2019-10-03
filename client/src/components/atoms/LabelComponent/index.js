import React, { Component } from 'react';
import Label from '@beans/label';
import Button from '@beans/button';
import Tooltip from '@beans/tooltip';
import { BodyText } from '@beans/typography';
import {
    LabelTypeComponent,
    TootTipArea
} from '../../../common/styles'
import i18Data from "../../../languagepack/index";
import FormGroup from '@beans/form-group'


class TooltipContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { open: props.open };
        this._onChange = this._onChange.bind(this);
    }

    render() {
        const { children } = this.props;
        const { open } = this.state;

        return React.cloneElement(children, {
            onChange: this._onChange,
            open,
        });
    }

    _onChange({ action }) {
        this.setState({ open: action === 'open' });
    }
}


class LabelComponent extends Component {
    constructor(props) {
        super(props)
        this.refTooltip = React.createRef();
    }

    render() {
        const {
            tooltip,
            name,
            id,
            required
        } = this.props;

        return (
            <div>
                <LabelTypeComponent>
                    <Label id={id.toString()} dark={true} emphasized={true} onClick={(e) => { e.preventDefault() }}>
                        <span>{name}</span>
                        {!required ? <FormGroup required={required} ></FormGroup> : null}
                    </Label>


                    {tooltip ? <TootTipArea>
                        <Button
                            domRef={this.refTooltip}
                            aria-label="info"
                            variant="link"
                            id={id.toString()}
                        > <span>{i18Data.whatsThis}</span>
                        </Button>
                        <TooltipContainer open={false}>
                            <Tooltip
                                triggerRefs={this.refTooltip}
                                id={id.toString()}
                                position="right"
                                width={270}
                                persist={false}
                                supressTargetFocusOnClose={true}
                            >
                                <BodyText>{tooltip}</BodyText>
                            </Tooltip>
                        </TooltipContainer>
                    </TootTipArea> : null}
                </LabelTypeComponent>
            </div>
        )
    }
}

export default LabelComponent;
