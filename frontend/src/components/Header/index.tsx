const Header = () => {
  return (
    <div className="flex bg-red w-[1200px] items-center justify-between px-10 m-auto h-[100px] border border-black">
      <div>
        <h1 className="text-[20px]">Invisible Empire</h1>
      </div>
      <button className="bg-black text-white p-3 rounded-[15px]">
        Connect Wallet
      </button>
    </div>
  );
};

export default Header;
