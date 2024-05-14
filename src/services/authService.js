import React, { useState } from 'react';
import axios from 'axios';

export const fetchToken = async (email, password) => {
  try {
    const response = await axios.post(
      'https://despacho-otimizado-dev.azurewebsites.net/api/v1/auth/login',
      {
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.succeed) {
      console.log('Fetched token:', response.data.succeed); // Log the fetched token

      return response.data.data.token;
    } else {
      throw new Error('Login failed'); // Throw error for failed login
    }
  } catch (error) {
    throw error; // Rethrow the error for handling in the calling code
  }
};



// import axios from 'axios';

// const login = async (email, password) => {
//   try {
//     const response = await axios.post(
//       'https://despacho-otimizado-dev.azurewebsites.net/api/v1/auth/login',
//       {
//         email,
//         password,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     if (response.data.succeed) {
//       const token = response.data.data.token;
//       const expiration = response.data.data.expiration;
//       return { token, expiration };
//     } else {
//       throw new Error('Login failed. Please check your credentials.');
//     }
//   } catch (error) {
//     throw error;
//   }
// };

// export default login;





