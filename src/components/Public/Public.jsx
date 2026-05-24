import { FaBookOpen, FaHeadphones, FaStar } from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";
import { ImHeadphones } from "react-icons/im";
import { IoStarSharp } from "react-icons/io5";
import styles from "./Public.module.css";
import { useState } from "react";
import { Link } from "react-router";

function Public() {
  const [active, setActive] = useState("topBooks");

  const handleScroll = (id) => {
    setActive(id);
    document.getElementById(id).scrollIntoView({
      behavior: "smooth",
    });
  };
  const books = [
    {
      title: "Jinlar bazmi",
      author: "Abdulla Qodiriy",
      rating: 4.7,
      image:
        "https://cdn-minio.mutolaa.com/media/books/2024/03/Abdulla_Qodiriy._Jinlar_bazmi.jpg",
      color: ["#7f5539", "#2f1a13", "#c2a16c"],
    },
    {
      title: "A'lochi xo'rozcha",
      author: "Anvar Obidjon",
      rating: 4.8,
      image:
        "https://cdn-minio.mutolaa.com/media/books/2024/03/Ertak._Alochi_xorozcha.jpg",
      color: ["#9a6a3d", "#4f2f1d", "#e0b45f"],
    },
    {
      title: "Dahshat",
      author: "Abdulla Qahhor",
      rating: 4.9,
      image:
        "https://cdn-minio.mutolaa.com/media/books/2024/02/IMG_20240201_133837_967.png",
      color: ["#5f3b33", "#211514", "#b47d62"],
    },
    {
      title: "San'atkor",
      author: "Abdulla Qahhor",
      rating: 4.6,
      image:
        "https://cdn-minio.mutolaa.com/media/books/2024/05/Abdulla_Qahhor._San%CA%BCatkor_hikoya.jpg",
      color: ["#8a5a44", "#3a2420", "#d0a15f"],
    },
    {
      title: "Puankare",
      author: "Abduqayum Yo'ldashev",
      rating: 4.5,
      image:
        "https://cdn-minio.mutolaa.com/media/books/2026/02/Abduqayum_Yoldosh._Puankare.jpg",
      color: ["#6d5a36", "#282112", "#bfa768"],
    },
    {
      title: "Dunyoning ishlari",
      author: "O'tkir Hoshimov",
      rating: 4.9,
      image:
        "https://cdn-minio.mutolaa.com/media/books/2024/02/dunyoning_ishlari.png",
      color: ["#7b5b4b", "#2d1f1a", "#c69576"],
    },
    {
      title: "Hayotga Muhabbat",
      author: "Jek London",
      rating: 4.8,
      image:
        "https://cdn-minio.mutolaa.com/media/books/2024/02/Jek_London._Hayotga_muhabbat.jpg",
      color: ["#85603f", "#332214", "#d3a15d"],
    },
  ];

  const showcaseColumns = [
    books,
    [...books.slice(2), ...books.slice(0, 2)],
    [...books.slice(4), ...books.slice(0, 4)],
  ];

  const newdata = [
    {
      newIndex: 1,
      newTitle: "Muvaffaqiyatning umumiy maxraji",
      newAuthor: "Albert Grey",
      newRate: "5.0",
      image:
        "https://cdn-minio.mutolaa.com/media/books/2026/05/Albert_Grey._Muvaffaqiyatning_umumiy_maxraji_ilmiy-ommabop.jpg",
      color: ["#7f5539", "#2f1a13", "#c2a16c"],
    },
    {
      newIndex: 2,
      newTitle: "Kelajak qanday yaratiladi?",
      newAuthor: "Ilbirl Ortayli",
      newRate: "5.0",
      image:
        "https://cdn-minio.mutolaa.com/media/books/2026/04/Ilbir_Ortayli._Kelajak_qanday_yaratiladi_shaxsiy_rivojlanish.jpg",
      color: ["#6d5a36", "#282112", "#bfa768"],
    },
    {
      newIndex: 3,
      newTitle: "Jannat",
      newAuthor: "Abdurazzoq Gurna",
      newRate: "5.0",
      image:
        "https://cdn-minio.mutolaa.com/media/books/2026/04/Abdurazzoq_Gurna._Jannat_roman.jpg",
      color: ["#8d7045", "#3b2c1b", "#dac07a"],
    },
    {
      newIndex: 4,
      newTitle: "Graf Monte-Kristo. 1-kitob",
      newAuthor: "Aleksandr Dyuma",
      newRate: "4.7",
      image:
        "https://cdn-minio.mutolaa.com/media/books/2026/04/Aleksandr_Dyuma._Graf_Monte-Kristo._1-kitob_Asaxiy_roman.jpg",
      color: ["#704336", "#241411", "#bb8066"],
    },
    {
      newIndex: 5,
      newTitle: "Graf Monte-Kristo. 2-kitob",
      newAuthor: "Aleksandr Dyuma",
      newRate: "5.0",
      image:
        "https://cdn-minio.mutolaa.com/media/books/2026/04/Aleksandr_Dyuma._Graf_Monte-Kristo._2-kitob_Asaxiy_roman.jpg",
      color: ["#5f4931", "#23180f", "#ad8754"],
    },
    {
      newIndex: 6,
      newTitle: "Nozik ohang",
      newAuthor: "Diyora Murodxo'jayeva",
      newRate: "5.0",
      image:
        "https://cdn-minio.mutolaa.com/media/books/2026/04/Diyora_Murodxojayeva._Nozik_ohang_qissa.jpg",
      color: ["#8a5d59", "#3a2424", "#d19a8b"],
    },
    {
      newIndex: 7,
      newTitle: "Maqsad qudrati",
      newAuthor: "Richard J. Leider",
      newRate: "5.0",
      image:
        "https://cdn-minio.mutolaa.com/media/books/2026/04/Richard_J._Leider_Devid_A._Shapiro._Maqsad_qudrati_shaxsiy_rivojlanish.jpg",
      color: ["#85603f", "#332214", "#d3a15d"],
    },
    {
      newIndex: 8,
      newTitle: "Sen onang kabi emassan",
      newAuthor: "Hadicha Kubro",
      newRate: "4.8",
      image:
        "https://cdn-minio.mutolaa.com/media/books/2026/04/Xadicha_Kubro_Tongar._Sen_onang_kabi_emassan_ilmiy-ommabop.jpg",
      color: ["#7b5b4b", "#2d1f1a", "#c69576"],
    },
    {
      newIndex: 9,
      newTitle: "Men - Maryam",
      newAuthor: "Aishan Kapaklikaya",
      newRate: "4.5",
      image:
        "https://cdn-minio.mutolaa.com/media/books/2026/04/Alishan_Kapaklikaya._Men__Maryam_roman.jpg",
      color: ["#91614b", "#3d241c", "#d6a070"],
    },
    {
      newIndex: 10,
      newTitle: "Venchur zehniyati",
      newAuthor: "Ilya Strebulayev",
      newRate: "4.7",
      image:
        "https://cdn-minio.mutolaa.com/media/books/2026/04/Ilya_Strebulaev_Alex_Dang._Venchur_zehniyati_shaxsiy_rivojlanish.jpg",
      color: ["#6a6042", "#242014", "#b8aa68"],
    },
    {
      newIndex: 11,
      newTitle: "She'rlar",
      newAuthor: "Rislig'oy Hotamova",
      newRate: "4.9",
      image:
        "https://cdn-minio.mutolaa.com/media/books/2026/03/Antuan_de_Sent_Ekzyuperi._Kishkene_shahzada.jpg",
      color: ["#8b5148", "#351d1a", "#cf8979"],
    },
    {
      newIndex: 12,
      newTitle: "Kichkina Shaxzoda",
      newAuthor: "Antuan de Sent-Ekzyuperi",
      newRate: "5.0",
      image:
        "https://cdn-minio.mutolaa.com/media/books/2026/03/Antuan_de_Sent_Ekzyuperi._Kishkene_shahzada.jpg",
      color: ["#9b7540", "#3e2d16", "#e1b966"],
    },
  ];

  const authors = [
  {
    name: "Abdulla Qodiriy",
    image: "https://www.ziyouz.uz/wp-content/uploads/2013/10/abdulla-qodiriy.jpg",
    description: "O'tkan kunlar muallifi",
  },
  {
    name: "J.K Rowling",
    image: "https://www.babelio.com/users/AVT_J-K-Rowling_7880.jpg",
    description: "Harry Potter yaratuvchisi",
  },
  {
    name: "Chingiz Aytmatov",
    image: "https://interesnyefakty.org/wp-content/uploads/CHingiz-Aytmatov-4.jpg",
    description: "Mashhur qirg'iz yozuvchisi",
  },
  {
    name: "Alisher Navoiy",
    image: "https://www.ziyouz.uz/wp-content/uploads/2017/01/alisher-navoiy02.jpg",
    description: "O'zbek adabiyoti dahosi",
  },
  {
    name: "Erkin Vohidov",
    image: "https://mbaza.uz/wp-content/uploads/2020/06/erkin-vohidov.jpg",
    description: "Sevimli shoir va dramaturg",
  },
  {
    name: "Agatha Christie",
    image: "http://cdn.history.com/sites/2/2016/01/GettyImages-141554326.jpg",
    description: "Detektiv janri malikasi",
  },
  {
    name: "Paulo Coelho",
    image: "https://cdn.britannica.com/67/126567-050-A5C3A312/Paulo-Coelho-departure-themes-thriller-serial-killer-2008.jpg",
    description: "Ilhomlantiruvchi romanlar muallifi",
  },
  {
    name: "Jek London",
    image: "https://alchetron.com/cdn/jack-london-c7cc3dc7-ebee-4ec3-818f-7202ea7507d-resize-750.jpeg",
    description: "Martin Eden va Oq tish muallifi",
  },
  {
    name: "Rabindranat Tagor",
    image: "https://www.tallengestore.com/cdn/shop/products/RabindranathTagorePortraitPainting_0592c65a-b885-4d01-8c76-b93780db112e.jpg",
    description: "Nobel mukofoti sovrindori shoir",
  },
  {
    name: "Tohir Malik",
    image: "https://storage.kun.uz/source/4/lKmvIUI9_a1E4IDH3WrLporNqEfqNN1P.jpg",
    description: "Shaytanat asari muallifi",
  },
  {
    name: "Aziz Nesin",
    image: "https://img.antoloji.com/media/sair_resimleri/46/46_b_1220.jpg",
    description: "Mashhur turk satirik yozuvchisi",
  },
  {
    name: "Shayx Muhammad Sodiq Muhammad Yusuf",
    image: "https://img-fotki.yandex.ru/get/931857/395936343.7c/0_16c2c5_e7cf5dab_orig.jpg",
    description: "Islomiy kitoblar muallifi",
  },
  {
    name: "Anton Chexov",
    image: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-544586095.jpg",
    description: "Rus hikoyanavis va dramaturg",
  },
];

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <GiBookshelf className={styles.book} />
          <h2>KitobXon</h2>
        </div>

        <ul className={styles.menu}>
          <li
            onClick={() => handleScroll("topBooks")}
            className={active === "topBooks" ? styles.active : styles.item}
          >
            Top kitoblar
          </li>

          <li
            onClick={() => handleScroll("news")}
            className={active === "news" ? styles.active : styles.item}
          >
            Yangiliklar
          </li>

          <li
            onClick={() => handleScroll("authors")}
            className={active === "authors" ? styles.active : styles.item}
          >
            Mualliflar
          </li>

          <li
            onClick={() => handleScroll("about")}
            className={active === "about" ? styles.active : styles.item}
          >
            Biz haqimizda
          </li>
        </ul>

        <div className={styles.contacts}>
          <Link to="/login">
            <button className={styles.btn}>Login</button>
          </Link>
          <Link to="/register">
            <button className={styles.btn}>Register</button>
          </Link>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.wrapper}>
            <div className={styles.shior}>
              <h1 className={styles.shior__title}>
                "Kitobxon" - eng sara audio va elektron kitoblar!
              </h1>

              <p className={styles.shior__text}>
                Har doim va istalgan joyda bilim olish imkoniyati. Kitobxon
                bilan <br /> o'qish va tinglash yanada qulay va zavqli!
              </p>

              <div className={styles.box}>
                <button className={styles.btn__second}>Biz haqimizda</button>
                <button className={styles.btn__second}>Boshlash</button>
              </div>

              <ul className={styles.status}>
                <li className={styles.status_item}>
                  <span>10,000+ </span>
                  <br />
                  faol o'quvchi
                </li>
                <li className={styles.line}></li>
                <li className={styles.status_item}>
                  <span>1000+ </span>
                  <br /> e-kitob
                </li>
                <li className={styles.line}></li>
                <li className={styles.status_item}>
                  <span>500+</span> <br />
                  audio kitob
                </li>
              </ul>
            </div>

            <div className={styles.heroImage}></div>
          </div>
        </section>

        <section id="topBooks" className={styles.topBooks}>
          <div className={styles.container}>
            <div className={styles.sectionTitle}>
              <h2>Eng ko'p o'qilgan kitoblar</h2>
              <p>Kitobxonlar orasida eng yuqori baholangan asarlar</p>
            </div>

            <div className={styles.grid}>
              {books.map((book) => (
                <div key={book.title} className={styles.bookCard}>
                  <div
                    className={styles.imageBox}
                    style={{
                      "--cover-from": book.color[0],
                      "--cover-to": book.color[1],
                      "--cover-accent": book.color[2],
                    }}
                  >
                    <img src={book.image} alt={book.title} />
                  </div>

                  <div className={styles.book__text}>
                    <h3 className={styles.bookTitle}>{book.title}</h3>
                    <p className={styles.author}>{book.author}</p>
                  </div>

                  <div className={styles.icons}>
                    <FaBookOpen className={styles.icon} />
                    <FaHeadphones className={styles.icon} />
                    <div className={styles.rating}>
                      <FaStar className={styles.star} /> {book.rating}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="news" className={styles.new}>
          <div className={styles.sectionTitle}>
            <h2>Yangi qo'shilgan kitoblar</h2>
            <p>
              Platformaga yaqinda qo'shilgan yangi elektron va audio kitoblar
            </p>
          </div>

          <ul className={styles.new__menu}>
            {newdata.map((item) => (
              <li key={item.newIndex} className={styles.new__item}>
                <div
                  className={styles.new__img}
                  style={{
                    "--cover-from": item.color[0],
                    "--cover-to": item.color[1],
                    "--cover-accent": item.color[2],
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.newTitle}
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                </div>

                <div className={styles.new__info}>
                  <h3 className={styles.new__title}>{item.newTitle}</h3>
                  <p className={styles.new__author}>{item.newAuthor}</p>

                  <div className={styles.new__icons}>
                    <div className={styles.new__rating}>
                      <p className={styles.new__rate}>{item.newRate}</p>
                      <IoStarSharp className={styles.star} />
                    </div>

                    <div className={styles.headphone__box}>
                      <ImHeadphones className={styles.headphone} />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.showcase}>
          <div className={styles.showcaseText}>
            {[
              "ENG-ENG",
              "ENG-ENG",
              "ENG-ENG",
              "ENG-ENG",
              "ENG-ENG",
              "ENG-ENG",
              "ENG-ENG",
            ].map((text, index) => (
              <span
                key={`${text}-${index}`}
                className={index === 3 ? styles.showcaseTextActive : ""}
              >
                {text}
              </span>
            ))}
          </div>

          <div className={styles.showcaseColumns}>
            {showcaseColumns.map((column, columnIndex) => (
              <div key={columnIndex} className={styles.showcaseColumn}>
                <div
                  className={`${styles.showcaseTrack} ${
                    columnIndex === 1 ? styles.showcaseTrackReverse : ""
                  }`}
                >
                  {[...column, ...column].map((book, index) => (
                    <div
                      key={`${book.title}-${columnIndex}-${index}`}
                      className={styles.showcaseCover}
                    >
                      <img src={book.image} alt={book.title} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="authors" className={styles.authors}>
          <div className={styles.sectionTitle}>
            <h2>Mashhur Mualliflar</h2>
            <p>Eng mashhur yozuvchilar va ularning bestseller kitoblari</p>
          </div>

          <div className={styles.authorCards}>
            <div className={styles.authorTrack}>
              {[...authors, ...authors].map((author, index) => (
                <div
                  key={`${author.name}-${index}`}
                  className={styles.authorCard}
                >
                  <img src={author.image} alt={author.name} />
                  <div className={styles.authorInfo}>
                    <h3>{author.name}</h3>
                    <p>{author.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className={styles.about}>
          <div className={styles.aboutRight}>
            <div className={styles.aboutBox}></div>
          </div>
          <div className={styles.aboutLeft}>
            <h2>Biz haqimizda</h2>
            <p>
              KitobXon - bu zamonaviy online platforma bo'lib,
              foydalanuvchilarga elektron va audio kitoblarni qulay tarzda
              taqdim etadi. Bizning maqsadimiz yoshlarni kitob o'qishga jalb
              qilish va bilim olishni yanada osonlashtirish.
            </p>

            <button className={styles.btn__second}>Batafsil</button>
          </div>
        </section>
      </main>
    </>
  );
}

export default Public;
