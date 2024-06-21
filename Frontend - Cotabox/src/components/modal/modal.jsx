import React, { useState, useEffect } from 'react';
import { ModalOverlay, ModalContainer, ModalHeader, ModalBody, ModalFooter, Label, Button, Input, ButtonCloseModal, TitleModal, SpinnerIcon } from './styled';
import useUpdateParticipation from '../../hooks/updateParticipation';

const EditModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const updateParticipation = useUpdateParticipation();

  //useEffects
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  useEffect(() => {
    if (isSaving) {
      const saveData = async () => {
        try {
          // Validar se a participação excede 100%
          if (formData.participation > 100) {
            throw new Error('A participação não pode exceder 100%.');
          }
          await updateParticipation(formData._id, formData);
          onSave(formData);
          setSaveSuccess(true);
        } catch (error) {
          console.error("Erro in update participation:", error.message);
          setSaveSuccess(false);
        } finally {
          setIsSaving(false);
        }
      };
      saveData();
    }
  }, [isSaving, formData, onSave, updateParticipation]);

  //Handles
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
  };

  const handleCloseModal = () => {
    if (saveSuccess) {
      onClose();
    } else {
      setFormData(initialData || { firstName: '', lastName: '', participation: '' });
      onClose();
    }
  };

  if (!isOpen) return null;

  //Componente
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <TitleModal>Edit Participation</TitleModal>
          <ButtonCloseModal onClick={handleCloseModal}>X</ButtonCloseModal>
        </ModalHeader>
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <Label>
              First Name:
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Label>
            <Label>
              Last Name:
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Label>
            <Label>
              Participation:
              <Input
                type="number"
                name="participation"
                value={formData.participation}
                onChange={handleChange}
              />
            </Label>
          </ModalBody>
          <ModalFooter>
            <Button type="button" onClick={handleCloseModal}>Cancel</Button>
            <Button type="submit" primary disabled={isSaving}>
              {isSaving ? <SpinnerIcon /> : 'Save'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default EditModal;
