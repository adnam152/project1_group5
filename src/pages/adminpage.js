import getData from "@/API/getdata";
import updateData from "@/API/updatedata";
import getOneProduct from "@/API/getone";
import deleteData from "@/API/deletedata";
import createData from "@/API/createdata";
import { app, render } from "@/utilities";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import storage from "@/data/localstorage";
import alertMessage from "@/components/alert";

export default function adminPage() {
    const user = storage.GET_localstorage();
    if(!user || user.username != 'administrator'){
        location.href = 'http://localhost:5173/';
    }

    (async () => {
        let allProducts = await getData();
        const adminTag = document.querySelector('#admin-page');
        const tbody = adminTag.querySelector('tbody');
        // RENDER - UPDATE - DELETE
        function renderTable() {
            const component = () =>
                allProducts.filter(item => item)
                    .map((item, index) => {
                        return `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${item.id}</td>
                                <td class="product-name" data-type="name"  data-id = "${item.id}">${item.name}</td>
                                <td class="product-price" data-type="price" data-id = "${item.id}">${item.price}</td>
                                <td class="product-img">${item.galeryImage.map(
                                    (img, i) => 
                                        `${img && `<img src="${img}">`}
                                        <p data-type="galeryImage" data-index="${i}" data-id = "${item.id}">${img}</p><br>`)
                                    .join('')}</td>
                                <td class="product-description" data-type="description" data-id = "${item.id}">${item.description}</td>
                                <td class="product-category" data-type="category" data-id = "${item.id}">${item.category}</td>
                                <td class="product-status" data-type="status" data-id = "${item.id}">${item.status}</td>
                                <td>
                                    <button class="delete" data-id = "${item.id}">Delete</button>
                                </td>
                            </tr>
                        `
                    })
                    .join('');
            tbody.innerHTML = component();
            // UPDATE
            tbody.ondblclick = function (e) {
                let keyESC = false;
                let keyEnter = false;
                let thisNode = e.target;
                if (thisNode.getAttribute('data-id') && thisNode.tagName != "BUTTON") {
                    let inputElement = document.createElement('input');
                    let currentValue = thisNode.innerText;
                    inputElement.type = 'text';
                    inputElement.value = currentValue;
                    thisNode.innerText = '';
                    thisNode.appendChild(inputElement);
                    inputElement.focus();

                    async function update() {
                        let dataID = thisNode.getAttribute('data-id');
                        let dataType = thisNode.getAttribute('data-type');
                        let thisProduct = await getOneProduct(dataID);
                        let dataSend = {
                            ...thisProduct,
                        }
                        if (dataType != 'galeryImage') dataSend[dataType] = inputElement.value;
                        else {
                            let dataIndex = thisNode.getAttribute('data-index');
                            dataSend[dataType][dataIndex] = inputElement.value;
                        }

                        let allProductsIndex = allProducts.findIndex(item => {
                            return item.id == dataID;
                        })
                        allProducts[allProductsIndex] = dataSend;
                        updateData(dataID, dataSend).then(() => {
                            alertMessage('Success','Update successful')
                            renderTable();
                        })
                    }
                    inputElement.onkeyup = function (event) {
                        if (event.code == 'Enter') {
                            keyEnter = true;
                            update();
                        }
                        if (event.code == 'Escape') {
                            keyESC = true;
                            renderTable();
                        }
                    }
                    inputElement.onblur = function () {
                        if (!keyESC && !keyEnter) update();
                    }
                }
            }
            // DELETE
            const deleteBtns = adminTag.querySelectorAll('button.delete');
            deleteBtns.forEach((btn, index) => {
                let dataID = btn.getAttribute('data-id');
                btn.onclick = function () {
                    deleteData(dataID).then(() => {
                        allProducts.splice(index, 1);
                        alertMessage('Success','Delete successful')
                        renderTable();
                    })
                }
            });
        }
        renderTable();

        // CREATE
        (function () {
            const inputProducts = adminTag.querySelectorAll('.admin_add input:not([type="file"])');
            const createBtn = adminTag.querySelector('.admin_add button');

            createBtn.onclick = async function () {
                const inputFile = adminTag.querySelector('input.admin_add_upload');
                const CLOUDNAME = 'dzkdgm4c7';
                const FOLDERNAME = 'WorkShop 1';
                const PRESETNAME = 'Workshop1';
                const api = `https://api.cloudinary.com/v1_1/${CLOUDNAME}/image/upload`;
                const formData = new FormData();
                formData.append("upload_preset", PRESETNAME);
                formData.append("folder", FOLDERNAME);

                let data = {
                    id: uuidv4(),
                };
                data['galeryImage'] = [];
                inputProducts.forEach(inputTag => {
                    let dataType = inputTag.getAttribute('data-type');
                    if(dataType != 'galeryImage') data[dataType] = inputTag.value;
                })

                for (const file of inputFile.files) {
                    formData.append("file", file);
                    const temp = await axios.post(api, formData, {
                        headers: 'multipart/form-data'
                    })
                    const linkUpload = temp.data.url;
                    data['galeryImage'].push(linkUpload);
                }
                alertMessage('Adding','wait a second...')
                createData(data).then(() => {
                    alertMessage('Success','Add successful')
                    render(app, adminPage)
                })
            }
        })();
    })();

    return `
        <div id="admin-page">
        <a href='/' class="visitWeb">Return Web</a>
            <div class="admin_add">
                <input type="text" class="admin_add_name" placeholder="Product Name" data-type="name">
                <input type="text" class="admin_add_price" placeholder="Product Price" data-type="price">
                <input type="text" class="admin_add_category" placeholder="Product category" data-type="category">
                <input type="text" class="admin_add_description" placeholder="Product description" data-type="description">
                <input type="file" multiple class="admin_add_upload">
                <button id="admin_add_btn">Add</button>
            </div>
            <i>(Double click to edit)</i>
            <table border="1" class="admin_table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Link image</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                
                </tbody>
            </table>
        </div>
    `
}