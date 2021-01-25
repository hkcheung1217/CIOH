import React from 'react';
import './FormInput.css';

const FormInput = ({ userName, userEmail, handleChange, label, value, ...otherProps }) => {
	return (
		<div className='formInput'>
			<input className='formInput__input' onChange={handleChange} value={value} {...otherProps} />
			{label ? (
				<label className={`${value?.length !== 0 ? 'formInput__shrinkLabel' : ''} formInput__label`}>
					{label}
				</label>
			) : null}
		</div>
	);
};

export default FormInput;
