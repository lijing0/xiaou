import axios from 'axios'

function get(url,params = {}){
    const token = sessionStorage.getItem('umember') ? JSON.parse(sessionStorage.getItem('umember')).token : '';
    return new Promise((resolve,reject) => {
        axios({
            url,
            params,
            headers:{
                'Authorization':token
            }
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

function post(url,data = {}){
    const token = sessionStorage.getItem('umember') ? JSON.parse(sessionStorage.getItem('umember')).token : '';
    return new Promise((resolve,reject) => {
        axios({
            url,
            method:'post',
            data,
            headers:{
                'Authorization': token
            }
        }).then(res => {
            resolve(res);
        }).catch(err=>{
            reject(err);
        })
    })
}
export default {get,post}