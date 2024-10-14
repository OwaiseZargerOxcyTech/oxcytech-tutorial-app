import Copyright from "./Copyright";

export default function AdminEmpFooter() {
  return (
    <>
      {/* Footer container */}
      <div className="bg-gray-100 bg-opacity-50 text-center lg:text-left">
        {/* Main container div: holds the entire content of the footer */}
        <div className="mx-auto max-w-2xl px-4 py-2 sm:px-2 sm:py-4 lg:max-w-7xl lg:px-4">
          {/*Copyright section*/}
          <Copyright />
        </div>
      </div>
    </>
  );
}
