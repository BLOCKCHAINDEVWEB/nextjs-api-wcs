import moment from "moment";
import Layout from "../components/Layout";
import { getCampuses } from "../models/campus";

export default function CampusesPage({ campuses, lastUpdateDate }) {
  return (
    <Layout pageTitle="Campuses">
      <p>Page generated on : {lastUpdateDate}</p>
      <h1>Our Campuses</h1>
      {campuses.map(({ id, name }) => {
        return <li key={id}>{name}</li>;
      })}
    </Layout>
  );
}

export async function getStaticProps() {
  const currentDate = moment().format("YYYY-MM-DD - HH:mm:ss");
  const campuses = await getCampuses();
  return {
    props: {
      campuses,
      lastUpdateDate: currentDate
    },
    revalidate: 10
  };
}
