import { Avatar, CardHeader, Typography } from "@material-ui/core";
import React, { ComponentType } from "react";
import {
    Datagrid,
    DateField,
    DeleteButton,
    Edit,
    EditButton,
    Filter,
    List,
    NumberField,
    Show,
    ShowButton,
    SimpleForm,
    Tab,
    TabbedShowLayout,
    TextField,
    TextInput
} from "react-admin";
import { ReactAdminComponentProps, ReactAdminComponentPropsWithId } from "ra-core";
import Multiple from "../util/Multiple";
import stringToColor from "../util/stringToColor";
import { useResourceInfo } from "../util/locationSubdir";

const UserFilter = (props: any) => (
    <Filter {...props}>
        <TextInput label="Name" source="name" alwaysOn />
    </Filter>
);

export const UserList: ComponentType<ReactAdminComponentProps> = props => {
    console.log(props);
    // const ri = useResourceInfo("users");
    return React.createElement(
        List,
        {
            ...props
            // ...ri
            // filters: UserFilter
        },
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <ShowButton />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    );
};

const TitleForUser = ({ record, ...props }: any) => {
    console.log(props);
    return (
        <CardHeader
            avatar={
                <Avatar style={{ backgroundColor: stringToColor(record.name) }}>
                    {record.name.substr(0, 1).toUpperCase()}
                </Avatar>
            }
            title={
                <Typography variant="h6" component="h2">
                    {record.name}
                </Typography>
            }
        />
    );
};

export const UserShow: ComponentType<ReactAdminComponentPropsWithId> = props => {
    return React.createElement(
        Show,
        props,
        <Multiple>
            <TitleForUser />
            <TabbedShowLayout>
                <Tab label="summary">
                    <NumberField source="id" />
                    <TextField source="name" />
                    <DateField source="createdAt" showTime />
                    <DateField source="updatedAt" showTime />
                </Tab>
            </TabbedShowLayout>
        </Multiple>
    );
};

export const UserEdit: ComponentType<ReactAdminComponentPropsWithId> = props => {
    console.log(props);
    // const ri = useResourceInfo("users");
    return React.createElement(
        Edit,
        {
            ...props
            // ...ri
        },
        <SimpleForm margin="normal">
            <TextInput label="Nom d'utilisateur" source="name" variant="standard" />
            <TextInput
                label="Mot de passe"
                source="password"
                initialValue=""
                variant="standard"
                type="password"
                helperText="Seulement remplir si vous souhaitez remplacer le mot de passe."
            />
        </SimpleForm>
        // <Multiple>
        //     <TitleForUser />
        // </Multiple>
    );
};
