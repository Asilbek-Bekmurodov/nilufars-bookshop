import styles from "./Login.module.css";
import bookshelf from "../../Gemini_Generated_Image_3e4q7g3e4q7g3e4q.png";
import books from "../../image_2026-05-12_12-52-32.png";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { useLoginMutation } from "../../app/services/authApi";
import { useDispatch } from "react-redux";
import { getCredinttials } from "../../app/feautures/authSlice";
import Loader from "../Loader/Loader";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [login, { isError, isLoading }] = useLoginMutation();
  const dispath = useDispatch();
  const navigate = useNavigate();

  if (isLoading) return <Loader fullPage label="Kirish tekshirilmoqda..." />;

  function handleChange(e){
    setFormData((state)=> ({
      ...state,
      [e.target.name]: e.target.value
    }))
  }

  async function handleSubmit(e){
    e.preventDefault()

    const res = await login(formData).unwrap()
    if(res){
      localStorage.setItem("token", res.accessToken)
      localStorage.setItem("user", JSON.stringify(res.user))
      dispath(
        getCredinttials({
          user: res.user,
          token: res.accessToken
        })
      )
      if(res.user.role === "admin"){
        navigate("/dashboard")
      } else{
        navigate("/private")
      }
    }
    console.log(res)
  }

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.wrapper}>
        {/* Right */}
        <div
          className={styles.right}
          style={{ backgroundImage: `url(${books})` }}
        >
          <div className={styles.formBox}>
            <div>
              <Link className={styles.back} to="/">
                ← Orqaga qaytish
              </Link>
            </div>

            <h1>Xush kelibsiz</h1>
            <p>Kitob olamingizga kirish qiling</p>

            <form onSubmit={handleSubmit}>
              {isError && <p style={{ color: "red", marginBottom: "8px" }}>Email yoki parol noto'g'ri</p>}
              <input
                type="email"
                placeholder="Email manzil"
                onChange={handleChange}
                name="email"
              />
              <input type="password" placeholder="Parol" onChange={handleChange} name="password"/>

              <button>Kirish</button>
            </form>

            <span>
              Akkountingiz yo‘qmi? <Link to="/register">Ro‘yxatdan o‘tish</Link>
            </span>
          </div>
        </div>

        {/* Left */}
        <div className={styles.left}>
          <h2 className={styles.logo}>KitobXon</h2>

          <img src={bookshelf} alt="" className={styles.image} />

          <div className={styles.quote}>
            <span className={styles.quote_sign}>“</span>
            <p>
              Kitob seni hali sen ko'rmagan dunyoga olib boradi, sen eshitmagan
              so'zlar aytadi.
            </p>
            <span className={styles.span}>— A.I.Gersen</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
