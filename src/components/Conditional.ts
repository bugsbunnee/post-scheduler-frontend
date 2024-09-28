import React, { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
    isVisible: boolean;
}

const Conditional: React.FC<Props> = ({ children, isVisible }) => {
    return isVisible ? children : null;
}
 
export default Conditional;