import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

const useStyles = makeStyles(theme => ({
	root: {
		width: '80%',
		marginTop: '12px',
	},
}));

const AlertMessage = ({ title, text, variant, customTitle }) => {
	const classes = useStyles();

	const [firstLetter, ...restOfLetters] = title.split('');

	const firstLetterUpperCaseTitle = [firstLetter.toUpperCase(), ...restOfLetters].join('');

	return (
		<div className={classes.root}>
			<Alert variant={variant} severity={title}>
				<AlertTitle>
					<strong>{customTitle ? customTitle : firstLetterUpperCaseTitle}</strong>
				</AlertTitle>
				{text}
			</Alert>
		</div>
	);
};

export default AlertMessage;
