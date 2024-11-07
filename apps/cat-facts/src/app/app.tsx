import { CatTable } from '../components/CatTable';

export const App = () => {


  return (
    <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
      <h1 className="text-7xl">Cat Breeds</h1>
      <div>
        <CatTable />
      </div>
    </div>
  );
}
