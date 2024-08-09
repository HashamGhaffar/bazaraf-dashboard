import Navbar from "../../components/navbar";
import SignUpForm from "./components/SignUpForm";
import Footer from "../../components/footer/Footer";

function SignUp() {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <Navbar />
      <SignUpForm />
      <Footer year={currentYear} />
    </div>
  );
}

export default SignUp;
