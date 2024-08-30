import React from 'react';
import { Pie } from 'react-chartjs-2';

function Grafico({ tarefas }) {
  const concluida = tarefas.filter(t => t.concluida).length;
  const pendente = tarefas.length - concluida;

  const data = {
    labels: ['Concluídas', 'Pendentes'],
    datasets: [
      {
        data: [concluida, pendente],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return <Pie data={data} />;
}

export default Grafico;
