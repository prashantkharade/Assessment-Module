import { API_CLIENT_INTERNAL_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';
import { SessionManager } from '../session.manager';
import chalk from 'chalk';

/////////////////////////////////////////////////////////////////////////

export const get_ = async (
    sessionId: string,
    url: string,
    authorizeUser = false,
    authorizeClient = true,
    apiKey = API_CLIENT_INTERNAL_KEY
) => {
    console.log(chalk.hex('#FFA500')(url)); 
    const session = await SessionManager.getSession(sessionId);

    const accessToken = session.accessToken;
    // console.log(`accessToken = ${accessToken}`);
    const headers = {};
    headers['Content-Type'] = 'application/json';
    if (authorizeClient) {
        headers['x-api-key'] = apiKey;
    }
    if (authorizeUser) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }
    console.log("In the get method of common.....................!")
    const res = await fetch(url, {
        method: 'GET',
        headers
    });
    const response = await res.json();
    if (response.Status === 'failure') {
        if (response.HttpCode === 404) {
            console.log(chalk.red(`get_ response message: 404 - ${response.Message}`));
            return null;
        } else if (response.HttpCode !== 200) {
            console.log(chalk.blue(`get_ response message: ${response.Message}`));
            throw error(response.HttpCode, response.Message);
        }
    }
    console.log(chalk.green(`get_ response message: ${response.Message}`));
    return response;
};




export const post_ = async (
    sessionId: string,
    url: string,
    bodyObj: unknown,
    authorizeUser = false,
    authorizeClient = true,
    apiKey = API_CLIENT_INTERNAL_KEY
) => {
    console.log("url is : ", url);
    console.log("session id is : ", sessionId);

    const session = await SessionManager.getSession(sessionId);
    const accessToken = session.accessToken;
    console.log("access token is : ", accessToken);

    const headers = {};
    headers['Content-Type'] = 'application/json';
    if (authorizeClient) {
        headers['x-api-key'] = apiKey;
    }
    if (authorizeUser) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const body = JSON.stringify(bodyObj);

    // console.log("This is body", body);
    const res = await fetch(url, {
        method: 'POST',
        headers,
        body
    });

    const response = await res.json();

    if (response.Status === 'failure' || (response.HttpCode !== 201 && response.HttpCode !== 200)) {
        console.log(chalk.red(`post_ response message: ${response.Message}`));
        throw error(response.HttpCode, response.Message);
    }
    console.log(chalk.green(`post_ response message: ${response.Message}`));
    return response;
};

export const put_ = async (
    sessionId: string,
    url: string,
    bodyObj: unknown,
    authorizeUser = false,
    authorizeClient = true,
    apiKey = API_CLIENT_INTERNAL_KEY
) => {
    const session = await SessionManager.getSession(sessionId);
    const accessToken = session.accessToken;
    const headers = {};
    headers['Content-Type'] = 'application/json';
    if (authorizeClient) {
        headers['x-api-key'] = apiKey;
    }
    if (authorizeUser) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }
    const body = JSON.stringify(bodyObj);
    const res = await fetch(url, {
        method: 'PUT',
        body,
        headers
    });
    const response = await res.json();
    if (response.Status === 'failure' || (response.HttpCode !== 200 && response.HttpCode !== 201)) {
        console.log(chalk.red(`put_ response message: ${response.Message}`));
        throw error(response.HttpCode, response.Message);
    }
    console.log(chalk.green(`put_ response message: ${response.Message}`));
    return response;
};

export const delete_ = async (
    sessionId: string,
    url: string,
    authorizeUser = false,
    authorizeClient = true,
    apiKey = API_CLIENT_INTERNAL_KEY
) => {
    console.log(chalk.red("Confirming to delete.........................?"))
    const session = await SessionManager.getSession(sessionId);
    console.log(session)
    const accessToken = session.accessToken;
    console.log(accessToken)
    const headers = {};
    headers['Content-Type'] = 'application/json';
    if (authorizeClient) {
        headers['x-api-key'] = apiKey;
    }
    if (authorizeUser) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }
    const res = await fetch(url, {
        method: 'DELETE',
        headers
    });

    const response = await res.json();
    console.log(response.Message);
    if (response.Status === 'failure' || response.HttpCode !== 200) {
        console.log(chalk.red(`delete_ response message: ${response.Message}`));
        throw error(response.HttpCode, response.Message);
    }
    console.log(chalk.green(`delete_ response message: ${response.Message}`));
    return response;
};
