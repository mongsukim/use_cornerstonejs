const LeftMenu = () => {
  return (
    <div className="hidden md:block md:ml-[125px] md:flex flex-col items-center space-y-[74px]">
      <button>
        <div className="shrink-0">
          <img src="/images/Axial.png" />
        </div>
      </button>
      <button>
        <div className="shrink-0">
          <img src="/images/Coronal.png" />
        </div>
      </button>
      <button>
        <div className="shrink-0">
          <img src="/images/Sagittal.png" />
        </div>
      </button>
    </div>
  );
};
export default LeftMenu;
