
const { Models } = require('../models/index');
const async = require('async')

module.exports.DAOManager = {

    async saveData(model, data) {
        try {
            let ModelName = Models[model]
            return await new ModelName(data).save();
        }
        catch (error) {
            return error
        }
    },

    async getData(model, query, projection, options) {
        try {
            let ModelName = Models[model]
            return await ModelName.find(query, projection, options);
        } catch (error) {
            return error
        }
    },

    async findOne(model, query, projection, options) {
        try {
            let ModelName = Models[model]
            return await ModelName.findOne(query, projection, options);
        } catch (error) {
            return error
        }
    },

    async findAndUpdate(model, conditions, update, options) {
        try {
            let ModelName = Models[model]
            return await ModelName.findOneAndUpdate(conditions, update, options);
        } catch (error) {
            return error
        }
    },

    async findAndRemove(model, conditions, update, options) {
        try {
            let ModelName = Models[model]
            return await ModelName.findOneAndRemove(conditions, update, options);
        } catch (error) {
            return error
        }
    },

    async update(model, conditions, update, options) {
        try {
            let ModelName = Models[model]
            return await ModelName.update(conditions, update, options);
        } catch (error) {
            return error
        }
    },

    async remove(model, condition) {
        try {
            let ModelName = Models[model]
            return await ModelName.remove(condition);
        } catch (error) {
            return error
        }
    },

    async populateData(model, query, projection, options, collectionOptions) {
        try {
            let ModelName = Models[model]
            return await ModelName.find(query, projection, options).populate(collectionOptions).exec();
        } catch (error) {
            return error
        }
    },

    async count(model, condition) {
        try {
            let ModelName = Models[model]
            return await ModelName.count(condition);
        } catch (error) {
            return error
        }
    },

    async aggregateData(model, aggregateArray, options) {
        try {
            let ModelName = Models[model]
            let aggregation = ModelName.aggregate(aggregateArray);
            if (options) { aggregation.options = options; }
            return await aggregation.exec();
        } catch (error) {
            return error
        }
    },

    async insert(model, data, options) {
        try {
            let ModelName = Models[model]
            return await ModelName.collection.insert(data, options);
        } catch (error) {
            return error
        }
    },

    async insertMany(model, data, options) {
        try {
            let ModelName = Models[model]
            return await ModelName.collection.insertMany(data, options);
        } catch (error) {
            return error
        }
    },

    async aggregateDataWithPopulate(model, group, populateOptions) {
        try {
            let ModelName = Models[model]
            let aggregate = await ModelName.aggregate(group);
            let populate = await ModelName.populate(aggregate, populateOptions)
            return populate
        } catch (error) {
            return error
        }
    },

    async bulkFindAndUpdate(bulk, query, update, options) {
        try {
            return await bulk.find(query).upsert().update(update, options);
        } catch (error) {
            return error
        }
    },

    async bulkFindAndUpdateOne(bulk, query, update, options) {
        try {
            return await bulk.find(query).upsert().updateOne(update, options);
        } catch (error) {
            return error
        }
    }
};
