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
} from '@coreui/react'
import { updateVehicle } from '../../services/vehicleService' 
import { getVehicleById } from '../../services/vehicleService'
// import { CIcon } from '@coreui/icons-react';
// import { cilPen } from '@coreui/icons';

const Edit = ({ vehicleId }) => {
  const [visible, setVisible] = useState(false)
  const [vehicleData, setVehicleData] = useState({})
  useEffect(() => {
    const fetchVehicleData = async () => {
      if (vehicleId) {
        const fetchedVehicle = await getVehicleById(vehicleId) 
        setVehicleData(fetchedVehicle)
      }
    }

    fetchVehicleData()
  }, [vehicleId]) 

  const handleEdit = async (event) => {
    event.preventDefault()
    try {
      const response = await updateVehicle(vehicleId, vehicleData)
      if (response.ok) {
        setVisible(false)
        console.log('Vehicle successfully updated!')
      } else {
        const errorData = await response.json() 
        console.error('Error updating vehicle:', errorData.message || response.statusText)
      }
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  const handleInputChange = (event) => {
    setVehicleData({ ...vehicleData, [event.target.name]: event.target.value })
  }

  return (
    <>
      <CButton color="primary" onClick={() => setVisible(true)}>
        {/* <CIcon icon={cilPen}></CIcon> */}
      </CButton>
      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="edit-vehicle-modal"
      >
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle id="edit-vehicle-modal">Editar Veículo</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <form onSubmit={handleEdit}>
            <CFormLabel htmlFor="id">ID</CFormLabel>
            <textarea id="id" name="id" rows="1" value={vehicleData.id || ''} disabled />{' '}
            {/* Display ID as read-only */}
            <CFormInput
              label="Nome"
              type="text"
              name="nome"
              value={vehicleData.nome || ''}
              onChange={handleInputChange}
            />
            <CFormInput
              label="Eixos"
              type="number"
              name="eixos"
              value={vehicleData.eixos || 0}
              onChange={handleInputChange}
            />
            <CFormInput
              label="Ativo"
              type="checkbox"
              name="ativo"
              checked={vehicleData.ativo || false} 
              onChange={handleInputChange} 
            />
          </form>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Fechar
          </CButton>
          <CButton color="primary" onClick={handleEdit}>
            {' '}
            {/* Removed type="submit" */}
            Salvar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Edit
