import addStuff from "../../db/addStuff";

const addToDatabase = async (req, res, next) => {
  try {
    const stuff = req.body;
    const entry = await addStuff(stuff);
    res.send(
      JSON.stringify(
        {
          status: "ok",
          entry
        },
        null,
        2
      )
    );
  } catch (err) {
    next(err);
  }
};

export default addToDatabase;