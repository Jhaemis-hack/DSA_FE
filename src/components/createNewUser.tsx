"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik, type FormikHelpers } from "formik";
import { createUserSchema,  } from "../schema/formValidation";
import { Eye, EyeOff } from "lucide-react";
import AdminHeader from "./adminHeader";
import { createNewUser } from "../services/adminService";

const CreateNewUser = ({}) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  interface FormValues {
    email: string;
    password: string;
    confirmpass: string;
    role: string;
  }
  const initialValues = {
    email: "",
    password: "",
    confirmpass: "",
    role: "",
  };

  const onSubmit = async (
    payload: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const response = await createNewUser(payload);

    if (response?.status_code === 201) {
      await actions.resetForm();
      navigate("/admin-dashboard");
    }
  };

  const {
    values,
    touched,
    handleChange,
    handleBlur,
    errors,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues,
    validationSchema: createUserSchema,
    onSubmit,
  });

  return (
    <>
      <AdminHeader />
      <div className="flex justify-center items-center flex-col px-10 py-26 md:flex md:justify-center md:items-center ">
        <h2
          className=""
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            // marginBottom: "8px",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            color: "#1f2937",
          }}
        >
          Create a User
        </h2>
        <p
          className="text-xl"
          style={{ color: "#6b7280", marginBottom: "24px" }}
        >
          we make dreams come true.
        </p>

        <form onSubmit={handleSubmit} className="w-full md:max-w-[30rem]">
          <div style={{ marginBottom: "1.2em" }}>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#111111] mb-2"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 h-12 border border-[#CFCFCF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111] focus:border-transparent ${
                errors.email && touched.email ? "border border-red-500" : ""
              }`}
              placeholder="Enter your email address"
            />
            {errors.email && touched.email && (
              <p className="text-red-500 text-sm font-medium">{errors.email}</p>
            )}
          </div>
          <div style={{ marginBottom: "1.2em" }}>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#111111] mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-3 h-12  border border-[#CFCFCF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111] focus:border-transparent ${
                  errors.password && touched.password
                    ? "border border-red-500"
                    : ""
                }`}
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 ${
                  errors.password && touched.password ? "top-[1.5rem]" : ""
                }`}
              >
                {showPassword ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
              {errors.password && touched.password && (
                <p className="text-red-500 text-sm font-medium">
                  {errors.password}
                </p>
              )}
            </div>
          </div>
          <div style={{ marginBottom: "1.6em" }}>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#111111] mb-2"
            >
              confirm Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="confirmpass"
                value={values.confirmpass}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-3 h-12  border border-[#CFCFCF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111] focus:border-transparent ${
                  errors.confirmpass && touched.confirmpass
                    ? "border border-red-500"
                    : ""
                }`}
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 ${
                  errors.confirmpass && touched.confirmpass
                    ? "top-[1.5rem]"
                    : ""
                }`}
              >
                {showPassword ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
              {errors.confirmpass && touched.confirmpass && (
                <p className="text-red-500 text-sm font-medium">
                  {errors.confirmpass}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="role" className="text-sm block mb-1">
                Select Role:
              </label>
              <select
                id="role"
                name="role"
                value={values.role}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={`w-full px-3 h-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111] focus:border-transparent ${
                  errors.role && touched.role
                    ? "border-red-500"
                    : "border-[#CFCFCF]"
                }`}
              >
                <option value="">-- Select Role --</option>
                <option value="mentee">Mentee</option>
                <option value="mentor">Mentor</option>
              </select>

              {errors.role && touched.role && (
                <p className="text-red-500 text-sm font-medium mt-1">
                  {errors.role}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="disabled:opacity-75 disabled:cursor-not-allowed w-full bg-[#222222] hover:bg-gray-800  text-white py-4 rounded-xl font-medium transition-colors mb-4"
          >
            Create user
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateNewUser;
