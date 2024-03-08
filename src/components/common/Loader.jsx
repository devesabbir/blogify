import loaderImage from "./../../assets/loader.gif";

export default function Loader() {
  return (
    <div className="h-[100vh] grid place-items-center">
      <img src={loaderImage} alt="loader" />
    </div>
  );
}
