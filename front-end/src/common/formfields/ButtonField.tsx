import { Button, CircularProgress } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types';
import Image from 'next/image';

const ButtonField = (props: any) => {
	return (
		<div className={`${props.outerBtnCls}`}>
			<Button
				variant={props.variant}
				className={`${props.buttonextracls}`}
				onClick={props.onClick}
				component={props.component}
				startIcon={props.startIcon}
				endIcon={props.endIcon}
				to={props.to}
				type={props.type}
				disabled={props.disabled}
				sx={props.sx ? props.sx : {}}
			>
				{props.loading === true ? (
					<div className='loaderwithtxt'>
						<CircularProgress size={18} className='' color='inherit' />
					</div>
				) : (
					<div className={`flex flex-row items-center ${props.imgtext} ${props.buttonInsidecls}`}>
						{props.img && (
							<Image src={props.img} alt={props.alt} className={"hover:visible"}/>
						)}
						<p>{props.buttonName}</p>
					</div>
				)}
			</Button>
		</div>
	)
}

ButtonField.propTypes = {
	variant: PropTypes.string,
	className: PropTypes.string,
	onClick: PropTypes.func,
	component: PropTypes.any,
	to: PropTypes.any,
	type: PropTypes.any,
	disabled: PropTypes.bool,
	img: PropTypes.string,
	alt: PropTypes.string,
	buttonName: PropTypes.string,
	startIcon: PropTypes.node,
	buttonInsidecls: PropTypes.string
};

export default ButtonField