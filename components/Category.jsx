import React, { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { Colors } from '../constants/Colors'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../configs/FirebaseConfigs'
import CategoryItem from './CategoryItem'
import { useRouter } from 'expo-router'

export default function Category() {
    const router=useRouter();
    const [categoryList, setCategoryList]=useState([]);
    useEffect(()=>{
        GetCategoryList();
    },[])

    const GetCategoryList = async()=>{
        setCategoryList([])
        const q = query(collection(db,'Category'));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
           console.log(doc.data());
            setCategoryList(prev=>[...prev,doc.data()])


        });
    }
    return (
    <View>
        <View style={{display:'flex',padding: 20,
            flexDirection:'row', justifyContent:'space-between',
            marginTop:10,
        }}>

            <Text style={{
                fontSize:20,
                fontFamily:'flux-bold',
                fontWeight:'bold',
            }}>Category</Text>

            <Text style={{color:Colors.PRIMARY}}>View all</Text>
        </View>

        <View>
            <FlatList 
            horizontal={true}
                data={categoryList}
                style={{marginLeft:15}}
                renderItem={({item,index})=>(
                   <CategoryItem category={item} key={index} onCategoryPress={(category)=>router.push('/deviceList/'+item.name)}/>
                )}
             />
        </View>
    </View>
  )
}
