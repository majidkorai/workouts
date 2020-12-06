
import React from 'react';
import Layout from '../components/Layout';
import Pagination from '../components/Pagination';
import WorkOutListItem from '../components/WorkOutListItem';
import { useWorkOuts, useWorkOutsProps, useUrlUpdate } from '../hooks/useWorkOuts';

export default function Home({ store }) {
  const { workOutsStore } = store;
  const { workOutsList, isLoaded, filtersState, setFilter } = useWorkOutsProps(workOutsStore);
  useWorkOuts(workOutsStore);
  useUrlUpdate(workOutsStore);

  return (
    <Layout showFilters={true} store={workOutsStore}>
      <div className="container mx-auto">
        <div className="container my-10 mx-auto">
          {isLoaded && workOutsList.map((item) => <WorkOutListItem key={item.id} {...item} />)}
        </div>
        {isLoaded &&
          <Pagination
            store={workOutsStore}
            setFilter={setFilter}
            filtersState={filtersState}
            currentPage={parseInt(filtersState.page, 20)}>
          </Pagination>}
      </div>
    </Layout>
  )
}
