import React, { ComponentType } from "react";
import { Datagrid, List, ListProps } from "react-admin";
import { ReactAdminComponentProps } from "ra-core";
import { TextField } from "ra-ui-materialui";

export const WeaponList: ComponentType<ReactAdminComponentProps> = props => {
    return React.createElement(
        List,
        {
            bulkActionButtons: false,
            perPage: 50,
            pagination: null,
            ...props
        },
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
        </Datagrid>
    );
};
