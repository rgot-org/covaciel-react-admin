import { DataProvider, fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = 'http://covaciel_v1.test/dataprovider/api.php'; // adapte selon ton cas
const httpClient = fetchUtils.fetchJson;

// Fonction d'adaptation du nom de ressource
const formatResource = (resource: string) => `records/${resource.toLowerCase()}`;

const getPrimaryKey = (record: any) => {
    if (record.id !== undefined) return record.id;
    return record[Object.keys(record)[0]];
};

const dataProvider: DataProvider = {
    getList: async (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        const query = {
            offset: (page - 1) * perPage,
            limit: perPage,
            order: `${field},${order.toLowerCase()}`,
        };

        const url = `${apiUrl}/${formatResource(resource)}?${stringify(query)}`;
        const { json } = await httpClient(url);

        return {
            data: json.records.map((record: any) => ({
                id: getPrimaryKey(record),
                ...record
            })),
            total: json.results ?? json.records.length,
        };
    },

    getOne: async (resource, params) => {
        const url = `${apiUrl}/${formatResource(resource)}/${params.id}`;
        const { json } = await httpClient(url);
        return {
            data: {
                id: getPrimaryKey(json),
                ...json
            }
        };
    },

    getMany: async (resource, params) => {
        const filter = `id,in,(${params.ids.join(',')})`;
        const url = `${apiUrl}/${formatResource(resource)}?filter=${encodeURIComponent(filter)}`;
        const { json } = await httpClient(url);
        return {
            data: json.records.map((record: any) => ({
                id: getPrimaryKey(record),
                ...record
            }))
        };
    },

    create: async (resource, params) => {
        const url = `${apiUrl}/${formatResource(resource)}`;
        const options = {
            method: 'POST',
            body: JSON.stringify(params.data),
        };
        const { json } = await httpClient(url, options);
        return {
            data: { id: getPrimaryKey(json), ...json }
        };
    },

    update: async (resource, params) => {
        const url = `${apiUrl}/${formatResource(resource)}/${params.id}`;
        const options = {
            method: 'PUT',
            body: JSON.stringify(params.data),
        };
        const { json } = await httpClient(url, options);
        return {
            data: { id: getPrimaryKey(json), ...json }
        };
    },

    delete: async (resource, params) => {
        const url = `${apiUrl}/${formatResource(resource)}/${params.id}`;
        const options = { method: 'DELETE' };
        await httpClient(url, options);
        return { data: { id: params.id } };
    },
};

export default dataProvider;
