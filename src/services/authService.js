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



