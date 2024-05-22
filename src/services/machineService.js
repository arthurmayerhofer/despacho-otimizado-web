import axios from 'axios'
import { fetchToken } from './authService'

const email = 'amayerhofer@mogai.com.br'
const password = 'Despacho1*'
const API_URL = 'https://despacho-otimizado-dev.azurewebsites.net/api/v1'

export const getMachines = async () => {
  try {
    const token = await fetchToken(email, password)
    const response = await axios.get(`${API_URL}/maquina/listar`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    console.log('Fetched machines:', response.data.data)
    return response
  } catch (error) {
    console.error('Error:', error.message)
  }
}

export const getMachineById = async (id) => {
  try {
    const token = await fetchToken(email, password)
    const response = await axios.get(`${API_URL}/maquina/listar/${id}`, {
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

export const updateMachine = async (machineId, attribute1, attribute2) => {
  // const url = `${API_URL}/maquina/atualizar/${machineId}`
  // const body = {
  //   nome: attribute1,
  //   eixos: attribute2,
  //   ativo: attribute3,
  // }
  console.log('Received Update Atribbutes:', machineId, attribute1, attribute2)

  try {
    const token = await fetchToken(email, password)
    const response = await axios.put(
      `${API_URL}/maquina/atualizar/${machineId}`,
      {
        nome: attribute1,
        eixos: attribute2,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(body),
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
