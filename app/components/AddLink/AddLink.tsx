'use strict';

import * as React from 'react';
import { TextField, Button } from 'react-md';
import Icon from '../Icon/Icon';
import { LinksStore, connectObserved, connect } from '../../stores';

import './AddLink.scss';

interface AddLinkProps {
    linksStore: LinksStore;
}

class AddLink extends React.Component<AddLinkProps, {value: string}> {

    constructor() {
        super();
        this.state = {value: ''};
    }

    onSubmit(e) {
        if (e.key === 'Enter') {
            this.onAddLink();
        }
    }

    onAddLink = () => {
        const { value } = this.state;
        if (LinksStore.isLinkValid(value)) {
            this.props.linksStore.addLink(value);
            this.setState({value: ''});
        }
    }
    
    render() {
        const isValid = LinksStore.isLinkValid(this.state.value);
        const textProps = {
            id: 'add-function-field',
            className: 'add-column',
            label: this.state.value ? (isValid ? 'Aperte Enter' : 'inválido' ): 'Adicione arestas aqui',
            placeholder: 'nó1 nó2',
            error: !isValid,
            value: this.state.value,
            onChange: (value) => this.setState({value}),
            onKeyPress: (e) => this.onSubmit(e)
        };
        return (
            <div className='AddLink'>
                <TextField {...textProps}/>
                <Button raised primary onClick={this.onAddLink}>Adicionar</Button>
            </div>
        );
    }

}

export default connectObserved<AddLinkProps>((store) => ({
    linksStore: store.linksStore
}))(AddLink);
