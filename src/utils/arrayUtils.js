/*
clearArray.js 
Parameter: 
Return: 
*/

export function clearArray(list) {
    list = [];
    return list; 
}

export function duplicateArray(list) {
    let duplicate = []
    for (let i = 0; i < list.length; i++) {
        duplicate.push(list[i]);
    }
    return duplicate;
}

export function searchArray(list) {
    let indices = []; 
    let duplicates = [];    // list of repeating values 

    list.sort();

    console.log(`Sorted: ${list}`);
    
    for (let i = 0; i < list.length; i++) {
        let repeating = false; 
        for (let j = i + 1; j < list.length; j++) {
            if (list[i] === list[j]) {
                if (!repeating) {
                    duplicates.push(list[i])
                    indices.push(j);
                }
                repeating = true;
                break;
            }
        }
    }

    console.log(`Duplicates: ${duplicates}`);
    console.log(`Indices: ${indices}`);

    return ( duplicates, indices );
}

export function removeDuplicates(list, duplicates) {
    let count = 0; 
    
    while (count < duplicates.length) {
      let x = list.indexOf(duplicates[count]);
      list.splice(x, 1);
      count++; 
    }
  }