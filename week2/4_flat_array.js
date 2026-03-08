
const nestedData = [[[[2]], [[7, 8]]]];

function customFlat(arr, depth = 1) {
  let newArr = [];

  for(let i=0;i<arr.length;i++){
    if(Array.isArray(arr[i]) && depth !== 0) {
        newArr.push(...customFlat(arr[i], depth - 1))
    } else {
        newArr.push(arr[i])
    }
  }
  return newArr;
}

console.log(customFlat(nestedData, 1), nestedData.flat(1)); // [ [ [ 2 ] ], [ [ 7, 8 ] ] ]
console.log(customFlat(nestedData, 2), nestedData.flat(2)); // [ [ 2 ], [ 7, 8 ] ]
console.log(customFlat(nestedData, Infinity), nestedData.flat(Infinity)); // [2, 7, 8]