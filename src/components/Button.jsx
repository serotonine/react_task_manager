export default function Button({label, btnClass, handleClick, id:dataId}){
  let classes = "btn font-bold py-2 px-4 rounded";
  switch(btnClass){
    case "btn-positif":
      classes += " bg-slate-500 hover:bg-slate-700 text-white"
    break;
    case "btn-negatif":
      classes += " bg-slate-300 hover:bg-slate-200  text-slate-500 hover:text-slate-700"
    break;
    default:
      classes += " bg-slate-500 hover:bg-slate-700 text-white"
  }
  return(
    <button  data-id={dataId} className={classes} onClick={handleClick} >{label}</button>
  );
}