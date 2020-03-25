
import {requestNotLoad} from '@/utils';
let areaList=[];
export default function GetAreaList(){
    return new Promise((resolve,reject)=>{
        if(areaList.length<1){
            requestNotLoad('Area/GetAllAreaList',{
            },'post').then(res=>{
                areaList = res.obj;
                resolve(res.obj);
            })
        }else{
            resolve(areaList)
        }
    })
}