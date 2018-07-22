import styled from 'styled-components';
import React from 'react';
import * as R from 'ramda';
import { Field, reduxForm } from 'redux-form';
import { Button, Classes } from '@blueprintjs/core';
import Input from '../Shared/Input.jsx';


const ButtonArea = styled.div`
    display: flex;
    button {
        width: 100%;
        margin: 0 10px;
    }
`;

const required = value => !value && 'required';

const commonValidate = values => ({
    name: required(values.name)
});

export const validateServer = values =>
    values |> commonValidate |> R.assoc('server', required(values.server));

export const validateDirect = values =>
    values |> commonValidate |> R.assoc('host', required(values.host));

const Form = ({
    handleSubmit,
    mode,
    invalid,
    fetching,
    connectionSelect,
    onDelete
}) => (
    <form onSubmit={handleSubmit}>
        <Field name="name" component={Input} label="Name" placeholder="dev" />
        {mode === 'server' && (
            <Field
                name="server"
                component={Input}
                label="url"
                placeholder="https://tabix.dev/s1"
            />
        )}
        {mode === 'server' && (
            <Field
                name="config"
                component={Input}
                label="Config key"
                placeholder="empty"
            />
        )}
        {mode === 'direct' && (
            <Field
                name="host"
                component={Input}
                label="http://host:port"
                placeholder="http://127.0.0.1:8123"
            />
        )}
        <Field name="login" component={Input} label="login" />
        <Field name="password" component={Input} label="password" type="password" />
        {mode === 'direct' && (
            <Field
                name="params"
                component={Input}
                label="Extend params query"
                placeholder="key1=value&key2=value"
            />
        )}
        <ButtonArea>
            <Button
                text="SIGN IN"
                type="submit"
                disabled={invalid || fetching}
            />
            {connectionSelect && (
                <Button
                    text="DELETE"
                    disabled={fetching}
                    className={Classes.INTENT_DANGER}
                    onClick={onDelete}
                />
            )}
        </ButtonArea>
    </form>
);

export default reduxForm()(Form);