import React, { useState } from 'react';
import { CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CFormInput } from '@coreui/react';

const NewVehicleButton = () => {
  const [visible, setVisible] = useState(false);
  const [newVehicleData, setNewVehicleData] = useState({
    nome: '',
    eixos: 0,
    ativo: false,
  });

  const handleAdd = async (event) => {
    event.preventDefault(); 

    const response = await fetch(/* Your API endpoint */ + '/vehicles', {
      method: 'POST',
      body: JSON.stringify(newVehicleData),
    });

    if (response.ok) {
      // Handle successful creation (e.g., close modal, show success message)
      setVisible(false);
      setNewVehicleData({ nome: '', eixos: 0, ativo: false }); // Reset form data
    } else {
      // Handle creation error (e.g., show error message)
      console.error('Error creating vehicle:', response.statusText);
    }
  };

  const handleInputChange = (event) => {
    setNewVehicleData({ ...newVehicleData, [event.target.name]: event.target.value });
  };

  return (
    <>
      <CButton color="primary" onClick={() => setVisible(true)}>Adicionar</CButton>
      <CModal visible={visible} onClose={() => setVisible(false)} aria-labelledby="add-vehicle-modal">
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle id="add-vehicle-modal">Novo Veículo</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <form onSubmit={handleAdd}>
            <CFormInput label="Nome" type="text" name="nome" value={newVehicleData.nome} onChange={handleInputChange} />
            <CFormInput label="Eixos" type="number" name="eixos" value={newVehicleData.eixos} onChange={handleInputChange} />
            <CFormInput label="Ativo" type="checkbox" name="ativo" checked={newVehicleData.ativo} onChange={handleInputChange} />
          </form>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Fechar
          </CButton>
          <CButton color="primary" type="submit" form="add-vehicle-form">
            Salvar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default NewVehicleButton;
