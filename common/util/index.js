import React from 'react';



export function createConstants(...constants) {
    return constants.reduce((acc, constant) => {
        acc[constant] = constant;
        return acc;
    }, {});
}




export function parseJSON(response) {
     return response.json()


}
