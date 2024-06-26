import mongoose from 'mongoose';
import utils from './utils.js';

/**
 * Wrapper around mongo view to automatically create/update it.
 *
 * @example
 * // Import
 * import mongoose from 'mongoose';
 * import View from './path/to/view.js';
 *
 * // Create a view
 * const MyView = new View(
 *   'name-in-db',
 *   'target-model',
 *   new mongoose.Schema({
 *     ...
 *   }),
 *   [{
 *     ...
 *   }]
 * );
 *
 * // By calling `getModel`, you can use it like a normal Mongoose model
 * (await MyView.getModel())
 *   .find(...);
 *
 * @template {mongoose.Schema} T Schema of the collection.
 */
export default class View {
  name;
  schema;
  viewOn;
  pipeline;
  /** @type {
    mongoose.Model<
      mongoose.InferSchemaType<T>,
      mongoose.ObtainSchemaGeneric<T, 'TQueryHelpers'>,
      mongoose.ObtainSchemaGeneric<T, 'TInstanceMethods'>,
      mongoose.ObtainSchemaGeneric<T, 'TVirtuals,
      T
    >
    & mongoose.ObtainSchemaGeneric<T, 'TStaticMethods'>
  } */
  model;

  /**
   * @param name {string} Collection name.
   * @param viewOn {string} Existing collection to start from.
   * @param schema {T} Schema of the collection.
   * @param pipeline {Document[]} Aggregation pipeline to construct the view.
   */
  constructor(name, viewOn, schema, pipeline) {
    this.name = name;
    this.viewOn = viewOn;
    this.schema = schema;
    this.pipeline = pipeline;
    this.model = null;
  }

  async getModel() {
    if (!this.model) {
      // Generate model that doesn't auto create
      this.model = mongoose.model(
        this.name,
        new mongoose.Schema(
          this.schema.obj,
          { autoCreate: false, autoIndex: false }
        )
      );
      // Remove previous view (ignores drop on non-existing collection)
      await utils.runIgnoreMongoErrors(
        async() => await this.model.collection.drop(),
        26
      );
      // Create manually now with aggregation
      await this.model.createCollection({
        viewOn: this.viewOn,
        pipeline: this.pipeline
      });
    }
    return this.model;
  }
}

