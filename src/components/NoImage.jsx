import todoist from "../assets/todoist.webp";
export default function NoImage() {
  return (
    <figure className="aspect-square bg-white h-full rounded-full overflow-hidden max-h-[60vh] m-auto">
      <img
        src={todoist}
        alt="No project"
        className="h-full w-full object-contain"
      />
    </figure>
  );
}
