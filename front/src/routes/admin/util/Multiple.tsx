import React from "react";

export default function Multiple({ children, version, ...props }: any) {
    return <div>{React.Children.map(children, (it, i) => React.cloneElement(it, { ...props, key: i }))}</div>;
}
