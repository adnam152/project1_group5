import storageUser from "@/data/localstorage"
import axios from "axios";
import API_user from "./API_user";

export default function userCart(){
    const userId = storageUser.GET_localstorage().id;
    async function getUser(){
        let temp = await axios.get(API_user,{
            params : {
                id: userId
            }
        })
        const [user] = temp.data;
        return user;
    }
    return {
        async GET(){
            return getUser();
        },
        async SET(product){
            let user = await getUser();
            let isSame = false;
            user.cart.forEach((item, index)=>{
                if(item.id === product.productId && item.color === product.color && item.size === product.size){
                    user.cart[index].quantity = parseInt(product.quantity) + parseInt(item.quantity);
                    isSame = true;
                }
            })
            if(!isSame){
                user.cart.push(product);
            };
            await axios.put(API_user+`/${userId}`,{
                ...user
            });
            storageUser.SET_localstorage({
                id: user.id,
                username: user.username,
                cart: user.cart
            });
            document.querySelector('header .quantity').innerText = user.cart.length
        },
        async REMOVE(){

        }
    }
}