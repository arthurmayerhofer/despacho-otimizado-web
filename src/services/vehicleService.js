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

export const updateVehicle = async (vehicleId, attribute1, attribute2) => {
  console.log('Received Update Atribbutes:', vehicleId, attribute1, attribute2)

  try {
    const token = await fetchToken(email, password)
    const response = await axios.put(
      `${API_URL}/veiculo/atualizar/${vehicleId}`,
      {
        nome: attribute1,
        eixos: attribute2,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )
    return await response.data.data
    // if (response.ok) {
    //   return await response.json()
    // } else {
    //   throw new Error('Falha ao atualizar o veículo: ' + response.statusText)
    // }
  } catch (error) {
    throw new Error('Erro na requisição: ' + error.message)
  }
}

export const updateVehicleStatus = async (vehicleId, ativo) => {
  console.log('Received Update Atribbutes:', vehicleId, ativo)

  try {
    const token = await fetchToken(email, password)
    const response = await axios.put(
      `${API_URL}/veiculo/alterar-status/${vehicleId}/${ativo}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )
    return await response.data.data
    // if (response.ok) {
    //   return await response.json()
    // } else {
    //   throw new Error('Falha ao atualizar o veículo: ' + response.statusText)
    // }
  } catch (error) {
    throw new Error('Erro na requisição: ' + error.message)
  }
}
