# GraphQL/Apollo

## 1. ApolloServer

typeDef와 resolver를 인자로 받아 서버를 생성.

- typeDef
    - GraphQL 명세에서 사용될 데이터, 요청의 타입 지정
    - **gql**(template literal tag)로 생성됨
     
- resolver
    - 서비스의 액션들을 함수로 지정
    - 요청에 따라 데이터를 반환, 입력, 수정, 삭제
    
- GraphQL Playgroud
    - 작성한 GraphQL type, resolver 명세확인
    - 데이터 요청 및 전송 테스
```
// index.js
const database = require('./database');
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    teams: [Team]
    team(id: Int): Team
    equipments: [Equipment]
    supplies: [Supply]
  }
  type Mutation {
    insertEquipment(
      id: String
      used_by: String
      count: Int
      new_or_used: String
    ): Equipment
    editEquipment(
      id: String
      used_by: String
      count: Int
      new_or_used: String
    ): Equipment
    deleteEquipment(id: String): Equipment
  }
  type Team {
    id: Int
    manager: String
    office: String
    extension_number: String
    mascot: String
    cleaning_duty: String
    project: String
    supplies: [Supply]
  }
  type Equipment {
    id: String
    used_by: String
    count: Int
    new_or_used: String
  }
  type Supply {
    id: String
    team: Int
  }
`
const resolvers = {
  Query: {
    teams: () => database.teams
      .map((team) => {
        team.supplies = database.supplies
          .filter((supply) => {
            return supply.team === team.id
          })
        return team
      }),
    team: (parent, args, context, info) => database.teams.filter(team => team.id === args.id)[0],
    equipments: () => database.equipments,
    supplies: () => database.supplies
  },
  Mutation: {
    deleteEquipment: (parent, args, context, info) => {
      const deleted = database.equipments
        .filter((equipment) => {
          return equipment.id === args.id
        })[0]
      database.equipments = database.equipments
        .filter((equipment) => {
          return equipment.id !== args.id
        })
      return deleted
    },
    editEquipment: (parent, args, context, info) => {
      return database.equipments.filter((equipment) => {
        return equipment.id === args.id
      }).map((equipment) => {
        Object.assign(equipment, args)
        return equipment
      })[0]
    },
    insertEquipment: (parent, args, context, info) => {
      const inserted = database.equipments.push(args)
      return args
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
```
```
// 파일 실행
npm start
```


### GraphQL Docs

#### Query
![Query](./images/1.png)

#### Mutation-추가
![Mutation-추가](./images/2.png)

#### Mutation-수정
![Mutation-수정](./images/3.png)

#### Mutation-삭제
![Mutation-삭제](./images/4.png)


## 2. GraphQL의 기본 타입들

### 스칼라 타입
- GraphQL 내장 자료형

```
type EquipmentAdv {
    id: ID!
    used_by: String!
    count: Int!
    use_rate: Float
    is_new: Boolean!
}
```
타입 | 설명 |
--- | --- |
ID | 기본적으로는 String이나, 고유 식별자 역할임을 나타냄- |
String | UTF-8 문자열 |
Int | 부호가 있는 32비트 정수 |
Float | 부호가 있는 부동소수점 값 |
Boolean	| 참/거짓 |


> ! : Non Null
> null을 반환할 수 없음

### 열거 타입
- 미리 지정된 값들 중에서만 반환


### 리스트 타입
- 특정 타입의 배열을 반환

선언부 |	users: null | users: [ ] | users: [..., null] |
--- | --- | --- | --- |
[String]| 	| ✔| 	✔| 	✔| 
[String!]| 	✔| 	✔| 	❌| 
[String]!| 	❌| 	✔| 	✔| 
[String!]!| 	❌| 	✔| 	❌|

### 객체 타입
- 사용자에 의해 정의된 타입들 

## 3. 유니언과 인터페이스

### Union

### Interface
- 유사한 객체 타입을 만들기 위한 공통 필드 타입
- 추상 타입 - 다른 타입에 implement 되기 위한 타입