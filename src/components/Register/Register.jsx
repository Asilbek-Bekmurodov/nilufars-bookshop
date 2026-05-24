import styles from "./Register.module.css";
import books from "../../image_2026-05-12_12-52-32.png";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRegisterMutation } from "../../app/services/authApi";
import { useDispatch } from "react-redux";
import { getCredinttials } from "../../app/feautures/authSlice";
import Loader from "../Loader/Loader";

export default function Register() {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();

  const authors = [
    "Ibn Sino", "Mirzo Ulugbek", "Alisher Navoi", "Odil Yoqubov", "Miroj Abdulloyev",
    "Zulfiya", "Norali", "Abdulhamid Cho'pan", "Muhammad Ali", "Erkin Azam"
  ];

  const genres = [
    "Fantastika", "Detektiv", "Romantika", "Fantaziya", "Tarixiy",
    "Ko'rin", "Lirika", "Drama", "Sherali", "Ilmi"
  ];

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    favAuthors: [],
    favGenres: [],
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors((state) => ({
      ...state,
      [name]: "",
    }));
    setSubmitError("");
  }

  function handleAuthorChange(author) {
    setFormData((prev) => ({
      ...prev,
      favAuthors: prev.favAuthors.includes(author)
        ? prev.favAuthors.filter((a) => a !== author)
        : [...prev.favAuthors, author],
    }));
    setErrors((state) => ({
      ...state,
      favAuthors: "",
    }));
  }

  function handleGenreChange(genre) {
    setFormData((prev) => ({
      ...prev,
      favGenres: prev.favGenres.includes(genre)
        ? prev.favGenres.filter((g) => g !== genre)
        : [...prev.favGenres, genre],
    }));
    setErrors((state) => ({
      ...state,
      favGenres: "",
    }));
  }

  function validateStep(currentStep) {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.name.trim()) {
        newErrors.name = "Ismingizni kiriting";
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email manzilini kiriting";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Iltimos, to‘g‘ri email kiriting";
      }
      if (!formData.password.trim()) {
        newErrors.password = "Parolni kiriting";
      } else if (formData.password.length < 6) {
        newErrors.password = "Parol kamida 6 ta belgidan iborat bo‘lishi kerak";
      }
    } else {
      if (!formData.age.trim()) {
        newErrors.age = "Yoshingizni kiriting";
      } else if (Number(formData.age) <= 0 || Number.isNaN(Number(formData.age))) {
        newErrors.age = "Iltimos, to‘g‘ri yosh yozing";
      }
      if (formData.favAuthors.length === 0) {
        newErrors.favAuthors = "Kamida bitta muallif tanlang";
      }
      if (formData.favGenres.length === 0) {
        newErrors.favGenres = "Kamida bitta janr tanlang";
      }
    }

    return newErrors;
  }

  function handleNext() {
    const stepErrors = validateStep(1);
    if (Object.keys(stepErrors).length) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStep(2);
  }

  async function handleRegister(e) {
    e.preventDefault();
    const stepErrors = validateStep(2);
    if (Object.keys(stepErrors).length) {
      setErrors(stepErrors);
      return;
    }

    const sendData = {
      ...formData,
      age: Number(formData.age),
    };

    try {
      const res = await register(sendData).unwrap();

      if (res) {
        const registeredUser = {
          ...sendData,
          password: undefined,
          ...res.user,
        };

        localStorage.setItem("token", res.accessToken);
        localStorage.setItem("user", JSON.stringify(registeredUser));

        dispatch(
          getCredinttials({
            user: registeredUser,
            token: res.accessToken,
          }),
        );


        if (registeredUser.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/private");
        }
      }
    } catch (error) {
      console.error(error);
      setSubmitError("Ro‘yxatdan o‘tishda xato yuz berdi. Iltimos qayta urinib ko‘ring.");
    }
  }

  return (
    <motion.div
      className={styles.container}
      style={{ backgroundImage: `url(${books})` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.wrapper}>
        <motion.div
          className={styles.right}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className={styles.formBox}>
            <Link className={styles.back} to="/">
              ← Orqaga
            </Link>
            <div className={styles.stepContainer}>
              <div className={styles.circle}>01</div>
              <div className={`${styles.line} ${step === 1 ? styles.lineInactive : ""}`}></div>
              <div className={`${styles.circle} ${step === 1 ? styles.circleInactive : ""}`}>02</div>
            </div>
            <h1>Ro‘yxatdan o‘tish</h1>
            <p className={styles.subtitle}>Kitob olamiga tez va chiroyli qo‘shiling.</p>

            {submitError && <div className={styles.formAlert}>{submitError}</div>}
            {isLoading && <Loader label="Ro'yxatdan o'tkazilmoqda..." />}

            <form className={styles.sliderContainer} onSubmit={handleRegister} noValidate>
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className={styles.inputGroup}>
                      <motion.input
                        className={errors.name ? styles.invalid : ""}
                        type="text"
                        name="name"
                        placeholder="Ismingiz"
                        onChange={handleChange}
                        value={formData.name}
                        whileFocus={{ scale: 1.02 }}
                      />
                      {errors.name && <p className={styles.fieldError}>{errors.name}</p>}
                    </div>
                    <div className={styles.inputGroup}>
                      <motion.input
                        className={errors.email ? styles.invalid : ""}
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={formData.email}
                        whileFocus={{ scale: 1.02 }}
                      />
                      {errors.email && <p className={styles.fieldError}>{errors.email}</p>}
                    </div>
                    <div className={styles.inputGroup}>
                      <motion.input
                        className={errors.password ? styles.invalid : ""}
                        type="password"
                        name="password"
                        placeholder="Parol"
                        onChange={handleChange}
                        value={formData.password}
                        whileFocus={{ scale: 1.02 }}
                      />
                      {errors.password && <p className={styles.fieldError}>{errors.password}</p>}
                    </div>


                    <motion.button
                      type="button"
                      onClick={handleNext}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Keyingi →
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className={styles.inputGroup}>
                      <motion.input
                        className={errors.age ? styles.invalid : ""}
                        type="number"
                        name="age"
                        placeholder="Yoshingiz"
                        onChange={handleChange}
                        value={formData.age}
                        whileFocus={{ scale: 1.02 }}
                      />
                      {errors.age && <p className={styles.fieldError}>{errors.age}</p>}
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Sevimli mualliflar:</label>
                      <div className={styles.checkboxGroup}>
                        {authors.map((author, idx) => (
                          <motion.label
                            key={idx}
                            className={styles.checkboxLabel}
                            whileHover={{ scale: 1.05 }}
                          >
                            <input
                              type="checkbox"
                              checked={formData.favAuthors.includes(author)}
                              onChange={() => handleAuthorChange(author)}
                            />
                            {author}
                          </motion.label>
                        ))}
                      </div>
                      {errors.favAuthors && <p className={styles.fieldError}>{errors.favAuthors}</p>}
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Sevimli janrlar:</label>
                      <div className={styles.checkboxGroup}>
                        {genres.map((genre, idx) => (
                          <motion.label
                            key={idx}
                            className={styles.checkboxLabel}
                            whileHover={{ scale: 1.05 }}
                          >
                            <input
                              type="checkbox"
                              checked={formData.favGenres.includes(genre)}
                              onChange={() => handleGenreChange(genre)}
                            />
                            {genre}
                          </motion.label>
                        ))}
                      </div>
                      {errors.favGenres && <p className={styles.fieldError}>{errors.favGenres}</p>}
                    </div>


                    <div className={styles.buttons}>
                      <motion.button
                        type="button"
                        className={styles.prevBtn}
                        onClick={() => setStep(1)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        ← Ortga
                      </motion.button>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isLoading ? "Yozilmoqda..." : "Ro'yxatdan o'tish"}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            <div className={styles.progressWrapper}>
              <div className={styles.progress} style={{ width: step === 1 ? "50%" : "100%" }}></div>
            </div>

            <span>
              Akkountingiz bormi? <Link to="/login">Kirish</Link>
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
