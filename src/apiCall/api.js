import axios from "axios";

// This is base url
// REACT_APP_BASE_URL commiing from .env file
// REACT_APP_BASE_URL = http://localhost:3333
export const baseUrl = process.env.REACT_APP_BASE_URL;

/**
 * @description : this is for get the data form end point
 * @param {*} url : "http://localhost:3333/test"

 */
export const getDataApi = (url) => {
    return axios.get(`${baseUrl}/${url}`)
}

/**
 * 
 * @description : This is for post the data form end point
 * @param {*} url : "http://localhost:3333/test"
 * @param {*} postData : Post data contains object  
 */
export const postDataApi = (url, postData, options = {}) => {
    return axios.post(`${baseUrl}/${url}`, postData, options)
}

/**
 * 
 * @description : This is for update the data form end point
 * @param {*} url : http://localhost:3333/id
 * @param {*} putData : put data contans object  add update one selected feils
 */
export const patchDataApi = (url, putData) => {
    return axios.patch(`${baseUrl}/${url}`, putData)
}


/**
 * description : delete the selected element its contains id
 * @param {*} url : http://localhost:3333/id
 */
export const deleteDataApi = (url) => {
    return axios.delete(`${baseUrl}/${url}`)
}