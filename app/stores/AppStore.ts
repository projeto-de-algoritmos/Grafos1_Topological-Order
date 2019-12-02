'use strict';

import {observable, action} from 'mobx';

export default class AppStore {

	@observable localTime: string = new Date().toLocaleTimeString();

	@action updateTime() {
		this.localTime = new Date().toLocaleTimeString();
	}

}