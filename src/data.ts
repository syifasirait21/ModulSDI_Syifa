import { LessonContent, GlossaryItem, Badge } from "./types";

export const GLOSARI_DATA: GlossaryItem[] = [
  {
    term: "Isostasi",
    definition: "Keadaan keseimbangan gravitasi antara kerak bumi keras dan mantel semi-fluid di bawahnya, yang membuat gunung terapung stabil sesuai berat jenisnya.",
    category: "Sains",
  },
  {
    term: "Lempeng Tektonik",
    definition: "Bagian kerak bumi (litosphere) yang terpecah menjadi lempeng-lempeng besar dan terus bergerak aktif, menyebabkan gempa dan mementingkan gunung berapi.",
    category: "Sains",
  },
  {
    term: "Pusuk Buhit",
    definition: "Gunung berapi aktif tipe B di Kabupaten Samosir yang dipercaya masyarakat Batak Toba sebagai asal mula suku Batak (pusat kosmologi) tanah ulayat.",
    category: "Etnosains Batak",
  },
  {
    term: "Naga Padoha Niaji",
    definition: "Sosok mistis dalam kosmologi kuno Batak yang diyakini berada di bawah lapisan bumi dan jika menggeliat akan menimbulkan gempa bumi (laba-laba tektonik).",
    category: "Etnosains Batak",
  },
  {
    term: "Tombak Pamulaan",
    definition: "Hutan lindung adat tradisional di puncak/lereng gunung ulayat Batak Toba yang dilarang keras untuk ditebang demi menjaga kelestarian debit air dan spiritual.",
    category: "Etnosains Batak",
  },
  {
    term: "Mual Sengseng",
    definition: "Mata air keramat atau sakral di kawasan pusaka pegunungan Batak Toba yang dipercaya memiliki khasiat kesembuhan dan dilestarikan secara ekologis.",
    category: "Etnosains Batak",
  },
  {
    term: "Awtad (الأوتاد)",
    definition: "Istilah bahasa Arab dari Al-Qur'an Surah An-Naba' yang berarti 'pasak' (tiang penyangga tenda) yang menancap kokoh menembus permukaan tanah.",
    category: "Al-Qur'an",
  },
  {
    term: "Kaldera",
    definition: "Kawah vulkanik raksasa yang terbentuk akibat runtuhnya bagian atas gunung berapi setelah letusan super-dahsyat, seperti Danau Toba yang terbentuk dari Kaldera Toba.",
    category: "Sains",
  },
  {
    term: "Solu Bolon",
    definition: "Perahu tradisional besar pembawa kargo suku Batak Toba yang navigasinya terbantu oleh penampakan lereng Dolok Tolong atau Pusuk Buhit sebagai mercu suar alami.",
    category: "Etnosains Batak",
  },
  {
    term: "Terasering",
    definition: "Metode konservasi lereng bukit atau pegunungan dengan membuat undakan tanah untuk mencegah longsor, erosi, dan menahan aliran irigasi padi.",
    category: "Sains",
  },
];

export const BADGES_DATA: Badge[] = [
  {
    id: "badge_start",
    title: "Penjelajah Pemula",
    description: "Memulai pelayaran modul pembelajaran Gunung.",
    icon: "Compass",
    category: "general",
  },
  {
    id: "badge_pasak",
    title: "Ahli Geologi Qur'an",
    description: "Memahami integrates gunung sebagai pasak bumi (Isostasi & Awtad).",
    icon: "Anchor",
    category: "quran",
  },
  {
    id: "badge_dinamis",
    title: "Saksi Kaldera Toba",
    description: "Menguasai ilmu tentang tektonika kerak bumi dan vulkanisme Danau Toba.",
    icon: "Flame",
    category: "science",
  },
  {
    id: "badge_air",
    title: "Penjaga Mual Pegunungan",
    description: "Memahami fungsi hidrologis pegunungan dan pelestarian hutan ulayat Batak Toba.",
    icon: "Droplets",
    category: "culture",
  },
  {
    id: "badge_arah",
    title: "Navigator Solu Bolon",
    description: "Mampu menggunakan rasi bintang dan landmark gunung untuk orientasi hidup.",
    icon: "Map",
    category: "culture",
  },
  {
    id: "badge_subur",
    title: "Petani Emas Lintong",
    description: "Memahami berkah kesuburan abu vulkanik tanah ulayat untuk kehidupan masyarakat.",
    icon: "Sprout",
    category: "science",
  },
  {
    id: "badge_conqueror",
    title: "Penakluk Puncak Toba",
    description: "Menyelesaikan seluruh materi dan evaluasi akhir dengan skor sempurna.",
    icon: "Trophy",
    category: "general",
  },
];

