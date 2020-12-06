import Link from 'next/link';

const WorkOutListItem = ({ id, name, description, category, startDate }) => {
  const detailsLink = `/workout/${id}`;
  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        <div className="my-1 px-1 w-full">
          <article className="overflow-hidden rounded-lg divide-y shadow-lg">
            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
              <h1 className="text-lg">
                <Link href={detailsLink}>
                  <a className="text-lg font-semibold no-underline hover:underline text-gray-600">
                    {name}
                  </a>
                </Link>
              </h1>
            </header>
            <footer className="p-2 md:p-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex justify-left text-gray-600">
                  <span className="mr-2"> Date:</span>
                  <span>{startDate} </span>
                </div>
                <div className="flex justify-left text-gray-600">
                  <span className="mr-2">Category: </span>
                  <span> {category} </span>
                </div>
                <div className="flex justify-left text-gray-600">
                  <span className="mr-2">Description: </span>
                  <span> {description} </span>
                </div>
              </div>
            </footer>
          </article>
        </div>
      </div>
    </div>
  )
}

export default WorkOutListItem;