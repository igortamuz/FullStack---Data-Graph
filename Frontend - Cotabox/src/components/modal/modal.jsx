import React, { useState, useEffect } from 'react';
import { ModalOverlay, ModalContainer, ModalHeader, ModalBody, ModalFooter, Label, Button, Input, ButtonCloseModal, TitleModal, SpinnerIcon, FloatingMessage } from './styled';
import useUpdateParticipation from '../../hooks/updateParticipation';

const EditModal = ({ isOpen, onClose, onSave, initialData, totalParticipation }) => {
  const [formData, setFormData] = useState(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const updateParticipation = useUpdateParticipation();

  // useEffects
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  useEffect(() => {
    if (isSaving) {
      const saveData = async () => {
        try {
          const updatedParticipationValue = parseFloat(formData.participation);
          const newTotalParticipation = totalParticipation - parseFloat(initialData.participation) + updatedParticipationValue;

          if (newTotalParticipation > 100) {
            throw new Error('A participação total não pode exceder 100%.');
          }

          await updateParticipation(formData._id, formData);
          onSave(formData);
          setSaveSuccess(true);
        } catch (error) {
          console.error("Erro in update participation:", error.message);
          setErrorMessage(error.message);
          setSaveSuccess(false);
        } finally {
          setIsSaving(false);
        }
      };
      saveData();
    }
  }, [isSaving, formData, onSave, totalParticipation, initialData, updateParticipation]);

  // Handles
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

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  if (!isOpen) return null;

  // Componente
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
        {errorMessage && (
          <FloatingMessage type="error">
            {errorMessage}
          </FloatingMessage>
        )}
      </ModalContainer>
    </ModalOverlay>
  );
};

export default EditModal;
