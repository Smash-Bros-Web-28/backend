
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl =>{
        tbl.increments();
        tbl.string('firstName')
            .notNullable();
        tbl.string('lastName')
            .notNullable();
        tbl.string('gamerTag')
            .notNullable()
            .unique();
        tbl.string('email')
            .notNullable()
            .unique()
        tbl.string('password')
            .notNullable()
        tbl.integer('favorite_character_id')

  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
};
