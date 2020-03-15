import {} from "feathersjs__feathers";
import { DeleteResult, Identifier, UpdateResult } from "react-admin";
import { UserQuery } from "../../../src/models/users.model";

export type QueryType = Partial<{
    // https://docs.feathersjs.com/api/databases/querying.html
    read: boolean;

    $limit: number;
    $skip: number;
    $select: string[];
    $sort: {
        [name: string]: 1 | -1;
    };
    $or: QueryType[];

    // Equality
    [name: string]:
        | number
        | string
        | boolean
        | Partial<{
              $lt: any;
              $lte: any;
              $gt: any;
              $gte: any;
              $ne: any;
              $like: any;
              $in: any[];
              $nin: any[];
          }>;
}>;

export interface ServiceGetResult {
    id: Identifier;
    [key: string]: any;
}

export type ServiceType = {
    find: (params?: { query: QueryType }) => Promise<GetListResult>;
    create: (data: any) => Promise<CreateResult>;
    get: <T = ServiceGetResult>(id: number, params: any) => Promise<T>;
    update: (id: number, data: any) => Promise<UpdateResult>;
    patch: (id: number, data: any) => Promise<UpdateResult>;
    remove: <T = DeleteResult>(id?: number, params?: { query: QueryType }) => Promise<T>;
};

export type FeathersType = {
    reAuthenticate: () => Promise<AuthenticateResponse>;
    authenticate: (request: UserQuery & { strategy: string }) => Promise<AuthenticateResponse>;
    logout: () => Promise<AuthenticateResponse>;

    service: (resource: string) => ServiceType;
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
