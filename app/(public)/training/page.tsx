import TrainingItem from "@/components/ui/main/Training/TrainingItem";
import trainingData from "@/components/ui/main/Training/trainingScheduleData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Training - Rojo Safety",

  // other metadata
  description: "Jadwal training terbaru dari rojosafety"
};

const TrainingPage = async () => {
  return (
    <>
      {/* <!-- ===== Blog Grid Start ===== --> */}
      <section className="py-20 lg:py-25 xl:py-20">
        <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
          <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {trainingData.map((post, key) => (
              <TrainingItem training={post} key={key}/>
            ))}
          </div>
        </div>
      </section>
      {/* <!-- ===== Blog Grid End ===== --> */}
    </>
  );
};

export default TrainingPage;
