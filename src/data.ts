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
      text: "Modul ini membahas hubungan mekanis antara lempeng tektonik yang terus bergerak dan fungsi struktural akar gunung dalam mengunci (stabilisasi) kerak bumi.",
      points: [
        {
          title: "Fenomena Kerak Bumi terapung",
          desc: "Kerak bumi (litosfer) bersifat dinamis dan terapung di atas mantel bumi yang cair dan padat-liat (astenosfer) seperti balok es di atas segelas air.",
        },
        {
          title: "Teori Isostasi",
          desc: "Suatu keadaan kesetimbangan hidrostatis di mana massa pegunungan diimbangi oleh 'akar' gunung yang tenggelam jauh ke bagian dalam mantel.",
        },
        {
          title: "Kerapuhan Tanpa Gunung",
          desc: "Tanpa adanya struktur gunung yang menyatukan lipatan lapisan bumi, gerakan lempeng tektonik akan jauh lebih kacau dan tidak stabil.",
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
        },
        {
          surah: "An-Nazi'at",
          verse: "32",
          arabic: "وَالْجِبَالَ أَرْسَاهَا",
          translation: "Dan gunung-gunung Dia pancangkan dengan kokoh.",
          explanation: "Kata 'Arsaha' berasal dari kata kerja yang sama dengan berlabuhnya kapal (bagaikan sauh jangkaran besi yang menahan kapal dari goyangan ombak). Allah menancapkan gunung di litosfer bumi sebagai jangkar bumi.",
        },
      ],
      hikmah: "Penciptaan gunung merupakan bukti kasih sayang Allah SWT agar bumi yang berotasi sangat cepat (sekitar 1.670 km/jam di khatulistiwa) tetap tenang dan layak dihuni oleh manusia tanpa terjadinya pergeseran tanah terus-menerus.",
    },
    etnosains: {
      title: "Etnosains Batak Toba: Dolok Pusuk Buhit sebagai Tiang Bumi",
      origin: "Mitos Penciptaan Mulajadi Na Bolon & Kosmologi Batak Toba",
      narrative: "Dalam keyakinan leluhur suku Batak (Kuno), bumi berawal dari rerentuhan debu surgawi yang ditenun oleh Si Boru Deak Parujar di atas samudera luas. Untuk menahan bumi dari guncangan naga raksasa bawah tanah (Naga Peoha/Naga Padoha Niaji), Mulajadi Na Bolon (Tuhan Yang Maha Esa) menurunkan gumpalan tanah suci yang kemudian tumbuh menjadi Gunung Pusuk Buhit. Gunung ini dianggap sebagai 'Aksis Mundi' (pusat kosmos) atau tiang yang menambatkan dunia tengah agar tetap stabil dari amukan naga samudera kuno.",
      practices: [
        {
          title: "Ritual Penghormatan Gunung",
          desc: "Upacara syukur adat yang dipimpin tetua adat untuk memohon keseimbangan alam agar pusar bumi tidak diguncang bencana besar.",
          icon: "Sparkles",
        },
        {
          title: "Kearifan 'Ulayat' Tanah Pusuk Buhit",
          desc: "Larangan keras melakukan perusakan tanah atau menebang pohon sembarangan di lereng sakral Pusuk Buhit agar tidak memancing 'bencana goyangnya tiang bumi'.",
          icon: "ShieldAlert",
        },
      ],
    },
    rangkuman: [
      "Secara sains, gunung memiliki bagian yang menjulur dalam-dalam ke mantel bumi yang disebut sebagai 'Akar Gunung', dijelaskan secara fisika dalam teori Isostasi.",
      "Al-Qur'an menggunakan kata 'Awtad' (Pasak) dan 'Arsaha' (Jangkar) untuk menggambarkan gunung. Ini sangat cocok dengan bentuk fisik gunung dan akarnya secara tiga dimensi.",
      "Masyarakat Batak Toba menghormati Gunung Pusuk Buhit sebagai pilar spiritual (Tiang Kosmologi) bumi yang menjaga stabilitas hulu pemukiman mereka dari marabahaya.",
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
      text: "Sesi ini meninjau sejarah geologis letusan supervolcano Toba masa lalu, dinamika aliran magma, serta pergerakan lempeng tektonik dunia.",
      points: [
        {
          title: "Pergeseran Lempeng Tektonik",
          desc: "Benua dan samudera berada di atas lempeng yang bergerak lambat karena arus konveksi mantel dalam panas bumi.",
        },
        {
          title: "Keajaiban Supervolcano Toba",
          desc: "Letusan Danau Toba Purba sekitar 74.000 tahun lalu mengeluarkan 2.800 km kubik material abu vulkanis dan melahirkan kaldera terbesar bumi.",
        },
        {
          title: "Gerakan Makroskopik Gunung",
          desc: "Gunung-gunung ikut berpindah seiring dengan pergeseran lempeng benua dan samudra.",
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
          x: 48,
          y: 50,
          title: "Pipa Vulkanik (Vent)",
          description: "Saluran utama tempat magma naik dari bumi ke atas permukaan saat aktivitas erupsi.",
        },
        {
          id: "caldera",
          x: 50,
          y: 15,
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
        },
      ],
      hikmah: "Allah menegaskan kesempurnaan ciptaan-Nya: 'صُنْعَ اللَّهِ الَّذِي أَتْقَنَ كُلَّ شَيْءٍ' (Begitulah perbuatan Allah yang membuat dengan kokoh tiap-tiap sesuatu). Bumi diciptakan dinamis untuk melepaskan energi panas internalnya demi melestarikan kehidupan.",
    },
    etnosains: {
      title: "Etnosains Batak Toba: Mitologi Naga Padoha & Gempa Pegunungan",
      origin: "Kearifan Geologi dalam Tutur Lisan",
      narrative: "Sebelum bangsa Batak mengenal istilah modern 'Lempeng Tektonik' dan 'Sesar Sumatera Semangko', mereka mengamati adanya gempa tektonik-vulkanik ulayat yang kerap menggoncang pemukiman dekat Danau Toba. Untuk menjabarkannya, masyarakat Batak bertutur tentang naga raksasa 'Naga Padoha Niaji', penguasa dunia bawah bumi yang diikat oleh Si Boru Deak Parujar. Jika naga tersebut gelisah, ia akan menggeliatkan badannya dan memicu goncangan bumi (gempa). Cerita rakyat ini secara intuitif mencerminkan aktivitas retakan sesar aktif Pulau Sumatera.",
      practices: [
        {
          title: "Tradisi Menenangkan Naga",
          desc: "Secara simbolis dalam legenda, menepuk tanah saat gempa sambil berteriak 'Suhu! Suhu! (Tinggal!)' yang berarti mengakui keberadaan penghuni bawah bumi agar gempa reda.",
          icon: "TrendingUp",
        },
        {
          title: "Eksplorasi Air Hangat 'Aek Rangat'",
          desc: "Nenek moyang mengamati panas bumi aktif dengan memanfaatkan mata air belerang hangat (aek rangat) di kaki Pusuk Buhit sebagai tempat terapi pengobatan sulfur.",
          icon: "Flame",
        },
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
      text: "Mempelajari siklus hidrologi orografis dan fitur resapan air tanah alami (Akuifer) yang terletak di lereng-lereng bebatuan gunung.",
      points: [
        {
          title: "Hujan Orografis",
          desc: "Udara lembab bertiup mendaki lereng gunung, mendingin secara adiabatic, lalu mengembun membentuk hujan pekat di sisi lereng gunung.",
        },
        {
          title: "Akuifer Alami",
          desc: "Dinding dalam struktur batuan gunung bertindak bagaikan spons penyaring raksasa yang menampung cadangan air sangat besar.",
        },
        {
          title: "Hulu Sungai Danau Toba",
          desc: "Daerah tangkapan air hutan pegunungan yang menjaga kestabilan permukaan air danau Toba agar tidak pernah kering.",
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
          explanation: "Dalam ayat ini, Allah Swt secara khusus menggabungkan penyebutan struktur gunung yang tinggi menjulang (Syamikhat) sebagai prasyarat bagi ketersediaan air minum yang sangat tawar (Furat). Penyerapan air melalui tekanan kapiler pegunungan menghasilkan saringan air terbaik di bumi.",
        },
      ],
      hikmah: "Allah merancang siklus air yang begitu presisi. Gunung adalah filter hidrologis yang memisahkan air asin menguap dari lautan, menyaringnya di bukit tinggi, sehingga layak menjadi konsumsi manusia dan sato (hewan).",
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
      text: "Bahwa gunung bertindak sebagai landmark spasial utama, menghasilkan jalur sirkulasi angin lokal lembah-gunung, dan pemandu navigasi purba.",
      points: [
        {
          title: "Landmark Spasial Alami",
          desc: "Bentuk gunung yang masif dan menjulang tinggi menjadikannya titik referensi koordinat arah paling andal di darat dan perairan.",
        },
        {
          title: "Angin Lembah & Angin Gunung",
          desc: "Perbedaan tekanan udara akibat radiasi matahari di gunung menciptakan arah mata angin angin periodik harian.",
        },
        {
          title: "Sistem Astronomi Batak 'Parhalaan'",
          desc: "Kalender kuno adat Batak mengamati kedudukan bulan/bintang sejajar di atas puncak gunung untuk menandai tibanya musim tanam.",
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
      text: "Mendalami senyawa hara mineral silika, kalium, kalsium, fosfor alami dari batuan beku vulkanik penunjang kesuburan tanah ulayat.",
      points: [
        {
          title: "Pelapukan Abu Vulkanik",
          desc: "Erupsi mengeluarkan mineral tuf vulkanis yang cepat melapuk berkat air hujan, melepaskan hara melimpah untuk tanah.",
        },
        {
          title: "Sistem Terasering Bukit Pegunungan",
          desc: "Pengolahan lereng miring secara bertahap menjaga kestabilan ketersediaan tanah subur dari sapuan hujan di pegunungan.",
        },
        {
          title: "Kopi Arabika Kelas Dunia",
          desc: "Ketinggian pegunungan Toba menyediakan iklim dingin dan tanah andosol vulkanis, melahirkan kopi arabika Lintong harum.",
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
