import Feathers from "@feathersjs/feathers";
import diff from "object-diff";
import {
    CreateParams,
    CreateResult,
    DataProvider,
    DeleteManyParams,
    DeleteManyResult,
    DeleteParams,
    DeleteResult,
    GetListParams,
    GetListResult,
    GetManyParams,
    GetManyReferenceParams,
    GetManyReferenceResult,
    GetManyResult,
    GetOneParams,
    GetOneResult,
    UpdateManyParams,
    UpdateManyResult,
    UpdateParams,
    UpdateResult
} from "ra-core";
import { FeathersType, QueryType, ServiceGetResult } from "../types";

interface RestClientOptions {
    id: string;
    usePatch: boolean;
    useMulti: boolean;
}

interface RestResourceClientOptions {
    [res: string]: RestClientOptions;
}

const defaultIdKey = "id";
// const queryOperators = ["$gt", "$gte", "$lt", "$lte", "$ne", "$sort", "$or", "$nin", "$in"];

// function flatten(object: { [key: string]: any }, prefix = "", stopKeys: string[] = []): any {
//     return Object.keys(object).reduce((prev, element) => {
//         const hasNextLevel =
//             object[element] &&
//             typeof object[element] === "object" &&
//             !Array.isArray(object[element]) &&
//             !Object.keys(object[element]).some(key => stopKeys.includes(key));
//         return hasNextLevel
//             ? { ...prev, ...flatten(object[element], `${prefix}${element}.`, stopKeys) }
//             : { ...prev, ...{ [`${prefix}${element}`]: object[element] } };
//     }, {});
// }

class RestClient implements DataProvider {
    feathers: FeathersType & Feathers.Application<any>;
    options: RestClientOptions;
    resourceOptions: RestResourceClientOptions;

    constructor(
        feathers: FeathersType & Feathers.Application<any>,
        options?: Partial<RestClientOptions>,
        resourceOptions?: RestResourceClientOptions
    ) {
        this.feathers = feathers;
        this.options = {
            id: "id",
            usePatch: false,
            useMulti: false,
            ...options
        };
        this.resourceOptions = resourceOptions || {};
    }

    getIdKey(resource: string) {
        const resourceOption = this.resourceOptions[resource]?.id;
        const option = this.options.id;
        return resourceOption || option || defaultIdKey;
    }

    getPatch(resource: string) {
        const resourceOption = this.resourceOptions[resource]?.usePatch;
        const option = this.options.usePatch;
        return resourceOption || option || false;
    }

    getMulti(resource: string) {
        const resourceOption = this.resourceOptions[resource]?.useMulti;
        const option = this.options.useMulti;
        return resourceOption || option || false;
    }

    service(resource: string) {
        return this.feathers.service(resource);
    }

    getList(resource: string, params: GetListParams): Promise<GetListResult> {
        const idKey = this.getIdKey(resource);
        const query: QueryType = {};

        // Pagination
        const { page, perPage } = params.pagination || {};
        query.$limit = perPage;
        query.$skip = (page - 1) * perPage;

        // Sort
        const { field, order } = params.sort || {};
        if (order) {
            query.$sort = {
                [field === defaultIdKey ? idKey : field]: order === "DESC" ? -1 : 1
            };
        }

        // console.log(params.filter);
        // Filter
        Object.assign(
            query,
            Object.entries(params.filter).reduce(
                (acc, [key, value]) => ({
                    ...acc,
                    [key]: { $like: `%${value}%` }
                }),
                {}
            )
        );
        // Object.assign(query, flatten(params.filter, "", queryOperators));
        // console.log(query);

        return this.service(resource).find({
            query
        });
    }
    getOne(resource: string, params: GetOneParams): Promise<GetOneResult> {
        const { [defaultIdKey]: id, ...restParams } = params;
        return this.service(resource)
            .get<ServiceGetResult>(+params.id, restParams)
            .then(data => ({ data }));
    }
    getMany(resource: string, params: GetManyParams): Promise<GetManyResult> {
        return this.service(resource).find();
    }
    getManyReference(resource: string, params: GetManyReferenceParams): Promise<GetManyReferenceResult> {
        return this.service(resource).find();
    }
    update(resource: string, params: UpdateParams): Promise<UpdateResult> {
        console.log(resource, params);
        const service = this.service(resource);
        const patch = this.getPatch(resource);
        const idKey = this.getIdKey(resource);
        if (patch) {
            const data = params.previousData ? diff(params.previousData, params.data) : params.data;
            return service.patch(+params.id, data);
        }
        const { [defaultIdKey]: id, ...restParams } = params.data;
        return this.service(resource).update(+params.id, idKey !== defaultIdKey ? restParams : params.data);
    }
    async updateMany(resource: string, params: UpdateManyParams): Promise<UpdateManyResult> {
        const service = this.service(resource);
        const idKey = this.getIdKey(resource);
        const { [defaultIdKey]: id, ...restParams } = params.data;
        const updates = await Promise.all(
            params.ids.map(id => {
                return service.update(+id, idKey !== defaultIdKey ? restParams : params.data);
            })
        );
        return {
            data: updates.map(update => update.data.id)
        };
    }
    create(resource: string, params: CreateParams): Promise<CreateResult> {
        return this.service(resource).create(params);
    }
    delete(resource: string, params: DeleteParams): Promise<DeleteResult> {
        return this.service(resource).remove(+params.id);
    }
    deleteMany(resource: string, params: DeleteManyParams): Promise<DeleteManyResult> {
        const service = this.service(resource);
        const multi = this.getMulti(resource);

        if (multi) {
            return service.remove<DeleteManyResult>(undefined, {
                query: {
                    idKey: {
                        $in: params.ids.map(it => +it)
                    }
                }
            });
        }
        return Promise.all(params.ids.map(id => service.remove(+id))).then(deletions => ({
            data: deletions.map(deletion => deletion.data?.id || -1)
        }));
    }
}

export default RestClient;
