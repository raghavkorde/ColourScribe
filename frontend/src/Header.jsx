import Button from "@mui/material-next/Button";
import "./Header.css";
import Color from 'color';
const codes = ['#00BFFF', '#00FF00', '#C0C0C0', '#8A2BE2', '#FFA500']

const mixColour = (codes) => {
  const part = 1/codes.length
  let colorObj = Color("white");
  codes.forEach(element => {
      colorObj = colorObj.mix(Color(element), part).hex()
  });
  return colorObj;
}

export default function Header() {
  return (
    <>
      <header className="header">
        <section className="logo">ColourScribe</section>
        <section className="github">Github/ColourScribe</section>
        <div className="interact">
          <Button color="primary" disabled={false} variant="filledTonal">
            {" "}
            About{" "}
          </Button>
          <Button color="primary" disabled={false} variant="filledTonal">
            {" "}
            Contact{" "}
          </Button>
        </div>
      </header>
    </>
  );
}
