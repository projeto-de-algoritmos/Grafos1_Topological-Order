'use strict';

import * as React from 'react';
import { Provider, Observer } from "mobx-react";
import { Toolbar, Divider, Cell, Grid, Button, Card, CardText } from 'react-md';
import { Stores, LinksStore, connect } from '../stores';

import AddLink from './AddLink/AddLink';
import Links from './Links/Links';
import GraphCalls from './GraphCalls/GraphCalls';

import './Application.scss';

interface AppProps {
    stores: Stores
}

const Application: React.SFC<AppProps> = ({stores}) => {
    const onGenerate = () => stores.linksStore.generateLinks();
    return (
        <Provider {...stores} >
            <div className='Application'>
                <Toolbar>
                    <AddLink />
                    <Button className="generate-links-btn" onClick={onGenerate} raised primary>gerar grafo</Button>
                </Toolbar>
                <Divider />
                <div className="GridList">
                    <Grid>
                        <Cell size={4} tabletSize={4} order={1}>
                            <Links data={stores.app.localTime}/>
                        </Cell>
                        <Cell size={6} tabletSize={8} order={2}>
                            <GraphCalls />
                        </Cell>
                        <Cell size={2} tabletSize={4} order={0}>
                            <Observer>
                                {() => (
                                    <Card>
                                        <CardText>
                                            <div>Application Observer Element</div>
                                            <b>Application stores.app.localTime</b>:
                                            <div>{stores.app.localTime}</div>
                                        </CardText>
                                    </Card>
                                )}
                            </Observer>
                        </Cell>
                    </Grid>
                </div>
            </div>
        </Provider>
    );
}

export default Application;
