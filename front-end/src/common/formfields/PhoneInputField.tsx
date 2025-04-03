import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'

const PhoneInputField = (props: any) => {

    const clickEnter = (e: any) => {
        if (e.key === "Enter") {
            e.preventDefault();
            props.clickEnter();
        }
    };

    return (
        <PhoneInput
            country={props.defaultCountry}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder} 
            containerClass={props.extraCls}
            inputClass={props.inputCls}
            dropdownClass={props.dropDownCls}
            buttonClass={props.drpBtnCls}
            specialLabel={props.label}
            onKeyDown={clickEnter}
            enableSearch={props.enableSearch}
            searchClass={props.searchClass}
            disabled={props.disabled}
        />
    )
}

export default PhoneInputField