export const LESSONS_DATA: LessonContent[] = [
  {
    id: "materi_pasak",
    title: "Gunung sebagai Pasak Bumi",
    shortDesc: "Bagaimana gunung bertindak seperti tiang kokoh yang menjangkar bumi dari guncangan.",
    icon: "Anchor",
    color: "emerald",
    pemantik: {
      question: "Pernahkah kamu memikirkan mengapa bumi yang kita pijak ini tidak mudah bergoyang di bawah kaki kita?",
      text: "Jika kita mendirikan tenda di tanah yang berembus angin kencang, apa yang kita lakukan agar tenda tersebut tidak terbang? Kita akan menancapkan pasak besi dalam-dalam ke tanah. Al-Qur'an dan ilmu geologi modern memiliki analogi yang menakjubkan tentang peran gunung sebagai pasak bumi.",
    },
    eksplorasi: {
      text: "Pernahkah kamu bertanya mengapa gunung dapat berdiri kokoh selama jutaan tahun? Apakah bagian gunung hanya yang terlihat di permukaan bumi? Pada materi ini, kamu akan mempelajari bagaimana kerak bumi bergerak, mengapa gunung memiliki akar yang tertanam jauh ke dalam bumi, serta bagaimana konsep tersebut dijelaskan melalui teori isostasi.",
      points: [
        {
          title: "FENOMENA KERAK BUMI TERAPUNG",
          subtitle: "Mengapa Kerak Bumi Dapat Bergerak?",
          desc: "Meskipun terlihat kokoh dan tidak bergerak, kerak bumi sebenarnya berada di atas lapisan mantel atas yang bersifat plastis atau semi-cair yang disebut astenosfer. Lapisan ini memiliki suhu yang sangat tinggi sehingga batuannya dapat mengalir secara perlahan dalam jangka waktu geologi yang sangat panjang.\n\nKerak bumi bersama bagian mantel paling atas membentuk lapisan yang disebut litosfer. Litosfer terpecah menjadi beberapa lempeng tektonik besar dan kecil yang terus bergerak. Gerakan ini terjadi karena adanya arus konveksi di dalam mantel bumi yang mendorong lempeng-lempeng tersebut.\n\nFenomena ini dapat dianalogikan seperti balok es yang mengapung di atas air. Balok es tidak diam sepenuhnya, tetapi dapat bergerak mengikuti aliran air di bawahnya. Demikian pula kerak bumi yang \"mengapung\" di atas astenosfer dan bergerak sangat lambat dari waktu ke waktu.\n\nPergerakan lempeng tektonik inilah yang menyebabkan terbentuknya gunung, gempa bumi, aktivitas vulkanik, serta berbagai perubahan bentuk permukaan bumi yang terus berlangsung hingga saat ini.",
          factBubble: "Tahukah Kamu? Lempeng tektonik bergerak sekitar 2–10 cm per tahun. Meskipun terlihat kecil, dalam jutaan tahun pergerakan ini dapat menghasilkan pegunungan raksasa seperti Himalaya.",
        },
        {
          title: "TEORI ISOSTASI",
          subtitle: "Bagaimana Gunung Tetap Seimbang?",
          desc: "Para ilmuwan menjelaskan bahwa kerak bumi berada dalam keadaan keseimbangan yang disebut isostasi. Teori ini menyatakan bahwa massa batuan di permukaan bumi harus seimbang dengan massa batuan yang berada di bawahnya.\n\nBayangkan sepotong kayu yang mengapung di air. Kayu yang lebih besar akan tenggelam lebih dalam dibandingkan kayu yang lebih kecil. Namun keduanya tetap dapat mengapung karena terdapat keseimbangan antara berat benda dan gaya apung.\n\nPrinsip yang sama berlaku pada kerak bumi. Daerah yang memiliki pegunungan tinggi mempunyai massa yang lebih besar dibandingkan dataran rendah. Agar tetap seimbang, bagian kerak bumi di bawah pegunungan akan memanjang lebih dalam ke arah mantel membentuk struktur yang disebut akar gunung.\n\nSemakin tinggi suatu pegunungan, semakin dalam pula akar gunung yang dimilikinya. Oleh karena itu, bagian gunung yang terlihat di permukaan sebenarnya hanyalah sebagian kecil dari keseluruhan strukturnya.\n\nTeori isostasi membantu para ilmuwan memahami bagaimana kerak bumi dapat mempertahankan keseimbangannya meskipun terus mengalami perubahan akibat aktivitas tektonik dan erosi.",
          analogyText: "Analogi Sederhana\n\n🧊 Gunung es di laut:\nBagian kecil terlihat di atas permukaan. Bagian terbesar berada di bawah air.\n\n🏔️ Gunung di bumi:\nPuncak terlihat di permukaan. Akar gunung tertanam jauh ke dalam kerak bumi.",
        },
        {
          title: "KERAPUHAN TANPA GUNUNG",
          subtitle: "Apa yang Terjadi Jika Tidak Ada Pegunungan?",
          desc: "Pegunungan bukan hanya bentang alam yang indah, tetapi juga bagian penting dari sistem geologi bumi. Gunung terbentuk akibat proses tektonik yang berlangsung selama jutaan tahun dan menjadi indikator bahwa kerak bumi sedang menyesuaikan diri terhadap gaya-gaya yang bekerja di dalamnya.\n\nKeberadaan pegunungan menunjukkan adanya distribusi massa yang membantu menjaga keseimbangan kerak bumi sesuai prinsip isostasi. Struktur akar gunung yang tertanam jauh ke dalam kerak bumi menjadi bagian dari sistem keseimbangan tersebut.\n\nJika tidak terdapat pegunungan dan akar gunung, distribusi massa pada kerak bumi akan berbeda. Kerak bumi akan kehilangan salah satu mekanisme alami yang membantu mencapai keseimbangan isostatik. Akibatnya, penyesuaian kerak bumi terhadap tekanan dan gaya tektonik dapat berlangsung dengan cara yang berbeda dibandingkan kondisi saat ini.\n\nMeskipun gunung tidak secara langsung menghentikan gempa bumi atau mengunci lempeng tektonik, keberadaannya berperan penting dalam menjaga keseimbangan struktur kerak bumi. Oleh karena itu, pegunungan merupakan bagian yang tidak terpisahkan dari dinamika dan kestabilan geologi bumi.",
          reflectionText: "Coba bayangkan jika seluruh permukaan bumi hanya berupa dataran tanpa pegunungan. Bagaimana distribusi massa kerak bumi akan berubah? Apakah keseimbangan kerak bumi akan tetap sama seperti sekarang?",
        },
      ],
    },
    sains: {
      title: "Sains Modern: Teori Isostasi & Akar Gunung",
      text: "Pada tahun 1855, Sir George Airy dan Pratt mengusulkan konsep Isostasi. Gunung ternyata tidak hanya menonjol ke atas permukaan bumi setinggi ribuan meter, tetapi memiliki kedalaman akar ke dalam bumi hingga 5 sampai 6 kali lipat dari tingginya! Sebagai contoh, Gunung Everest memiliki bagian atas sekitar 8 km, namun akarnya menjulur ke dalam kerak bumi sampai sekitar 40-50 km. Akar lilin inilah yang mengikat lempeng samudera dan benua, mencegah kerak bergoyang terlalu kejam di atas mantel cair.",
      diagramType: "isostasy",
      hotspots: [
        {
          id: "peak",
          x: 50,
          y: 20,
          title: "Puncak Gunung (Topografi)",
          description: "Bagian atas gunung yang terlihat di permukaan bumi, terbentuk akibat orogenesis (lipatan atau patahan tektonik).",
        },
        {
          id: "crust",
          x: 20,
          y: 55,
          title: "Kerak Bumi (Litosfer)",
          description: "Lapisan padat terluar bumi yang mengapung di atas astenosfer yang elastis.",
        },
        {
          id: "roots",
          x: 50,
          y: 85,
          title: "Akar Gunung (Massa Tenggelam)",
          description: "Struktur dalam gunung yang menjulur dalam-dalam ke mantel bumi, berfungsi menstabilkan berdasarkan hukum Archimedes (Isostasi).",
        },
      ],
    },
    quran: {
      title: "Integrasi Al-Qur'an: Al-Awtad & Al-Arsy",
      verses: [
        {
          surah: "An-Naba'",
          verse: "6-7",
          arabic: "أَلَمْ نَجْعَلِ الْأَرْضَ مِهَادًا. وَالْجِبَالَ أَوْتَادًا",
          translation: "Bukankah Kami telah menjadikan bumi itu sebagai hamparan? Dan gunung-gunung kesemuanya sebagai pasak (awtad)?",
          explanation: "Kata 'Awtad' dalam bahasa Arab kuno berarti pasak tenda yang berfungsi menjangkar tenda agar stabil. Bagian pasak yang masuk ke dalam tanah jauh lebih panjang daripada yang terlihat di luar. Ini adalah diksi mukjizat ilmiah Al-Qur'an yang menjelaskan struktur akar gunung 14 abad sebelum geologi modern menemukannya.",
          tafsir: "Menurut para mufasir seperti Ibnu Katsir, Al-Qurthubi, dan Tafsir Kementerian Agama RI, ayat ini menunjukkan salah satu bentuk nikmat Allah kepada manusia. Allah menjadikan bumi sebagai mihād (hamparan) yang nyaman untuk dihuni, ditanami, dan dijadikan tempat beraktivitas. Sementara itu, gunung-gunung dijadikan sebagai awtād (pasak-pasak) yang berfungsi menjaga keseimbangan bumi.\n\nIstilah awtād menggambarkan gunung sebagaimana pasak yang menancap kuat ke dalam tanah untuk menegakkan tenda. Penggunaan kata ini menunjukkan kekokohan dan peran penting gunung dalam menjaga kestabilan ciptaan Allah. Selain sebagai penyangga, gunung juga menjadi sumber kehidupan karena menyimpan cadangan air, memengaruhi iklim lokal, serta menghasilkan tanah yang subur bagi pertanian.\n\nMelalui ayat ini, Allah mengajak manusia untuk merenungkan keteraturan alam semesta sebagai tanda kebesaran-Nya. Keberadaan gunung tidak hanya memiliki fungsi fisik yang dapat dipelajari melalui ilmu pengetahuan, tetapi juga menjadi bukti kekuasaan Allah yang menciptakan bumi dengan penuh keseimbangan dan hikmah.",
          ipaConnection: "Dalam kajian geologi modern, gunung memiliki struktur akar yang memanjang ke bawah permukaan bumi sehingga membantu menjaga keseimbangan kerak bumi. Selain itu, aktivitas vulkanik menghasilkan abu yang kaya mineral dan kemudian membentuk tanah vulkanis yang subur. Hal ini menjadikan wilayah pegunungan sebagai pusat pertanian yang produktif, sehingga semakin memperlihatkan manfaat gunung bagi kehidupan manusia sebagaimana diisyaratkan dalam ayat tersebut."
        },
        {
          surah: "An-Nazi'at",
          verse: "32",
          arabic: "وَالْجِبَالَ أَرْسَاهَا",
          translation: "Dan gunung-gunung Dia pancangkan dengan kokoh.",
          explanation: "Kata arsāhā menggambarkan gunung sebagai sesuatu yang ditegakkan atau dipancangkan dengan kokoh. Dalam ilmu geologi modern, gunung memiliki struktur yang tidak hanya tampak di permukaan, tetapi juga memiliki bagian yang memanjang ke bawah kerak bumi. Struktur ini membantu menjaga keseimbangan kerak bumi melalui proses yang dikenal sebagai isostasi. Selain itu, aktivitas vulkanik di daerah pegunungan menghasilkan material kaya mineral yang kemudian membentuk tanah vulkanis subur sehingga mendukung pertumbuhan berbagai tanaman.",
          tafsir: "Menurut Tafsir Ibnu Katsir dan Tafsir Kementerian Agama RI, ayat \"Wal-jibāla arsāhā\" (Dan gunung-gunung Dia pancangkan dengan kokoh) menjelaskan bahwa Allah menciptakan gunung sebagai bagian dari keseimbangan bumi. Kata arsāhā berasal dari akar kata yang bermakna \"meneguhkan\", \"memantapkan\", atau \"menambatkan\". Ayat ini menunjukkan bahwa gunung tidak diciptakan tanpa tujuan, melainkan memiliki fungsi penting dalam menjaga keteraturan sistem bumi serta menjadi sumber berbagai manfaat bagi makhluk hidup.\n\nGunung juga berperan sebagai tempat penyimpanan air, habitat berbagai makhluk hidup, serta sumber mineral yang mendukung kehidupan manusia. Dengan demikian, keberadaan gunung merupakan salah satu tanda kebesaran Allah yang patut direnungkan dan disyukuri.",
          ipaConnection: "Dalam ilmu kebumian, gunung merupakan bagian penting dari dinamika litosfer bumi. Gunung terbentuk akibat aktivitas tektonik dan vulkanik yang berlangsung selama jutaan tahun. Keberadaan gunung memengaruhi berbagai proses alam, seperti siklus air, pembentukan tanah, dan persebaran keanekaragaman hayati. Aktivitas vulkanik juga menghasilkan material berupa abu dan batuan yang kaya mineral sehingga membentuk tanah vulkanis yang subur untuk pertanian.\n\nSelain itu, pegunungan berfungsi sebagai daerah tangkapan air (catchment area) yang menyimpan dan menyalurkan air hujan ke sungai, mata air, dan air tanah. Oleh karena itu, wilayah pegunungan sering menjadi sumber kehidupan bagi masyarakat di sekitarnya. Melalui kajian IPA, siswa dapat memahami bahwa gunung tidak hanya memiliki nilai keagamaan sebagai tanda kebesaran Allah SWT, tetapi juga memiliki peran penting dalam menjaga keseimbangan lingkungan dan mendukung kehidupan di bumi."
        },
      ],
      hikmah: "Penciptaan gunung merupakan bukti kasih sayang Allah SWT agar bumi yang berotasi sangat cepat (sekitar 1.670 km/jam di khatulistiwa) tetap tenang dan layak dihuni oleh manusia tanpa terjadinya pergeseran tanah terus-menerus.",
    },
    etnosains: {
      title: "Etnosains Batak Toba: Dolok Pusuk Buhit sebagai Tiang Bumi",
      origin: "Mitos Penciptaan Mulajadi Na Bolon & Kosmologi Batak Toba",
      narrative: "Dalam kepercayaan leluhur Batak Toba, alam semesta diciptakan dan diatur oleh Mulajadi Na Bolon, sosok pencipta tertinggi yang menjadi sumber kehidupan. Gunung Pusuk Buhit dipercaya sebagai tempat awal mula kehidupan manusia Batak dan berperan sebagai pusat kosmos (axis mundi) yang menghubungkan dunia atas, dunia tengah, dan dunia bawah. Kepercayaan ini mencerminkan pandangan masyarakat Batak Toba bahwa gunung memiliki peran penting dalam menjaga keseimbangan alam dan kehidupan manusia.",
      ipaConnection: "Walaupun kisah ini bersifat mitologis, keberadaan gunung memang memiliki peran penting dalam sistem bumi. Gunung memengaruhi iklim lokal, siklus air, kesuburan tanah, serta menjadi habitat berbagai makhluk hidup. Dengan demikian, mitos tersebut menunjukkan bagaimana masyarakat tradisional memahami pentingnya gunung bagi keberlangsungan kehidupan melalui cara pandang budaya mereka.",
      practices: [
        {
          title: "Ritual Penghormatan Gunung",
          desc: "Masyarakat Batak Toba secara turun-temurun melaksanakan berbagai ritual adat sebagai bentuk penghormatan kepada alam, termasuk gunung dan hutan di sekitarnya. Ritual ini mengandung pesan moral agar manusia menjaga hubungan yang harmonis dengan lingkungan dan tidak mengeksploitasi sumber daya alam secara berlebihan.",
          icon: "Sparkles",
          ipaConnection: "Dalam ilmu lingkungan, perilaku menjaga keseimbangan alam sangat penting untuk mencegah kerusakan ekosistem. Pelestarian kawasan pegunungan membantu menjaga ketersediaan air, mengurangi risiko longsor, serta mempertahankan keanekaragaman hayati yang hidup di wilayah tersebut.",
        },
        {
          title: "Kearifan 'Ulayat' Tanah Pusuk Buhit",
          desc: "Masyarakat adat menetapkan berbagai aturan adat (ulayat) yang melarang perusakan kawasan hutan, penebangan liar, maupun pengambilan sumber daya alam secara berlebihan di wilayah yang dianggap sakral. Aturan ini diwariskan dari generasi ke generasi sebagai bentuk tanggung jawab bersama dalam menjaga kelestarian lingkungan.",
          icon: "ShieldAlert",
          ipaConnection: "Hutan di daerah pegunungan berfungsi sebagai daerah resapan air (catchment area) yang penting bagi siklus hidrologi. Jika hutan rusak, kemampuan tanah menyerap air akan berkurang sehingga meningkatkan risiko erosi, banjir, dan tanah longsor. Oleh karena itu, kearifan lokal masyarakat Batak Toba sejalan dengan prinsip konservasi lingkungan yang dipelajari dalam IPA modern.",
        },
      ],
    },
    rangkuman: [
      "Teologi Al-Qur'an: Allah SWT menciptakan bumi sebagai hamparan yang nyaman (mihād) dan memancangkan gunung-gunung sebagai pasak-pasak kokoh (awtād / arsāhā) demi menjaga kesetimbangan bumi serta menjadi sumber berbagai maslahat hidup.",
      "Kajian Isostasi & Geologi IPA: Dalam sains modern, gunung memiliki struktur akar di bawah kerak bumi yang menjaga stabilitas kerak bumi via mekanisme isostasi. Aktivitas vulkanik menghasilkan material kaya mineral yang menyuburkan tanah pertanian di sekitarnya.",
      "Perspektif Kosmologi Batak Toba: Dolok Pusuk Buhit dipandang sebagai pusat kosmos (axis mundi) dalam keyakinan Mulajadi Na Bolon. Secara tidak langsung, kearifan ini menunjukkan rekognisi mendalam terhadap signifikansi ekologis gunung bagi kelangsungan hidup.",
      "Kearifan Ekologi & Konservasi Modern: Aturan adat ulayat kehutanan dan ritual tradisi Batak Toba berfungsi menjaga kelestarian daerah resapan air (catchment area). Tindakan konservasi lokal ini selaras dengan prinsip modern pencegahan degradasi hidrologis, banjir, dan longsor."
    ],
    quiz: [
      {
        id: "q_pasak_1",
        question: "Apakah nama teori sains yang menjelaskan tentang keseimbangan berat jenis kerak bumi dengan mantel di bawahnya?",
        options: ["Teori Gravitasi Newton", "Teori Isostasi", "Teori Seleksi Alam", "Teori Relativitas"],
        correctIndex: 1,
        explanation: "Teori Isostasi menjelaskan bahwa kerak bumi mengapung di atas mantel cair dalam kondisi kesetimbangan hidrostatis, mirip balok kayu di atas air.",
      },
      {
        id: "q_pasak_2",
        question: "Kata bahasa Arab dalam Al-Qur'an Surat An-Naba' yang berarti 'Pasak Tenda' adalah...",
        options: ["Arsaha", "Wal-jibala", "Awtad", "Mihaada"],
        correctIndex: 2,
        explanation: "Awtad (أوتاد) adalah bentuk jamak dari watad yang artinya pasak tenda atau tiang pengikat tenda besar.",
      },
      {
        id: "q_pasak_3",
        question: "Bagi masyarakat tradisional Batak Toba, gunung apakah yang dipercaya sebagai pusat kosmik/tiang keseimbangan bumi?",
        options: ["Dolok Tolong", "Gunung Sinabung", "Gunung Sibayak", "Gunung Pusuk Buhit"],
        correctIndex: 3,
        explanation: "Gunung Pusuk Buhit dipercaya sebagai situs keramat asal-mula keturunan raja Batak dan tonggak penyeimbang tanah Toba.",
      },
      {
        id: "q_pasak_4",
        question: "Berapakah perbandingan rata-rata kedalaman akar gunung di dalam bumi dibanding tinggi puncak yang terlihat di permukaan?",
        options: ["Sama tinggi", "2 kali lipat", "5 hingga 6 kali lipat", "100 kali lipat"],
        correctIndex: 2,
        explanation: "Gunung memiliki kedalaman akar ke dalam bumi hingga 5 sampai 6 kali lipat dari tinggi puncaknya demi kestabilan.",
      },
      {
        id: "q_pasak_5",
        question: "Siapakah ilmuwan barat yang pertama kali mengusulkan konsep kesetimbangan hidrostatis 'Isostasi' pada tahun 1855?",
        options: ["Sir George Airy", "Albert Einstein", "Isaac Newton", "Alfred Wegener"],
        correctIndex: 0,
        explanation: "Sir George Airy mengemukakan usulan akar gunung yang mengapung di atas mantel cair elastis pada tahun 1855.",
      },
      {
        id: "q_pasak_6",
        question: "Kata 'Arsaha' dalam Al-Qur'an (Surah An-Nazi'at ayat 32) memiliki kesamaan makna etimologis dengan kata yang digunakan untuk...",
        options: ["Terbangnya burung", "Berlabuhnya kapal dengan jangkar", "Mengalirnya air sungai", "Reruntuhan bebatuan"],
        correctIndex: 1,
        explanation: "Arsaha berasal dari kata yang sama dengan menambatkan sauh/jangkar kapal agar kapal stabil dari hantaman ombak air.",
      },
      {
        id: "q_pasak_7",
        question: "Bagaimanakah dampak geologis jika kerak bumi di zona lempeng benua tidak memiliki struktur pegunungan pelindung?",
        options: ["Kerak bumi bergoyang kacau dan guncangan tektonik jauh lebih hebat", "Bumi akan berputar lebih lambat", "Tidak akan terjadi hujan", "Air laut akan menguap habis"],
        correctIndex: 0,
        explanation: "Tanpa barisan gunung sebagai penyerap guncangan tektonika, kerak bumi akan sangat rapuh dan bergoyang secara ekstrem.",
      },
      {
        id: "q_pasak_8",
        question: "Dalam mitologi kuno Batak Toba, tokoh siapakah yang menenun bumi di atas samudera luas dan menancapkan tanah suci penahan guncangan?",
        options: ["Si Boru Deak Parujar", "Raja Sisingamangaraja", "Mulajadi Na Bolon", "Naga Padoha"],
        correctIndex: 0,
        explanation: "Si Boru Deak Parujar dicitrakan menenun bumi dan menambatkannya dengan tanah kiriman Mulajadi Na Bolon.",
      },
      {
        id: "q_pasak_9",
        question: "Kerak bumi (litosfer) mengapung di atas lapisan mantel bumi bagian atas yang bersifat liat dan elastis, yang disebut...",
        options: ["Astenosfer", "Inti Bumi", "Mesosfer", "Stratosfer"],
        correctIndex: 0,
        explanation: "Astenosfer adalah lapisan mantel atas yang plastis, liat, dan panas tempat lempeng litosfer mengapung.",
      },
      {
        id: "q_pasak_10",
        question: "Mengapa analogi 'pasak' (awtad) sangat revolusioner untuk struktur gunung secara ilmiah?",
        options: ["Puncak dan akar memiliki kedalaman yang sama", "Bagian bawah pasak yang dalam menancap kuat mengunci stabilitas kerak, mirip akar gunung", "Pasak terbuat dari logam kuno", "Pasak hanya diletakkan di atas pasir"],
        correctIndex: 1,
        explanation: "Pasak (awtad) harus tertancap lebih dalam di bawah tanah daripada bagian yang muncul di permukaan, sama seperti akar gunung.",
      }
    ],
    matchingGame: {
      instruction: "Tarik istilah sains / etnis ke padanan maknanya yang tepat!",
      pairs: [
        { left: "Awtad", right: "Pasak bumi penstabil kerak" },
        { left: "Isostasi", right: "Kesetimbangan hidrostatik kerak" },
        { left: "Akar Gunung", right: "Menjulur 5-6x tinggi gunung" },
        { left: "Pusuk Buhit", right: "Aksis Mundi bumi Batak" },
        { left: "Astenosfer", right: "Lapisan mantel liat tempat kerak mengapung" },
      ],
    },
  },
  {
    id: "materi_dinamis",
    title: "Gunung Dinamis (Lempeng & Vulkanisme)",
    shortDesc: "Bagaimana pergerakan gunung menggambarkan dinamika bumi yang dinamis bagaikan awan.",
    icon: "Flame",
    color: "amber",
    pemantik: {
      question: "Apakah menurutmu gunung-gunung itu adalah benda mati yang diam secara absolut selama jutaan tahun?",
      text: "Jika kita memandangnya dari kejauhan, gunung tampak berdiri membisu tanpa bergerak sama sekali. Namun, teknologi GPS dan satelit modern membuktikan bahwa gunung-gunung di seluruh belahan bumi terus bergeser dalam skala milimeter per tahun. Keaktifan vulkanisnya juga menjadi saksi betapa dinamisnya ciptaan Allah ini.",
    },
    eksplorasi: {
      text: "Pernahkah kamu membayangkan bahwa benua, samudra, bahkan gunung yang tampak kokoh sebenarnya terus bergerak? Energi dari dalam bumi menggerakkan lempeng tektonik dan magma, menghasilkan berbagai fenomena luar biasa seperti pembentukan pegunungan, gempa bumi, hingga letusan Supervolcano Toba. Mari telusuri bagaimana dinamika bumi membentuk lingkungan tempat kita hidup saat ini.",
      points: [
        {
          title: "PERGESERAN LEMPENG TEKTONIK",
          subtitle: "Bumi yang Terus Bergerak",
          desc: "Permukaan bumi yang kita tinggali sebenarnya tidak diam. Lapisan terluar bumi, yang disebut litosfer, tersusun atas sejumlah lempeng tektonik raksasa yang terus bergerak secara perlahan. Pergerakan ini terjadi karena adanya arus konveksi di dalam mantel bumi. Panas dari inti bumi menyebabkan material mantel bergerak naik dan turun sehingga mendorong lempeng-lempeng di atasnya.\n\nMeskipun kecepatan pergerakan lempeng hanya beberapa sentimeter per tahun, dampaknya sangat besar dalam skala waktu geologi. Selama jutaan tahun, pergerakan ini mampu memisahkan benua, membentuk samudra baru, menciptakan pegunungan, dan memicu aktivitas vulkanik.\n\nTerdapat tiga jenis utama pergerakan lempeng tektonik. Pertama, batas konvergen, yaitu ketika dua lempeng saling mendekat dan bertumbukan. Kedua, batas divergen, yaitu ketika dua lempeng saling menjauh. Ketiga, batas transform, yaitu ketika dua lempeng saling bergeser secara horizontal. Ketiga jenis pergerakan ini berperan penting dalam membentuk berbagai kenampakan alam di permukaan bumi.\n\nIndonesia terletak pada pertemuan beberapa lempeng besar dunia, yaitu Lempeng Eurasia, Lempeng Indo-Australia, dan Lempeng Pasifik. Posisi ini menyebabkan wilayah Indonesia memiliki aktivitas geologi yang sangat tinggi, termasuk sering terjadi gempa bumi dan banyaknya gunung api aktif.\n\nPergerakan lempeng yang berlangsung terus-menerus menjadi salah satu alasan mengapa permukaan bumi selalu mengalami perubahan dari waktu ke waktu. Bentang alam yang kita lihat saat ini merupakan hasil dari proses geologi yang berlangsung selama jutaan tahun.",
          factBubble: "Lempeng Indo-Australia bergerak ke arah utara dengan kecepatan sekitar 7 cm per tahun dan terus bertumbukan dengan Lempeng Eurasia di wilayah Indonesia.",
        },
        {
          title: "KEAJAIBAN SUPERVOLCANO TOBA",
          subtitle: "Letusan Dahsyat yang Mengubah Dunia",
          desc: "Danau Toba yang berada di Sumatera Utara merupakan salah satu bukti aktivitas vulkanik terbesar yang pernah terjadi di bumi. Sekitar 74.000 tahun yang lalu, terjadi letusan supervolcano Toba yang menghasilkan energi luar biasa besar dan melepaskan material vulkanik dalam jumlah yang sangat masif ke atmosfer.\n\nPara ilmuwan memperkirakan bahwa letusan ini mengeluarkan sekitar 2.800 kilometer kubik material vulkanik berupa abu, batuan, dan gas. Jumlah tersebut jauh lebih besar dibandingkan letusan gunung api biasa yang terjadi saat ini. Abu vulkanik dari letusan Toba bahkan ditemukan di berbagai wilayah Asia Selatan hingga Samudra Hindia.\n\nSetelah letusan besar tersebut, ruang magma yang sangat besar di bawah gunung menjadi kosong. Akibatnya, bagian atas gunung runtuh dan membentuk cekungan raksasa yang disebut kaldera. Kaldera inilah yang kemudian terisi air dan membentuk Danau Toba yang kita kenal sekarang.\n\nDi tengah Danau Toba terdapat Pulau Samosir yang terbentuk akibat pengangkatan kembali dasar kaldera setelah letusan. Fenomena ini menunjukkan bahwa aktivitas geologi tidak berhenti setelah letusan terjadi, tetapi terus berlangsung selama ribuan tahun.\n\nLetusan Toba menjadi salah satu peristiwa penting dalam sejarah geologi bumi karena menunjukkan betapa besarnya energi yang tersimpan di dalam planet kita. Hingga saat ini, Danau Toba menjadi laboratorium alam yang membantu para ilmuwan memahami proses vulkanisme dan dinamika bumi.",
          factBubble: "Danau Toba memiliki panjang sekitar 100 kilometer dan lebar sekitar 30 kilometer, menjadikannya salah satu danau vulkanik terbesar di dunia.",
        },
        {
          title: "GERAKAN MAKROSKOPIK GUNUNG",
          subtitle: "Apakah Gunung Bisa Berpindah Tempat?",
          desc: "Ketika melihat gunung yang menjulang tinggi, kita mungkin menganggap bahwa gunung selalu berada di tempat yang sama. Namun dalam skala waktu geologi, gunung sebenarnya ikut bergerak bersama lempeng tektonik tempat gunung tersebut berada.\n\nKarena gunung merupakan bagian dari kerak bumi, setiap pergerakan lempeng akan membawa gunung ikut bergerak. Pergerakan ini sangat lambat sehingga tidak dapat diamati secara langsung dalam kehidupan sehari-hari. Namun melalui pengukuran satelit modern, para ilmuwan dapat mengetahui bahwa gunung-gunung terus berpindah posisi beberapa sentimeter setiap tahunnya.\n\nPergerakan ini disebut gerakan makroskopik karena melibatkan perpindahan struktur geologi dalam skala yang sangat besar. Selama jutaan tahun, perpindahan tersebut dapat mengubah posisi suatu pegunungan hingga ribuan kilometer dari lokasi asalnya.\n\nSelain bergerak secara horizontal mengikuti lempeng tektonik, gunung juga dapat mengalami perubahan ketinggian akibat pengangkatan tektonik, aktivitas magma, maupun erosi. Oleh karena itu, bentuk dan ukuran gunung yang kita lihat saat ini merupakan hasil dari berbagai proses geologi yang berlangsung dalam waktu yang sangat lama.\n\nFenomena ini menunjukkan bahwa gunung bukanlah struktur yang statis. Sebaliknya, gunung merupakan bagian dari sistem bumi yang terus berubah mengikuti dinamika lempeng tektonik dan aktivitas geologi di dalam bumi.",
          reflectionText: "Jika sebuah gunung bergerak rata-rata 5 cm setiap tahun, berapa jarak yang akan ditempuh gunung tersebut dalam waktu 1 juta tahun? Apa yang dapat kamu simpulkan tentang perubahan bentuk permukaan bumi dalam skala waktu geologi?",
        },
      ],
    },
    sains: {
      title: "Sains Modern: Kegunungapian & Jejak Kaldera Toba",
      text: "Dalam geologi tektonik lempeng, pulau Sumatera terletak di zona penunjaman subduksi aktif antara Lempeng Indo-Australia dan Lempeng Eurasia. Proses gesekan benua ini melahirkan retakan besar bernama Sesar Besar Sumatera (Great Sumatran Fault Line). Berdasarkan jejak ilmiah, letusan Toba pada 74.000 tahun silam merupakan bencana magmatik terbesar di era kuarter bumi. Muntahannya menutup atmosfer bumi hingga menyebabkan zaman es instan, menurunkan populasi manusia secara global, dan runtuhan kawah purbanya membentuk Danau Toba sepanjang 100 km dengan Pulau Samosir terangkat di tengahnya akibat tekanan magma sisa yang seimbang.",
      diagramType: "volcano",
      hotspots: [
        {
          id: "magma",
          x: 50,
          y: 75,
          title: "Dapur Magma (Magma Chamber)",
          description: "Gudang penyimpanan batuan cair panas (magma) di bawah tekanan tinggi di mantel atas bumi.",
        },
        {
          id: "conduit",
          x: 50,
          y: 61,
          title: "Pipa Vulkanik (Vent)",
          description: "Saluran utama tempat magma naik dari bumi ke atas permukaan saat aktivitas erupsi.",
        },
        {
          id: "caldera",
          x: 50,
          y: 43,
          title: "Danau Kaldera",
          description: "Kawah besar runtuhan gunung pasca letusan dahsyat terisi air hujan, seperti Danau Toba.",
        },
      ],
    },
    quran: {
      title: "Integrasi Al-Qur'an: Gunung Berjalan Layaknya Awan",
      verses: [
        {
          surah: "An-Naml",
          verse: "88",
          arabic: "وَتَرَى الْجِبَالَ تَحْسَبُهَا جَامِدَةً وَهِيَ تَمُرُّ مَرَّ السَّحَابِ",
          translation: "Dan kamu lihat gunung-gunung itu, kamu sangka dia tetap membeku (diam), padahal dia berjalan laksana jalannya awan.",
          explanation: "Ayat ini secara eksplisit mengisyaratkan bahwa gunung-gunung itu bergerak dinamis. Meski terlihat kokoh membeku dari mata manusia biasa, gunung-gunung bergerak bersama lempeng tektonik sejauh beberapa cm/tahun, persis seperti analogi awan yang bergerak terbawa angin yang tidak terasa gerakannya jika kita ikut di atasnya.",
          tafsir: "Menurut para mufasir, seperti Ibnu Katsir dan Tafsir Kementerian Agama RI, ayat ini menggambarkan salah satu tanda kebesaran Allah yang akan tampak jelas pada hari Kiamat, ketika gunung-gunung yang terlihat kokoh ternyata bergerak dan berubah atas kehendak-Nya. Namun, ayat ini juga mengandung pelajaran bahwa ciptaan Allah tidak selalu seperti yang tampak oleh indra manusia. Sesuatu yang terlihat diam dan tetap dapat saja mengalami proses yang tidak disadari manusia.\n\nPerumpamaan gunung yang berjalan seperti awan menunjukkan kekuasaan Allah dalam mengatur alam semesta dengan hukum-hukum yang sangat teratur. Gunung yang tampak kokoh merupakan bagian dari sistem bumi yang terus mengalami perubahan sejak diciptakan hingga saat ini. Oleh karena itu, manusia diajak untuk merenungkan kebesaran Allah melalui fenomena alam yang ada di sekitarnya.",
          ipaConnection: "Ayat ini menyebutkan bahwa gunung-gunung yang tampak diam sebenarnya bergerak seperti awan. Dalam ilmu geologi modern, gunung berada di atas lempeng tektonik yang terus bergerak beberapa sentimeter setiap tahun. Pergerakan tersebut sangat lambat sehingga tidak dapat dirasakan secara langsung oleh manusia, tetapi dapat diukur menggunakan teknologi satelit dan sistem GPS presisi tinggi.\n\nFenomena ini menunjukkan bahwa permukaan bumi bersifat dinamis. Gunung, benua, dan dasar samudra mengalami perubahan posisi akibat pergerakan lempeng tektonik. Meskipun tidak secara eksplisit menjelaskan teori tektonik lempeng, ayat ini memberikan isyarat bahwa gunung yang tampak kokoh sesungguhnya merupakan bagian dari sistem bumi yang terus bergerak sesuai ketetapan Allah SWT."
        },
      ],
      hikmah: "Ayat ini mengajarkan bahwa tidak semua kenyataan dapat diketahui hanya melalui pengamatan kasatmata. Manusia perlu menggunakan akal, ilmu pengetahuan, dan penelitian untuk memahami tanda-tanda kebesaran Allah yang tersembunyi di alam semesta. Semakin berkembang ilmu pengetahuan, semakin banyak pula rahasia ciptaan Allah yang dapat dipahami.\n\nSelain itu, ayat ini mengingatkan bahwa alam semesta diciptakan dengan keteraturan yang luar biasa. Pergerakan bumi, lempeng tektonik, dan gunung-gunung berlangsung sesuai sunnatullah yang telah ditetapkan-Nya. Oleh karena itu, manusia hendaknya semakin bersyukur, menjaga kelestarian lingkungan, dan menjadikan ilmu pengetahuan sebagai sarana untuk memperkuat keimanan kepada Allah SWT.\n\n\"Ṣun'allāhil-lażī atqana kulla syai’\" (Perbuatan Allah yang membuat segala sesuatu dengan sempurna) menegaskan bahwa seluruh fenomena alam terjadi dalam sistem yang teratur, presisi, dan penuh hikmah sebagai bukti kesempurnaan ciptaan-Nya.",
    },
    etnosains: {
      title: "Etnosains Batak Toba: Perspektif Budaya Toba & Mitologi Naga Padoha",
      origin: "Sumber Perspektif Budaya Toba\nKearifan Geologi dalam Tutur Lisan",
      narrative: "Sebelum berkembangnya ilmu geologi modern, masyarakat Batak Toba telah mengamati bahwa wilayah Danau Toba dan sekitarnya sering mengalami gempa bumi serta aktivitas panas bumi. Pengamatan tersebut kemudian diwariskan melalui cerita rakyat tentang Naga Padoha Naiji, makhluk yang diyakini tinggal di bawah bumi. Dalam cerita tersebut, setiap kali naga bergerak atau menggeliat, bumi akan bergetar dan menimbulkan gempa.\n\nWalaupun bersifat mitologis, kisah ini menunjukkan kemampuan masyarakat tradisional dalam mengenali pola fenomena alam yang terjadi di lingkungannya. Melalui cerita tersebut, pengetahuan tentang bahaya gempa diwariskan dari generasi ke generasi sehingga masyarakat tetap waspada terhadap perubahan alam di sekitar mereka.",
      ipaConnection: "Saat ini, ilmu geologi menjelaskan bahwa gempa bumi di kawasan Sumatra terjadi akibat pergerakan lempeng tektonik Indo-Australia dan Eurasia yang membentuk Sesar Sumatra. Aktivitas tektonik tersebut menghasilkan gempa yang dapat dirasakan oleh masyarakat. Dengan demikian, legenda Naga Padoha Naiji dapat dipahami sebagai bentuk interpretasi budaya terhadap fenomena geologi yang diamati masyarakat pada masa lalu.",
      practices: [
        {
          title: "Kearifan Ekologi & Mitologi Praktis\nTradisi Menenangkan Naga",
          desc: "Dalam beberapa cerita rakyat Batak Toba, masyarakat melakukan tindakan simbolis seperti menepuk tanah atau mengucapkan seruan tertentu ketika terjadi gempa. Tradisi ini merupakan bentuk respons budaya yang berkembang untuk menghadapi peristiwa alam yang menimbulkan rasa takut dan ketidakpastian.\n\nSelain memiliki makna spiritual, tradisi tersebut berfungsi memperkuat solidaritas sosial karena masyarakat berkumpul dan saling menenangkan saat terjadi bencana. Kearifan ini menunjukkan bahwa masyarakat tradisional memiliki cara tersendiri dalam membangun ketahanan menghadapi ancaman alam.",
          icon: "TrendingUp",
          ipaConnection: "Dalam mitigasi bencana modern, masyarakat dianjurkan untuk tetap tenang, mencari tempat aman, dan mengikuti prosedur keselamatan saat terjadi gempa bumi. Meskipun penjelasannya berbeda, tradisi lokal dan mitigasi modern sama-sama bertujuan mengurangi kepanikan serta meningkatkan kesiapsiagaan masyarakat terhadap bencana."
        },
        {
          title: "Eksplorasi Air Hangat \"Aek Rangat\"",
          desc: "Masyarakat Batak Toba telah lama memanfaatkan mata air panas (aek rangat) yang muncul di sekitar kawasan vulkanik sebagai tempat berendam dan terapi tradisional. Mereka mengamati bahwa air tersebut memiliki suhu yang lebih tinggi dibandingkan air biasa serta mengandung mineral tertentu yang dipercaya bermanfaat bagi kesehatan.\n\nPemanfaatan sumber air panas ini menunjukkan kemampuan masyarakat dalam mengenali dan memanfaatkan potensi alam yang tersedia di lingkungan mereka. Pengetahuan tersebut diwariskan secara turun-temurun dan masih digunakan hingga saat ini.",
          icon: "Flame",
          ipaConnection: "Dalam ilmu kebumian, mata air panas terbentuk karena air tanah dipanaskan oleh batuan panas atau aktivitas magma di bawah permukaan bumi. Air yang naik ke permukaan membawa berbagai mineral terlarut, seperti sulfur dan silika. Fenomena ini merupakan salah satu bukti adanya aktivitas panas bumi (geothermal) yang banyak ditemukan di kawasan vulkanik seperti wilayah Danau Toba dan Pusuk Buhit."
        }
      ],
    },
    rangkuman: [
      "Gunung berapi (vulkanisme) dihasilkan oleh batas lempeng sirkum pasifik dan sabuk mediterania.",
      "Danau Toba terbentuk akibat letusan supervolcano Toba purba berbentuk kaldera lipat.",
      "Surah An-Naml menerangkan bahwa gunung itu bergerak berjalan layaknya awan, sinkron dengan kebenaran lempeng tektonik.",
      "Mitologi Batak Toba menerangkan fenomena geologis gempa lewat simbolisme Naga Padoha Niaji yang dipasung di dasar bumi.",
    ],
    quiz: [
      {
        id: "q_dinamis_1",
        question: "Berapa ribukah tahun yang lalu kira-kira terjadinya Erupsi Super Dahsyat gunung Toba Purba?",
        options: ["10.000 tahun lalu", "74.000 tahun lalu", "1 juta tahun lalu", "500 tahun lalu"],
        correctIndex: 1,
        explanation: "Supererupsi Gunung Toba diperkirakan terjadi 74.000 tahun yang lalu (Late Pleistocene Era), memicu terjadinya tebalnya abu vulkanik di seluruh bumi.",
      },
      {
        id: "q_dinamis_2",
        question: "Pergerakan gunung yang diungkap dalam Surat An-Naml Ayat 88 dianalogikan seperti gerakan apa?",
        options: ["Aliran Air", "Tiupan Angin", "Jalannya Awan", "Putaran Bumi"],
        correctIndex: 2,
        explanation: "Ayat menyebutkan 'Wa hiya tamurru marras-sahaab' yang artinya padahal ia berjalan secepat jalannya awan.",
      },
      {
        id: "q_dinamis_3",
        question: "Simbol mitologi Batak tentang penyebab gempa bumi yang merupakan adaptasi intuitif dari pergeseran sesar tektonik adalah...",
        options: ["Naga Padoha Niaji", "Raja Sisingamangaraja", "Si Boru Deak Parujar", "Sandean Biluh"],
        correctIndex: 0,
        explanation: "Naga Padoha Niaji dipercaya hidup mengangkang di dunia bawah bumi (banua toru). Gerakannya adalah representasi metafisik gempa bumi.",
      },
      {
        id: "q_dinamis_4",
        question: "Pola pergerakan lempeng tektonik Bumi digerakkan oleh perputaran panas di dalam mantel bumi yang dikenal sebagai...",
        options: ["Arus Konveksi", "Gaya Gravitasi Ketinggian", "Erosi Mekanik", "Rotasi Atmosfer"],
        correctIndex: 0,
        explanation: "Arus konveksi magma terjadi akibat perbedaan temperatur cairan mantel, menggeser kerak bumi di atasnya secara berkala.",
      },
      {
        id: "q_dinamis_5",
        question: "Pulau Sumatera dilewati oleh retakan sesar aktif raksasa akibat penunjaman lempeng Indo-Australia terhadap Eurasia, yaitu...",
        options: ["Sesar San Andreas", "Sesar Cimandiri", "Sesar Opak", "Sesar Besar Sumatera (Sesar Semangko)"],
        correctIndex: 3,
        explanation: "Sesar Besar Sumatera membentang di sepanjang pegunungan Bukit Barisan dari Aceh hingga Lampung, menjadikannya zona rawan gempa bumi aktif.",
      },
      {
        id: "q_dinamis_6",
        question: "Kawah raksasa hasil reruntuhan letusan kedahsyatan gunung berapi seperti Danau Toba dalam istilah ilmiah vulkanologi disebut...",
        options: ["Kubah Lava", "Kaldera", "Fumarol", "Sill"],
        correctIndex: 1,
        explanation: "Kaldera terbentuk ketika ruang magma runtuh ke dalam pasca letusan sangat besar (collapse), menyisakan cekungan raksasa yang lambat laun terisi air.",
      },
      {
        id: "q_dinamis_7",
        question: "Lempeng samudera menunjam di bawah lempeng benua yang lebih tebal namun kurang padat, proses tumbukan lempeng ini dinamakan...",
        options: ["Subduksi (Subduction)", "Transformasi", "Divergensi (Divergent)", "Akresi"],
        correctIndex: 0,
        explanation: "Subduksi adalah zona tumbukan di mana lempeng samudera menyusup ke bawah lempeng benua karena memiliki densitas batuan yang lebih berat.",
      },
      {
        id: "q_dinamis_8",
        question: "Teknologi modern apakah yang digunakan untuk membuktikan bahwa gunung-gunung di permukaan bumi bergeser dalam milimeter per tahun?",
        options: ["Termometer Suhu Kawah", "Alat Bor Tanah", "GPS Geodesi Presisi Tinggi & Satelit", "Kamera Drone Komersil"],
        correctIndex: 2,
        explanation: "Sistem satelit navigasi global (GPS Geodesi) dan INSAR mengukur pergeseran horizontal lempeng tektonik bumi secara milimeter per tahun.",
      },
      {
        id: "q_dinamis_9",
        question: "Dalam perspektif sains-teologis, aktivitas volkanis gunung berapi diciptakan sebagai salah satu cara bumi...",
        options: ["Melepaskan tekanan panas internalnya agar bumi tidak meledak hancur", "Membekukan seluruh air samudra", "Menurunkan kecepatan rotasi bumi", "Meningkatkan suhu inti bumi secara mutlak"],
        correctIndex: 0,
        explanation: "Erupsi gunung berapi merupakan katup pengaman bumi untuk melepaskan penimbunan panas dan gas bertekanan tinggi di dalam astenosfer.",
      },
      {
        id: "q_dinamis_10",
        question: "Bagaimanakah reaksi lisan leluhur Batak ketika terjadi gempa bumi terkait dengan mitologi Naga Padoha?",
        options: ["Berteriak 'Suhu! Suhu!' (Tinggal!) sambil menepuk tanah", "Menari tortor keliling desa tanpa henti", "Mengungsi ke puncak gunung terjal seketika", "Membuang sesajen emas murni ke air kawah"],
        correctIndex: 0,
        explanation: "Kata 'Suhu Suhu' berarti menetap atau tinggal dengan kokoh, diucapkan sebagai permohonan bersahabat agar gempa bumi mereda.",
      }
    ],
    matchingGame: {
      instruction: "Hubungkan kosakata kegunungapian / tektonik dengan makna sains yang sesuai!",
      pairs: [
        { left: "Kaldera", right: "Kawah runtuhan letusan dahsyat" },
        { left: "Subduksi", right: "Penunjaman lempeng samudera ke benua" },
        { left: "Naga Padoha", right: "Metafora gempa bumi kuno Batak" },
        { left: "An-Naml: 88", right: "Gunung berjalan seperti awan" },
        { left: "Sesar Semangko", right: "Retakan aktif jalur gempa Sumatera" },
      ],
    },
  },
  {
    id: "materi_air",
    title: "Gunung sebagai Tandon Air Raksasa",
    shortDesc: "Bagaimana struktur gunung menangkap, mempurifikasi, dan menyalurkan air tawar suci.",
    icon: "Droplets",
    color: "sky",
    pemantik: {
      question: "Dari manakah asal muasal air sejuk yang mengalir di sungai-sungai berarus jernih di dekat kita?",
      text: "Apakah air tersebut langsung jatuh dari langit dan menggenang begitu saja? Tidak, air tersebut biasanya disaring perlahan selama berbulan-bulan melalui pori-pori batuan terjal di dalam tubuh gunung, lalu keluar sebagai mata air abadi yang jernih.",
    },
    eksplorasi: {
      text: "Pernahkah kamu bertanya-tanya bagaimana mata air jernih di pegunungan tetap mengalir deras bahkan ketika kemarau panjang melanda? Apakah gunung hanya menumpuk batuan kering tanpa air? Pada materi ini, kita akan menjelajahi bagaimana tubuh gunung bekerja bagaikan spons penampung air raksasa melalui proses hidrologi orografis dan pembentukan sistem akuifer alami yang menopang kehidupan.",
      points: [
        {
          title: "HUJAN OROGRAFIS",
          subtitle: "Bagaimana Gunung Menangkap Awan?",
          desc: "Siklus air di pegunungan dimulai dengan fenomena unik yang disebut hujan orografis. Ketika angin membawa udara lembap dari samudra atau danau bergerak menuju pegunungan, udara tersebut dipaksa naik mendaki lereng gunung yang terjal.\n\nSemakin tinggi udara tersebut naik, suhunya akan semakin dingin. Penurunan suhu ini menyebabkan uap air mengalami kondensasi (pengembunan) hingga membentuk awan tebal di sisi lereng gunung yang menghadap angin (windward).\n\nKetika awan sudah tidak mampu menampung titik-titik air, terjadilah hujan lebat di kawasan lereng pegunungan tersebut. Sementara itu, udara yang melewati puncak gunung dan turun ke sisi sebaliknya sudah bersifat kering dan hangat, menciptakan daerah bayangan hujan yang minim curah hujan.",
          factBubble: "Udara mendingin sekitar 0.6 derajat Celsius setiap kali naik 100 meter. Oleh sebab itu, bagian puncak gunung yang tinggi selalu diselimuti udara dingin dan kabut tebal yang memicu pengembunan air secara konstan.",
        },
        {
          title: "AKUIFER ALAMI",
          subtitle: "Baskom Raksasa di Dalam Perut Gunung",
          desc: "Setelah hujan turun di lereng gunung, air tersebut tidak langsung mengalir begitu saja ke laut. Hutan pegunungan yang lebat serta struktur batuan vulkanik berpori (seperti andesit dan basalt) bertindak sebagai penyerap air yang luar biasa.\n\nAir hujan meresap ke dalam tanah melalui celah-celah batuan dan pori-pori tanah (infiltrasi). Di dalam tubuh gunung, air tersebut tersimpan dalam lapisan pembawa air yang disebut akuifer. Struktur batuan dalam gunung menahan air tersebut dan melepaskannya secara sangat lambat.\n\nSambil mengalir di bawah tanah, air mengalami penyaringan mekanis dan kimiawi alami oleh mineral-mineral penyusun batu gunung. Proses penyaringan alami inilah yang membuat air pegunungan sangat jernih, bebas bakteri berbahaya, dan kaya akan mineral yang menyehatkan tubuh manusia.",
          analogyText: "Analogi Sederhana\n\n🧽 Spons basah di meja:\nJika kamu menuangkan segelas air ke atas spons dapur, air tidak langsung mengalir membanjiri meja, melainkan tertahan di dalam rongga-rongga spons. Air baru akan menetes keluar secara perlahan-lahan ketika spons tersebut jenuh.\n\n⛰️ Tubuh gunung sebagai spons:\nStruktur batuan vulkanik dan akar pepohonan pegunungan memegang air hujan di dalam rongga batuan, lalu menyalurkannya perlahan melalui mata air sepanjang tahun.",
        },
        {
          title: "HULU SUNGAI DANAU TOBA",
          subtitle: "Menjaga Kelestarian Air Seumur Hidup",
          desc: "Gunung-gunung yang mengelilingi kaldera Toba, seperti kawasan Pusuk Buhit dan Dolok Tolong, berfungsi sebagai daerah tangkapan air (catchment area) yang sangat krusial ulayat. Hutan pegunungan di daerah ini menangkap air hujan dan menyimpannya di dalam tanah.\n\nAir yang tersimpan di akuifer pegunungan kemudian muncul ke permukaan sebagai ratusan mata air jernih (mual) dan mengalir melalui sungai-sungai kecil menuju Danau Toba. Aliran air yang stabil ini menjaga volume air Danau Toba agar tetap seimbang dan tidak mengalami kekeringan drastis, sekaligus menyediakan sumber air bersih untuk pertanian dan kebutuhan domestik masyarakat sekitar.\n\nTanpa adanya hutan pegunungan yang terjaga di kawasan hulu ini, air hujan akan langsung meluncur ke bawah menjadi banjir bandang yang mengikis tanah (erosi), dan ketika kemarau datang, mata air akan mati sehingga terjadi kekeringan masal.",
          reflectionText: "Bayangkan jika seluruh hutan ulayat di lereng gunung sekitar Danau Toba ditebang habis demi pembangunan industri. Apa yang akan terjadi pada ratusan mata air bersih serta volume air di Danau Toba pada musim kemarau berikutnya?",
        },
      ],
    },
    sains: {
      title: "Sains Modern: Hidrologi Pegunungan & Siklus Air",
      text: "Gunung memiliki peran utama dalam mendinginkan uap air laut yang tertiup angin ke darat melalui fenomena Hujan Orografis. Struktur lereng terjal memaksa udara naik ke atmosfer dingin (proses kondensasi). Di dalam tubuh gunung, terdapat tumpukan batuan beku berpori (vulkanik basaltik/andesitik) dan sedimen yang bertindak sebagai sistem akuifer air tanah yang besar. Air hujan tersaring secara kimiawi dan fisika alami oleh mineral penyusun batuan gunung, membekali air tersebut dengan mineral penting bagi metabolisme makhluk hidup dan mengeluarkannya sebagai mata air segar secara konstan tanpa henti, bahkan di musim kemarau.",
      diagramType: "hydrology",
      hotspots: [
        {
          id: "rain",
          x: 25,
          y: 40,
          title: "Kondensasi & Hujan Orografis",
          description: "Massa angin laut yang basah terdorong naik oleh lereng gunung, mendingin dengan cepat, dan melelehkan hujan berlimpah di lereng.",
        },
        {
          id: "aquifer",
          x: 55,
          y: 65,
          title: "Sponge Efek Batuan (Akuifer)",
          description: "Struktur dalam gunung menyimpan cadangan air raksasa di sela-sela formasi batuan kapur or basaltik.",
        },
        {
          id: "spring",
          x: 75,
          y: 75,
          title: "Mata Air (Mual/Spring)",
          description: "Aliran air yang keluar secara alami ke permukaan tanah akibat terpotongnya muka air tanah oleh kemiringan lembah.",
        },
      ],
    },
    quran: {
      title: "Integrasi Al-Qur'an: Air Gunung yang Sangat Tawar",
      verses: [
        {
          surah: "Al-Mursalat",
          verse: "27",
          arabic: "وَجَعَلْنَا فِيهَا رَوَاسِيَ شَامِخَاتٍ وَأَسْقَيْنَاكُمْ مَاءً فُرَاتًا",
          translation: "Dan Kami jadikan padanya gunung-gunung yang tinggi (rawasiya syamikhaatin), dan Kami beri minum kamu dengan air yang sangat tawar (ma'an furaatan)?",
          explanation: "Ayat ini menghubungkan keberadaan gunung yang tinggi dengan ketersediaan air tawar yang dapat diminum. Dalam ilmu hidrologi modern, pegunungan berperan sebagai daerah tangkapan air (water catchment area). Ketika uap air di atmosfer mengalami kondensasi, hujan lebih banyak turun di wilayah pegunungan karena pengaruh ketinggian dan suhu yang lebih rendah.\n\nAir hujan tersebut kemudian meresap ke dalam lapisan tanah dan batuan, tersimpan sebagai air tanah, lalu keluar kembali melalui mata air, sungai, dan danau yang menjadi sumber air tawar bagi masyarakat. Selain itu, vegetasi yang tumbuh di kawasan pegunungan membantu menjaga kualitas dan kuantitas air dengan meningkatkan daya serap tanah serta mengurangi erosi. Oleh karena itu, banyak sumber mata air utama di dunia berasal dari kawasan pegunungan yang masih terjaga kelestariannya.",
          tafsir: "Menurut Tafsir Ibnu Katsir, Tafsir Al-Muyassar, dan Tafsir Kementerian Agama RI, ayat ini menjelaskan berbagai nikmat Allah yang diberikan kepada manusia melalui penciptaan bumi dan gunung-gunung yang menjulang tinggi. Gunung-gunung yang kokoh diciptakan bukan hanya sebagai penghias permukaan bumi, tetapi juga sebagai tempat berlangsungnya berbagai proses alam yang mendukung kehidupan. Setelah menyebutkan gunung-gunung yang tinggi (rawāsiya syāmikhāt), Allah kemudian menyebutkan air yang sangat tawar (mā’an furātā), menunjukkan pentingnya hubungan antara gunung dan ketersediaan air bagi makhluk hidup.\n\nPara mufasir menjelaskan bahwa air tawar merupakan salah satu nikmat terbesar yang memungkinkan manusia, hewan, dan tumbuhan untuk bertahan hidup. Dengan menyandingkan penyebutan gunung dan air dalam satu ayat, Allah mengingatkan manusia bahwa seluruh sistem alam diciptakan secara teratur dan saling berkaitan demi keberlangsungan kehidupan di bumi.",
          ipaConnection: "Gabungan pemahaman ayat Al-Qur'an dengan geologi modern membuktikan bahwa gunung berfungsi sebagai tangki penyimpan air (akuifer) yang mendistribusikan air bersih penuh mineral ke kaki lembah secara proporsional."
        },
      ],
      hikmah: "Ayat ini mengajarkan bahwa air tawar yang setiap hari digunakan manusia merupakan nikmat Allah yang sangat besar dan tidak dapat digantikan. Keberadaan gunung, hutan, hujan, dan sumber mata air merupakan bagian dari sistem alam yang saling mendukung untuk menyediakan air bersih bagi kehidupan.\n\nMelalui ayat ini, manusia diajak untuk mensyukuri nikmat air dengan menggunakannya secara bijaksana serta menjaga lingkungan, terutama kawasan pegunungan dan hutan sebagai daerah resapan air. Kerusakan hutan, pencemaran sumber air, dan eksploitasi alam yang berlebihan dapat mengganggu keseimbangan siklus hidrologi yang telah Allah ciptakan dengan sempurna. Oleh karena itu, menjaga kelestarian alam merupakan salah satu bentuk rasa syukur atas nikmat air yang diberikan Allah SWT kepada seluruh makhluk hidup.",
    },
    etnosains: {
      title: "Etnosains Batak Toba: Kehormatan Mual & Hutan Adat Tombak",
      origin: "Hubungan Harmonis Suku Batak dan Ekosistem Air",
      narrative: "Bagi suku Batak Toba kuno yang mayoritas bertani sawah (saba), air pegunungan adalah urat nadi kehidupan yang wajib dihormati. Untuk melindungi mata air gunung yang disebut 'Mual', leluhur menerapkan sanksi adat yang ketat. Di lereng pegunungan Toba, terdapat klasifikasi zonasi hutan: 'Tombak Pamulaan' (hutan asal mula resapan air) dan 'Tombak Larangan' (hutan yang tidak boleh ditebang sehelai daun pun). Siapa pun yang menebang pohon di sekitar mual akan dikutuk oleh komunitas adat dan diusir dari desa kelompok leluhur.",
      practices: [
        {
          title: "Konservasi 'Aek Suci' (Mual)",
          desc: "Menjaga kebersihan fisik sekitar mata air gunung dengan meletakkan batu-batu alam dan menorehkan bambu penyalur air tradisional tanpa mencemari wadah air asal.",
          icon: "Sparkles",
        },
        {
          title: "Kearifan Irigasi 'Bondar'",
          desc: "Sistem perdistribusian air gunung secara kolektif berkeadilan demi mengairi sawah di kaki gunung Toba dipandu kearifan lokal ketua air (Raja Bondar).",
          icon: "Compass",
        },
      ],
    },
    rangkuman: [
      "Hujan orografis dipicu oleh lereng gunung tinggi yang mengkondensasi uap air udara basah.",
      "Gunung berperan sebagai tandon resapan air alami (akuifer raksasa).",
      "Quran menghubungkan gunung tinggi ('Syamikhat') dengan air minum yang sangat tawar ('Furat') dalam Surah Al-Mursalat Ayat 27.",
      "Kearifan Batak melarang keras penebangan pohon di lereng hutan 'Tombak Larangan' demi menjaga debit kelestarian mata air (Mual).",
    ],
    quiz: [
      {
        id: "q_air_1",
        question: "Apakah arti dari potongan ayat 'Maa-an Furaatan' dalam Al-Qur'an Surah Al-Mursalat: 27?",
        options: ["Air bah tsunami", "Air yang sangat tawar", "Air belerang panas", "Air laut yang asin"],
        correctIndex: 1,
        explanation: "Maa-an Furaatan (ماة فراتا) diterjemahkan sebagai air yang segar/tawar, hasil filtrasi bebatuan mineral pegunungan.",
      },
      {
        id: "q_air_2",
        question: "Hujan yang terbentuk akibat naiknya uap air secara tegak ke atas lereng bukit gunung dinamakan hujan...",
        options: ["Hujan Orografis", "Hujan Konvektif", "Hujan Asam", "Hujan Frontal"],
        correctIndex: 0,
        explanation: "Hujan Orografis terbentuk karena udara basah dipaksa mendaki lereng gunung, mengalami pendinginan adiabatis, lalu turun menjadi hujan.",
      },
      {
        id: "q_air_3",
        question: "Hutan lindung adat leluhur Batak Toba yang dilarang keras untuk disentuh atau ditebang kayunya dinamakan...",
        options: ["Tombak Larangan / Pamulaan", "Halaman Jabu", "Saba Balon", "Sopo Bona"],
        correctIndex: 0,
        explanation: "Tombak Larangan atau Tombak Pamulaan merupakan hutan primer pegunungan yang dikeramatkan dan dlestarikan sebagai hulu resapan air ulayat.",
      },
      {
        id: "q_air_4",
        question: "Batu vulkanik berpori di dalam gunung bertindak seperti spons penyaring air alami, formasi batuan penampung air tanah ini disebut...",
        options: ["Akuifer (Aquifer)", "Magma Chamber", "Sedimentasi", "Sesar"],
        correctIndex: 0,
        explanation: "Akuifer adalah formasi batuan berpori di dalam tanah atau gunung yang menyimpan dan menyaring cadangan air tanah dalam jumlah besar.",
      },
      {
        id: "q_air_5",
        question: "Apa yang dikaitkan secara paralel oleh Allah Swt dalam Surah Al-Mursalat ayat 27 untuk menyajikan 'air yang sangat tawar'?",
        options: ["Gua-gua rahasia", "Gunung-gunung yang tinggi menjulang (Rawasiya Syamikhat)", "Rimbunnya pohon pisang", "Pekatnya awan hitam"],
        correctIndex: 1,
        explanation: "Surat Al-Mursalat ayat 27 menggabungkan kata 'Rawasiya Syamikhat' (gunung tinggi) sebagai filter penawar air ('Maa-an Furaatan').",
      },
      {
        id: "q_air_6",
        question: "Mengapa air pegunungan terasa lebih sejuk, murni, dan kaya mineral dibanding air hujan biasa langsung?",
        options: ["Karena bercampur debu belerang aktif", "Mengalami filtrasi mekanis dan pencucian mineral alami selama mengalir di pori kapiler batuan gunung", "Karena gunung memiliki kulkas raksasa", "Karena airnya langsung berasal dari salju abadi"],
        correctIndex: 1,
        explanation: "Perjalanan air melalui batuan kapiler gunung menyaring polutan sekaligus melarutkan unsur Mg, Ca, dan silika sehat.",
      },
      {
        id: "q_air_7",
        question: "Dalam kearifan ekologi adat Batak Toba, di manakah letak mata air 'Mual' yang disucikan dan diproteksi ketat?",
        options: ["Di tengah-tengah pemukiman padat rumah warga", "Di area lereng pegunungan dalam kawasan hutan ulayat", "Di dalam gua terdalam tengah pulau", "Di dasar Danau Toba terdalam"],
        correctIndex: 1,
        explanation: "Mata air mual umumnya bersumber dari resapan air lereng gunung berhutan lebat, didefinisikan sebagai daerah ulayat suci.",
      },
      {
        id: "q_air_8",
        question: "Pengaturan sirkulasi debit irigasi air gunung secara kolektif berkeadilan bagi petani sawah (saba) suku Batak dipimpin oleh pelindung adat...",
        options: ["Raja Bondar", "Raja Sopo", "Datu Bolon", "Raja Adat"],
        correctIndex: 0,
        explanation: "Raja Bondar bertugas mengelola pembagian air, membuat saluran pancuran (bondar) agar persawahan mendapat air merata.",
      },
      {
        id: "q_air_9",
        question: "Proses pendinginan massa uap air secara konstan saat dipaksa naik mendaki lereng gunung disebut...",
        options: ["Pendinginan Adiabatis", "Erupsi Vulkanik", "Pelapukan Lapili", "Metamorfosis Karst"],
        correctIndex: 0,
        explanation: "Pendinginan adiabatis terjadi karena tekanan udara turun saat naik ke tempat tinggi, memicu kondensasi awan hujan.",
      },
      {
        id: "q_air_10",
        question: "Sanksi apakah yang biasanya diberikan adat kuno bagi pelanggar hutan resapan dan pencemar sumber air mual?",
        options: ["Diberikan penghargaan emas", "Sanksi pecat ulayat, dikucilkan atau diusir karena dianggap mengundang malapetaka hilangnya debit air", "Dibiarkan saja tanpa teguran", "Hanya diminta membayar tiket masuk"],
        correctIndex: 1,
        explanation: "Hutan pengaman air dinilai sangat vital sehingga perusaknya diusir karena dianggap mengancam kelangsungan hidup seisi desa.",
      }
    ],
    matchingGame: {
      instruction: "Pasangkan istilah-istilah tata kelola air dan hidrologi dengan maknanya yang sesuai!",
      pairs: [
        { left: "Maa'an Furata", right: "Air yang sangat tawar/sejuk" },
        { left: "Orografis", right: "Hujan akibat uap lembab mendaki lereng" },
        { left: "Akuifer", right: "Sponge batuan penyimpan air tanah" },
        { left: "Mual Toba", right: "Mata air sakral penjaga kehidupan" },
        { left: "Tombak Adat", right: "Hutan lindung adat resapan pegunungan" },
      ],
    },
  },
  {
    id: "materi_arah",
    title: "Gunung sebagai Penunjuk Arah & Landmark",
    shortDesc: "Bagaimana puncak gunung yang menembus awan mementingkan batas geografi dan arah kehidupan.",
    icon: "Map",
    color: "emerald",
    pemantik: {
      question: "Sebelum zaman satelit dan sinyal internet pintar tersemat di ponsel kita, bagaimana kakek-nenek buyut kita mengetahui arah mata angin di tengah danau yang luas?",
      text: "Saat malam berkabut menyelimuti perahu solu di tengah riak Danau Toba, tidak ada kompas digital. Satu-satunya panduan visual adalah menyembulnya puncak gunung raksasa di tepi cakrawala, menuntun mereka kembali pulang.",
    },
    eksplorasi: {
      text: "Pernahkah kamu tersesat di tengah hutan lebat atau di atas perairan danau yang luas tanpa membawa peta digital? Bagaimana manusia zaman kuno menentukan arah pulang mereka? Di materi ini, kita akan membahas peran geografis gunung sebagai landmark spasial alami raksasa, generator sirkulasi angin lokal harian, serta perannya dalam astronomi tradisional.",
      points: [
        {
          title: "LANDMARK SPASIAL ALAMI",
          subtitle: "Mercusuar Raksasa di Tengah Pulau",
          desc: "Seseorang dapat melihat puncak gunung yang tinggi dari jarak puluhan kilometer. Karena ukurannya yang masif dan posisinya yang tidak pernah berubah, gunung bertindak sebagai 'Natural Landmark' atau penanda alam utama dalam sistem navigasi pandang (visual navigation).\n\nBagi para nelayan tradisional yang berlayar menggunakan solu (perahu tradisional Batak ulayat) di Danau Toba yang luas, puncak-puncak gunung seperti Dolok Pusuk Buhit atau Dolok Tolong berfungsi layaknya mercusuar darat. Nelayan dapat mengarahkan perahunya sejajar dengan puncak gunung tertentu untuk kembali ke dermaga asal mereka dengan selamat.\n\nDi darat, para pengelana menggunakan arah menyembulnya puncak gunung untuk memetakan jalur perjalanan, menentukan batas wilayah adat ulayat antar marga Batak, hingga pembagian kawasan hutan lindung dan pemukiman.",
          factBubble: "Gunung dengan ketinggian di atas 1.500 meter di atas permukaan laut dapat terlihat jelas dari kejauhan hingga radius 50-80 Kilometer pada hari yang cerah, mengalahkan penunjuk arah buatan manusia manapun.",
        },
        {
          title: "ANGIN LEMBAH & ANGIN GUNUNG",
          subtitle: "Sirkulasi Udara yang Teratur Setiap Hari",
          desc: "Gunung tidak hanya membantu manusia menentukan arah spasial, tetapi juga menghasilkan pergerakan angin harian yang teratur akibat perbedaan pemanasan matahari. Fenomena ini menghasilkan angin lembah dan angin gunung.\n\nPada siang hari, lereng gunung menerima energi matahari lebih banyak dan menjadi lebih panas dibanding lembah di bawahnya. Udara hangat di lereng naik ke atas (tekanan rendah), menarik udara dingin dari lembah untuk berembus mendaki lereng. Ini disebut angin lembah.\n\nSebaliknya, pada malam hari, puncak gunung mendingin lebih cepat dibandingkan lembah yang tertutup. Udara dingin di puncak gunung yang lebih padat dan berat mengalir turun ke lembah yang masih hangat di bawahnya. Udara dingin yang turun ini disebut angin gunung atau angin katabatik harian.",
          analogyText: "Analogi Sederhana\n\n🎈 Balon udara panas:\nUdara panas selalu bergerak naik karena lebih ringan (kerapatannya kecil), sedangkan udara dingin akan turun ke bawah menggantikannya.\n\n⛰️ Siklus angin gunung-lembah:\nLereng gunung yang panas di siang hari bertindak seperti pemanas yang menerbangkan udara ke atas, menciptakan sirkulasi pompa udara alami harian.",
        },
        {
          title: "SISTEM ASTRONOMI BATAK 'PARHALAAN'",
          subtitle: "Kalender Langit Berbasis Puncak Gunung",
          desc: "Dalam budaya tradisi Batak Toba, terdapat sistem kalender kuno yang disebut Parhalaan. Sistem ini tidak hanya memetakan hari baik dan buruk, tetapi juga mengintegrasikan pengamatan benda langit dengan bentang alam sekitar, khususnya puncak gunung sakral.\n\nPara tetua adat (Datu) menentukan datangnya puncak musim hujan ulayat dan waktu terbaik untuk mulai menanam padi (musim tanam) dengan cara berdiri di tempat tertentu dan mengamati posisi rasi bintang (terutama bintang Orion atau bintang Tujuh) yang berada tepat di atas atau bergeser dari puncak Dolok Pusuk Buhit.\n\nPembacaan astronomi yang berpatokan pada landmark gunung ini menghasilkan prediksi cuaca astronomis lokal ulayat yang sangat presisi untuk menyelaraskan kegiatan pertanian ladang masyarakat adat.",
          reflectionText: "Coba pikirkan, mengapa masyarakat kuno memilih puncak gunung sebagai titik patokan untuk mengamati letak rasi bintang di langit? Mengapa tidak menggunakan puncak pohon tertinggi atau bangunan rumah adat saja?",
        },
      ],
    },
    sains: {
      title: "Sains Modern: Geografi Lanskap & Navigasi Pandang",
      text: "Secara ilmu navigasi klasik (Visual Navigation), manusia mengandalkan bentang alam tetap berukuran raksasa jika pandangan kompas magnetis terganggu. Gunung menjadi titik pandu georujukan utama (Natural Landmark) yang mudah dikenali dari jarak hingga 80 kilometer. Selain itu, dinamika termal pegunungan menghasilkan sirkulasi udara khusus: pada sore hari, puncak mendingin lebih cepat dibandingkan lembah, memicu embusan 'Angin Gunung' ke arah bawah yang dimanfaatkan pemburu untuk memandu jalur berburu ke bawah lembah hutan.",
      diagramType: "tectonic",
      hotspots: [
        {
          id: "landmark",
          x: 50,
          y: 20,
          title: "Puncak sebagai Kompas Visual",
          description: "Elevasi ekstrim menjadikannya titik rujukan penentu azimuth arah pengelana kuno dari segala penjuru.",
        },
        {
          id: "wind_mountain",
          x: 35,
          y: 45,
          title: "Sirkulasi Angin Gunung (Katabatik)",
          description: "Udara dingin sisa malam meluncur turun ke lembah, memberi sinyal pergantian pola cuaca harian.",
        },
      ],
    },
    quran: {
      title: "Integrasi Al-Qur'an: Gunung & Tanda Penunjuk Arah",
      verses: [
        {
          surah: "An-Nahl",
          verse: "15-16",
          arabic: "وَأَلْقَىٰ فِي الْأَرْضِ رَوَاسِيَ أَنْ تَمِيدَ بِكُمْ وَأَنْهَارًا وَسُبُلًا لَعَلَّكُمْ تَهْتَدُونَ. وَعَلَامَاتٍ ۚ وَبِالنَّجْمِ هُمْ يَهْتَدُونَ",
          translation: "Dan Dia memancangkan gunung-gunung di bumi supaya bumi itu tidak berguncang bersama kamu, (dan Dia menciptakan) sungai-sungai dan jalan-jalan agar kamu mendapat petunjuk (tehtadun). Serta (Dia ciptakan) tanda-tanda (penunjuk jalan). Dan dengan bintang-bintang mereka mendapat petunjuk.",
          explanation: "Dalam ayat ini, Allah menggabungkan fungsi gunung ('Rawasiya') dengan rute jalan ('Subulan') dan tanda alami ('Alamaat') pemandu perjalanan. Keberadaan barisan gunung membagi geografi menjadi lembah, melahirkan sela bukit (celah/sadd) yang dijadikan jalan lalu lintas alami antarnegeri.",
        },
      ],
      hikmah: "Allah menetapkan gunung tidak hanya sebagai penjaga dari guncangan bawah tanah, tetapi juga sebagai rambu lalu lintas makro di atas tanah supaya manusia tidak tersesat dalam menjelajahi bumi demi berdagang dan beribadah.",
    },
    etnosains: {
      title: "Etnosains Batak Toba: Dolok Tolong & Dolok Pusuk Buhit di Danau Toba",
      origin: "Navigasi Nelayan Solu Bolon Batak",
      narrative: "Para pelaut Solu Bolon (perahu kayu tradisional Batak berukuran besar) mengarungi Danau Toba yang luasnya melebihi satu provinsi untuk berniaga antardesa dari Haranggaol hingga Balige. Di tengah sirkulasi kabut gunung yang sering menurunkan jarak pandang, nelayan mengamati rasi bintang dibantu bayangan siluet 'Dolok Tolong' (gunung di sudut selatan) dan 'Dolok Pusuk Buhit' (gunung di sudut barat) sebagai penunjuk mata angin alami (Utara-Selatan, Barat-Timur Toba).",
      practices: [
        {
          title: "Pengetahuan 'Ulu' (Hulu) & 'Toru' (Hilir)",
          desc: "Konsep tata arah spatial Batak: arah menuju puncak gunung selalu disebut 'Ulu/Dulu' (utara spiritual/surgawi/mulia), sedang arah menjauh menuju lembah dataran disebut 'Toru' (hilir).",
          icon: "Map",
        },
        {
          title: "Ramalan Cuaca Lereng Gunung",
          desc: "Masyarakat membaca pergerakan warna awan tipis di atas puncak Dolok Tolong untuk menentukan apakah badai Danau (angin halogo) akan menyapu danau.",
          icon: "TrendingUp",
        },
      ],
    },
    rangkuman: [
      "Gunung berfungsi sebagai penunjuk navigasi visual raksasa (Natural Landmark) dari wilayah darat maupun perairan luas.",
      "Allah Swt menjelaskan dalam QS. An-Nahl:15 bahwa gunung mendampingi jalan-jalan raya bumi sebagai rambu petunjuk jalan ('Alamaat').",
      "Suku Batak membagi tata ruang ulayatnya menjadi Ulu (Hulu pegunungan yang mulia) dan Toru (Hilir lembah datar).",
      "Dolok Tolong dan Pusuk Buhit merupakan rambu navigasi penting bagi nelayan solu bolon purba mengarungi Danau Toba.",
    ],
    quiz: [
      {
        id: "q_arah_1",
        question: "Berdasarkan Al-Qur'an Surah An-Nahl ayat 15, selain gunung, apa yang Allah ciptakan sebagai petunjuk jalan bagi manusia di bumi?",
        options: ["Besi baja", "Sungai-sungai dan jalan-jalan (Subulan)", "Hutan belantara", "Satelit internet"],
        correctIndex: 1,
        explanation: "Surah An-Nahl ayat 15 menyebutkan 'Anhaaran wa subulan' yang artinya sungai-sungai dan jalan-jalan agar kamu mendapat petunjuk arah.",
      },
      {
        id: "q_arah_2",
        question: "Bagaimanakah sebutan navigasi orientasi ruang adat Batak yang berorientasi ke puncak gunung?",
        options: ["Toru / Hilir", "Ulu / Hulu (Mulia)", "Bona / Samping", "Sopo / Gudang"],
        correctIndex: 1,
        explanation: "'Ulu' (Hulu/Atas) berorientasi ke arah pegunungan tinggi, dianggap sisi spiritual mulia dari arah penataan rumah Batak (Jabu).",
      },
      {
        id: "q_arah_3",
        question: "Gunung apakah yang berada di Balige yang siluetnya sangat ikonik sebagai pengarah nelayan Batak selatan?",
        options: ["Dolok Tolong", "Gunung Kerinci", "Dolok Sanggul", "Gunung Merapi"],
        correctIndex: 0,
        explanation: "Dolok Tolong (Gunung Tolong) yang menjulang kokoh di tepi Balige merupakan landmark kemudi spasial alami paling penting di pesisir selatan Danau Toba.",
      },
      {
        id: "q_arah_4",
        question: "Dalam Al-Qur'an Surah An-Nahl ayat 16, kata 'Alamaat' merujuk kepada tanda-tanda alam di bumi untuk navigasi, salah satunya yaitu...",
        options: ["Cekungan minyak mentah", "Bentang alam raksasa seperti bukit dan barisan pegunungan (Rawasiya)", "Alat kompas besi kuno", "Bintang fajar di timur jauh"],
        correctIndex: 1,
        explanation: "'Alamaat' mencakup tanda-tanda alam di bumi yang berukuran masif (misal pegunungan) untuk pedoman spasial di darat.",
      },
      {
        id: "q_arah_5",
        question: "Angin lokal yang bertiup meluncur turun dari puncak gunung yang mendingin cepat menuju ke area lembah pada sore atau malam hari disebut...",
        options: ["Angin Gunung (Katabatik)", "Angin Lembah (Anabatik)", "Angin Monsun Barat", "Angin Fohn"],
        correctIndex: 0,
        explanation: "Angin gunung (katabatik) terjadi karena suhu udara di puncak mendingin lebih cepat dibanding lembah, sehingga meluncur turun ke bawah lembah.",
      },
      {
        id: "q_arah_6",
        question: "Mengapa para pelaut kayu Solu Bolon di Danau Toba sangat bergantung pada siluet Pusuk Buhit dan Dolok Tolong?",
        options: ["Karena mereka membawa kargo yang sangat berat", "Sebagai pengarah navigasi visual alami ketika rasi bintang tertutup kabut tebal", "Untuk berkomunikasi dengan tetua adat menggunakan suar api", "Karena kedua gunung tersebut terbuat dari emas"],
        correctIndex: 1,
        explanation: "Ketika kabut Danau Toba menutup bintang, siluet masif dari Pusuk Buhit (Barat) dan Dolok Tolong (Selatan) bertindak sebagai pedoman mata angin.",
      },
      {
        id: "q_arah_7",
        question: "Kalender kuno adat Batak (sistem astronomi) yang memadukan posisi bintang/bulan di atas puncak gunung dinamakan...",
        options: ["Parhalaan", "Ulos", "Gorga Toba", "Solu Bolon"],
        correctIndex: 0,
        explanation: "Parhalaan adalah sistem penanggalan kuno Batak yang mengamati benda langit berdasar rujukan letak puncak gunung tertentu untuk menetapkan kala bertani.",
      },
      {
        id: "q_arah_8",
        question: "Arah tata rumah adat jabu tradisional Batak Toba diprioritaskan menghadap ke pegunungan (Ulu/Kajulu) karena merepresentasikan...",
        options: ["Sisi hilir yang rendah", "Kedudukan kesucian spiritual, rasa hormat leluhur, dan sumber tata air utama", "Arah masuknya badai Danau Toba", "Posisi matahari tenggelam"],
        correctIndex: 1,
        explanation: "Arah Kajulu atau ulu (arah hulu gunung) dipandang mulia, suci, dan sakral dalam orientasi spasial suku Batak.",
      },
      {
        id: "q_arah_9",
        question: "Berapakah jarak maksimum visual di mana puncak gunung tinggi seperti Dolok Tolong masih dapat dikenali dalam kondisi cuaca cerah?",
        options: ["Hanya 5 km", "Hingga 80 kilometer", "Lebih dari 10.000 km", "Hanya selebar jembatan"],
        correctIndex: 1,
        explanation: "Dalam meteorologi penerbangan dan visual, puncak gunung berketinggian tinggi dapat dilihat sebagai acuan sirkulasi sejauh hingga 80 km.",
      },
      {
        id: "q_arah_10",
        question: "Kondisi fisik udara di puncak gunung yang memicu terciptanya 'Angin Lembah' (naik ke atas lereng) pada siang hari disebabkan oleh...",
        options: ["Lereng gunung menerima radiasi matahari lebih cepat dibanding lembah sehingga tekanannya rendah", "Suhu udara dingin di lereng mendaki udara malam", "Baling-baling angin di lereng berputar kencang", "Air sungai mengalir turun secara serentak"],
        correctIndex: 0,
        explanation: "Pada siang hari, lereng gunung menerima pemanasan matahari lebih awal, mengembang, mengosongkan tekanan, sehingga ditariklah angin berhembus naik dari lembah.",
      }
    ],
    matchingGame: {
      instruction: "Pasangkan istilah georujukan / arah dan angin gunung dengan maknanya yang tepat!",
      pairs: [
        { left: "Alamaat", right: "Tanda-tanda alam penunjuk jalan" },
        { left: "Ulu", right: "Arah hulu pegunungan yang diagungkan" },
        { left: "Toru", right: "Arah hilir lembah dataran bawah" },
        { left: "Dolok Tolong", right: "Landmark kemudi nelayan Balige" },
        { left: "Katabatik", right: "Angin dari puncak turun ke lembah" },
      ],
    },
  },
  {
    id: "materi_subur",
    title: "Gunung sebagai Sumber Kesuburan",
    shortDesc: "Bagaimana limpahan mineral vulkanik dari rahim gunung memberi gizi tanah untuk kemakmuran tani.",
    icon: "Sprout",
    color: "amber",
    pemantik: {
      question: "Mengapa kawasan di sekitar gunung berapi selalu dipenuhi oleh ladang sayur yang subur dan perkebunan kopi yang rimbun buahnya?",
      text: "Padahal beberapa tahun sebelumnya, lereng gunung tersebut mungkin pernah diselimuti debu abu vulkanik hitam pekat akibat letusan besar. Apa rahasia kimiawi yang Allah selipkan di balik bencana letusan abu gunung?",
    },
    eksplorasi: {
      text: "Pernahkah kamu heran mengapa lereng gunung berapi yang gersang dan penuh dengan abu vulkanis pasca letusan justru akan berubah menjadi lahan pertanian paling hijau beberapa tahun kemudian? Di dalam modul ini, kita akan mengeksplorasi keajaiban kimiawi pelapukan batuan beku abu vulkanis, prinsip mekanisasi pelestarian tanah siring terasering, serta lahirnya komoditas kopi arabika Lintong berkualitas dunia.",
      points: [
        {
          title: "PELAPUKAN ABU VULKANIK",
          subtitle: "Pemberian Nutrisi dari Dalam Perut Bumi",
          desc: "Meskipun letusan gunung berapi sering kali dipandang sebagai bencana alam yang menghancurkan, material abu vulkanis (tefra) yang disemburkan merupakan berkah luar biasa bagi tanah di masa depan.\n\nAbu vulkanik sangat kaya akan mineral-mineral primer esensial seperti felspar, olivin, piroksen, besi, kalsium, magnesium, dan fosfat. Saat abu tersebut bersentuhan dengan air hujan dan udara, ia akan mengalami proses pelapukan fisika-kimiawi yang sangat cepat.\n\nPelapukan abu vulkanis ini membentuk jenis tanah subur hitam-kecokelatan yang disebut tanah Andosol atau Regosol. Tanah ini memiliki sirkulasi udara yang luar biasa baik, berpori longgar, mampu menyimpan air dengan sangat baik, dan kaya akan hara tumbuhan alami yang siap diserap oleh tanaman tanpa memerlukan banyak pupuk kimia buatan.",
          factBubble: "Tanah vulkanik (Andosol) menyelimuti kurang dari 1% permukaan daratan bumi, namun tanah istimewa ini menghidupi lebih dari 10% populasi dunia dengan hasil tani yang sangat melimpah ruah.",
        },
        {
          title: "SISTEM TERASERING BUKIT PEGUNUNGAN",
          subtitle: "Sengkedan Penahan Erosi Lereng Terjal",
          desc: "Lereng pegunungan yang miring memiliki tantangan besar berupa ancaman tanah longsor dan hilangnya zat hara akibat tersapu derasnya aliran air hujan (erosi run-off).\n\nUntuk mengatasi tantangan ini, masyarakat petani tradisional menerapkan kearifan lokal bernama terasering atau sengkedan. Mereka membentuk lereng bukit yang miring menjadi bertangga-tangga mirip anak tangga raksasa.\n\nSetiap anak tangga terasering berfungsi memotong kecepatan aliran air permukaan, meningkatkan waktu penyerapan air (infiltrasi) ke dalam tanah, serta menahan endapan tanah subur agar tidak hanyut ke bawah jurang. Terasering ini secara mekanis menjaga stabilitas tanah dan kesuburan pertanian berkelanjutan di lereng pegunungan.",
          analogyText: "Analogi Sederhana\n\n🏂 Seluncuran licin vs. Tangga rumah:\nJika kamu menumpahkan pasir di seluncuran air yang sangat licin, pasir tersebut akan langsung hanyut ke dasar. Namun jika kamu menumpahkan pasir di anak tangga rumah, pasir tersebut akan tertahan di setiap undakan tangga.\n\n🌾 Terasering lereng gunung:\nTerasering bertindak seperti undakan tangga yang menangkap dan menahan air serta pupuk tanah subur agar tidak amblas tergerus banjir.",
        },
        {
          title: "KOPI ARABIKA KELAS DUNIA",
          subtitle: "Keharmonisan Ketinggian dan Tanah Andosol",
          desc: "Kawasan dataran tinggi di sekitar Danau Toba, seperti Lintong Nihuta, Humbang Hasundutan, terkenal menghasilkan salah satu biji kopi arabika terbaik di dunia, yaitu Kopi Lintong.\n\nCita rasa khas kopi Lintong yang harum, beraroma rempah, beralkali rendah dengan keasaman yang seimbang, lahir karena perpaduan yang harmonis antara ketinggian geografis (1.000–1.400 mdpl) dan tanah andosol vulkanis yang kaya zat besi.\n\nSuhu udara pegunungan yang dingin dan sejuk membuat buah kopi matang lebih lambat di pohon, memberikan kesempatan bagi tanaman untuk mematangkan senyawa kimia kompleks penentu aroma manis alami kopi di dalam biji.",
          reflectionText: "Coba renungkan, apa keterkaitan antara letusan dahsyat Supervolcano Toba 74.000 tahun silam dengan secangkir kopi arabika Lintong nikmat yang dinikmati jutaan orang di seluruh penjuru dunia hari ini?",
        },
      ],
    },
    sains: {
      title: "Sains Modern: Tanah Vulkanik Andosol & Mineral Hara",
      text: "Letusan gunung berapi melepaskan tefra (abu vulkanik) yang kaya akan mineral kristalin seperti felspar, olivin, piroksen, dan mika. Ketika abu ini bercampur dengan air dan udara, ia mengalami pelapukan kimiawi yang cepat, membentuk jenis tanah vulkanis yang subur berupa tanah Andosol atau Regosol. Tanah ini memiliki kapasitas retensi air sangat baik serta kaya akan kalium (K), kalsium (Ca), magnesium (Mg), dan fosfat (P) larut. Itulah mengapa lereng pegunungan adalah lumbung pangan terbaik, menghasilkan buah, sayur, dan biji kopi bersuhu dingin dengan kandungan antioksidan tinggi.",
      diagramType: "soil",
      hotspots: [
        {
          id: "ash",
          x: 45,
          y: 25,
          title: "Abu & Debu Vulkanik",
          description: "Muntahan kaya mineral primer yang mendinginkan atmosfer dan melapuk cepat menjadi tanah Andosol berenergi tinggi.",
        },
        {
          id: "soil_layer",
          x: 55,
          y: 65,
          title: "Lapisan Tanah Andosol",
          description: "Tanah gembur berwarna gelap kehitaman berdaya serap air tinggi, lumbung mikroba penyubur tanaman.",
        },
      ],
    },
    quran: {
      title: "Integrasi Al-Qur'an: Tumbuhnya Tanaman Menurut Ukuran Berimbang",
      verses: [
        {
          surah: "Al-Hijr",
          verse: "19",
          arabic: "وَالْأَرْضَ مَدَدْنَاهَا وَأَلْقَيْنَا فِيهَا رَوَاسِيَ وَأَنْبَتْنَا فِيهَا مِنْ كُلِّ شَيْءٍ مَوْزُونٍ",
          translation: "Dan Kami telah membentangkan bumi dan memancangkan padanya gunung-gunung (rawasiya) dan Kami tumbuhkan padanya segala sesuatu menurut ukuran (mauzun) yang berimbang.",
          explanation: "Kata 'Mauzun' berarti sesuatu yang ditimbang secara sangat teliti dan seimbang nilainya. Kandungan mineral tanah yang dimuntahkan dari rahim gunung berapi dilepaskan dalam formula kadar kimiawi yang pas, tidak terlalu asam dan tidak terlalu basa, sehingga sempurna bagi kelangsungan hidup akar tanaman ubi, kopi, dan padi.",
        },
      ],
      hikmah: "Letusan gunung berapi mungkin tampak merusak dalam jangka pendek, namun dalam rancangan jangka panjang dari Allah Swt, ia adalah injeksi vitamin bumi yang memurnikan kesuburan tanah ulayat pangan dunia.",
    },
    etnosains: {
      title: "Etnosains Batak Toba: Keemasan Kopi Lintong & Sopo Saba Toba",
      origin: "Kearifan Tani Adat Batak Toba",
      narrative: "Di dataran tinggi pegunungan keliling Toba seperti Lintongnihuta dan Humbang Hasundutan, tanah andosol abu Toba purba menghasilkan kelembaban mikro yang ideal untuk tanaman kopi. Leluhur Batak ulayat membudidayakan kopi arabika berkualitas dunia (Kopi Lintong dan Kopi Mandheling) secara turun-temurun. Suku Batak juga mempraktekkan kearifan 'Sopo' (lumbung padi) penyimpan logistik panen pegunungan dengan hiasan seni ukir 'Gorga Batak' lambang kesuburan tanah dan pelindung rezeki pemberian Tuhan.",
      practices: [
        {
          title: "Terasering Jeram 'Saba' Toba",
          desc: "Pembuatan petak sawah lereng miring berteras mengikuti aliran kontur gunung untuk menjamin distribusi pupuk abu tanah alami.",
          icon: "Sprout",
        },
        {
          title: "Sopo Gorga Simbol Syukur",
          desc: "Lumbung pangan tradisional yang didirikan di depan jabu rumah adat sebagai perwujudan syukur melimpahnya 'kadar berimbang' (Mauzun) hasil bumi.",
          icon: "Sparkles",
        },
      ],
    },
    rangkuman: [
      "Abu vulkanik gunung berapi melapuk cepat membentuk tanah Andosol hitam subur kaya mineral Mg, P, Ca, dan K.",
      "QS. Al-Hijr:19 menerangkan Allah menumbuhkan segala flora di atas pegunungan secara 'Mauzun' (berimbang/presisi kadarnya).",
      "Ketinggian pegunungan Toba menyediakan iklim dingin dan tanah andosol vulkanis yang melahirkan Kopi Arabika Lintong legendaris dunia.",
      "Masyarakat Batak Toba mengabadikan rasa syukur atas kesuburan tanah pegunungan melalui arsitektur lumbung pangan Sopo bergaya ukiran khas Gorga.",
    ],
    quiz: [
      {
        id: "q_subur_1",
        question: "Apakah nama jenis tanah berwarna gelap kehitaman yang terbentuk dari pelapukan abu vulkanik gunung berapi?",
        options: ["Tanah Andosol", "Tanah Gambut", "Tanah Liat", "Tanah Kapur"],
        correctIndex: 0,
        explanation: "Tanah Andosol terbentuk dari pelapukan material vulkanik seperti abu, tuff, lapili, sangat subur untuk bercocok tanam.",
      },
      {
        id: "q_subur_2",
        question: "Istilah dalam Surah Al-Hijr ayat 19 yang menggambarkan tumbuhnya tanaman menurut takaran/ukuran presisi dan seimbang adalah...",
        options: ["Rawasiya", "Awtad", "Mauzun", "Ma'an"],
        correctIndex: 2,
        explanation: "Mauzun (موزون) berasal dari kata wazana yang berarti ditimbang secara presisi, seimbang porsi gizinya.",
      },
      {
        id: "q_subur_3",
        question: "Produk komoditas kopi arabika pegunungan Toba yang sangat terkenal di dunia dari daerah Humbang Hasundutan adalah...",
        options: ["Kopi Lintong Toba", "Kopi robusta lampung", "Kopi Toraja", "Kopi Gayo Aceh"],
        correctIndex: 0,
        explanation: "Kopi Lintong (dari Lintongnihuta dataran tinggi Danau Toba) merupakan salah satu arabika legenda dunia dengan rasa rempah herba yang khas tumbuh di tanah vulkanik vulcano Toba.",
      },
      {
        id: "q_subur_4",
        question: "Mineral primer berenergi melimpah yang dikandung oleh abu tuf vulkanik dari letusan gunung berapi meliputi...",
        options: ["Plastik industri", "Silika, Kalium, Kalsium, Fosfor, dan Magnesium", "Uranium murni", "Merkuri cair"],
        correctIndex: 1,
        explanation: "Abu vulkanik kaya akan mineral kristalin berharga pemicu sirkulasi unsur seperti silika (Si), kalium (K), kalsium (Ca), fosfor (P), dan magnesium (Mg).",
      },
      {
        id: "q_subur_5",
        question: "Mengapa letusan gunung berapi yang menghancurkan tanaman dalam jangka pendek disebut sebagai 'injeksi vitamin bumi'?",
        options: ["Karena letusannya bersuhu sangat dingin", "Menyuplai timbunan mineral segar tak terhingga yang menyuburkan tanah sepuluh kali lipat setelah lapuk", "Karena abu vulkanik beraroma wangi", "Karena letusan mendatangkan hujan salju"],
        correctIndex: 1,
        explanation: "Meskipun merusak seketika, mineral abu vulkanis yang melapuk bersama air hujan akan menjadi pupuk hidrolis alami terkuat demi melahirkan lumbung ketahanan pangan utama.",
      },
      {
        id: "q_subur_6",
        question: "Bangunan lumbung pangan suku Batak Toba yang didekorasi seni ukir Gorga lambang kesuburan tanah pegunungan disebut...",
        options: ["Sopo", "Jabu", "Bona", "Halaman"],
        correctIndex: 0,
        explanation: "Sopo adalah arsitektur lumbung pangan tradisional suku Batak yang digunakan untuk menyimpan hasil herba pertanian (padi) kering.",
      },
      {
        id: "q_subur_7",
        question: "Metode bercocok tanam pertanian lereng miring pegunungan dengan membuat undakan bertingkat untuk mencegah erosi hara disebut...",
        options: ["Terasering (Saba)", "Fumarol", "Sill", "Akuifer"],
        correctIndex: 0,
        explanation: "Terasering atau sengkedan menahan aliran air agar tidak menyapu top soil tanah subur vulkanika lereng pegunungan.",
      },
      {
        id: "q_subur_8",
        question: "Kandungan mineral abu vulkanik larut yang bertindak menyeimbangkan derajat keasaman (pH) tanah pertanian lereng yaitu...",
        options: ["Kalsium (Ca) & Magnesium (Mg)", "Timbal (Pb)", "Plastik", "Emas murni"],
        correctIndex: 0,
        explanation: "Oksida kalsium dan magnesium bertindak selaku kapur pertanian alami (dolomit) penyeimbang pH tanah andosol.",
      },
      {
        id: "q_subur_9",
        question: "Kondisi mikroklimat apakah dari dataran tinggi pegunungan keliling Toba yang membuat kualitas kopi Lintong bernilai tinggi?",
        options: ["Kelembaban stabil, iklim dingin pegunungan, dan kesuburan tanah Andosol abu Toba purba", "Suhu gurun pasir yang beruap panas", "Kedekatan kilang gas minyak sawit", "Seringnya gelombang badai tsunami"],
        correctIndex: 0,
        explanation: "Iklim sejuk pegunungan (tinggi >1000 mdpl) dipadu tanah subur vulkanis melahirkan karakter cita rasa (cupping profile) kopi Lintong yang eksotis.",
      },
      {
        id: "q_subur_10",
        question: "Kata 'Mauzun' (QS. Al-Hijr: 19) menuntut bahwa penciptaan mineral bumi diatur secara presisi, yang dalam kimia tanah berarti...",
        options: ["Kadar hara makro dan mikro tersedia dalam rasio seimbang dan tidak bersifat racun bagi akar tumbuhan", "Jumlah batu lebih banyak dari air", "Tanah gunung harus selalu gersang", "Kadar mineral bebas diatur secara acak tanpa aturan"],
        correctIndex: 0,
        explanation: "Kadar 'Mauzun' berarti seimbang saksama, menjamin kecukupan nutrisi bagi herba flora tanpa menimbulkan toksisitas bagi kelestarian alam.",
      }
    ],
    matchingGame: {
      instruction: "Pasangkan istilah kesuburan pegunungan dan kearifan tani dengan pengertian yang tepat!",
      pairs: [
        { left: "Andosol", right: "Tanah vulkanik hitam gembur kaya hara" },
        { left: "Mauzun", right: "Takaran seimbang & presisi biologis" },
        { left: "Kopi Lintong", right: "Arabika unggul khas pegunungan Toba" },
        { left: "Sopo", right: "Lumbung pangan syukur adat Batak" },
        { left: "Terasering", right: "Sengkedan pencegah erosi lereng miring" },
      ],
    },
  },
];
