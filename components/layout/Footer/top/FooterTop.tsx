import FooterList from './FooterList'
import FooterCompany from './FooterCompany'
import FooterMailForm from './FooterMailForm'
import FooterCompanyAddress from './FooterCompanyContact'

const TopFooter = () => {
    return (
        <div className="py-20 lg:py-10">
            <div className="flex flex-wrap gap-8 lg:justify-between lg:gap-0">
                <FooterCompany />

                <div className="flex w-full flex-col gap-8 md:flex-row md:justify-between md:gap-0 lg:w-2/3 xl:w-7/12">
                    <FooterCompanyAddress />
                    <FooterList title="Info Lainnya" items={["Beranda", "Jenis Training", "Berita", "Jadwal Kegiatan", "Sertifikasi"]} url="#"/>
                    <FooterMailForm />
                </div>
            </div>
        </div>
    )
}

export default TopFooter
