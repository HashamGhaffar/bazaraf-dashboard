import Navbar from "../../components/navbar";
import LoginForm from "./component/LoginForm";
import Footer from "../../components/footer/Footer";

function Login() {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <Navbar />
      <LoginForm />
      <Footer year={currentYear} />
    </div>
  );
}

export default Login;
