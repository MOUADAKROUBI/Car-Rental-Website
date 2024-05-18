import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";
import FormButton from "./form-button";
import FormInput from "./form-input";
import useAuthentication from "../../useAuthentication";
import { showToast } from "../toast-alert";
import { useTranslation } from "react-i18next";

const LoginForm = () => {
  const { t } = useTranslation();
  const { setLoggedIn } = useAuthentication();
  const navigation = useNavigate();
  const navigate = (route) => navigation(route);
  const toast = useToast();
  const email = useRef();
  const password = useRef();

  function Login(e) {
    e.preventDefault();

    if (email.current.value && password.current.value) {
      try {
        axios
          .post("http://127.0.0.1:8000/api/login", {
            email: email.current.value,
          })
          .then((response) => {
            if (!response.data.success) {
              showToast(toast, response.data.message, "error", "Error");
            } else {
              const { data, pass } = response.data;
      
              const verifyPassword = bcrypt.compareSync(
                password.current.value,
                pass
              );
              
              if (verifyPassword) {
                showToast(
                  toast,
                  "You've logged in successfully.",
                  "success",
                  "Success"
                );
      
                localStorage.setItem("userID", data.id);
                setLoggedIn(true);
                navigate("/cars");
              } else if (!verifyPassword) {
                showToast(toast, "Wrong password try again.");
              }
            }
          })
          .catch((e) => {
            console.log(`>>>>>>>>>>>>>>${e}`);
          });
      } catch (error) {
        console.log(error)
      }
    } else {
      showToast(toast, "Please fill all fields.");
    }
  }

  return (
    <div className="col-md-6 col-lg-6 p-md-5 px-4 py-5">
      <form onSubmit={Login}>
        <FormInput name={t("form.email")} type="email" refe={email} />
        <FormInput name={t("form.password")} type="password" refe={password} />
        <FormButton bgColor="btn-primary" btnText={t("form.signIn")} />
      </form>
    </div>
  );
};

export default LoginForm;
