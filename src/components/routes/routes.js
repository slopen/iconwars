// @flow

import React from 'react';
import {Route, Switch} from 'react-router-dom';

import App from 'components/app';


export default () =>
	<Switch>
		<Route
			path="*"
			component={App}/>
	</Switch>
