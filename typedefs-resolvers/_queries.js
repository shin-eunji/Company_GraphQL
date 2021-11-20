const { gql } = require('apollo-server')

const typeDefs = gql`
    type Query {
        equipments: [Equipment]
        supplies: [Supply]
        equipmentAdvs: [EquipmentAdv]
    }
    type EquipmentAdv {
        id: ID!
        used_by: String!
        count: Int!
        use_rate: Float
        is_new: Boolean!
    }
    
`

module.exports = typeDefs