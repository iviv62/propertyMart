import graphene
import graphql_jwt


import users.schema
import api.houses.schema



class Query(
    users.schema.Query,
    api.houses.schema.Query,
    graphene.ObjectType
    ):
    pass


class Mutation(
    users.schema.Mutation,
    api.houses.schema.Mutation,
    graphene.ObjectType
    ):
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()

schema=graphene.Schema(query=Query,mutation=Mutation)