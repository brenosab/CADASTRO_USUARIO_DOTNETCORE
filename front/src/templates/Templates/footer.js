import React from "react";

const Footer = () => {
  return (
    <div>
      <footer>
        <p>
          <small>
            Empreendimentos GREat - Todos os direitos reservados -
            {" " + new Date().getFullYear()}
          </small>
        </p>
      </footer>
    </div>
  );
};

export default Footer;
