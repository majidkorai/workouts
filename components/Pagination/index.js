const Pagination = ({ store, setFilter, filtersState }) => {
  const nextPage = filtersState.page + 1;
  const prevPage = filtersState.page - 1;
  
  const handleNextPageClick = () => {
    setFilter({ 'page': nextPage });
  }

  const handlePrevPageClick = () => {
    setFilter({ 'page': prevPage });
  }

  return (
    <div className="flex justify-center my-10">
      {filtersState.page > 1 && <button className="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-gray-700 rounded-lg focus:shadow-outline hover:bg-gray-800" onClick={handlePrevPageClick}>Previous Page</button>}
      {store.hasMorePages && <button className="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-gray-700 rounded-lg focus:shadow-outline hover:bg-gray-800" onClick={handleNextPageClick}>Next Page</button>}
    </div>
  )
}

export default Pagination;