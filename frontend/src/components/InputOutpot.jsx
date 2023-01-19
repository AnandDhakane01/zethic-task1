import React, { useState } from "react";
const InputOutput = () => {
  const [answers, setAnswers] = useState();
  const [inputs, setInputs] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const req_data = parseInput();

    try {
      let res = await fetch(`http://localhost:3000/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req_data),
      });
      res = await res.json();
      if (res.error) {
        setAnswers(res.message);
      }
      setAnswers(res);
      // setInputs("");
    } catch (err) {
      console.error("error in API call");
      setAnswers(err.message);
    }
  };

  const parseInput = () => {
    const req_data = {};
    if (inputs) {
      let data = inputs.split("\n");
      data = data.filter((str) => str !== "");

      if (data.length % 2 !== 0) {
        let i = 0;
        let in_cnt = 0;
        req_data["insects"] = {};
        while (i < data.length) {
          if (i === 0) {
            req_data["roomSize"] = data[i];
            i += 1;
          } else {
            req_data["insects"]["_" + in_cnt.toString()] = {
              position: data[i],
              path: data[i + 1],
            };
            i += 2;
            in_cnt += 1;
          }
        }
      }
    }
    return req_data;
  };

  return (
    <>
      <h1 className="flex justify-center m-10 text-xl">INSECT NAVIGATION</h1>
      <div className="flex justify-center w-100 mt-10">
        <form className="w-1/3" onSubmit={handleSubmit}>
          <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
              <textarea
                id="comment"
                rows="4"
                className="focus:outline-0 w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                placeholder="Write the inputs here...."
                required
                value={inputs}
                onInput={(e) => setInputs(e.target.value)}
                onChange={(e) => setInputs(e.target.value)}
              ></textarea>
            </div>
            <div className="flex items-center justify-center px-3 py-2 border-t dark:border-gray-600">
              <button
                type="submit"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
              >
                Get Answer
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="flex justify-center">
        <ol>
          {answers && answers.result
            ? answers.result.map((ans) => <li key={ans}>{ans}</li>)
            : ""}
        </ol>
      </div>
    </>
  );
};

export default InputOutput;
