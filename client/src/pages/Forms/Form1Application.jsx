import React, { useEffect, useState } from "react";

function Form1Application() {
  console.log(`inside `);

  useEffect(() => {
    console.log(`first render`);
  }, []);
  return <div className="mt-30 text-3xl text-center">Form1Application</div>;
}

export default Form1Application;
