"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCars1622426971287 = void 0;

var _typeorm = require("typeorm");

class CreateCars1622426971287 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "cars",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true
      }, {
        name: "name",
        type: "varchar"
      }, {
        name: "description",
        type: "varchar"
      }, {
        name: "daily_rate",
        type: "numeric"
      }, {
        name: "avaliable",
        type: "boolean",
        default: true
      }, {
        name: "license_plate",
        type: "varchar"
      }, {
        name: "fine_amount",
        type: "numeric"
      }, {
        name: "category_id",
        type: "uuid",
        isNullable: true
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }],
      foreignKeys: [{
        name: "FKCategoryCar",
        referencedTableName: "categories",
        referencedColumnNames: ["id"],
        columnNames: ["category_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL"
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("cars");
  }

}

exports.CreateCars1622426971287 = CreateCars1622426971287;