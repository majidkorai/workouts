import { useRouter } from 'next/router'
import Layout from '../../components/Layout';
import WorkOutDetails from '../../components/WorkOutDetails'
import { useWorkOutItemProps, useWorkOuts } from '../../hooks/useWorkOuts';

export default function WorkOut({ store }) {
  const { workOutsStore } = store;
  const router = useRouter()
  const { id } = router.query
  const { workOutItem } = useWorkOutItemProps(id, workOutsStore);
  useWorkOuts(workOutsStore);
  return (
    <Layout showFilters={false} store={workOutsStore}>
      <div className="container mx-auto">
        {workOutItem && <WorkOutDetails {...workOutItem} />}
      </div>
    </Layout>
  )
}

