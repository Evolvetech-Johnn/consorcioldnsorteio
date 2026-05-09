import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

/**
 * App Component
 * Root application component with router setup
 * Routes will be added as features are implemented
 */
function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        {/* Landing page will be added here */}
        {/* Admin routes will be added here */}
        <Route path="/" element={<div className="p-8 text-center">App Setup Complete</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
