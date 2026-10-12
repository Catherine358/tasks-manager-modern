import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskQueue from './pages/TaskQueue.tsx';
import TaskDetails from './pages/TaskDetails.tsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskQueue />} />
        <Route path="/task/:id" element={<TaskDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
