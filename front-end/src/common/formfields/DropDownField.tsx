'use client';

import React from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types'

const DropDownField = (props: any) => {

    const handleChange = (e: any) => {
        props.handleChange(e);
    };
    return (
        <Box sx={{ minWidth: 120 }} className={`${props.dropdownContainerCls} ${props.extraMainCls}`}>
            <FormControl fullWidth>
                <div className={`flex flex-col ${props.label ? 'gap-2' : ''} ${props.dropdownContainerCls}`}>
                    <label className={props.dropDownLabelCls}>{props.label}</label>
                    <Select
                        className={`relative ${props.option ? `` : `text-gray-60`} ${props.dropDownRootCls} ${props.error ? `!border !border-red-400` : ``}`}
                        id={props.id}
                        size={props.size}
                        value={props.option ? props.option : props.placeholder}
                        onChange={handleChange}
                        defaultValue={props.defaultValue}
                        multiple={props.multiple}
                        variant={props.variant}
                        sx={props.sx}
                        SelectDisplayProps={props.SelectDisplayProps}
                        renderValue={props.renderValue}
                        open={props.open}
                        onOpen={props.onOpen}
                        onClose={props.onClose}
                        native={props.native}
                        name={props.name}
                        error={props.error}
                        disabled={props.disabled}
                    >
                        <MenuItem disabled value={props.placeholder}>
                            {props.placeholder}
                        </MenuItem>
                        {props?.selectOption?.map((item: any, idx: number) => (
                            <MenuItem
                                key={idx}
                                value={item.value ? item.value : props.placeholder}
                            >
                                <Typography component={'p'} className={props.titleTempcls}>{item?.name}</Typography>
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <p className={`text-[#d32f2f] mt-[3px] mx-[14px] text-[0.75rem]`}>{props.errorText}</p>
            </FormControl>
        </Box>
    );
}

DropDownField.propTypes = {
    extraMainCls: PropTypes.string,
    dropDownLabelCls: PropTypes.string,
    label: PropTypes.string,
    dropDownRootCls: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    selectOption: PropTypes.array,
    errorTextCls: PropTypes.string,
    defaultValue: PropTypes.any,
    multiple: PropTypes.bool,
    variant: PropTypes.string,
    sx: PropTypes.any,
    SelectDisplayProps: PropTypes.object,
    renderValue: PropTypes.func,
    open: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    native: PropTypes.bool,
    filterImg: PropTypes.bool,
    exportImg: PropTypes.bool,
    errorText: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    size: PropTypes.string,
    handleChange: PropTypes.func,
    option: PropTypes.any,
    name: PropTypes.string,
    dropdownContainerCls: PropTypes.string,
    help: PropTypes.bool,
    error: PropTypes.bool,
    clickEnter: PropTypes.func,
    titleTempcls: PropTypes.string,
    subTitleTempcls: PropTypes.string,
    isTemplate: PropTypes.bool,
    cameraImg: PropTypes.bool,
    timeImg: PropTypes.bool,
    disabled: PropTypes.bool
}

export default DropDownField