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
import API_cloudinary from "@/API/API_cloudinary";
import renameTitle from "@/components/title";

export default function adminPage() {
    const user = storage.GET_localstorage();
    if (!user || user.username != 'administrator') {
        location.href = '/';
    }
    renameTitle('Clothing Shop - Manager');
    (async () => {
        let allProducts = await getData();
        const CLOUDINARY = API_cloudinary();
        const adminTag = document.querySelector('#admin-page');
        const tbody = adminTag.querySelector('tbody');
        // RENDER - UPDATE - DELETE
        function renderTable() {
            const component = () =>
                allProducts.map((item, index) => {
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
                            .join('')}
                                    <div data-id = "${item.id}" class="add_one_link">+</div>
                                </td>
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
            document.querySelectorAll('.add_one_link').forEach(button => {
                button.onclick = function () {
                    let inputImage = document.createElement('input');
                    inputImage.type = 'file';
                    inputImage.multiple = true;
                    inputImage.accept = "image/*"
                    inputImage.click();
                    inputImage.onchange = async function () {
                        let dataID = button.getAttribute('data-id');
                        let thisProduct = await getOneProduct(dataID);
                        let dataSend = {
                            ...thisProduct,
                        }
                        for (const file of inputImage.files) {
                            const urlImage = await uploadImage(file);
                            dataSend['galeryImage'].push(urlImage);
                        }
                        await updateData(dataID, dataSend);
                        alertMessage('Success', 'Update successful');
                        let allProductsIndex = allProducts.findIndex(item => item.id == dataSend.id);
                        allProducts[allProductsIndex] = dataSend;
                        renderTable();
                    }
                }
            })
            tbody.ondblclick = function (e) {
                let thisNode = e.target;
                if (thisNode.getAttribute('data-id') && thisNode.tagName != "BUTTON") {
                    let inputElement = document.createElement('input');
                    let currentValue = thisNode.innerText;
                    inputElement.type = 'text';
                    inputElement.value = currentValue;
                    thisNode.innerText = '';
                    thisNode.appendChild(inputElement);
                    inputElement.focus();

                    let keyESC = false;
                    let keyEnter = false;
                    async function update() {
                        let dataType = thisNode.getAttribute('data-type');
                        let dataID = thisNode.getAttribute('data-id');
                        let thisProduct = await getOneProduct(dataID);
                        let dataSend = {
                            ...thisProduct,
                        }
                        if (dataType != 'galeryImage') dataSend[dataType] = inputElement.value;
                        else {
                            let dataIndex = thisNode.getAttribute('data-index');
                            inputElement.value.trim() == '' ? dataSend[dataType].splice(dataIndex, 1) : dataSend[dataType][dataIndex] = inputElement.value;
                        }
                        await updateData(dataID, dataSend);
                        alertMessage('Success', 'Update successful');
                        let allProductsIndex = allProducts.findIndex(item => item.id == dataSend.id);
                        allProducts[allProductsIndex] = dataSend;
                        renderTable();
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
                        alertMessage('Success', 'Delete successful')
                        renderTable();
                    })
                }
            });
        }
        renderTable();

        // CREATE
        async function uploadImage(file) {
            const folderName = CLOUDINARY.folderName;
            const presetName = CLOUDINARY.presetName;
            const api = CLOUDINARY.API_upload;
            const formData = new FormData();
            formData.append("upload_preset", presetName);
            formData.append("folder", folderName);
            formData.append("file", file);
            const temp = await axios.post(api, formData, {
                headers: 'multipart/form-data'
            })
            return temp.data.url;
        }
        (function () {
            const inputProducts = adminTag.querySelectorAll('.admin_add input:not([type="file"])');
            const createBtn = adminTag.querySelector('.admin_add button');

            createBtn.onclick = async function () {
                const inputFile = adminTag.querySelector('input.admin_add_upload');

                let data = {
                    id: uuidv4(),
                };
                data['galeryImage'] = [];
                inputProducts.forEach(inputTag => {
                    let dataType = inputTag.getAttribute('data-type');
                    if (dataType != 'galeryImage') data[dataType] = inputTag.value;
                })
                for (const file of inputFile.files) {
                    data['galeryImage'].push(await uploadImage(file));
                }
                alertMessage('Adding', 'wait a second...')
                createData(data).then(() => {
                    alertMessage('Success', 'Add successful')
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
                <input type="text" class="admin_add_status" placeholder="Product status" data-type="status">
                <input type="text" class="admin_add_description" placeholder="Product description" data-type="description">
                <input type="file" multiple accept="image/*" class="admin_add_upload">
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