'use strict';

/** @type {import('sequelize-cli').Migration} */
const { Venue, Group } = require("../models");
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const group1 = await Group.findOne({where: {name: "Los Angeles Construction"}});
    const group2 = await Group.findOne({where: {name: "Fake Users Anonymous"}});
    await Venue.bulkCreate([
      {
        address: "111 Construction Way",
        city: "Los Angeles",
        state: "CA",
        lat: 34.0549,
        lng: 118.2426,
        groupId: group1.id
      },
      {
        address: "www.fakeusersanon.com",
        city: "Online",
        state: "Online",
        lat: 0,
        lng: 0,
        groupId: group2.id
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "Venues";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ["111 Construction Way", "www.fakeusersanon.com"]}
    });
  }
};
