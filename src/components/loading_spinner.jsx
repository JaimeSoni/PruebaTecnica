const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-verde"></div>
      <p className="mt-4 text-verde">Cargando información del usuario...</p>
    </div>
  );
};

export default LoadingSpinner;