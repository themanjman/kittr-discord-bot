
module.exports = async (arr, size) => {
    return new Promise((resolve, reject) => {
        
        const result = Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
                arr.slice(i * size, i * size + size)
        );
        
        resolve(result); 
        
    });

}
//     //console.log(chunk([1, 2, 3, 4, 5], 2));

