import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
	footer: {
		borderTop: `1px solid ${theme.palette.divider}`,
		marginTop: theme.spacing(8),
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
		[theme.breakpoints.up('sm')]: {
			paddingTop: theme.spacing(6),
			paddingBottom: theme.spacing(6),
		},
	},
}));

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				Jakub Urbanski
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const footers = [
	{
	  title: 'Information',
	  description: [
		<Link href="/about-me" variant="subtitle1" color="textSecondary">
		  About me
		</Link>,
		<Link href="/about-this-page" variant="subtitle1" color="textSecondary">
		  About this page
		</Link>,
		<Link href="/rules" variant="subtitle1" color="textSecondary">
		  Rules
		</Link>,
	  ],
	},
	{
	  title: 'Groups 1',
	  description: [
		<Link href="/group/a" variant="subtitle1" color="textSecondary">
		  Group A
		</Link>,
		<Link href="/group/b" variant="subtitle1" color="textSecondary">
		  Group B
		</Link>,
		<Link href="/group/c" variant="subtitle1" color="textSecondary">
		  Group C
		</Link>,
		<Link href="/group/d" variant="subtitle1" color="textSecondary">
		  Group D
		</Link>,
	  ],
	},
	{
	  title: 'Groups 2',
	  description: [
		<Link href="/group/e" variant="subtitle1" color="textSecondary">
		  Group E
		</Link>,
		<Link href="/group/f" variant="subtitle1" color="textSecondary">
		  Group F
		</Link>,
		<Link href="/group/g" variant="subtitle1" color="textSecondary">
		  Group G
		</Link>,
		<Link href="/group/h" variant="subtitle1" color="textSecondary">
		  Group H
		</Link>,
	  ],
	},
	{
	  title: 'Clubs',
	  description: [
		<Link href="/teams" variant="subtitle1" color="textSecondary">
		  List of clubs
		</Link>,
		<Link href="/countries" variant="subtitle1" color="textSecondary">
		  Countries
		</Link>,
	  ],
	},
  ];
  

function Footer() {
	const classes = useStyles();
	return (
		<React.Fragment>
		<Container maxWidth="md" component="footer" className={classes.footer}>
			<Grid container spacing={4} justifyContent="space-evenly">
			{footers.map((footer) => (
				<Grid item xs={6} sm={3} key={footer.title}>
				<Typography variant="h6" color="textPrimary" gutterBottom>
					{footer.title}
				</Typography>
				<ul>
					{footer.description.map((item, index) => (
					<li key={index}>
						{item}
					</li>
					))}
				</ul>
				</Grid>
			))}
			</Grid>
			<Box mt={5}>
			<Copyright />
			</Box>
		</Container>
		</React.Fragment>
);
}

export default Footer;
  
