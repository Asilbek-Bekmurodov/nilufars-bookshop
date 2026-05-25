import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

// Ikonkalar
import { GiBookshelf } from 'react-icons/gi';
import { RxDashboard } from 'react-icons/rx';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { FaRegUser, FaRegUserCircle, FaPlus, FaRegEdit } from 'react-icons/fa';
import { BiLogOut, BiTrash } from 'react-icons/bi';
import { AiOutlineHome, AiOutlineBarChart } from 'react-icons/ai';
import { PiUsersLight } from 'react-icons/pi';
import { IoBookOutline } from 'react-icons/io5';
import { GoTag } from 'react-icons/go';

// RTK Query Hooklari
import {
  useGetCurrentUserQuery,
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,

  useGetBooksQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useUploadBookPdfMutation,

  useGetAuthorsQuery,
  useUpdateAuthorMutation,
  useDeleteAuthorMutation
} from '../../app/services/authApi';

function Dashboard() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('home');

  // Modal holati
  const [modal, setModal] = useState({ open: false, type: 'add', section: '', data: null });
  const [formData, setFormData] = useState({});

  // Kategoriya uchun statik ma'lumot (chunki backendda category yo'q edi, lekin ishlashi shart)
  const [categories, setCategories] = useState([
    { id: 1, name: 'Fiction', code: 'FIC', count: 12 },
    { id: 2, name: 'Philosophy', code: 'PHL', count: 5 },
    { id: 3, name: 'Drama', code: 'DRM', count: 8 }
  ]);

  // --- API DATA FETCHING ---
  const { data: currentUser } = useGetCurrentUserQuery();
  const { data: users, isLoading: usersLoading } = useGetUsersQuery(undefined, { skip: activeItem !== 'users' && activeItem !== 'home' });
  const { data: books, isLoading: booksLoading } = useGetBooksQuery(1677, { skip: activeItem !== 'books' && activeItem !== 'home' });
  const { data: authors, isLoading: authorsLoading } = useGetAuthorsQuery(undefined, { skip: activeItem !== 'author' && activeItem !== 'home' });

  // --- MUTATIONS ---
  const [addUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [pdfFile, setPdfFile] = useState(null);

  const [addBook] = useAddBookMutation();
  const [updateBook] = useUpdateBookMutation();
  const [deleteBook] = useDeleteBookMutation();
  const [uploadBookPdf] = useUploadBookPdfMutation();

  const [updateAuthor] = useUpdateAuthorMutation();
  const [deleteAuthor] = useDeleteAuthorMutation();

  // --- LOGOUT ---
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login');
  };

  // --- MODAL OPEN/CLOSE ---
  const openModal = (section, type, currentData = null) => {
    setModal({ open: true, type, section, data: currentData });
    if (type === 'edit' && currentData) {
      setFormData(currentData);
    } else {
      setFormData({});
    }
  };

  const closeModal = () => {
    setModal({ open: false, type: 'add', section: '', data: null });
    setFormData({});
    setPdfFile(null);
  };

  // --- FORM SUBMIT HANDLER ---
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modal.section === 'users') {
        if (modal.type === 'add') {
          await addUser({ ...formData, role: formData.role || 'user' }).unwrap();
        } else {
          await updateUser({ id: modal.data._id || modal.data.id, ...formData }).unwrap();
        }
      } 
      else if (modal.section === 'books') {
        if (modal.type === 'add') {
          const newBook = await addBook(formData).unwrap();
          if (pdfFile && newBook?._id) {
            const fd = new FormData();
            fd.append('pdf', pdfFile);
            await uploadBookPdf({ id: newBook._id, formData: fd }).unwrap();
          }
        } else {
          await updateBook({ id: modal.data._id || modal.data.id, ...formData }).unwrap();
          if (pdfFile) {
            const fd = new FormData();
            fd.append('pdf', pdfFile);
            await uploadBookPdf({ id: modal.data._id || modal.data.id, formData: fd }).unwrap();
          }
        }
      }
      else if (modal.section === 'authors') {
        if (modal.type === 'edit') {
          await updateAuthor({ id: modal.data._id || modal.data.id, ...formData }).unwrap();
        } else {
          // Agar kelajakda backendda createAuthor bo'lsa shu yerga ulanadi
          alert("Yangi muallif qo'shish interfeysda bajarildi (Mock)!");
        }
      }
      else if (modal.section === 'categories') {
        if (modal.type === 'add') {
          setCategories([...categories, { id: Date.now(), name: formData.name, code: formData.code || 'GEN', count: 0 }]);
        } else {
          setCategories(categories.map(c => c.id === modal.data.id ? { ...c, name: formData.name, code: formData.code } : c));
        }
      }
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Xatolik yuz berdi.");
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <GiBookshelf className={styles.bookIcon} />
            <h2>KitobXon</h2>
          </div>
          <div className={styles.title}>
            <RxDashboard />
            <p>Admin Panel</p>
          </div>
        </div>
        <div className={styles.right}>
          <IoMdNotificationsOutline className={styles.headerIcon} />
          <div className={styles.userInfo}>
            <div className={styles.userMeta}>
              <h4>{currentUser?.name || "Yuklanmoqda..."}</h4>
              <p>{currentUser?.email || "admin@example.com"}</p>
            </div>
            <FaRegUserCircle className={styles.headerIcon} style={{ fontSize: '32px' }} />
          </div>
        </div>
      </header>

      {/* MAIN BODY */}
      <main className={styles.main}>
        {/* SIDEBAR */}
        <section className={styles.sidebar}>
          <ul>
            <li className={activeItem === 'home' ? styles.active : ''} onClick={() => setActiveItem('home')}>
              <AiOutlineHome /> <p>Overview</p>
            </li>
            <li className={activeItem === 'users' ? styles.active : ''} onClick={() => setActiveItem('users')}>
              <PiUsersLight /> <p>Users</p>
            </li>
            <li className={activeItem === 'books' ? styles.active : ''} onClick={() => setActiveItem('books')}>
              <IoBookOutline /> <p>Books</p>
            </li>
            <li className={activeItem === 'categories' ? styles.active : ''} onClick={() => setActiveItem('categories')}>
              <GoTag /> <p>Categories</p>
            </li>
            <li className={activeItem === 'author' ? styles.active : ''} onClick={() => setActiveItem('author')}>
              <FaRegUser /> <p>Authors</p>
            </li>
          </ul>
          <div className={styles.logoutBtn} onClick={handleLogout}>
            <BiLogOut /> <p>Log out</p>
          </div>
        </section>

        {/* CONTENT */}
        <section className={styles.content}>
          
          {/* OVERVIEW PANEL */}
          {activeItem === 'home' && (
            <div>
              <div className={styles.contentHeader}>
                <div className={styles.pageTitle}>
                  <h1>Overview</h1>
                  <p>Tizimning umumiy tahlili va ko'rsatkichlari</p>
                </div>
              </div>
              
              {/* Stat Cards Grid */}
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <PiUsersLight className={styles.statIcon} />
                  <div className={styles.statInfo}>
                    <h3>{users?.length || 0}</h3>
                    <p>Foydalanuvchilar</p>
                  </div>
                </div>
                <div className={styles.statCard}>
                  <IoBookOutline className={styles.statIcon} />
                  <div className={styles.statInfo}>
                    <h3>{books?.length || 0}</h3>
                    <p>Jami Kitoblar</p>
                  </div>
                </div>
                <div className={styles.statCard}>
                  <FaRegUser className={styles.statIcon} />
                  <div className={styles.statInfo}>
                    <h3>{authors?.length || 0}</h3>
                    <p>Mualliflar</p>
                  </div>
                </div>
                <div className={styles.statCard}>
                  <GoTag className={styles.statIcon} />
                  <div className={styles.statInfo}>
                    <h3>{categories.length}</h3>
                    <p>Kategoriyalar</p>
                  </div>
                </div>
              </div>

              {/* Chart Placeholder Graph */}
              <div className={styles.chartPlaceholder}>
                <AiOutlineBarChart style={{ fontSize: '64px', marginBottom: '12px' }} />
                <h3>Kitobxonlar faolligi grafik ko'rinishi</h3>
                <p>Haftalik yuklab olishlar va ko'rishlar statistikasi yuklanmoqda...</p>
              </div>
            </div>
          )}

          {/* USERS PANEL */}
          {activeItem === 'users' && (
            <div>
              <div className={styles.contentHeader}>
                <div className={styles.pageTitle}>
                  <h1>Users Management</h1>
                  <p>{users?.length || 0} ta foydalanuvchi</p>
                </div>
                <button className={styles.addBtn} onClick={() => openModal('users', 'add')}><FaPlus /> Add User</button>
              </div>
              {usersLoading ? <div className={styles.loading}>Yuklanmoqda...</div> : (
                <div className={styles.tableContainer}>
                  <table className={styles.table}>
                    <thead>
                      <tr><th>#</th><th>User</th><th>Email</th><th>Role</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      {users?.map((user, idx) => (
                        <tr key={user._id || user.id}>
                          <td>{idx + 1}</td>
                          <td><strong>{user.name}</strong></td>
                          <td>{user.email}</td>
                          <td><span className={styles.badge}>{user.role || 'user'}</span></td>
                          <td className={styles.actions}>
                            <button className={`${styles.actionBtn} ${styles.editBtn}`} onClick={() => openModal('users', 'edit', user)}><FaRegEdit /></button>
                            <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => { if(window.confirm("O'chirishni xohlaysizmi?")) deleteUser(user._id || user.id) }}><BiTrash /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* BOOKS PANEL */}
          {activeItem === 'books' && (
            <div>
              <div className={styles.contentHeader}>
                <div className={styles.pageTitle}>
                  <h1>Books Management</h1>
                  <p>{books?.length || 0} ta kitob</p>
                </div>
                <button className={styles.addBtn} onClick={() => openModal('books', 'add')}><FaPlus /> Add Book</button>
              </div>
              {booksLoading ? <div className={styles.loading}>Yuklanmoqda...</div> : (
                <div className={styles.tableContainer}>
                  <table className={styles.table}>
                    <thead>
                      <tr><th>#</th><th>Title</th><th>Author</th><th>Category</th><th>Rating</th><th>PDF</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      {books?.map((book, idx) => (
                        <tr key={book._id || book.id}>
                          <td>{idx + 1}</td>
                          <td><strong>{book.title}</strong></td>
                          <td>{book.authorName || 'Noma\'lum'}</td>
                          <td><span className={styles.badge}>{book.category}</span></td>
                          <td>⭐ {book.rating || 0}</td>
                          <td><span className={`${styles.pdfBadge} ${book.pdfUrl ? styles.pdfTrue : styles.pdfFalse}`}>{book.pdfUrl ? "PDF bor" : "Tez kunda"}</span></td>
                          <td className={styles.actions}>
                            <button className={`${styles.actionBtn} ${styles.editBtn}`} onClick={() => openModal('books', 'edit', book)}><FaRegEdit /></button>
                            <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => { if(window.confirm("O'chirishni xohlaysizmi?")) deleteBook(book._id || book.id) }}><BiTrash /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* CATEGORIES PANEL */}
          {activeItem === 'categories' && (
            <div>
              <div className={styles.contentHeader}>
                <div className={styles.pageTitle}>
                  <h1>Categories Management</h1>
                  <p>Tizimdagi kitob janrlari</p>
                </div>
                <button className={styles.addBtn} onClick={() => openModal('categories', 'add')}><FaPlus /> Add Category</button>
              </div>
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr><th>#</th><th>Category Name</th><th>Code</th><th>Books Count</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                    {categories.map((cat, idx) => (
                      <tr key={cat.id}>
                        <td>{idx + 1}</td>
                        <td><strong>{cat.name}</strong></td>
                        <td><code>{cat.code}</code></td>
                        <td>{cat.count} ta kitob</td>
                        <td className={styles.actions}>
                          <button className={`${styles.actionBtn} ${styles.editBtn}`} onClick={() => openModal('categories', 'edit', cat)}><FaRegEdit /></button>
                          <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => { if(window.confirm("Kategoriyani o'chirasizmi?")) setCategories(categories.filter(c => c.id !== cat.id)) }}><BiTrash /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* AUTHORS PANEL */}
          {activeItem === 'author' && (
            <div>
              <div className={styles.contentHeader}>
                <div className={styles.pageTitle}>
                  <h1>Authors Management</h1>
                  <p>Tizimdagi mualliflar</p>
                </div>
                {/* SIZ AYTGAN ADD BUTTON SHU YERGA QO'SHILDI */}
                <button className={styles.addBtn} onClick={() => openModal('authors', 'add')}><FaPlus /> Add Author</button>
              </div>
              {authorsLoading ? <div className={styles.loading}>Yuklanmoqda...</div> : (
                <div className={styles.tableContainer}>
                  <table className={styles.table}>
                    <thead>
                      <tr><th>#</th><th>Name</th><th>Nationality</th><th>Bio</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      {authors?.map((author, idx) => (
                        <tr key={author._id || author.id}>
                          <td>{idx + 1}</td>
                          <td><strong>{author.name}</strong></td>
                          <td>{author.nationality || '—'}</td>
                          <td>{author.bio || '—'}</td>
                          <td className={styles.actions}>
                            <button className={`${styles.actionBtn} ${styles.editBtn}`} onClick={() => openModal('authors', 'edit', author)}><FaRegEdit /></button>
                            <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => { if(window.confirm("O'chirishni xohlaysizmi?")) deleteAuthor(author._id || author.id) }}><BiTrash /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      {/* --- MODAL DIALOG OYNASI --- */}
      {modal.open && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>
              {modal.section === 'books' && modal.type === 'add' ? 'Add New Book' :
               modal.section === 'books' && modal.type === 'edit' ? 'Edit Book' :
               modal.type === 'add' ? `Yangi qo'shish (${modal.section.toUpperCase()})` :
               `Tahrirlash (${modal.section.toUpperCase()})`}
            </h2>
            <form onSubmit={handleFormSubmit}>
              
              {/* USERS FORM */}
              {modal.section === 'users' && (
                <>
                  <div className={styles.formGroup}>
                    <label>Foydalanuvchi ismi</label>
                    <input type="text" required value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Email manzili</label>
                    <input type="email" required disabled={modal.type === 'edit'} value={formData.email || ''} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Parol</label>
                    <input type="password" required={modal.type === 'add'} placeholder={modal.type === 'edit' ? "O'zgartirmaslik uchun bo'sh qoldiring" : ""} value={formData.password || ''} onChange={(e) => setFormData({...formData, password: e.target.value})} />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Rol</label>
                    <select value={formData.role || 'user'} onChange={(e) => setFormData({...formData, role: e.target.value})}>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </>
              )}

              {/* BOOKS FORM */}
              {modal.section === 'books' && (
                <>
                  <div className={styles.formGroup}>
                    <label>TITLE</label>
                    <input type="text" placeholder="Book title" required value={formData.title || ''} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                  </div>
                  <div className={styles.formGroup}>
                    <label>AUTHOR *</label>
                    <input type="text" placeholder="Author nomini yozing..." required value={formData.authorName || ''} onChange={(e) => setFormData({...formData, authorName: e.target.value})} />
                  </div>
                  <div className={styles.formGroup}>
                    <label>CATEGORY</label>
                    <select value={formData.category || ''} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                      <option value="">Tanlang...</option>
                      <option value="Fiction">Fiction</option>
                      <option value="Philosophy">Philosophy</option>
                      <option value="Drama">Drama</option>
                      <option value="Science">Science</option>
                      <option value="History">History</option>
                      <option value="Biography">Biography</option>
                      <option value="Thriller">Thriller</option>
                      <option value="Romance">Romance</option>
                      <option value="Fantasy">Fantasy</option>
                      <option value="Self-help">Self-help</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>RATING</label>
                    <input type="number" step="0.1" max="5" min="0" placeholder="4.5" value={formData.rating || ''} onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})} />
                  </div>
                  <div className={styles.formRow3}>
                    <div className={styles.formGroup}>
                      <label>GENRE</label>
                      <input type="text" placeholder="Drama" value={formData.genre || ''} onChange={(e) => setFormData({...formData, genre: e.target.value})} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>BADGE</label>
                      <input type="text" placeholder="Bestseller" value={formData.badge || ''} onChange={(e) => setFormData({...formData, badge: e.target.value})} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>COVER COLOR</label>
                      <input type="text" placeholder="green" value={formData.coverColor || ''} onChange={(e) => setFormData({...formData, coverColor: e.target.value})} />
                    </div>
                  </div>
                  <div className={styles.formRow2}>
                    <div className={styles.formGroup}>
                      <label>PAGE COUNT</label>
                      <input type="number" placeholder="320" value={formData.pageCount || ''} onChange={(e) => setFormData({...formData, pageCount: parseInt(e.target.value)})} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>PUBLISHED YEAR</label>
                      <input type="number" placeholder="2020" value={formData.publishedYear || ''} onChange={(e) => setFormData({...formData, publishedYear: parseInt(e.target.value)})} />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label>DESCRIPTION</label>
                    <textarea rows="3" placeholder="Short description..." value={formData.description || ''} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                  </div>
                  <div className={styles.formGroup}>
                    <label>PDF FAYL (IXTIYORIY)</label>
                    <input
                      type="file"
                      accept=".pdf"
                      className={styles.fileInput}
                      onChange={(e) => setPdfFile(e.target.files[0] || null)}
                    />
                  </div>
                </>
              )}

              {/* CATEGORIES FORM */}
              {modal.section === 'categories' && (
                <>
                  <div className={styles.formGroup}>
                    <label>Kategoriya Nomi</label>
                    <input type="text" required value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Kategoriya Kodi</label>
                    <input type="text" required placeholder="Masalan: FIC, PHL" value={formData.code || ''} onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})} />
                  </div>
                </>
              )}

              {/* AUTHORS FORM */}
              {modal.section === 'authors' && (
                <>
                  <div className={styles.formGroup}>
                    <label>Muallif Ismi</label>
                    <input type="text" required value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Millati</label>
                    <input type="text" value={formData.nationality || ''} onChange={(e) => setFormData({...formData, nationality: e.target.value})} />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Biografiya</label>
                    <textarea rows="3" value={formData.bio || ''} onChange={(e) => setFormData({...formData, bio: e.target.value})} />
                  </div>
                </>
              )}

              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={closeModal}>Bekor qilish</button>
                <button type="submit" className={styles.submitBtn}>Saqlash</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;