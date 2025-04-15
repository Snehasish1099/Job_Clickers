'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, InputLabel, Popover, FormHelperText } from '@mui/material';
import { Help } from '@mui/icons-material';

function TextFieldInput(props: any) {

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const onChange = (event: any) => {
        const value = event.target.value
        const finalValue = value.replace(/^\s+/g, '')
        if (props.index > -1) {
            props.onChange(event.target.name, finalValue, props.index);
        }
        else if (props.onlyValue) {
            props.onChange(event);
        }
        else {
            props.onChange(event.target.name, finalValue);
        }
    };

    const onKeyPress = (ev: any) => {
        if (ev.key === 'Enter') {
            ev.preventDefault();
            if (props.onKeyPress) {
                props.onKeyPress();
            }
        }
    }

    const onFocus = (e: any) => {
        if (props.onFocusOut) {
            if (e.currentTarget === e.target) {
                props.onFocusOut(props.textinputname)
                const value = e.target.value;
                const newValue = value.trim()
                if (props.index > -1) {
                    props.onChange(e.target.name, newValue, props.index);
                }
                else {
                    props.onChange(e.target.name, newValue);
                }
            }
        }
    }

    const floatingLabel = [
        <span key="floating-label" className={(props.floatingError ? 'errorLabelCls' : '') + `${' flotinglabelclss'}`}>
            {props.floatingLabel}
        </span>
    ]

    return (
        <div style={props.customStyles} className={`${props.srchCls ? props.srchCls : ''} `}>
            {props.inputLabel ? (
                <InputLabel
                    shrink
                    htmlFor='bootstrap-input'
                    required={props.required}
                    className={'textinputlabel ' + props.extralabelcls}
                >
                    {props.inputLabel}

                    {props.helpicon &&
                        <Help className='qustionmark' />
                    }

                </InputLabel>
            ) : null}

            <TextField
                onChange={props.handleChange ? props.handleChange : (e: any) => onChange(e)}
                disabled={props.disabled}
                defaultValue={props.defaultValue}
                className={props.textnewclass}
                type={props.typeNumber ? 'number' : props.typePassword ? 'password' : 'text'}
                name={props.textinputname}
                margin='none'
                autoFocus={props.autoFocus}
                placeholder={props.placeholder}
                error={props.error}
                value={props.value}
                required={props.required}
                autoComplete={props.autoComplete}
                onBlur={props.onBlur}
                variant={props.variant}
                slotProps={{
                    input: {
                        endAdornment: props.endAdornment,
                        startAdornment: props.startAdornment,
                    },
                }}
                id="outlined-basic"
                label={props.floatingLabel ? floatingLabel : ''}
                multiline={props.multiline}
                minRows={props.minRows}
                maxRows={props.maxRows}
                rows={props.rows}
                onKeyDown={onKeyPress}
                onFocus={onFocus}
                key={props.key}
                focused={props.focused}
                fullWidth={props.fullWidth}
            />
            {props.errortext &&
                <Popover
                    id="mouse-over-popover"
                    className={`
                    errorPopover
                    `}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                >
                    <p className='popoverErrorText'>{props.errortext}</p>
                </Popover>
            }
            {props.errorText ? (
                <FormHelperText id="component-error-text" className="errormsg text-[10px] text-red-600">
                    {props.errorText}
                </FormHelperText>) : null
            }

        </div>
    );
}

TextFieldInput.propTypes = {
    inputLabel: PropTypes.string,
    extralabelcls: PropTypes.string,
    textnewclass: PropTypes.string,
    textinputname: PropTypes.string,
    disabled: PropTypes.bool,
    defaultValue: PropTypes.string,
    error: PropTypes.bool,
    required: PropTypes.bool,
    fullwidthState: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    inputProps: PropTypes.object,
    value: PropTypes.string,
    floatingLabel: PropTypes.string || PropTypes.bool,
    helpicon: PropTypes.bool,
    typeNumber: PropTypes.bool,
    index: PropTypes.number || PropTypes.bool,
    errortext: PropTypes.string || PropTypes.bool,
    multiline: PropTypes.bool,
    minRows: PropTypes.number || PropTypes.string,
    maxRows: PropTypes.number || PropTypes.string,
    rows: PropTypes.number || PropTypes.string,
    onKeyPress: PropTypes.func,
    onUpdateInput: PropTypes.func,
    errorText: PropTypes.string || PropTypes.bool,
    extraCls: PropTypes.string || PropTypes.bool,
    floatingError: PropTypes.bool,
    onFocusOut: PropTypes.func,
    onError: PropTypes.func,
    startAdorment: PropTypes.node,
    adormentPosiotion: PropTypes.string,
    customStyles: PropTypes.any,
    key: PropTypes.any,
    focused: PropTypes.bool,
    endAdornment: PropTypes.node,
    typePassword: PropTypes.any,
    onBlur: PropTypes.func,
    variant: PropTypes.string,
    autoFocus: PropTypes.bool
};

export default TextFieldInput;