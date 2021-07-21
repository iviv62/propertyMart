import React,{useEffect,useState} from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView
  } from 'react-native';
import { TextInput,Button } from 'react-native-paper';
import ListPropertyMap from '../../components/ProfileScreen/ListPropertyMap' 
import {user,favouriteHouses, allHouses,searchedData,filteredData,mapCoords} from '../../constants/storage';
import {useReactiveVar,useQuery,useMutation} from '@apollo/client';
import {GET_USER,CREATE_PROPERTY} from '../../constants/query';
import * as clientClass from '../../constants/client-cache';
import LoadingComponent from '../../components/LoadingComponent';
import * as Utils  from '../../constants/utils';
const client=clientClass.client
const refetch = Utils.reloadExploreScreenData

const  ListProperty = ({navigation}) => {
    let userInfo = useReactiveVar(user);
    
    let id = userInfo.id;
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState({
        surname:false,
        name:false,
        phone:false,
        email:false,
        title:false,
        description:false,
        floors:false,
        bedrooms:false,
        bathrooms:false,
        area:false,
        city:false,
        address:false,
        price:false,
        location:false,
    })
    const [property, setProperty] = useState({
        surname:"",
        name:"",
        phone:"",
        email:'',
        title:'',
        description:'',
        floors:"",
        bedrooms:"",
        bathrooms:"",
        area:"",
        city:"",
        address:"",
        price:"",
        location:[0,0],
       
        
    });   
    
      
  const getUserData= async()=>{

    let userData = await client.query({query:GET_USER, variables:{id:id},fetchPolicy:"no-cache"})        
        .then((data) => {
            setLoading(false);
    setProperty({
        ...property,
        surname:data.data.user.lastName,
        name:data.data.user.firstName,
        phone:data.data.user.phone,
        email:data.data.user.email,
    })
 
  }).catch((error)=>{
     console.log(error);
  });
    
  }
  const [listing,{data,loading:load,error:err}] = useMutation(CREATE_PROPERTY,{
    variables:{
        title:property.title,
        description:property.description,
        floors:parseInt(property.floors),
        bedrooms:parseInt(property.bedrooms),
        bathrooms:parseInt(property.bathrooms),
        area: property.area,
        city:property.city,
        address:property.address,
        price:property.price,
        location:property.location,
        builtOn:"2021-05-28"
    },
    fetchPolicy: "no-cache",
    onCompleted:data=>{if(data){
        refetch()
        alert("Property is listed for sale!")
    }},
    onerror:err=>{console.log(err.messages)}
});
    if (err){console.log(err)}

    useEffect(() => {
        const parent = navigation.dangerouslyGetParent();
            parent.setOptions({
            tabBarVisible: false,
            });
            getUserData()
            
            return () => {
                parent.setOptions({
                    tabBarVisible: true,
                });
            }
        }, [navigation])

    const isValid = ()=>{
        let obj ={}
        for (const [key, value] of Object.entries(property)) {
            
            if (value.length==0){
               obj[key]=true
            }else{
                obj[key]=false
            }
        }
        setError(obj)
        for (const [key, value] of Object.entries(error)){
            if (value===true){
                return false
            }
        }
        return true
    }    
    const addProperty=()=>{
        setProperty({
            ...property,
            location:mapCoords()
        })
        
        if(isValid()){
            listing()
        }
    }


    
   


    return (
        !loading?(
        <ScrollView style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.title}>
                    List Property
                </Text>
            </View>
            <View style={styles.form}>
            {/*Main Info*/}
            <TextInput
                label="Title"
                value={property.title}
                error={error.title}
                name={"title"}
                onChangeText={(title)=>setProperty({...property,title:title})}
            />
            <TextInput
                label="Description"
                multiline={true}
                value={property.description}
                error={error.description}
                name={"description"}
                onChangeText={(desc)=>setProperty({...property,description:desc})}
            />

            {/*Specific Info*/}
            <Text style={styles.h3}>Numerical Information</Text>
            <View style={styles.doubleInputRow}>
            <TextInput
                style={{width:"40%"}}
                label="Floors"
                value={property.floors}
                error={error.floors}
                name={"floors"}
                onChangeText={(floors)=>setProperty({...property,floors:floors})}
                keyboardType="numeric"
            />
            <TextInput
                style={{width:"40%"}}
                label="Area"
                value={property.area}
                error={error.area}
                name={"area"}
                onChangeText={(area)=>setProperty({...property,area:area})}
                keyboardType="numeric"
            />
            </View>
            <View style={styles.doubleInputRow}>
            <TextInput
                style={{width:"40%"}}
                label="Bedrooms"
                value={property.bedrooms}
                error={error.bedrooms}
                name={"bedrooms"}
                onChangeText={(bedrooms)=>setProperty({...property,bedrooms:bedrooms})}
                keyboardType="numeric"
            />
            <TextInput
            style={{width:"40%"}}
                label="Bathrooms"
                value={property.bathrooms}
                error={error.bathrooms}
                name={"bathrooms"}
                onChangeText={(bathrooms)=>setProperty({...property,bathrooms:bathrooms})}
                keyboardType="numeric"
            />
            </View>
            {/*location*/}
            <Text style={styles.h3}>Hold you finger on the map until you mark the location</Text>
            <ListPropertyMap/>
            <TextInput
                label="City/Village"
                value={property.city}
                error={error.city}
                name={"city"}
                onChangeText={(c)=>setProperty({...property,city:c})}
            />
            <TextInput
                label="Address"
                value={property.address}
                error={error.address}
                name={"address"}
                onChangeText={(address)=>setProperty({...property,address:address})}
            />

            <View style={styles.doubleInputRow}>
            <TextInput
                style={{width:"40%"}}
                label="Price"
                value={property.price}
                error={error.price}
                name={"price"}
                onChangeText={(price)=>setProperty({...property,price:price})}
                keyboardType="numeric"
            />
            {/*
            <TextInput
                style={{width:"40%"}}
                label="Date of construction"
                value={property.builtOn}
                name={"builtOn"}
                onChangeText={(builtOn)=>setProperty({...property,builtOn:builtOn})}
                keyboardType="numeric"
            />*/}
            </View>

            {/*Personal Information*/}
            <Text style={styles.h3}>Personal Information</Text>
            <TextInput
                label="Email"
                value={property.email}
                name={"email"}
                disabled
                onChangeText={(e)=>setProperty({...property,email:e})}
            />
            <TextInput
                label="Phone"
                value={property.phone}
                name={"phone"}
                disabled
                onChangeText={(phone)=>setProperty({...property,phone:phone})}
            />
            <TextInput
                label="Name"
                value={property.name}
                name={"name"}
                disabled
                onChangeText={(name)=>setProperty({...property,name:name})}
            />
            <TextInput
                label="Surname"
                mode="flat"
                disabled
                value={property.surname}
                name={"surname"}
                onChangeText={(surname)=>setProperty({...property,surname:surname})}
            />
            
            <Button style={styles.btn} onPress={addProperty} mode="contained">{load ? (
                <Text>Loading...</Text>
              ):(<Text>Add Property</Text>)}</Button>
            
            
            </View>
            



        </ScrollView>):<LoadingComponent/>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eaeaea"
    },
    title: {
        marginTop: 16,
        paddingVertical: 8,
        color: "#20232a",
        fontSize: 30,
        fontWeight: "bold"
    },
    doubleInputRow:{
        flexDirection:"row",
        justifyContent:"space-around",
        marginVertical:20
    },
    h3:{
        marginTop:30,
        marginHorizontal:10,
        fontSize: 15,
        marginBottom:10,
    },
    top:{
        marginHorizontal:10,
        flexDirection:"row",
        justifyContent:"space-between"
    },
    form:{
        marginTop:10,
        marginHorizontal:10,
    },
    btn:{
        marginVertical:20,
        marginHorizontal:"20%",
    },
});

export default ListProperty;
