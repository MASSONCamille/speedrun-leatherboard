import { UserQuery } from "../../../src/models/users.model";

export type FeathersType = {
    reAuthenticate: () => Promise<AuthenticationResponse>;
    authenticate: (request: UserQuery & { strategy: string }) => Promise<AuthenticateResponse>;
    logout: () => Promise<AuthenticateResponse>;
};

export type AuthenticateResponse = {
    accessToken: string;
    user: {
        id: number;
        name: string;
        createdAt: string;
        updatedAt: string;
    };
};

export type FeathersError = {
    type: string;
    name: string;
    message: string;
    code: number;
    className: string;
    response: Response;
    body: ReadableStream;
    bodyUsed: boolean;
};
