export default () => {
  return (
    <div className="mx-auto w-full max-w-sm rounded-md">
      <div className="h-6 w-20 rounded bg-gray-200"></div>
      <div className="mt-4 flex animate-pulse space-x-4">
        <div className="flex-1 space-y-2 py-1">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1 h-4 rounded bg-gray-200"></div>
            <div className="col-span-2 h-4 rounded bg-gray-200"></div>
            <div className="col-span-1 h-4 rounded bg-gray-200"></div>
          </div>
          <div className="space-y-2">
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2 h-4 rounded bg-gray-200"></div>
              <div className="col-span-1 h-4 rounded bg-gray-200"></div>
              <div className="col-span-1 h-4 rounded bg-gray-200"></div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-1 h-4 rounded bg-gray-200"></div>
              <div className="col-span-1 h-4 rounded bg-gray-200"></div>
              <div className="col-span-2 h-4 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
