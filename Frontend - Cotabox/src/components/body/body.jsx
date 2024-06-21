import React, { useState, useEffect } from 'react';
import EditModal from '../modal/modal';
import { BodyContainer, Table, ChartContainer, GeralContainer, LegendContainer, LegendItem, ChartAndLegendContainer, LegendText, SpinnerIcon } from "./styled";
import useGetParticipation from '../../hooks/getParticipation';
import useDeleteParticipation from '../../hooks/deleteParticipation';
import useUpdateParticipation from '../../hooks/updateParticipation';
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Header } from '../index';

Chart.register(ArcElement, ChartDataLabels);

// Plugin personalizado para rótulo central
const centerLabelPlugin = {
  id: 'centerLabel',
  afterDraw(chart) {
    const { ctx, chartArea: { width, height } } = chart;
    ctx.save();

    const totalParticipation = chart.config.options.plugins.centerLabel.text;

    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#000';

    ctx.fillText(totalParticipation, width / 2, height / 2);
    ctx.restore();
  }
};

Chart.register(centerLabelPlugin);

function Body() {
  const [participationData, setParticipationData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingDeleteId, setLoadingDeleteId] = useState(null);
  const [currentEditData, setCurrentEditData] = useState(null);
  const getParticipation = useGetParticipation();
  const deleteParticipation = useDeleteParticipation();
  const updateParticipation = useUpdateParticipation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getParticipation();
        data.sort((a, b) => a.participation - b.participation);
        const formattedData = data.map(item => ({
          ...item,
          participation: parseFloat(item.participation)
        }));
        setParticipationData(formattedData);
      } catch (error) {
        console.error("Erro in get participation:", error.message);
      }
    };
    fetchData();
  }, [getParticipation]);

  // Calcula a soma total
  const totalParticipation = participationData.reduce((sum, item) => sum + item.participation, 0);

  // Handles
  const handleDelete = async (id) => {
    setLoadingDeleteId(id);
    try {
      await deleteParticipation(id);
      const updatedData = await getParticipation();
      const formattedData = updatedData.map(item => ({
        ...item,
        participation: parseFloat(item.participation)
      }));
      setParticipationData(formattedData);
    } catch (error) {
      console.error("Erro in delete participation:", error.message);
    } finally {
      setLoadingDeleteId(null);
    }
  };

  const handleEdit = (id) => {
    const item = participationData.find(dataItem => dataItem._id === id._id);
    if (item) {
      setCurrentEditData(item);
    } else {
      const fetchData = async () => {
        try {
          const data = await getParticipation();
          const formattedData = data.map(item => ({
            ...item,
            participation: parseFloat(item.participation)
          }));
          setParticipationData(formattedData);
        } catch (error) {
          console.error("Erro in get participation:", error.message);
        }
      };
      fetchData();
    }
  };

  const handleSave = async (updatedData) => {
    try {
      await updateParticipation(updatedData._id, updatedData);
      const newData = participationData.map(item =>
        item._id === updatedData._id ? {
          ...item,
          participation: parseFloat(updatedData.participation)
        } : item
      );
      setParticipationData(newData);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro in update participation:", error.message);
    }
  };

  // Controle do gráfico
  const chartOptions = {
    animation: {
      duration: 1000
    },
    plugins: {
      centerLabel: {
        display: true,
        text: totalParticipation.toFixed(2) + '%',
      }
    }
  };

  const chartData = {
    labels: participationData.map(item => `${item.firstName} ${item.lastName}`),
    datasets: [{
      data: participationData.map(item => item.participation),
      backgroundColor: [
        'rgba(243, 75, 111, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(211, 154, 12, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 0, 0, 0.6)',
        'rgba(0, 255, 0, 0.6)',
        'rgba(0, 0, 255, 0.6)',
        'rgba(196, 196, 49, 0.6)',
        'rgba(255, 0, 255, 0.6)',
        'rgba(43, 112, 112, 0.6)',
        'rgba(128, 0, 128, 0.6)',
        'rgba(202, 202, 30, 0.6)',
        'rgba(0, 128, 128, 0.6)'
      ]
    }]
  };

  // useEffect
  useEffect(() => {
    if (currentEditData !== null) {
      setIsModalOpen(true);
    }
  }, [currentEditData]);

  return (
    <>
      <Header totalParticipation={totalParticipation} />
      <BodyContainer>
        <h2>DATA</h2>
        <p>FullStack Challenge</p>
        <div className="content">
          <GeralContainer>
            <Table>
              <thead>
                <tr>
                  <th></th>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Participation</th>
                  <th>Delete</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {participationData.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}º</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{typeof item.participation === 'number' ? item.participation.toFixed(2) + '%' : item.participation}</td>
                    <td>
                      {loadingDeleteId === item._id ? (
                        <SpinnerIcon />
                      ) : (
                        <FaTrashAlt onClick={() => handleDelete(item._id)} />
                      )}
                    </td>
                    <td><FaPencilAlt onClick={() => handleEdit(item)} /></td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <ChartAndLegendContainer>
              <ChartContainer>
                <Doughnut data={chartData} options={chartOptions} />
              </ChartContainer>
              <LegendContainer>
                {participationData.map((item, index) => (
                  <LegendItem key={index} color={chartData.datasets[0].backgroundColor[index]}>
                    <LegendText color={chartData.datasets[0].backgroundColor[index]}>
                      {`${item.firstName} ${item.lastName}`}
                    </LegendText>
                  </LegendItem>
                ))}
              </LegendContainer>
            </ChartAndLegendContainer>
          </GeralContainer>
        </div>
        <EditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          initialData={currentEditData}
          totalParticipation={totalParticipation}
        />
      </BodyContainer>
    </>
  );
}

export { Body };
