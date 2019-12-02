'use strict';

import * as React from "react";
import {useStrict} from 'mobx';
import { observer, inject, IStoresToProps, IReactComponent, IWrappedComponent } from "mobx-react";
import AppStore from './AppStore';
import LinksStore from './LinksStore';

useStrict(true);

export {
	initStores,
	AppStore,
	LinksStore
}

export interface Stores {
	app: AppStore;
	linksStore: LinksStore;
}

function initStores(): Stores {
	return {
		app: new AppStore(),
		linksStore: new LinksStore()
	}
}

type MapStoreToProps<TStateProps, TOwnProps, Stores> = (store: Stores, ownProps: TOwnProps) => TStateProps & TStateProps;

export function connectObserved<InjectedProps, OwnProps = {}>(mapStoreToProps: MapStoreToProps<InjectedProps, OwnProps, Stores>) {
	return function(Component: IReactComponent<OwnProps>) {
		const ConnectedComponent = inject(mapStoreToProps)(observer(Component)) as React.ComponentClass<OwnProps>;
		return ConnectedComponent;
	}
}

export function connect<InjectedProps, OwnProps = {}>(mapStoreToProps: MapStoreToProps<InjectedProps, OwnProps, Stores>) {
	const withProps = (mapStoreToProps) => {
		return <WrappedProps>(Component: IReactComponent<WrappedProps>): IReactComponent<WrappedProps> => {
			return (props: WrappedProps) => {
				const { stores, ...ownProps }: {stores: Stores, ownProps: OwnProps} = props as any;
				const newProps = mapStoreToProps(stores, ownProps);
				return React.createElement(Component as React.ComponentClass<WrappedProps>, {...newProps});
			}
		}
	}

	return function(Component: IReactComponent<OwnProps>) {
		return inject(stores => ({stores}))(
			observer<IReactComponent<OwnProps>>(
				withProps(mapStoreToProps)(Component)
			)
		) as React.ComponentClass<OwnProps>;
	}
}
