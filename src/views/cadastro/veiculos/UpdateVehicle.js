import React, { useState, useEffect } from 'react'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
  CFormLabel,
  CFormCheck,
  CSpinner
} from '@coreui/react'
import { updateVehicle, updateVehicleStatus } from '../../../services/vehicleService'
import { getVehicleById } from '../../../services/vehicleService'
// import { CIcon } from '@coreui/icons-react';
// import { cilPen } from '@coreui/icons';

const UpdateVehicle = ({ vehicleId }) => {
  const [visible, setVisible] = useState(false)
  const [vehicleData, setVehicleData] = useState({})
  const [nome, setNome] = useState('')
  const [eixos, setEixos] = useState('')
  const [ativo, setAtivo] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // const [attribute3, setAttribute3] = useState('')

  useEffect(() => {
    const fetchVehicleData = async () => {
      setIsLoading(true)

      if (vehicleId) {
        const fetchedVehicle = await getVehicleById(vehicleId)
        setVehicleData(fetchedVehicle)
        setNome(fetchedVehicle.nome || '')
        setEixos(fetchedVehicle.eixos || '')
        setAtivo(fetchedVehicle.ativo || '')
        setIsLoading(false)
      }
    }
    fetchVehicleData()
  }, [vehicleId])

  const handleUpdateVehicle = async () => {
    try {
      const updatedVehicle = await updateVehicle(vehicleId, nome, eixos)
      console.log('Veículo atualizado com sucesso!')
      setVehicleData(updatedVehicle)
      setVisible(false)
    } catch (error) {
      console.error(error.message)
    }
  }

  const handleUpdateVehicleStatus = async () => {
    try {
      setAtivo(!ativo)
      const updatedVehicle = await updateVehicleStatus(vehicleId, ativo)
      console.log('Veículo atualizado com sucesso!')
      setVehicleData(updatedVehicle)
      setVisible(false)
    } catch (error) {
      console.error(error.message)
    }
  }

  // const handleInputChange = (event) => {
  //   setVehicleData({ ...vehicleData, [event.target.name]: event.target.value })
  // }
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target
    const newValue = type === 'checkbox' ? checked : value

    setVehicleData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }))

    if (name === 'nome') {
      setNome(newValue)
      console.log(newValue)
    } else if (name === 'eixos') {
      setEixos(newValue)
      console.log(newValue)
    }
    // else if (name === 'ativo') {
    //   setAttribute3(newValue)
    //   console.log(newValue)
    // }
  }

  return (
    <>
      <CButton color="primary" onClick={() => setVisible(true)} >
        {/* <CIcon icon={cilPen}></CIcon> */}
        Editar
      </CButton>
      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="edit-vehicle-modal"
      >
      {isLoading && <CSpinner color="primary" variant="grow" />}

        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle id="edit-vehicle-modal">Editar Veículo</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <form>
            <CFormLabel htmlFor="nome">Nome</CFormLabel>
            <CFormInput
              id="nome"
              type="text"
              name="nome"
              value={nome}
              onChange={handleInputChange}
            />
            <CFormLabel htmlFor="eixos">Eixos</CFormLabel>
            <CFormInput
              id="eixos"
              type="number"
              name="eixos"
              value={eixos}
              onChange={handleInputChange}
            />
            <div className="mt-2">
              <CButton
                color={ativo ? 'danger' : 'success'} // Set color based on ativo
                variant="outline"
                onClick={handleUpdateVehicleStatus}
              >
                {ativo ? 'Desativar' : 'Ativar'} 
              </CButton>
            </div>
          </form>
        </CModalBody>
        <CModalFooter>
          {/* <CButton color="secondary" onClick={() => setVisible(false)}> */}
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Fechar
          </CButton>
          <CButton color="primary" onClick={handleUpdateVehicle}>
            {' '}
            {/* Removed type="submit" */}
            Salvar
          </CButton>
        </CModalFooter>
        {vehicleData.length === 0 && !isLoading && <p>No vehicles found.</p>}

      </CModal>
    </>
  )
}

export default UpdateVehicle
