import { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { useGetBookByIdQuery } from '../../app/services/authApi'
import styles from './BookReader.module.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

export default function BookReader() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: book, isLoading } = useGetBookByIdQuery(id)

  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(1.2)

  if (isLoading) {
    return (
      <div className={styles.center}>
        <div className={styles.spinner} />
        <p>Kitob yuklanmoqda...</p>
      </div>
    )
  }

  if (!book || !book.pdfUrl) {
    return (
      <div className={styles.notFound}>
        <span className={styles.notFoundIcon}>📚</span>
        <h2>Bu kitob o'qish uchun mavjud emas</h2>
        <p>Faqat PDF yuklangan kitoblarni o'qish mumkin.</p>
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          ← Orqaga qaytish
        </button>
      </div>
    )
  }

  return (
    <div className={styles.shell}>
      {/* Top bar */}
      <header className={styles.topbar}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          ← {book.title}
        </button>

        <div className={styles.zoomControls}>
          <button onClick={() => setScale(s => Math.max(0.5, +(s - 0.2).toFixed(1)))}>−</button>
          <span>{Math.round(scale * 100)}%</span>
          <button onClick={() => setScale(s => Math.min(2.5, +(s + 0.2).toFixed(1)))}>+</button>
        </div>

        <span className={styles.pageInfo}>
          {pageNumber} / {numPages || '…'}
        </span>
      </header>

      {/* PDF */}
      <div className={styles.viewer}>
        <Document
          file={book.pdfUrl}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={<p className={styles.loadingText}>PDF yuklanmoqda...</p>}
          error={<p className={styles.errorText}>PDF yuklanmadi. URL ni tekshiring.</p>}
        >
          <Page pageNumber={pageNumber} scale={scale} />
        </Document>
      </div>

      {/* Bottom nav */}
      <footer className={styles.footer}>
        <button
          className={styles.navBtn}
          onClick={() => setPageNumber(p => Math.max(1, p - 1))}
          disabled={pageNumber <= 1}
        >
          ← Oldingi
        </button>

        <div className={styles.pageJump}>
          <input
            type="number"
            min={1}
            max={numPages || 1}
            value={pageNumber}
            onChange={e => {
              const val = Number(e.target.value)
              if (val >= 1 && val <= (numPages || 1)) setPageNumber(val)
            }}
          />
          <span>/ {numPages || '…'}</span>
        </div>

        <button
          className={`${styles.navBtn} ${styles.navBtnNext}`}
          onClick={() => setPageNumber(p => Math.min(numPages || 1, p + 1))}
          disabled={pageNumber >= (numPages || 1)}
        >
          Keyingi →
        </button>
      </footer>
    </div>
  )
}
