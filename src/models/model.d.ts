import { Model, ModelCtor } from "sequelize";

export type ModelsCollection = {
  [key: string]: ModelCtor<Model>;
};
