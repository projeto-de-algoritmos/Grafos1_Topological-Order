'use strict';

import * as React from 'react';
import { FontIcon, FontIconProps } from 'react-md';

interface IconProps extends FontIconProps {
    name: string;
}

const Icon: React.SFC<IconProps> = (props) => {
    const {name, ...otherProps} = props;

    return (
        <FontIcon className='Icon'>{name}</FontIcon>
    );
}

export default Icon;
