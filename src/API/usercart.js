import storageUser from "@/data/localstorage"
import axios from "axios";
import API_user from "./API_user";

export default function userCart(){
    const userId = storageUser.GET_localstorage()?.id;
    async function getUser(){
        let temp = await axios.get(API_user,{
            params : {
                id: userId
            }
        })
        const [user] = temp.data;
        return user;
    }
    async function updateUser(user){
        await axios.put(API_user+`/${userId}`,{
            ...user
        });
        storageUser.SET_localstorage({
            id: user.id,
            username: user.username,
            cart: user.cart
        });
    }
    return {
        async GET(){
            return getUser();
        },
        async SET(product, option=''){
            let user = await getUser();
            let index = user.cart.findIndex(item =>{
                return item.productId === product.productId && item.color === product.color && item.size === product.size
            })
            if(index == -1) user.cart.push(product);
            else if(option == 'update') user.cart[index].quantity = parseInt(product.quantity);
            else user.cart[index].quantity = parseInt(product.quantity) + parseInt(user.cart[index].quantity);

            updateUser(user);
            document.querySelector('header .quantity').innerText = user.cart.length
        },
        async REMOVE(id){
            let user = await getUser();
            let index = user.cart.findIndex(item=>{
                return item.productId == id;
            });
            if(index != -1){
                user.cart.splice(index,1);
                updateUser(user);
                document.querySelector('header .quantity').innerText = user.cart.length
            }
            else console.log('Can not found product');
        }
    }
}