// import axios from "axios";
import { getData, storageKeys } from "../components/asyncStorage"
// export function documentPost(url, data, successCallback, errorCallback) {
//   console.log(url)
//   console.log(data)
//   axios
//     .post(
//       url,
//       data,
//       {
//         headers: {
//           "Accept": "multipart/form-data",
//           "Content-Type":"multipart/form-data"
//         }
//       }
//     )
//     .then((response) => {
//       console.log(JSON.stringify(response.data))
//       successCallback(response.data);
//       return response.data;
//     })
//     .catch((error) => {
//       if (error.response) {
//         errorCallback(error.response);
//       }
//       return error;
//     });
// }

// export function get(url, successCallback, errorCallback) {
//   axios.get(
//     url,
//     {
//       headers: {
//         Accept: "application/json",

//       }
//     }
//   )
//     .then((response) => {
//       successCallback(response.data);
//       // return response;
//     })
//     .catch((error) => {
//       errorCallback(error.response);
//       // return error;
//     });
// }




export async function post(url, data, successCallback, errorCallback) {
  console.log(url)

  var localData = await getData(storageKeys.loginDetails)

  var accessToken = ""
  if (localData && localData.accessToken) {
    accessToken = localData.accessToken
  }

  
  var header = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    'Access-Control-Allow-Origin': 'http://localhost:19000',
    "Access-Control-Allow-Credentials": "true"
  }

  if (accessToken) {
    header["Authorization"] = accessToken
  }

  console.log(url)
  
  console.log(data)
  fetch(url, {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data),
  }).then((response) => response.json())
    .then((responseJson) => {
      console.log("Success")
      // console.log(responseJson)
      successCallback(responseJson)
      return responseJson
    })
    .catch((error) => {
      console.log("error")
      console.log(error)
      errorCallback(error)
    });
}


export function get(url, successCallback, errorCallback) {
  console.log(url)
  fetch(url, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: "",
  }).then((response) => response.json())
    .then((responseJson) => {
      successCallback(responseJson)
      return responseJson
    })
    .catch((error) => {
      console.log(error)
      errorCallback(error)
    });
}
