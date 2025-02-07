import React from "react";

const Footer: React.FC = React.memo(() => {
  return (
    <footer className="bg-header-footer-color text-white px-32 py-4 mt-4 text-center">
      <p>
        Not an official Minecraft product. We are in no way affiliated with or
        endorsed by Mojang Synergies AB, Microsoft Corporation or other
        rightsholders.
      </p>
    </footer>
  );
});
export default Footer;
