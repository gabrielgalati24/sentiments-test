
import './App.css'
import { Route, Switch } from "wouter";
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Home from './pages/Home';
import { Layout } from './components/global/Layout';

function App() {


  return (
    <Switch>
      <Route path="/">
        <Layout isLoading={false}>
          <Home />
        </Layout>
      </Route>
      <Route path="/login">

        <LoginPage />
      </Route>

      <Route path="/register">

        <RegisterPage />
      </Route>
    </Switch>
  )
}

export default App
