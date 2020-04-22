import getStuff from "../../db/getStuff";

const getFromDatabaseByNumber = async (req, res, next) => {
  const number = req.params.number;
  if (number === undefined || number === "") {
    next(`Number is not defined`);
  }
  try {
    const entry = await getStuff({ number });
    res.send(
      JSON.stringify(
        {
          status: "ok",
          entry,
        },
        null,
        2
      )
    );
  } catch (err) {
    next(err);
  }
};

export default getFromDatabaseByNumber;