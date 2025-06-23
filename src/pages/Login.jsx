import React, { useState } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Spinner,
  Alert
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { BASE_URL_SIMONIK } from '../helpers/config'; // ⬅️ sesuaikan path bila beda folder



const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      setErrors('Username dan Password wajib diisi.');
      return;
    }

    setLoading(true);
    setErrors('');
    setSuccess(false);

    try {
      const response = await fetch(`${BASE_URL_SIMONIK}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.username,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login gagal. Periksa username/password.');
      }

      // Simpan token
      localStorage.setItem('token', data.access_token);

      setSuccess(true);
      navigate('/simonik/home');
    } catch (error) {
      setErrors(error.message || 'Login gagal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #ffe15d 65%, #ff3b3f 35%)',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Header
      <div className="text-center pt-5">
        <h1
          style={{
            color: 'white',
            fontWeight: 'bold',
            marginTop: '90px'
          }}
        >
          LOGIN SIMONIK
        </h1>
        <p style={{ color: 'white', fontWeight: 'bold', marginBottom: '10px' }}>
          SYNC WITH YOUR MYSDI
        </p>
      </div> */}

      {/* Virus Illustration (hidden on mobile) */}
      <div
        className="d-none d-md-block"
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          fontSize: '8rem',
          opacity: 0.7,
          color: '#a83232',
          pointerEvents: 'none'
        }}
      >
        🦠
      </div>

      {/* Login Form */}
      <Container
  className="d-flex justify-content-center align-items-center"
  style={{ minHeight: '100vh', paddingBottom: '80px' }} // Tengah vertikal + padding
>
  <Row className="w-100 justify-content-center">
    <Col xs="11" sm="8" md="6" lg="5">
      <Card
        style={{
          background: 'linear-gradient(to bottom right, #1e1e2f, #3e4a89)',
          color: 'white',
          borderRadius: '10px',
          padding: '30px',
          width: '100%',
          maxWidth: '600px',
          margin: '0 auto',
          boxShadow: '0 0 20px rgba(0,0,0,0.3)'
        }}
      >
        <CardBody>
          <h1
            style={{
              color: 'white',
              fontWeight: 'bold',
              marginTop: '10px',
              textAlign: 'center'
            }}
          >
            LOGIN SIMONIK
          </h1>
          <p
            style={{
              color: 'white',
              fontWeight: 'bold',
              marginBottom: '20px',
              textAlign: 'center'
            }}
          >
            SYNC WITH YOUR SIMRS
          </p>

          {errors && <Alert color="danger">{errors}</Alert>}
          {success && <Alert color="success">Login berhasil!</Alert>}

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="Masukkan username"
                value={form.username}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Masukkan password"
                value={form.password}
                onChange={handleChange}
              />
            </FormGroup>
            <Button color="danger" block disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" /> Logging in...
                </>
              ) : (
                'LOGIN'
              )}
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Col>
  </Row>
</Container>


      {/* Doctor Illustration (hidden on mobile) */}
      <div className="d-none d-md-block" style={{ position: 'absolute', bottom: 0, left: 0, padding: 0 }}>
        <img src="/doctor.png" alt="doctor" style={{ width: '400px', maxWidth: '100%', height: 'auto' }} />
      </div>
    </div>
  );
};

export default Login;
