export type FAQ = {
    id: number;
    quest: string;
    ans: string;
};

const faqData: FAQ[] = [
    {
        id: 1,
        quest: "Berapa biaya untuk mengikuti training?",
        ans: "Biaya yang dikeluarkan bergantung pada jenis training serta peralatan yang dibutuhkan",
    },
    {
        id: 2,
        quest: "Berapa lama durasi kegiatan training?",
        ans: "Paling umum 3 hari, akan tetapi untuk mengikuti training tingkat lanjut akan memiliki durasi kegiatan lebih lama",
    },
    {
        id: 3,
        quest: "Apa saja yang akan didapatkan jika mengikuti training?",
        ans: "Selama kegiatan kamu akan mendapatkan modul belajar, suvenir dari Rojo Safety, diajar langsung oleh instruktur yang sudah berpengalaman serta mendapatkan fasilitas seperti snack dan makan siang",
    },
];

export default faqData;
