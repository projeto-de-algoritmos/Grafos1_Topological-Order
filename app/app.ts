'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from "mobx-react";

import Application from './components/Application';

import {initStores} from './stores';

const stores = initStores();

window['stores'] = stores;

ReactDOM.render(
    React.createElement(Application, { stores }),
    document.getElementById('app-view')
);
