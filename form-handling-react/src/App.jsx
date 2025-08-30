import { useState } from 'react'
import RegistrationForm from './components/RegistrationForm'
import FormikForm from './components/formikForm'
import './App.css'

function App() {
  const [activeForm, setActiveForm] = useState('controlled')

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>React Form Handling Demo</h1>
        <p>Compare controlled components vs Formik implementation</p>

        {/* Form Toggle Buttons */}
        <div className="form-toggle">
          <button
            onClick={() => setActiveForm('controlled')}
            className={activeForm === 'controlled' ? 'active' : ''}
          >
            Controlled Components
          </button>
          <button
            onClick={() => setActiveForm('formik')}
            className={activeForm === 'formik' ? 'active' : ''}
          >
            Formik Form
          </button>
        </div>
      </header>

      <main className="app-main">
        {/* Render the selected form */}
        {activeForm === 'controlled' && <RegistrationForm />}
        {activeForm === 'formik' && <FormikForm />}
      </main>

      <footer className="app-footer">
        <p>
          Switch between forms to compare the implementation approaches.
          Both forms include validation and mock API integration.
        </p>
      </footer>
    </div>
  )
}

export default App
