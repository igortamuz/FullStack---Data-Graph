import React, { useState, useEffect } from 'react';
import { HeaderContainer, Input, Button, Form, FloatingMessage, SpinnerIcon } from './styled';
import useSendParticipation from '../../hooks/postParticipation';

const Header = ({ totalParticipation }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    participation: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const sendParticipation = useSendParticipation();

  //Handles
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    if (!formData.firstName || !formData.lastName || !formData.participation) {
      setErrorMessage('Por favor, preencha todos os campos.');
      setLoading(false);
      return;
    }

    const participationValue = parseFloat(formData.participation);

    if (isNaN(participationValue)) {
      setErrorMessage('A participação deve ser um número válido.');
      setLoading(false);
      return;
    }

    if (totalParticipation + participationValue > 100) {
      setErrorMessage('A soma das participações não pode exceder 100%. Por favor, exclua ou edite os valores existentes.');
      setLoading(false);
      return;
    }

    try {
      const result = await sendParticipation({
        ...formData,
        participation: participationValue,
      });
      console.log('Form data submitted successfully: ', result);
      setFormData({
        firstName: '',
        lastName: '',
        participation: '',
      });
      setErrorMessage(null);
    } catch (error) {
      console.error('Error submitting form data: ', error);
      setErrorMessage('Erro ao enviar os dados do formulário. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  //useEffect
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  //Componente
  return (
    <HeaderContainer>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="participation"
          placeholder="Participation"
          value={formData.participation}
          onChange={handleChange}
        />
        <Button type="submit" disabled={loading}>
          {loading ? <SpinnerIcon /> : 'Send'}
        </Button>
      </Form>
      {errorMessage && (
        <FloatingMessage type="error">
          {errorMessage}
        </FloatingMessage>
      )}
    </HeaderContainer>
  );
};

export { Header };
