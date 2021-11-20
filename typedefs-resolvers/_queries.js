const { gql } = require('apollo-server')

const typeDefs = gql`
    type Query {
        equipments: [Equipment]
        equipmentAdvs: [EquipmentAdv]
        givens: [Given]
        people: [people]
        softwares: [Software]
        software: Software
        supplies: [Supply]
    }
`

module.exports = typeDefs