import styles from './Loader.module.css'

function Loader({ label = 'Yuklanmoqda...', fullPage = false }) {
  return (
    <div className={fullPage ? styles.fullPage : styles.inline}>
      <span className={styles.spinner}></span>
      <p>{label}</p>
    </div>
  )
}

export default Loader
