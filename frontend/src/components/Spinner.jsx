function Spinner() {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center">
      {" "}
      {/* Use className instead of class for JSX */}
      <div className="flex flex-row gap-2 items-center">
        {" "}
        {/* Removed unnecessary content-center class */}
        <div
          className="w-4 h-4 rounded-full bg-red-700 animate-bounce"
          style={{ animationDelay: ".7s" }}></div>
        <div
          className="w-4 h-4 rounded-full bg-red-700 animate-bounce"
          style={{ animationDelay: ".3s" }}></div>
        <div
          className="w-4 h-4 rounded-full bg-red-700 animate-bounce"
          style={{ animationDelay: ".7s" }}></div>
      </div>
    </div>
  );
}

export default Spinner;
