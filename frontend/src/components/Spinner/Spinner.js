import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		height: '60vh',
		alignItems: 'center',
		justifyContent: 'center',
	},
}));

const Spinner = ({ style }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CircularProgress style={style} />
		</div>
	);
};

export default Spinner;
