import Header from '../Header';
import Footer from '../Footer';
import Navigation from '../Navigation';
import Filters from '../Filters';

const Layout = (props) => {
  const { store, showFilters } = props;
  return (
    <>
      <Header>
        <div className="container mx-auto flex justify-between items-center ">
          <Navigation />
          {showFilters && <Filters store={store} />}
        </div>
      </Header>
      <main className="flex-grow">
        {props.children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;