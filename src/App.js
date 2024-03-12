import './App.css';
import Toolbar from './components/Toolbar';
import TextEditor from './components/TextEditor';
import Speech from './components/Speech';

function App() {
  return (
    <div className="App">
      <Toolbar />

      <div className='main'>
        <TextEditor />
        <Speech />
      </div>
    </div>
  );
}

export default App;
