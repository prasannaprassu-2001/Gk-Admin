import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { loginUser } from "../../redux/authentication";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
  Row,
  Col,
  Form,
  Input,
  Label,
  Button,
  FormFeedback,
  CardTitle,
} from "reactstrap";
import "./Login.css"; // Import CSS

const defaultValues = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = async (data) => {
    const payload = {
      email: data.email,
      password: data.password,
    };

    const result = await dispatch(loginUser(payload));

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Login successful!");
      navigate('/dashboard', { replace: true });
    } else {
      const errorMessage =
        typeof result.payload === "string"
          ? result.payload
          : result.payload?.message || "Invalid credentials";

      setError("email", {
        type: "manual",
        message: errorMessage,
      });

      toast.error(errorMessage);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="login-container">
        {/* Left Image */}
        <div className="login-image"></div>

        {/* Right Form */}
        <div className="login-form">
          <CardTitle tag="h2" className="card-title">Admin Login</CardTitle>

          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* EMAIL */}
            <div className="mb-1">
              <Label>Email</Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    type="email"
                    placeholder="Enter email"
                    invalid={errors.email && true}
                    {...field}
                  />
                )}
              />
              {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
            </div>

            {/* PASSWORD */}
            <div className="mb-1">
              <Label>Password</Label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    type="password"
                    placeholder="Enter password"
                    invalid={errors.password && true}
                    {...field}
                  />
                )}
              />
              {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
            </div>

            {/* ERROR */}
            {error && (
              <p className="form-error">
                {typeof error === "string"
                  ? error
                  : error?.detail?.[0]?.msg || "Login failed"}
              </p>
            )}

            <Button color="primary" block disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;