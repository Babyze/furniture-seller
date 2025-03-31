import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ROUTES } from '@src/constants/routes';
import Input from '@src/components/ui/Input';
import InputPassword from '@src/components/ui/InputPassword';
import Button from '@src/components/ui/Button';
import { LoginRequest } from '@src/models/auth.model';
import { useAuth } from '@src/hooks/useAuth';
import './SignIn.css';

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const from = location.state?.from?.pathname || ROUTES.DASHBOARD.ROOT;

  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login(formData);
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sign-in">
      <div className="sign-in__container">
        <div className="sign-in__header">
          <h1>Welcome Back</h1>
          <p>Please sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="sign-in__form">
          <div className="form-group">
            <Input
              type="email"
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <InputPassword
              name="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="on"
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
