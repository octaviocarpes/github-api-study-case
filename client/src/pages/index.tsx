import React, {ReactElement, PropsWithChildren} from 'react'

interface PropTypes {
    children?: ReactElement
}

const Component: React.FC<PropTypes> = (props: PropsWithChildren<any>) => {
    return (
        <h1>Hello world</h1>
    )
}

export default Component