import { motion } from 'framer-motion'

const FooterCompanyContact = () => {
  return (
    <>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: -20,
          },

          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 1, delay: 0.1 }}
        viewport={{ once: true }}
        className="animate_top">
        <h4 className="mb-9 text-itemtitle2 font-medium text-black dark:text-white">
          Contact
        </h4>
        <div className="mb-9">
          <p className='mb-4'>(021) 8888-6579</p>
          <p className='mb-4 max-w-xs'>Blok A1, Jl. Duta Bumi Raya No.8, RT.007/RW.030, Pejuang, Kecamatan Medan Satria, Kota Bks, Jawa Barat 17131</p>
          <a className='mb-3 inline-block hover:text-primary' href="mailto:marketing@rojosafety.com">marketing@rojosafety.com</a>
        </div>

        <h4 className="mb-5 text-itemtitle2 font-medium text-black dark:text-white">
          Jam Kerja
        </h4>
        <p>
          Senin - Jumat: 08.00 - 17.00
        </p>
      </motion.div>
    </>
  )
}

export default FooterCompanyContact
