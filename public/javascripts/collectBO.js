var collect={
    setCollect:function(dataArr){
        var arr=[];
        for(let i=dataArr.length-1;i>=0;i--){
            arr.push(dataArr[i]);
        }
        return arr;
    },
    
    stickArr:function(id,arr){
        var arr1=this.setCollect(arr);
        var newArr=[];
        for(let i=0;i<arr1.length;i++){
            if(arr1[i].code==id){
                newArr.unshift(arr1[i]);
            }else{
                newArr.push(arr1[i]);
            }
        }
    
        return newArr;
    }
};

module.exports = collect;