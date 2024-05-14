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
} from '@coreui/react'
import Edit from '../../../components/veiculos/Edit' 
import NewVehicleButton from '../../../components/veiculos/NewVehicleButton'
import { getVehicles } from '../../../services/vehicleService' 

const Veiculos = () => {
  const [vehicles, setVehicles] = useState([]) 
  const [isLoading, setIsLoading] = useState(false) 
  const [error, setError] = useState(null) 

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true) 
      setError(null) 

      try {
        const response = await getVehicles()
        if (response.data) {
          setVehicles(response.data)
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
      <h2>Veículos Prancha</h2>
      {isLoading && <p>Carregando lista...</p>}
      {error && <p className="error">Error: {error}</p>}
      {vehicles.data && ( // Conditionally render the table if "data" exists
        <CCard>
          <CCardHeader>
            <NewVehicleButton /> {/* Add the button to the header */}
          </CCardHeader>
          <CCardBody>
            <CTable hover responsive striped>
              <thead>
                <CTableRow>
                  <CTableHeaderCell>Nome</CTableHeaderCell>
                  <CTableHeaderCell>Eixos</CTableHeaderCell>
                  <CTableHeaderCell>Ativo</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell> {/* Add a column for actions */}
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
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <Edit vehicleId={vehicle.id} /> {/* Pass vehicle ID to Edit component */}
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

export default Veiculos

// const columns = [
//   {
//     key: 'tipoVeiculo',
//     label: 'Tipo Veículo',
//     _props: { scope: 'col' },
//   },
//   {
//     key: 'ativo',
//     label: 'Ativo',
//     _props: { scope: 'col' },
//   },
//   {
//     key: 'editar',
//     label: 'Editar',
//     _props: { scope: 'col' },
//   },
// ]

// const items = [
//   {
//     tipoVeiculo: 'Articulado 2 eixos',
//     ativo: <CFormCheck label="" defaultChecked disabled/>,
//     editar: <Edit />,
//   },
//   {
//     tipoVeiculo: 'Articulado 2 eixos',
//     ativo: <CFormCheck label="" defaultChecked disabled/>,
//     editar: <Edit />,
//   },
//   {
//     tipoVeiculo: 'Articulado 2 eixos',
//     ativo: <CFormCheck label="" defaultChecked disabled/>,
//     editar: <Edit />,
//   },
// ]

// function Veiculos() {
//   return (
//     <>
//       <CCard className="mb-4">
//         <CCardHeader>Veículos Prancha</CCardHeader>
//         <CCardBody>
//         <NewVehicleButton />

//           <CTable hover responsive columns={columns} items={items}>
//             {/* Optional custom rendering */}
//             {/* ... */}
//           </CTable>
//         </CCardBody>
//       </CCard>
//     </>
//   )
// }
// export default Veiculos
