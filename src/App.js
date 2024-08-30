import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import './App.css'; 


ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');

  const adicionarTarefa = () => {
    if (novaTarefa.trim()) {
      setTarefas([...tarefas, { texto: novaTarefa, concluida: false }]);
      setNovaTarefa('');
    }
  };

  const concluida = tarefas.filter(t => t.concluida).length;
  const pendente = tarefas.length - concluida;

  const data = {
    labels: ['Concluídas', 'Pendentes'],
    datasets: [
      {
        data: [concluida, pendente],
        backgroundColor: ['#2c6d07', '#990005'], 
      },
    ],
  };

  return (
    <div className="container">
      <h1>Lista de Tarefas</h1>
      <div className="input-container">
        <input
          type="text"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          placeholder="Digite uma nova tarefa"
        />
        <button onClick={adicionarTarefa}>Adicionar</button>
      </div>
      <ul className="task-list">
        {tarefas.map((tarefa, index) => (
          <li key={index} className={tarefa.concluida ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={tarefa.concluida}
              onChange={() => {
                const novasTarefas = [...tarefas];
                novasTarefas[index].concluida = !novasTarefas[index].concluida;
                setTarefas(novasTarefas);
              }}
            />
            {tarefa.texto}
            <button onClick={() => {
              const novasTarefas = tarefas.filter((_, i) => i !== index);
              setTarefas(novasTarefas);
            }}>x</button>
          </li>
        ))}
      </ul>
      <div className="chart-container">
        <Pie data={data} />
      </div>
    </div>
  );
}

export default App;
