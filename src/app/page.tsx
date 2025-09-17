import data from "../../cedvel.json";
import Table from "@/components/table";

export default function Home() {
  return (
    <>
      <h1 className="text-center text-3xl font-bold">
        Xaçmaz şəhəri Akademik Zərifə Əliyeva adına 8 nömrəli təbiət təmayüllü
        liseyin rus bölməsi üzrə cədvəl (22 Sentyabr 2025)
      </h1>
      <Table data={data} />
    </>
  );
}
