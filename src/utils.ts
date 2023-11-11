export const copyToClipboard = (text: string) => {
  const input = document.createElement("input");
  // Avoid scrolling to bottom
  input.style.top = "0";
  input.style.left = "0";
  input.style.position = "fixed";
  input.value = text;
  document.body.appendChild(input);
  // Select the input field
  input.select();
  input.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(input.value);
  input.remove();
};
