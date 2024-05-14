import axios from 'axios'
import { fetchToken } from './authService' 

const email = 'amayerhofer@mogai.com.br'
const password = 'Despacho1*' 
const API_URL = 'https://despacho-otimizado-dev.azurewebsites.net/api/v1'

export const getVehicles = async () => {
  try {
    const token = await fetchToken(email, password) 
    const response = await axios.get(`${API_URL}/veiculo/listar`, {
      headers: {
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'application/json', 
      },
    })
    console.log('Fetched vehicles:', response.data.data) 
    return response 
  } catch (error) {
    console.error('Error:', error.message)
  }
}

export const getVehicleById = async (id) => {
  try {
    const token = await fetchToken(email, password) 
    const response = await axios.get(`${API_URL}/veiculo/listar/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'application/json', 
      },
    })

    return response.data.data
  } catch (error) {
    console.error('Error:', error.message)
  }
}

export const updateVehicle = async (vehicleId, vehicleData) => {
  try {
    const token = await fetchToken(email, password) 
    const response = await axios.put(`${API_URL}/veiculo/atualizar/${vehicleId}`, vehicleData, {
      headers: {
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'application/json', 
      },
    })

    if (response.status === 200) {
      console.log('Vehicle updated successfully:', response.data)
      if (onSuccess) {
        onSuccess() 
      }
    } else {
      console.error('Error updating vehicle:', response.statusText)
      if (onError) {
        onError(response.statusText)
      }
    }
  } catch (error) {
    console.error('Error:', error.message)
    if (onError) {
      onError(error.message)
    }
  }
}
