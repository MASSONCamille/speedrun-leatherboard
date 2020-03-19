import { Query, QueryResult } from "material-table";
import { QueryType, ServiceGetResult } from "../types";
import feathers from "../feathers";
import merge from "object-assign-deep";

const op = {
    "=": "$eq",
    "<": "$lt",
    "<=": "$lte",
    ">": "$gt",
    ">=": "$gte",
    "!=": "$ne"
};

function stringify(val: any): string {
    switch (typeof val) {
        case "string":
        case "number":
        case "boolean":
            return val.toString();
        case "object":
            if (val instanceof Date) {
                return val.toISOString();
            }
            return val.toString();
    }
    return val.toString();
}

export const mtListQuery: <Type extends object>(
    service: string,
    searchFields?: string[]
) => (query: Query<Type>) => Promise<QueryResult<Type>> = (service, searchFields) => async ({
    filters,
    page,
    pageSize,
    search,
    orderBy,
    orderDirection
}) => {
    const query: QueryType = {
        $skip: page * pageSize,
        $limit: pageSize
    };

    if (orderBy && orderBy.field) {
        query.$sort = { [orderBy.field]: orderDirection === "asc" ? 1 : -1 };
    }

    if (filters) {
        console.log(filters);
        filters.forEach(filter => {
            if (filter.column.field && filter.operator && op[filter.operator] && filter.value) {
                merge(query, {
                    [filter.column.field]: {
                        [op[filter.operator]]: stringify(filter.value)
                    }
                });
            }
        });
    }

    if (search && searchFields) {
        query.$or = searchFields.map<QueryType>(field => ({
            [field]: {
                $like: `%${search}%`
            }
        }));
    }

    console.log(query);

    const res = await feathers.service(service).find<any>({ query });

    return {
        data: res.data,
        page: Math.floor(res.skip / res.limit),
        totalCount: res.total
    };
};

export const mtGetQuery = (service: string) => <T = ServiceGetResult>(id: number) => {
    return feathers.service(service).get<T>(id);
};
