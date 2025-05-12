import ButtonInHome from "./_componant/ButtonInHome";

export default function Home() {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col gap-8 justify-center items-center ">
      <h1 className="md:text-[2.5rem] text-[1.5rem] text-blue-500 font-semibold text-center">
        Welcome Login System , Crud App
      </h1>
      <ButtonInHome />
    </div>
  );
}
