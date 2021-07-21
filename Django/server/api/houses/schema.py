import graphene
from graphene_django import DjangoObjectType
from api.models import House,Image
from graphql import GraphQLError
from server.settings import MEDIA_URL
from users.models import CustomUser,SavedHouses



class HouseType(DjangoObjectType):

    class Meta:
        model=House
    
    
class ImageType(DjangoObjectType):

    class Meta:
        model=Image

    def resolve_image(self,info):
        if self.image:
            self.image = info.context.build_absolute_uri(self.image.url)
        return self.image
        
class Query(graphene.ObjectType):
    all_houses=graphene.List(HouseType)
    house=graphene.Field(HouseType, id=graphene.Int())
    

    def resolve_all_houses(self,info,**kwargs):
        return House.objects.all()
    
    def resolve_all_house_images(self,info,**kwargs):
        return Image.objects.all()

    def resolve_house(self,info,**kwargs):
        id=kwargs.get("id")
        if id is not None:
            return House.objects.get(id=id)

    


class CreateHouse(graphene.Mutation):
    house = graphene.Field(HouseType)

    class Arguments:
        title = graphene.String(required=True)
        description = graphene.String(required=True)
        floors = graphene.Int(required=True)
        built_on = graphene.Date(required=True)
        area = graphene.String(required=True)
        bedrooms = graphene.Int(required=True)
        bathrooms = graphene.Int(required=True)
        price = graphene.Float(required=True)
        address = graphene.String(required = True)
        location = graphene.List(graphene.Float,required = True)
        city = graphene.String(required = True)
    
    
    def mutate(self, info, title, description, floors,built_on,area,bedrooms,bathrooms,price,address,location,city):
        user = info.context.user
        if user.is_anonymous:
            raise GraphQLError("Log in to add a house")
        

        house=House(
            title=title,
            description=description,
            floors=floors,
            area=area,
            built_on=built_on,
            bedrooms=bedrooms,
            bathrooms=bathrooms,
            price=price,
            address=address,
            city = city,
            location=tuple(location),
            posted_by=user,
            )
        
        house.save()
        return CreateHouse(house=house)




class Mutation(graphene.ObjectType):
    create_House=CreateHouse.Field()