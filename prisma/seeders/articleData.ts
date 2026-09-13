
export type Article = {
    title: string
    slug: string
    content: string
    article_category_id: string
};

export type ArticleCategory  = {
    id?: string
    name: string
}

const ArticleCategoryData: ArticleCategory[] = [
    {name: "Berita"},
    {name: "K3"},
    {name: "Bencana Alam"},
    {name: "Bandang"},
    {name: "Training"},
]

const ArticleData: Article[] = [
{
    "title": "Inspeksi rutin kran tower bulanan",
    "slug": "penemuan-harta-karun-di-monas",
    "content": "mana ada yang percaya pas lagi sibuk ngecek sling crane malah nemu peti emas kuno ketimbun beton coran jalanan",
    "article_category_id": "1"
  },
  {
    "title": "Perawatan mesin genset pabrik",
    "slug": "kebakaran-misterius-di-gudang-tua",
    "content": "lagi asyik ganti oli genset tiba-tiba asap hitam ngebul parah dari arah lorong belakang padahal ga ada yang main api",
    "article_category_id": "2"
  },
  {
    "title": "Kalibrasi alat ukur suhu gudang",
    "slug": "penampakan-mahluk-halus-di-lab",
    "content": "siapa yang ga merinding kalau thermogun nunjukin suhu minus 50 derajat padahal ruangan pendingin lagi mati total",
    "article_category_id": "3"
  },
  {
    "title": "Pembersihan filter AC kantor pusat",
    "slug": "skandal-dokumen-rahasia-bocor",
    "content": "maksud hati cuma mau bersihin debu pipa blower malah nemu map merah isinya berkas korupsi bernilai triliunan rupiah",
    "article_category_id": "4"
  },
  {
    "title": "Pengecekan tekanan ban armada truk",
    "slug": "balapan-liar-di-jalan-tol-malam",
    "content": "lagi mompa ban truk di rest area malah disalip tiga mobil sport ngebut beruntet serasa di film balapan aksi",
    "article_category_id": "5"
  },
  {
    "title": "Ganti rantai konveyor jalur produksi",
    "slug": "invasi-tikus-raksasa-di-pabrik",
    "content": "bayangin aja pas rantai mau dipasang malah keluar gerombolan tikus seukuran kucing dari bawah mesin yang masih nyala",
    "article_category_id": "1"
  },
  {
    "title": "Pemeriksaan panel listrik utama",
    "slug": "pemadaman-total-se-kota-bekasi",
    "content": "baru juga saklar utama dicoba turunin sebentar eh satu kelurahan langsung gelap gulita tanpa sisa",
    "article_category_id": "2"
  },
  {
    "title": "Pengelasan rangka besi kanopi",
    "slug": "serangan-petir-di-tengah-hari",
    "content": "lagi fokus megang stang las pas percikan api keluar malah ada petir menyambar tiang listrik sebelah persis",
    "article_category_id": "3"
  },
  {
    "title": "Pengecatan ulang garis marka jalan",
    "slug": "pengejar-pengedar-narkoba-malam",
    "content": "lagi asyik ngecat jalan malam-malam malah ada mobil ditabrak polisi lalu penumpangnya kabur nyebur ke selokan",
    "article_category_id": "4"
  },
  {
    "title": "Uji coba pompa pemadam kebakaran",
    "slug": "banjir-bandang-mendadak-di-parkiran",
    "content": "niatnya cuma ngetes tekanan selang air eh malah pipa utama jebol bikin seluruh basement tenggelam dalam lima menit",
    "article_category_id": "5"
  }
];

export {ArticleData, ArticleCategoryData}