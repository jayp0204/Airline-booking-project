const { Logger } = require("../config");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      Logger.error("Something went wrong in the Crud Repo: create", error);
      throw error;
    }
  }

  async destroy(data) {
    try {
      const response = await this.model.destroy({
        where: {
          id: data,
        },
      });
      return response;
    } catch (error) {
      Logger.error("Something went wrong in the Crud Repo: delete", error);
      throw error;
    }
  }

  async get(data) {
    try {
      const response = await this.model.findByPk();
      return response;
    } catch (error) {
      Logger.error("Something went wrong in the Crud Repo: get", error);
      throw error;
    }
  }

  async getAll(data) {
    try {
      const response = await this.model.findAll();
      return response;
    } catch (error) {
      Logger.error("Something went wrong in the Crud Repo: get", error);
      throw error;
    }
  }

  async update(id, data) {
    try {
      const response = await this.model.update(data, {
        where: {
          id: id,
        },
      });
      return response;
    } catch (error) {
      Logger.error("Something went wrong in the Crud Repo: update", error);
      throw error;
    }
  }

  async delete(id) {
    return this.model.findByIdAndDelete(id);
  }

  async find() {
    return this.model.find();
  }

  async findById(id) {
    return this.model.findById(id);
  }
}

module.exports = CrudRepository;