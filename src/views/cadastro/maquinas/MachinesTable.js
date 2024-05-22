import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CFormCheck,
  CSpinner,
} from '@coreui/react'
// import UpdateMachine from '../../../components/Maquinas/UpdateMachine'
// import NewMachineButton from '../../../components/Maquinas/CreateMachine'
import { getMachines } from '../../../services/machineService'

const Maquinas = () => {
  const [vehicles, setMachines] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await getMachines()
        if (response.data) {
          setMachines(response.data)
        } else {
          setError('Unexpected API response structure.') // Set error message
        }
      } catch (error) {
        setError(error.message) // Set error message
        console.error('Error fetching vehicles:', error)
      } finally {
        setIsLoading(false) // Clear loading indicator after fetching (success or error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h2>Máquinas</h2>
      {isLoading && <CSpinner color="primary" variant="grow" />}
      {error && <p className="error">Error: {error}</p>}
      {vehicles.data && ( // Conditionally render the table if "data" exists
        <CCard>
          <CCardHeader>
          {/*  <NewMachineButton />  Add the button to the header */}
          </CCardHeader>
          <CCardBody>
            <CTable hover responsive striped>
              <thead>
                <CTableRow>
                  <CTableHeaderCell>Tipo de máquina</CTableHeaderCell>
                  <CTableHeaderCell>Qtd</CTableHeaderCell>
                  <CTableHeaderCell>Tipo de prancha</CTableHeaderCell>
                  <CTableHeaderCell>Ativa</CTableHeaderCell> {/* Add a column for actions */}
                  <CTableHeaderCell>Action</CTableHeaderCell> {/* Add a column for actions */}
                </CTableRow>
              </thead>
              <tbody>
                {vehicles.data.map(
                  (
                    vehicle, // Access data from "data" property
                  ) => (
                    <CTableRow key={vehicle.id}>
                      <CTableDataCell>{vehicle.nome}</CTableDataCell>
                      <CTableDataCell>{vehicle.eixos}</CTableDataCell>
                      <CTableDataCell>
                        <CFormCheck
                          type="radio"
                          id={`vehicle-active-${vehicle.id}`} // Add unique ID for each checkbox
                          checked={vehicle.ativo} // Set checked based on "ativo" property
                          readOnly
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                      {/*   <UpdateMachine vehicleId={vehicle.id} /> Pass vehicle ID to Edit component */}
                      </CTableDataCell>
                    </CTableRow>
                  ),
                )}
              </tbody>
            </CTable>
          </CCardBody>
        </CCard>
      )}
      {vehicles.length === 0 && !isLoading && <p>No vehicles found.</p>}
    </div>
  )
}

export default Maquinas