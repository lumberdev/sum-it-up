"use client";

import { useEffect } from "react";

const Header = () => {
  const handleClick = async () => {};

  useEffect(() => {
    const evtSource = new EventSource("/api/sse", {
      withCredentials: true,
    });
    evtSource.onmessage = (event) => {
      console.log(event, "hi");
    };
    return () => evtSource.close();
  }, []);
  return (
    <header className="flex min-h-[10rem] flex-col items-center justify-center px-10 pt-10 text-center">
      <h1 className="text-heading1 font-semibold text-darkest">Sum it up!</h1>
      <div className="text-dark">
        Get an instant summary of any text, website content (URL) or song for
        free.
      </div>
      <button onClick={handleClick}>FETCH</button>
    </header>
  );
};

export default Header;
