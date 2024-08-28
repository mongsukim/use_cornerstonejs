export default function addButtonToToolbar({
  title,
  onClick,
}: {
  title: string;
  onClick: () => void;
}) {
  const toolbar = document.getElementById("demo-toolbar");
  if (!toolbar) {
    console.error("Toolbar element not found");
    return;
  }
  const button = document.createElement("button");

  button.innerHTML = title;
  button.onclick = onClick;

  toolbar.append(button);
}
