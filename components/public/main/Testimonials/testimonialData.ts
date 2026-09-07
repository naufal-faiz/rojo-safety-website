import image1 from "@/public/images/user/user-01.png";
import image2 from "@/public/images/user/user-02.png";

export type Testimonial = {
  id: number;
  name: string;
  destination?: string;
  image: any;
  content: string;
  date: string;
};

const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Muslikhah Suprianti",
    date: "1 Juli 2025",
    image: image1,
    content:
      "Terimakasih ilmunya Rojo Safety, sangat bermanfaat buat saya yang setiap hari mengolah makanan untuk catering. Semoga membawa dampak positif bagi usaha saya kedepan. Jaya jaya jaya",
  },
  {
    id: 2,
    name: "Eka Andi",
    date: "26 Mei 2025",
    image: image2,
    content:
      "Terima kasih Rojo Safety atas ilmunya. Sudah mengikuti training selama 5 hari. Dari panitia & pengajar, semuanya sangat support & berkompeten. Semoga semakin sukses selalu",
  },
  {
    id: 3,
    name: "Budi",
    date: "26 Mei 2025",
    image: image1,
    content:
      "Pelatihannya menyenangkan, dengan materi yang lengkap sekaligus pemateri yang luar biasa dalam menguasai materinya. The best pokonya",
  },
  {
    id: 4,
    name: "Ari Yanto",
    date: "10 Mei 2025",
    image: image2,
    content:
      "penyelenggara training yg menyenangkan..terutama pendamping training yg ramah terhadap peserta..dan istruktur training yg berpengalaman di bidang K3..",
  },
];

export default testimonialData